import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  adminListDeletedChanges,
  adminRestoreChange,
  adminHardDeleteChange,
} from "@/lib/admin.functions";
import { usePermissions } from "@/hooks/use-permissions";
import { useConfirm } from "@/components/ConfirmDialog";
import { STATUS_LABEL } from "@/lib/status";

export function DeletedChangesTab() {
  const perms = usePermissions();
  const { confirm } = useConfirm();
  const qc = useQueryClient();
  const listFn = useServerFn(adminListDeletedChanges);
  const restoreFn = useServerFn(adminRestoreChange);
  const hardFn = useServerFn(adminHardDeleteChange);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-deleted-changes"],
    queryFn: () => listFn({}),
  });
  const inv = () => {
    qc.invalidateQueries({ queryKey: ["admin-deleted-changes"] });
    qc.invalidateQueries({ queryKey: ["admin-overview"] });
  };
  const restoreM = useMutation({ mutationFn: (id: string) => restoreFn({ data: { id } }), onSuccess: inv });
  const hardM = useMutation({ mutationFn: (id: string) => hardFn({ data: { id } }), onSuccess: inv });

  if (isLoading) return <p className="text-muted-foreground">Laden…</p>;
  const items = data?.items ?? [];

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Verwijderde changes. Klanten zien deze niet meer.
        {perms.isSuperAdmin && " Als super-admin kun je ze herstellen of definitief wissen."}
      </p>
      {items.length === 0 && (
        <p className="text-sm text-muted-foreground">Geen verwijderde changes.</p>
      )}
      {items.map((r: any) => (
        <div key={r.id} className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
          <div className="flex justify-between items-start gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">
                #{r.request_number} · {r.customer?.email ?? r.user_id} ·{" "}
                verwijderd op {new Date(r.deleted_at).toLocaleString("nl-NL")}
              </p>
              <h3 className="font-semibold mt-1">{r.title}</h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{r.description}</p>
              <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full bg-muted">
                {STATUS_LABEL[r.status] ?? r.status}
              </span>
            </div>
            {perms.isSuperAdmin && (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => restoreM.mutate(r.id)}
                  className="rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground"
                >
                  ↩ Herstel
                </button>
                <button
                  onClick={async () => {
                    if (await confirm({ title: "Permanent wissen", description: `Definitief verwijderen van "${r.title}"? Dit kan NIET ongedaan worden gemaakt.`, destructive: true, confirmLabel: "Permanent wissen" })) {
                      hardM.mutate(r.id);
                    }
                  }}
                  className="rounded-full border border-destructive px-3 py-1 text-xs text-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  Permanent wissen
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
