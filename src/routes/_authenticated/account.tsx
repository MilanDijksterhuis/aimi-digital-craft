import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getMyDashboard, updateMyProfile } from "@/lib/portal.functions";

export const Route = createFileRoute("/_authenticated/account")({
  head: () => ({ meta: [{ title: "Mijn gegevens — AIMI" }, { name: "robots", content: "noindex" }] }),
  component: AccountPage,
});

function AccountPage() {
  const fetchDash = useServerFn(getMyDashboard);
  const updateProfile = useServerFn(updateMyProfile);
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["dashboard"], queryFn: () => fetchDash({}) });
  const m = useMutation({
    mutationFn: (i: any) => updateProfile({ data: i }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["dashboard"] }),
  });

  const [f, setF] = useState({
    full_name: "", company: "", phone: "", contact_person: "",
    address: "", billing_address: "", kvk: "", btw: "",
  });

  useEffect(() => {
    if (data?.profile) {
      setF({
        full_name: data.profile.full_name ?? "",
        company: data.profile.company ?? "",
        phone: data.profile.phone ?? "",
        contact_person: data.profile.contact_person ?? "",
        address: data.profile.address ?? "",
        billing_address: data.profile.billing_address ?? "",
        kvk: data.profile.kvk ?? "",
        btw: data.profile.btw ?? "",
      });
    }
  }, [data?.profile]);

  if (isLoading) return <p className="text-muted-foreground">Laden…</p>;

  const fields: [keyof typeof f, string][] = [
    ["full_name", "Naam"],
    ["company", "Bedrijf"],
    ["contact_person", "Contactpersoon"],
    ["phone", "Telefoon"],
    ["address", "Adres"],
    ["billing_address", "Factuuradres"],
    ["kvk", "KVK-nummer"],
    ["btw", "BTW-nummer"],
  ];

  return (
    <div className="space-y-8 max-w-3xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-semibold">Mijn gegevens</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Houd je bedrijfs- en factuurgegevens up-to-date.
          </p>
        </div>
        <Link to="/portal" className="text-sm text-muted-foreground hover:text-primary">
          ← Terug naar portaal
        </Link>
      </div>

      <section className="rounded-lg border border-border bg-card p-6">
        <div className="grid sm:grid-cols-2 gap-4">
          {fields.map(([k, label]) => (
            <label key={k} className="block text-sm">
              <span className="text-muted-foreground text-xs">{label}</span>
              <input
                value={f[k]}
                onChange={(e) => setF({ ...f, [k]: e.target.value })}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </label>
          ))}
        </div>
        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={() => m.mutate(f)}
            disabled={m.isPending}
            className="btn-primary"
          >
            {m.isPending ? "Bezig…" : "Opslaan"}
          </button>
          {m.isSuccess && <span className="text-sm text-primary">Opgeslagen ✓</span>}
          {m.error && <span className="text-sm text-destructive">{(m.error as Error).message}</span>}
        </div>
      </section>
    </div>
  );
}
