import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Trash2, Plus } from "lucide-react";
import {
  adminListRedirects,
  adminCreateRedirect,
  adminDeleteRedirect,
} from "@/lib/redirects.functions";

const inputCls =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary";

/** Beheer van 301-redirects (punt 12): losstaand van de blog-post-flow zodat
 * ook redirects voor niet-blog-URL's (bv. bij een herstructurering) hier
 * kunnen. Slug-wijzigingen op gepubliceerde posts vullen deze tabel ook
 * automatisch (zie blog.server.ts syncSlugRedirect). */
export function RedirectsPanel() {
  const qc = useQueryClient();
  const list = useServerFn(adminListRedirects);
  const { data, isLoading } = useQuery({ queryKey: ["admin-redirects"], queryFn: () => list({}) });

  const createFn = useServerFn(adminCreateRedirect);
  const deleteFn = useServerFn(adminDeleteRedirect);

  const [fromPath, setFromPath] = useState("");
  const [toPath, setToPath] = useState("");

  const createM = useMutation({
    mutationFn: () => createFn({ data: { from_path: fromPath.trim(), to_path: toPath.trim() } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-redirects"] });
      setFromPath("");
      setToPath("");
      toast.success("Redirect aangemaakt.");
    },
    onError: (e: any) => toast.error(e.message),
  });

  const deleteM = useMutation({
    mutationFn: (id: string) => deleteFn({ data: { id } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-redirects"] });
      toast.success("Redirect verwijderd.");
    },
    onError: (e: any) => toast.error(e.message),
  });

  const redirects = data?.redirects ?? [];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Redirects ({redirects.length})</h2>
      <p className="text-sm text-muted-foreground">
        301-redirects van een oude naar een nieuwe URL. Wordt ook automatisch aangevuld bij een
        slug-wijziging van een gepubliceerde post.
      </p>

      <div className="rounded-lg border border-border p-4 flex flex-wrap items-end gap-3">
        <label className="block flex-1 min-w-[180px]">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Van
          </span>
          <input
            value={fromPath}
            onChange={(e) => setFromPath(e.target.value)}
            placeholder="/blog/oude-slug"
            className={`${inputCls} mt-1.5`}
          />
        </label>
        <label className="block flex-1 min-w-[180px]">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Naar
          </span>
          <input
            value={toPath}
            onChange={(e) => setToPath(e.target.value)}
            placeholder="/blog/nieuwe-slug"
            className={`${inputCls} mt-1.5`}
          />
        </label>
        <button
          onClick={() => createM.mutate()}
          disabled={
            createM.isPending || !fromPath.trim().startsWith("/") || !toPath.trim().startsWith("/")
          }
          className="btn-primary text-sm px-4 inline-flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Toevoegen
        </button>
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Laden…</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/30 text-muted-foreground">
              <tr>
                <th className="text-left p-3">Van</th>
                <th className="text-left p-3">Naar</th>
                <th className="text-left p-3">Aangemaakt</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {redirects.map((r: any) => (
                <tr key={r.id} className="border-t border-border">
                  <td className="p-3 font-mono text-xs">{r.from_path}</td>
                  <td className="p-3 font-mono text-xs">{r.to_path}</td>
                  <td className="p-3 text-xs text-muted-foreground">
                    {new Date(r.created_at).toLocaleDateString("nl-NL")}
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => deleteM.mutate(r.id)}
                      className="text-xs text-muted-foreground hover:text-destructive inline-flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Verwijder
                    </button>
                  </td>
                </tr>
              ))}
              {redirects.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-muted-foreground">
                    Nog geen redirects.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
