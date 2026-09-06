import { createFileRoute } from "@tanstack/react-router";
import { INDEXNOW_KEY } from "@/lib/seo";

/* IndexNow-sleutelbestand: Bing/Yandex/Naver verifiëren siteeigenaarschap door
 * te controleren dat https://aimi-development.nl/{key}.txt exact de key bevat.
 * Zie scripts/indexnow-submit.mjs voor de daadwerkelijke submit-aanroep. */
export const Route = createFileRoute("/b03bb73bce86422c6a74b3cfc829f2dd.txt")({
  server: {
    handlers: {
      GET: async () =>
        new Response(INDEXNOW_KEY, {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        }),
    },
  },
});
