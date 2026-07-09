import { createFileRoute } from "@tanstack/react-router";
import { expireBlockedAccountsImpl } from "@/lib/accounts.server";

// Beveiliging: dit endpoint muteert data (accounts blokkeren) en mag niet
// publiek aanroepbaar zijn. Als CRON_SECRET is gezet, is een matchende
// Authorization: Bearer <secret> (of x-cron-secret header) verplicht.
// Is CRON_SECRET niet gezet, dan blijft het oude gedrag werken (zodat een
// bestaande cron niet breekt) maar wordt er gewaarschuwd in de logs.
function isAuthorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    console.warn(
      "[security] /api/public/hooks/expire-accounts wordt zonder CRON_SECRET aangeroepen — stel CRON_SECRET in en beveilig de cron.",
    );
    return true;
  }
  const auth = request.headers.get("authorization");
  const bearer = auth?.startsWith("Bearer ") ? auth.slice(7).trim() : null;
  const headerSecret = request.headers.get("x-cron-secret");
  return bearer === secret || headerSecret === secret;
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
