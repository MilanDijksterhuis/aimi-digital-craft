import { createFileRoute } from "@tanstack/react-router";
import { handleTelegramWebhook } from "@/lib/telegram.server";

// Telegram-webhook. Telegram POST't hier binnenkomende updates (o.a. /start
// <token> voor de koppel-flow).
//
// BEVEILIGING: we verifiëren de X-Telegram-Bot-Api-Secret-Token header tegen
// TELEGRAM_WEBHOOK_SECRET (meegegeven bij setWebhook). Zonder geldige header
// weigeren we het request — zo kan niemand anders dan Telegram deze endpoint
// misbruiken om koppelingen te forceren.
//
// We geven ALTIJD 200 OK terug bij een geverifieerd request (ook bij interne
// fouten): Telegram blijft anders eindeloos retryen.

export const Route = createFileRoute("/api/telegram/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
        const provided = request.headers.get("x-telegram-bot-api-secret-token");
        if (!secret || provided !== secret) {
          return new Response(JSON.stringify({ error: "Forbidden" }), {
            status: 403,
            headers: { "Content-Type": "application/json" },
          });
        }

        try {
          const update = await request.json();
          await handleTelegramWebhook(update);
        } catch (err) {
          // Nooit een niet-200 teruggeven aan Telegram — anders blijft het retryen.
          console.error("[telegram] webhook-fout:", err);
        }

        return new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
