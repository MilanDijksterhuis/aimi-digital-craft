import { createFileRoute } from "@tanstack/react-router";
import { expireBlockedAccountsImpl } from "@/lib/accounts.server";

export const Route = createFileRoute("/api/public/hooks/expire-accounts")({
  server: {
    handlers: {
      POST: async () => {
        try {
          const result = await expireBlockedAccountsImpl();
          return new Response(JSON.stringify({ ok: true, ...result }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (e: any) {
          return new Response(JSON.stringify({ ok: false, error: e.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
