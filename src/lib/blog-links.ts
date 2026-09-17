// Losstaand van blog.server.ts (net als slug.ts) zodat dit ook client-side
// gebruikt kan worden, bv. voor de live SEO-checklist ("minstens één interne
// link aanwezig") zonder een extra roundtrip naar de server.

export type ParsedInternalLink = { anchorText: string; href: string };

// Negative lookbehind sluit afbeeldingen uit (![alt](src) bevat ook [alt](src)).
const LINK_RE = /(?<!!)\[([^\]]+)\]\(([^)]+)\)/g;
const IMAGE_RE = /!\[([^\]]*)\]\(([^)]+)\)/g;

/** Alle interne links (href begint met "/") uit markdown-content, in volgorde. */
export function extractInternalLinks(content: string): ParsedInternalLink[] {
  const links: ParsedInternalLink[] = [];
  let match: RegExpExecArray | null;
  LINK_RE.lastIndex = 0;
  while ((match = LINK_RE.exec(content)) !== null) {
    const href = match[2].trim();
    if (href.startsWith("/")) {
      links.push({ anchorText: match[1], href });
    }
  }
  return links;
}

export function hasInternalLink(content: string): boolean {
  LINK_RE.lastIndex = 0;
  return extractInternalLinks(content).length > 0;
}

/** Aantal `![...](...)`-afbeeldingen in de body zonder (niet-lege) alt-tekst. */
export function countBodyImagesWithoutAlt(content: string): number {
  let count = 0;
  let match: RegExpExecArray | null;
  IMAGE_RE.lastIndex = 0;
  while ((match = IMAGE_RE.exec(content)) !== null) {
    if (!match[1].trim()) count++;
  }
  return count;
}

/** Voegt op een cursorpositie een markdown-link in en geeft de nieuwe content +
 * cursorpositie terug (na de ingevoegde link). */
export function insertMarkdownLink(
  content: string,
  selectionStart: number,
  selectionEnd: number,
  anchorText: string,
  href: string,
): { content: string; cursor: number } {
  const before = content.slice(0, selectionStart);
  const after = content.slice(selectionEnd);
  const snippet = `[${anchorText}](${href})`;
  return { content: before + snippet + after, cursor: before.length + snippet.length };
}
