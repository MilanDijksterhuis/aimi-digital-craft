import { createFileRoute } from "@tanstack/react-router";
import { timingSafeEqual } from "node:crypto";
import { expireBlockedAccountsImpl } from "@/lib/accounts.server";

// Beveiliging: dit endpoint muteert data (accounts blokkeren) en mag niet
// publiek aanroepbaar zijn. CRON_SECRET is verplicht — ontbreekt het, dan
// weigert het endpoint elk verzoek (fail-closed) in plaats van open te staan.
function timingSafeStringEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

function isAuthorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    console.error(
      "[security] CRON_SECRET is niet ingesteld — expire-accounts weigert alle verzoeken totdat dit is geconfigureerd.",
    );
    return false;
  }
  const auth = request.headers.get("authorization");
  const bearer = auth?.startsWith("Bearer ") ? auth.slice(7).trim() : null;
  const headerSecret = request.headers.get("x-cron-secret");
  return (
    (bearer !== null && timingSafeStringEqual(bearer, secret)) ||
    (headerSecret !== null && timingSafeStringEqual(headerSecret, secret))
  );
}

export const Route = createFileRoute("/api/public/hooks/expire-accounts")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!isAuthorized(request)) {
          console.warn("[security] expire-accounts geweigerd: ongeldige of ontbrekende cron-secret.");
          return new Response(JSON.stringify({ ok: false, error: "Unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
          });
        }
        try {
          const result = await expireBlockedAccountsImpl();
          return new Response(JSON.stringify({ ok: true, ...result }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (e: any) {
          console.error("[expire-accounts] mislukt:", e?.message ?? e);
          return new Response(JSON.stringify({ ok: false, error: "Internal error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
