import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  adminListContactSubmissions,
  adminToggleContactHandled,
  adminDeleteContactSubmission,
} from "@/lib/contact.functions";
import { usePermissions } from "@/hooks/use-permissions";

export function BerichtenTab() {
  const list = useServerFn(adminListContactSubmissions);
  const toggle = useServerFn(adminToggleContactHandled);
  const del = useServerFn(adminDeleteContactSubmission);
  const qc = useQueryClient();
  const perms = usePermissions();

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-contact-submissions"],
    queryFn: () => list({}),
  });

  const inv = () => qc.invalidateQueries({ queryKey: ["admin-contact-submissions"] });
  const toggleM = useMutation({ mutationFn: (i: any) => toggle({ data: i }), onSuccess: inv });
  const delM = useMutation({ mutationFn: (id: string) => del({ data: { id } }), onSuccess: inv });

  if (isLoading) return <p className="text-muted-foreground">Laden…</p>;
  if (error) return <p className="text-destructive">Fout: {(error as Error).message}</p>;

  const subs = data?.submissions ?? [];

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-display text-2xl font-semibold">Contactberichten</h2>
        <p className="text-sm text-muted-foreground">
          Berichten ingestuurd via het contactformulier op de homepage.
        </p>
      </div>

      {subs.length === 0 ? (
        <p className="text-muted-foreground text-sm">Nog geen berichten ontvangen.</p>
      ) : (
        <ul className="space-y-3">
          {subs.map((s: any) => (
            <li
              key={s.id}
              className={`rounded-xl border p-4 ${
                s.handled ? "border-border bg-muted/30 opacity-70" : "border-primary/30 bg-card"
              }`}
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="min-w-0">
                  <p className="font-semibold">
                    {s.name}{" "}
                    <a
                      href={`mailto:${s.email}`}
                      className="text-primary text-sm font-normal hover:underline"
                    >
                      &lt;{s.email}&gt;
                    </a>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(s.created_at).toLocaleString("nl-NL")}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleM.mutate({ id: s.id, handled: !s.handled })}
                    className="text-xs rounded-full border border-border px-3 py-1 hover:bg-accent"
                  >
                    {s.handled ? "Markeer als open" : "Markeer als afgehandeld"}
                  </button>
                  {perms.can("delete_change_hard") && (
                    <button
                      onClick={() => {
                        if (window.confirm("Bericht definitief verwijderen?")) {
                          delM.mutate(s.id);
                        }
                      }}
                      className="text-xs text-destructive hover:underline"
                    >
                      Verwijder
                    </button>
                  )}
                </div>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm">{s.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
