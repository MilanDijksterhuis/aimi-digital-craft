import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, ArrowDownLeft, ArrowUpRight, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { adminGetPostLinks, adminSuggestLinkTargets } from "@/lib/blog.functions";

/** Toont inkomende/uitgaande interne links (met broken-link-badges) en
 * eenvoudige link-suggesties voor een bestaande post. Alleen zinvol na de
 * eerste save (nieuwe posts hebben nog geen id). */
export function BlogPostLinksPanel({
  postId,
  onSuggestionPick,
}: {
  postId: string;
  onSuggestionPick: (target: { title: string; path: string }) => void;
}) {
  const getLinks = useServerFn(adminGetPostLinks);
  const { data: linksData, isLoading: linksLoading } = useQuery({
    queryKey: ["admin-post-links", postId],
    queryFn: () => getLinks({ data: { id: postId } }),
  });

  const getSuggestions = useServerFn(adminSuggestLinkTargets);
  const { data: suggestionsData } = useQuery({
    queryKey: ["admin-post-link-suggestions", postId],
    queryFn: () => getSuggestions({ data: { id: postId } }),
  });

  const outgoing = linksData?.outgoing ?? [];
  const incoming = linksData?.incoming ?? [];
  const suggestions = suggestionsData?.suggestions ?? [];
  const brokenCount = outgoing.filter((l: any) => l.broken).length;

  return (
    <div className="p-6 space-y-5 border-b border-border">
      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Interne links
      </span>

      {linksLoading ? (
        <p className="text-sm text-muted-foreground">Laden…</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-6 text-sm">
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> Uitgaand ({outgoing.length})
            </p>
            {outgoing.length === 0 ? (
              <p className="text-xs text-muted-foreground">Nog geen interne links in deze post.</p>
            ) : (
              <ul className="space-y-1.5">
                {outgoing.map((l: any) => (
                  <li key={l.id} className="flex items-center gap-1.5">
                    {l.broken && (
                      <AlertTriangle className="w-3.5 h-3.5 text-destructive shrink-0" />
                    )}
                    <span className={l.broken ? "text-destructive" : ""}>{l.anchor_text}</span>
                    <span className="text-xs text-muted-foreground truncate">
                      → {l.to_page_path ?? `/blog/${l.to_post_slug}`}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            {brokenCount > 0 && (
              <p className="mt-2 text-xs text-destructive">
                {brokenCount} link(s) verwijzen naar een verwijderde of gedepubliceerde post.
              </p>
            )}
          </div>

          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
              <ArrowDownLeft className="w-3.5 h-3.5" /> Inkomend ({incoming.length})
            </p>
            {incoming.length === 0 ? (
              <p className="text-xs text-muted-foreground">
                Nog geen andere posts linken hierheen.
              </p>
            ) : (
              <ul className="space-y-1.5">
                {incoming.map((l: any) => (
                  <li key={l.id}>
                    <Link
                      to="/admin/blog/$postId"
                      params={{ postId: l.from_post_id }}
                      className="hover:text-primary underline underline-offset-2"
                    >
                      {l.from_title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {suggestions.length > 0 && (
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Suggesties (gedeelde tags/zoekwoorden)
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s: any) => (
              <button
                key={s.id}
                type="button"
                onClick={() => onSuggestionPick({ title: s.title, path: `/blog/${s.slug}` })}
                className="text-xs px-2.5 py-1 rounded-full border border-border hover:border-primary/40 hover:text-primary transition-colors"
              >
                + {s.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
