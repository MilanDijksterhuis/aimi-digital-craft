import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Inloggen — AIMI Klantenportaal" },
      { name: "description", content: "Log in op het AIMI klantenportaal." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setErr(error.message);
        return;
      }
      nav({ to: "/portal" });
    } catch {
      // Netwerkfout (bv. fetch mislukt op mobiel) gooit een exception ipv een
      // { error } result — zonder try/catch belandde dit ongevangen in de
      // root error boundary ("This page didn't load") in plaats van een
      // nette inline foutmelding op het inlogformulier zelf.
      setErr("Inloggen is mislukt. Controleer je internetverbinding en probeer het opnieuw.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
          ← Terug naar site
        </Link>
        <div className="mt-6 rounded-2xl border border-border bg-card p-8">
          <h1 className="font-display text-3xl font-bold">Klantenportaal</h1>
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
            Nog geen account? Neem contact op via de homepage — wij maken je account aan.
          </p>
        </div>
      </div>
    </div>
  );
}
