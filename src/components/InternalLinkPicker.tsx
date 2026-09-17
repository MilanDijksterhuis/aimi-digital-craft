import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { adminListBlogPosts } from "@/lib/blog.functions";
import { CORE_PAGES } from "@/lib/site-pages";

export type LinkPickTarget = { title: string; path: string };

/** Doorzoekbare lijst van gepubliceerde blogposts + kernpagina's, voor het
 * invoegen van interne links in de blog-editor (punt 1 van de interne-linking-
 * eisen: geen handmatig getypte URL's meer). */
export function InternalLinkPicker({
  open,
  onOpenChange,
  onPick,
  excludePostId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPick: (target: LinkPickTarget) => void;
  excludePostId?: string;
}) {
  const list = useServerFn(adminListBlogPosts);
  const { data } = useQuery({
    queryKey: ["admin-blog-posts"],
    queryFn: () => list({}),
    enabled: open,
  });

  const posts = ((data?.posts ?? []) as any[]).filter(
    (p) => p.status === "published" && p.id !== excludePostId,
  );

  const pick = (target: LinkPickTarget) => {
    onPick(target);
    onOpenChange(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Zoek een blogpost of pagina…" />
      <CommandList>
        <CommandEmpty>Niets gevonden.</CommandEmpty>
        <CommandGroup heading="Blogposts">
          {posts.map((p) => (
            <CommandItem
              key={p.id}
              value={p.title}
              onSelect={() => pick({ title: p.title, path: `/blog/${p.slug}` })}
            >
              {p.title}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Pagina's">
          {CORE_PAGES.map((page) => (
            <CommandItem key={page.path} value={page.title} onSelect={() => pick(page)}>
              {page.title}
              <span className="ml-auto text-xs text-muted-foreground">{page.path}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
