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
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) {
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
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-background/80 backdrop-blur sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Link to="/" className="font-display font-bold tracking-tight">
            AIMI<span className="text-primary">.</span>
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link to="/portal" className="hover:text-primary">Portaal</Link>
            <Link to="/admin" className="hover:text-primary">Admin</Link>
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
        className="flex items-center gap-2 rounded-full border border-border bg-card pl-1 pr-3 py-1 hover:bg-accent"
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
          className="absolute right-0 mt-2 w-64 rounded-xl border border-border bg-card shadow-lg z-50 overflow-hidden"
        >
          <div className="px-4 py-3 border-b border-border">
            <p className="text-xs text-muted-foreground">Ingelogd als</p>
            <p className="text-sm font-medium truncate">{email}</p>
          </div>
          <ul className="py-1 text-sm">
            <li>
              <Link
                to="/account"
                onClick={() => setOpen(false)}
                className="block px-4 py-2 hover:bg-accent"
                role="menuitem"
              >
                Mijn gegevens
              </Link>
            </li>
            <li>
              <button
                onClick={() => resetM.mutate()}
                disabled={resetM.isPending}
                className="w-full text-left px-4 py-2 hover:bg-accent disabled:opacity-50"
                role="menuitem"
              >
                {resetM.isPending ? "Bezig…" : "Wachtwoord reset aanvragen"}
              </button>
            </li>
            <li className="border-t border-border mt-1">
              <button
                onClick={() => {
                  setOpen(false);
                  void onSignOut();
                }}
                className="w-full text-left px-4 py-2 hover:bg-accent text-destructive"
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
