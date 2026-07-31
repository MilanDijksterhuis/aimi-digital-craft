/**
 * Eenmalig setup-script: registreert de Telegram-webhook bij de Bot API.
 * Handmatig draaien NA een deploy op de VPS (niet automatisch).
 *
 * Vereist in de omgeving (.env):
 *   TELEGRAM_BOT_TOKEN      — bot-token van @BotFather
 *   TELEGRAM_WEBHOOK_SECRET — eigen secret; wordt door Telegram als
 *                             X-Telegram-Bot-Api-Secret-Token header meegestuurd
 *
 * Optioneel:
 *   TELEGRAM_WEBHOOK_URL    — publieke webhook-URL
 *                             (default: https://aimi-development.nl/api/telegram/webhook)
 *
 * Draaien:
 *   node --env-file=.env --experimental-strip-types scripts/set-telegram-webhook.ts
 * of transpileer met je bestaande toolchain.
 */

const token = process.env.TELEGRAM_BOT_TOKEN;
const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
const url = process.env.TELEGRAM_WEBHOOK_URL ?? "https://aimi-development.nl/api/telegram/webhook";

async function main() {
  if (!token) throw new Error("TELEGRAM_BOT_TOKEN ontbreekt.");
  if (!secret) throw new Error("TELEGRAM_WEBHOOK_SECRET ontbreekt.");

  const res = await fetch(`https://api.telegram.org/bot${token}/setWebhook`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      url,
      secret_token: secret,
      allowed_updates: ["message"],
      drop_pending_updates: true,
    }),
  });

  const body = await res.json();
  console.log("setWebhook respons:", JSON.stringify(body, null, 2));
  if (!res.ok || !body.ok) {
    process.exit(1);
  }
  console.log(`\n✅ Webhook geregistreerd op: ${url}`);
}

main().catch((err) => {
  console.error("setWebhook mislukt:", err);
  process.exit(1);
});
