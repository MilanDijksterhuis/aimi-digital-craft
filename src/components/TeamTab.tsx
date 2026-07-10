import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  adminListStaff,
  adminInviteStaff,
  adminChangeRole,
  adminRemoveStaff,
  adminGetAuditLog,
} from "@/lib/admin.functions";
import { usePermissions } from "@/hooks/use-permissions";
import { ROLE_LABEL } from "@/lib/rbac";

export function TeamTab() {
  const perms = usePermissions();
  const qc = useQueryClient();
  const listFn = useServerFn(adminListStaff);
  const inviteFn = useServerFn(adminInviteStaff);
  const roleFn = useServerFn(adminChangeRole);
  const removeFn = useServerFn(adminRemoveStaff);
  const auditFn = useServerFn(adminGetAuditLog);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-team"],
    queryFn: () => listFn({}),
  });
  const audit = useQuery({
    queryKey: ["admin-audit"],
    queryFn: () => auditFn({}),
    enabled: perms.isSuperAdmin,
  });

  const inv = () => {
    qc.invalidateQueries({ queryKey: ["admin-team"] });
    qc.invalidateQueries({ queryKey: ["admin-audit"] });
  };
  const inviteM = useMutation({ mutationFn: (i: any) => inviteFn({ data: i }), onSuccess: inv });
  const roleM = useMutation({ mutationFn: (i: any) => roleFn({ data: i }), onSuccess: inv });
  const removeM = useMutation({ mutationFn: (i: any) => removeFn({ data: i }), onSuccess: inv });

  const [form, setForm] = useState({ email: "", full_name: "", role: "co_admin" as any });

  if (!perms.can("view_admin")) return null;
  if (isLoading) return <p className="text-muted-foreground">Laden…</p>;

  return (
    <div className="space-y-6">
      {perms.isSuperAdmin && (
        <section className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-xl font-semibold mb-4">Nieuwe admin/staff toevoegen</h2>
          <form
            className="grid sm:grid-cols-4 gap-3 items-end"
            onSubmit={(e) => {
              e.preventDefault();
              inviteM.mutate(form, {
                onSuccess: () => setForm({ email: "", full_name: "", role: "co_admin" }),
              });
            }}
          >
            <label className="block text-sm">
              <span className="text-muted-foreground">Naam</span>
              <input required value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2" />
            </label>
            <label className="block text-sm">
              <span className="text-muted-foreground">Email</span>
              <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2" />
            </label>
            <label className="block text-sm">
              <span className="text-muted-foreground">Rol</span>
              <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as any })}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2">
                <option value="co_admin">Co-Admin</option>
                <option value="support_agent">Support Agent</option>
                <option value="viewer">Viewer</option>
                <option value="sales">Sales</option>
              </select>
            </label>
            <button
              type="submit"
              disabled={inviteM.isPending}
              className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
            >
              {inviteM.isPending ? "Bezig…" : "Toevoegen"}
            </button>
          </form>
          {inviteM.data && (
            <div className="mt-4 rounded-lg border border-primary/40 bg-primary/5 p-4 text-sm">
              <p className="font-semibold">Account toegevoegd: {inviteM.data.email}</p>
              {inviteM.data.tempPassword && (
                <>
                  <p className="mt-2">Tijdelijk wachtwoord (deel handmatig):</p>
                  <code className="block mt-1 rounded bg-background px-2 py-1 font-mono break-all">
                    {inviteM.data.tempPassword}
                  </code>
                </>
              )}
              {!inviteM.data.tempPassword && (
                <p className="mt-1 text-muted-foreground">Bestaande gebruiker — rol toegekend.</p>
              )}
            </div>
          )}
          {inviteM.error && <p className="mt-3 text-sm text-destructive">{(inviteM.error as Error).message}</p>}
        </section>
      )}

      <section className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="p-4 border-b border-border">
          <h2 className="font-display text-xl font-semibold">Team ({data?.members.length ?? 0})</h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-muted/30 text-muted-foreground">
            <tr>
              <th className="text-left p-3">Naam</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Rollen</th>
              {perms.isSuperAdmin && <th className="text-left p-3">Acties</th>}
            </tr>
          </thead>
          <tbody>
            {(data?.members ?? []).map((m: any) => (
              <tr key={m.id} className="border-t border-border">
                <td className="p-3">{m.full_name || "—"}</td>
                <td className="p-3">{m.email}</td>
                <td className="p-3">
                  {m.roles.map((r: string) => (
                    <span key={r} className="inline-block mr-1 text-xs rounded-full bg-muted px-2 py-0.5">
                      {ROLE_LABEL[r as keyof typeof ROLE_LABEL] ?? r}
                    </span>
                  ))}
                </td>
                {perms.isSuperAdmin && (
                  <td className="p-3 space-x-2 whitespace-nowrap">
                    <select
                      defaultValue=""
                      onChange={(e) => {
                        if (!e.target.value) return;
                        if (confirm(`Rol wijzigen naar ${e.target.value}?`)) {
                          roleM.mutate({ target_user_id: m.id, role: e.target.value });
                        }
                        e.target.value = "";
                      }}
                      className="text-xs rounded-md border border-input bg-background px-2 py-1"
                    >
                      <option value="">Wijzig rol…</option>
                      <option value="super_admin">→ Super Admin</option>
                      <option value="co_admin">→ Co-Admin</option>
                      <option value="support_agent">→ Support Agent</option>
                      <option value="viewer">→ Viewer</option>
                      <option value="customer">→ Klant (demote)</option>
                    </select>
                    <button
                      onClick={() => {
                        if (confirm(`Verwijder ${m.email} als staff? (Wordt klant)`)) {
                          removeM.mutate({ target_user_id: m.id });
                        }
                      }}
                      className="text-xs text-destructive hover:underline"
                    >
                      verwijder
                    </button>
                  </td>
                )}
              </tr>
            ))}
            {(data?.members ?? []).length === 0 && (
              <tr><td colSpan={4} className="p-6 text-center text-muted-foreground">Geen team-leden.</td></tr>
            )}
          </tbody>
        </table>
      </section>

      {perms.isSuperAdmin && (
        <section className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="p-4 border-b border-border">
            <h2 className="font-display text-xl font-semibold">Audit log (laatste 200)</h2>
          </div>
          <div className="max-h-96 overflow-y-auto">
            <table className="w-full text-xs">
              <thead className="bg-muted/30 text-muted-foreground sticky top-0">
                <tr>
                  <th className="text-left p-2">Wanneer</th>
                  <th className="text-left p-2">Wie</th>
                  <th className="text-left p-2">Actie</th>
                  <th className="text-left p-2">Target</th>
                  <th className="text-left p-2">Details</th>
                </tr>
              </thead>
              <tbody>
                {(audit.data?.items ?? []).map((a: any) => (
                  <tr key={a.id} className="border-t border-border">
                    <td className="p-2 whitespace-nowrap">{new Date(a.created_at).toLocaleString("nl-NL")}</td>
                    <td className="p-2">{a.actor?.email ?? a.user_id.slice(0, 8)}</td>
                    <td className="p-2 font-mono">{a.action}</td>
                    <td className="p-2 text-muted-foreground">{a.target_type}{a.target_id ? ` · ${a.target_id.slice(0, 8)}` : ""}</td>
                    <td className="p-2 text-muted-foreground font-mono">{JSON.stringify(a.details)}</td>
                  </tr>
                ))}
                {(audit.data?.items ?? []).length === 0 && (
                  <tr><td colSpan={5} className="p-4 text-center text-muted-foreground">Nog geen activiteit gelogd.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
