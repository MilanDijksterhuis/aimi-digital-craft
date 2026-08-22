import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SITE_URL } from "@/lib/seo";
import { loginStart, loginVerifyMfa, loginResendMfa } from "@/lib/telegram.functions";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Inloggen — AIMI Klantenportaal" },
      { name: "description", content: "Log in op het AIMI klantenportaal." },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/login` }],
  }),
  component: LoginPage,
});

function LoginPage() {
  const nav = useNavigate();
  const startFn = useServerFn(loginStart);
  const verifyFn = useServerFn(loginVerifyMfa);
  const resendFn = useServerFn(loginResendMfa);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // MFA-tweede-stap state
  const [pendingToken, setPendingToken] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [resendIn, setResendIn] = useState(0);

  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setInterval(() => setResendIn((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [resendIn]);

  async function applySessionAndGo(session: { access_token: string; refresh_token: string }) {
    const { error } = await supabase.auth.setSession(session);
    if (error) {
      setErr("Sessie kon niet worden ingesteld. Probeer opnieuw.");
      return;
    }
    nav({ to: "/portal" });
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const res = await startFn({ data: { email, password } });
      if (!res.ok) {
        if (res.error === "mfa_not_linked") {
          setErr("MFA is ingeschakeld maar Telegram is niet gekoppeld. Neem contact op met een beheerder.");
        } else {
          setErr("Onjuiste e-mail of wachtwoord.");
        }
        return;
      }
      if (res.mfa) {
        setPendingToken(res.pending_token);
        setResendIn(60);
      } else {
        await applySessionAndGo(res.session);
      }
    } catch {
      setErr("Inloggen is mislukt. Controleer je internetverbinding en probeer het opnieuw.");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    if (!pendingToken) return;
    setErr(null);
    setLoading(true);
    try {
      const res = await verifyFn({ data: { pending_token: pendingToken, code } });
      if (!res.ok) {
        if (res.error === "pending_expired") {
          setErr("Je inlogpoging is verlopen. Log opnieuw in.");
          setPendingToken(null);
          setCode("");
        } else {
          setErr("Onjuiste of verlopen code. Probeer het opnieuw.");
        }
        return;
      }
      await applySessionAndGo(res.session);
    } catch {
      setErr("Verifiëren is mislukt. Controleer je internetverbinding en probeer het opnieuw.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    if (!pendingToken || resendIn > 0) return;
    setErr(null);
    try {
      const res = await resendFn({ data: { pending_token: pendingToken } });
      if (!res.ok) {
        if (res.error === "rate_limited") {
          setResendIn(res.retry_after ?? 60);
        } else if (res.error === "pending_expired") {
          setErr("Je inlogpoging is verlopen. Log opnieuw in.");
          setPendingToken(null);
        } else {
          setErr("Nieuwe code versturen is mislukt.");
        }
        return;
      }
      setResendIn(60);
    } catch {
      setErr("Nieuwe code versturen is mislukt.");
    }
  }

  return (
    <main id="main-content" className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
          ← Terug naar site
        </Link>
        <div className="mt-6 rounded-2xl border border-border bg-card p-8">
          <h1 className="font-display text-3xl font-bold">Klantenportaal</h1>

          {!pendingToken ? (
            <>
              <p className="mt-2 text-sm text-muted-foreground">
                Log in met de gegevens die je van ons hebt ontvangen.
              </p>
              <form onSubmit={handleLogin} className="mt-6 space-y-4">
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Wachtwoord</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
                {err && (
                  <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                    {err}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
                >
                  {loading ? "Bezig…" : "Inloggen"}
                </button>
              </form>
              <p className="mt-6 text-xs text-muted-foreground">
                Nog geen account? Neem contact op via de homepage. wij maken je account aan.
              </p>
            </>
          ) : (
            <>
              <p className="mt-2 text-sm text-muted-foreground">
                Voer de 6-cijferige code in die we via Telegram hebben gestuurd.
              </p>
              <form onSubmit={handleVerify} className="mt-6 space-y-4">
                <div>
                  <label className="text-sm font-medium">Telegram-code</label>
                  <input
                    inputMode="numeric"
                    pattern="\d{6}"
                    maxLength={6}
                    required
                    autoFocus
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-center text-lg tracking-[0.4em]"
                    placeholder="000000"
                  />
                </div>
                {err && (
                  <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                    {err}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={loading || code.length !== 6}
                  className="w-full rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
                >
                  {loading ? "Bezig…" : "Verifiëren"}
                </button>
              </form>
              <div className="mt-4 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendIn > 0}
                  className="text-muted-foreground hover:text-foreground disabled:opacity-50"
                >
                  {resendIn > 0 ? `Nieuwe code over ${resendIn}s` : "Nieuwe code versturen"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPendingToken(null);
                    setCode("");
                    setErr(null);
                  }}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Annuleren
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
