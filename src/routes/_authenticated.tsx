import { createFileRoute, Outlet, Link, useNavigate, redirect } from "@tanstack/react-router";
import { useAuth, AuthProvider } from "@/hooks/use-auth";
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { requestPasswordReset } from "@/lib/portal.functions";
import { pingLastSeen, checkMyAccess } from "@/lib/accounts.functions";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async () => {
    if (typeof window === "undefined") return;
    // getSession() kan een netwerkfout gooien (bv. flaky mobiele verbinding)
    // ipv gewoon { session: null } terug te geven. Zonder try/catch belandde
    // die exception ongevangen in de root error boundary ("This page didn't
    // load") vlak na het inloggen, in plaats van gewoon terug naar /login te
    // sturen zoals bij een ontbrekende sessie.
    let session;
    try {
      const { data } = await supabase.auth.getSession();
      session = data.session;
    } catch {
      session = null;
    }
    if (!session) {
      throw redirect({ to: "/login" });
    }
  },
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <AuthProvider>
      <Inner />
    </AuthProvider>
  );
}

function Inner() {
  const { user, loading, signOut } = useAuth();
  const nav = useNavigate();
  const ping = useServerFn(pingLastSeen);
  const checkAccess = useServerFn(checkMyAccess);

  const SESSION_MAX_MS = 10 * 60 * 1000; // 10 minuten
  const SESSION_KEY = "aimi_session_start";

  // Ping last_seen periodically + check access + session timeout
  useEffect(() => {
    if (!user) return;
    let active = true;

    // Sla login-tijdstip op (alleen als nog niet gezet)
    if (!localStorage.getItem(SESSION_KEY)) {
      localStorage.setItem(SESSION_KEY, String(Date.now()));
    }

    const doSessionCheck = async () => {
      const start = Number(localStorage.getItem(SESSION_KEY) ?? 0);
      if (Date.now() - start >= SESSION_MAX_MS) {
        localStorage.removeItem(SESSION_KEY);
        toast.error("Je sessie is verlopen. Log opnieuw in.");
        await signOut();
        nav({ to: "/login" });
      }
    };

    const doPing = () => { ping({}).catch(() => {}); };
    const doCheck = async () => {
      try {
        const r = await checkAccess({});
        if (!active) return;
        if (r.blocked || r.expired) {
          toast.error(r.expired ? "Je toegang is verlopen." : "Je account is geblokkeerd.");
          await signOut();
          nav({ to: "/login" });
        }
      } catch {}
    };

    doPing();
    doCheck();
    doSessionCheck();

    const pingI = setInterval(doPing, 60_000);
    const checkI = setInterval(doCheck, 5 * 60_000);
    const sessionI = setInterval(doSessionCheck, 5 * 60_000); // check elke 5 min

    return () => {
      active = false;
      clearInterval(pingI);
      clearInterval(checkI);
      clearInterval(sessionI);
    };
  }, [user]);

  // Wis sessie-tijdstip bij uitloggen
  useEffect(() => {
    return () => { if (!user) localStorage.removeItem(SESSION_KEY); };
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground">
        Laden…
      </div>
    );
  }
  if (!user) {
    nav({ to: "/login" });
    return null;
  }

  return (
    <div className="portal-dark min-h-screen" style={{ background: "#1a1b1e", color: "#f4f4f5" }}>
      <header style={{ borderBottom: "1px solid #35363a", background: "rgba(30,31,35,0.97)", backdropFilter: "blur(8px)", position: "sticky", top: 0, zIndex: 40 }}>
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Link to="/" className="font-medium text-white text-xl tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}>
            AIMI<span style={{ color: "#fe2c02" }}>.</span>
          </Link>
          <div className="flex items-center gap-4 text-sm" style={{ fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}>
            <Link to="/portal" className="text-white/60 hover:text-white transition-colors">Portaal</Link>
            <Link to="/admin" className="text-white/60 hover:text-white transition-colors">Admin</Link>
            <AccountMenu
              email={user.email ?? ""}
              onSignOut={async () => {
                await signOut();
                nav({ to: "/login" });
              }}
            />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}

function AccountMenu({ email, onSignOut }: { email: string; onSignOut: () => void | Promise<void> }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const reset = useServerFn(requestPasswordReset);
  const resetM = useMutation({
    mutationFn: () => reset({}),
    onSuccess: () => {
      toast.success("Je verzoek is verstuurd. Wij nemen contact op.");
      setOpen(false);
    },
    onError: (e: any) => toast.error(e.message ?? "Er ging iets mis."),
  });

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const initials = (email || "?").slice(0, 1).toUpperCase();

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full pl-1 pr-3 py-1 transition-colors"
        style={{ border: "1px solid #2a2b2b", background: "#161717" }}
      >
        <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">
          {initials}
        </span>
        <span className="hidden sm:inline">Mijn account</span>
        <span aria-hidden="true" className="text-muted-foreground">▾</span>
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-64 rounded-xl shadow-lg z-50 overflow-hidden"
          style={{ border: "1px solid #2a2b2b", background: "#161717" }}
        >
          <div className="px-4 py-3" style={{ borderBottom: "1px solid #2a2b2b" }}>
            <p className="text-xs" style={{ color: "#8a8f98" }}>Ingelogd als</p>
            <p className="text-sm font-medium truncate text-white">{email}</p>
          </div>
          <ul className="py-1 text-sm">
            <li>
              <Link
                to="/account"
                onClick={() => setOpen(false)}
                className="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                role="menuitem"
              >
                Mijn gegevens
              </Link>
            </li>
            <li>
              <button
                onClick={() => resetM.mutate()}
                disabled={resetM.isPending}
                className="w-full text-left px-4 py-2 text-white/80 hover:text-white hover:bg-white/5 transition-colors disabled:opacity-50"
                role="menuitem"
              >
                {resetM.isPending ? "Bezig…" : "Wachtwoord reset aanvragen"}
              </button>
            </li>
            <li style={{ borderTop: "1px solid #2a2b2b", marginTop: 4 }}>
              <button
                onClick={() => {
                  setOpen(false);
                  void onSignOut();
                }}
                className="w-full text-left px-4 py-2 hover:bg-white/5 transition-colors"
                style={{ color: "#fe2c02" }}
                role="menuitem"
              >
                Uitloggen
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
