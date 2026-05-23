import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { setupFirstAdmin, adminExists } from "@/lib/setup.functions";

export const Route = createFileRoute("/setup-admin")({
  head: () => ({
    meta: [
      { title: "Setup admin — AIMI" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SetupPage,
});

function SetupPage() {
  const check = useServerFn(adminExists);
  const setup = useServerFn(setupFirstAdmin);
  const nav = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-exists"],
    queryFn: () => check({}),
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Laden…</div>;
  }

  if (data?.exists) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="font-display text-3xl font-bold">Setup al voltooid</h1>
          <p className="mt-2 text-muted-foreground">
            Er bestaat al een admin. Log gewoon in.
          </p>
          <Link to="/login" className="mt-6 inline-block rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground">
            Naar inloggen
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8">
        <h1 className="font-display text-3xl font-bold">Eerste admin aanmaken</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Eenmalige setup. Deze pagina werkt alleen zolang er nog geen admin bestaat.
        </p>
        <form
          className="mt-6 space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            setErr(null);
            setBusy(true);
            try {
              await setup({ data: { email, password, full_name: fullName } });
              nav({ to: "/login" });
            } catch (e: any) {
              setErr(e.message ?? String(e));
            } finally {
              setBusy(false);
            }
          }}
        >
          <Field label="Naam" value={fullName} onChange={setFullName} required />
          <Field label="Email" type="email" value={email} onChange={setEmail} required />
          <Field label="Wachtwoord (min. 8 tekens)" type="password" value={password} onChange={setPassword} required />
          {err && <p className="text-sm text-destructive">{err}</p>}
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-50"
          >
            {busy ? "Bezig…" : "Admin aanmaken"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({
  label, value, onChange, type = "text", required,
}: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <label className="block text-sm">
      <span className="font-medium">{label}</span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
      />
    </label>
  );
}
