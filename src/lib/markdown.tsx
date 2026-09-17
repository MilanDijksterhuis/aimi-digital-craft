import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

/** Kleine markdown-renderer voor blogcontent (geen dependency nodig voor een
 * beperkte set constructies: ## kopjes, alinea's, bullet/genummerde lijsten,
 * **vet**, *cursief*, [links](/pad) en ![alt](/pad) afbeeldingen. Interne
 * links (beginnen met "/") gebruiken de router-Link, externe links openen in
 * een nieuw tabblad. */

const INLINE_RE = /!\[([^\]]*)\]\(([^)]+)\)|\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g;

function parseInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let i = 0;
  let match: RegExpExecArray | null;
  INLINE_RE.lastIndex = 0;

  while ((match = INLINE_RE.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const key = `${keyPrefix}-${i++}`;
    if (match[1] !== undefined) {
      // ![alt](src)
      nodes.push(
        <img
          key={key}
          src={match[2]}
          alt={match[1]}
          loading="lazy"
          className="w-full rounded-lg"
        />,
      );
    } else if (match[3] !== undefined) {
      const href = match[4];
      if (href.startsWith("/")) {
        nodes.push(
          <Link
            key={key}
            to={href}
            className="underline underline-offset-4 transition-colors hover:text-white"
            style={{ color: "#a4a9b2" }}
          >
            {match[3]}
          </Link>,
        );
      } else {
        nodes.push(
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noopener"
            className="underline underline-offset-4 transition-colors hover:text-white"
            style={{ color: "#a4a9b2" }}
          >
            {match[3]}
          </a>,
        );
      }
    } else if (match[5] !== undefined) {
      nodes.push(
        <strong key={key} className="font-medium" style={{ color: "#ffffff" }}>
          {match[5]}
        </strong>,
      );
    } else if (match[6] !== undefined) {
      nodes.push(<em key={key}>{match[6]}</em>);
    }
    lastIndex = INLINE_RE.lastIndex;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

/** Schatting van de leestijd op basis van woordaantal (±200 wpm), zodat dit
 * niet los van de content handmatig bijgehouden hoeft te worden. */
export const estimateReadTime = (content: string): string => {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min leestijd`;
};

export function MarkdownBody({ content }: { content: string }) {
  const blocks = content
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean);

  return (
    <>
      {blocks.map((block, bi) => {
        const lines = block.split("\n").map((l) => l.trim());

        if (block.startsWith("## ")) {
          return (
            <h2
              key={bi}
              className="text-white pt-4"
              style={{
                fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
                fontSize: "1.4rem",
                fontWeight: 400,
                letterSpacing: "-0.01em",
              }}
            >
              {parseInline(block.slice(3), `h-${bi}`)}
            </h2>
          );
        }

        if (lines.every((l) => /^-\s+/.test(l))) {
          return (
            <ul key={bi} className="list-disc pl-5 space-y-2">
              {lines.map((l, li) => (
                <li key={li}>{parseInline(l.replace(/^-\s+/, ""), `ul-${bi}-${li}`)}</li>
              ))}
            </ul>
          );
        }

        if (lines.every((l) => /^\d+\.\s+/.test(l))) {
          return (
            <ol key={bi} className="list-decimal pl-5 space-y-2">
              {lines.map((l, li) => (
                <li key={li}>{parseInline(l.replace(/^\d+\.\s+/, ""), `ol-${bi}-${li}`)}</li>
              ))}
            </ol>
          );
        }

        return (
          <p key={bi}>
            {lines.map((l, li) => (
              <span key={li}>
                {li > 0 && <br />}
                {parseInline(l, `p-${bi}-${li}`)}
              </span>
            ))}
          </p>
        );
      })}
    </>
  );
}
