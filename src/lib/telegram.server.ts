// Telegram-integratie — server-only service.
//
// Twee features bovenop deze module:
//  1. MFA via Telegram voor admin-accounts (koppel-flow + OTP-codes).
//  2. Notificaties naar vaste ontvangers bij contactformulier-inzendingen.
//
// BEVEILIGING:
//  - Het bot-token (TELEGRAM_BOT_TOKEN) blijft uitsluitend server-side. Deze
//    module wordt nooit vanuit client-code geïmporteerd; alle toegang loopt via
//    server functions / server routes.
//  - Alle tabellen zijn service_role-only (zie supabase-telegram-migration.sql).
//  - Koppelcodes, MFA-codes en pending-logins zijn eenmalig en kortlevend.
//
// Belangrijke Telegram-beperking: de Bot API kan geen bericht sturen naar een
// telefoonnummer of @username — alleen naar een chat_id die pas bestaat nadat
// de ontvanger zelf /start naar de bot heeft gestuurd. Vandaar de koppel-flow.

import { randomBytes, randomInt } from "node:crypto";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const TELEGRAM_API = "https://api.telegram.org";

function botToken(): string {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) throw new Error("TELEGRAM_BOT_TOKEN ontbreekt in de omgeving.");
  return token;
}

function botUsername(): string {
  const u = process.env.TELEGRAM_BOT_USERNAME;
  if (!u) throw new Error("TELEGRAM_BOT_USERNAME ontbreekt in de omgeving.");
  return u.replace(/^@/, "");
}

// ---------------------------------------------------------------------------
// Berichten versturen
// ---------------------------------------------------------------------------

/**
 * Stuur een bericht naar een chat_id. Gooit bij een niet-2xx respons zodat de
 * aanroeper kan beslissen of dit blokkerend is (MFA) of fire-and-forget
 * (contactformulier-notificatie).
 */
export async function sendTelegramMessage(chatId: string, text: string): Promise<void> {
  const res = await fetch(`${TELEGRAM_API}/bot${botToken()}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "Markdown",
      disable_web_page_preview: true,
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Telegram sendMessage faalde (${res.status}): ${body.slice(0, 300)}`);
  }
}

// ---------------------------------------------------------------------------
// Koppel-flow (linking)
// ---------------------------------------------------------------------------

type LinkScope = "profile" | "recipient";

/**
 * Genereert een eenmalige koppelcode (15 min geldig) en retourneert de
 * t.me-deeplink die de gebruiker moet openen om de bot te starten.
 *
 * Oude, nog niet gebruikte tokens voor hetzelfde doel worden opgeruimd zodat
 * er hoogstens één actieve koppelcode per doel bestaat.
 */
export async function generateLinkToken(
  target: { scope: "profile"; profileId: string } | { scope: "recipient"; recipientId: string },
): Promise<{ token: string; deepLink: string }> {
  const token = randomBytes(6).toString("base64url"); // 8 tekens, url-safe
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();

  if (target.scope === "profile") {
    await supabaseAdmin
      .from("telegram_link_tokens" as any)
      .delete()
      .eq("scope", "profile")
      .eq("profile_id", target.profileId)
      .is("used_at", null);
    const { error } = await supabaseAdmin.from("telegram_link_tokens" as any).insert({
      scope: "profile",
      profile_id: target.profileId,
      token,
      expires_at: expiresAt,
    });
    if (error) throw new Error(error.message);
  } else {
    await supabaseAdmin
      .from("telegram_link_tokens" as any)
      .delete()
      .eq("scope", "recipient")
      .eq("recipient_id", target.recipientId)
      .is("used_at", null);
    const { error } = await supabaseAdmin.from("telegram_link_tokens" as any).insert({
      scope: "recipient",
      recipient_id: target.recipientId,
      token,
      expires_at: expiresAt,
    });
    if (error) throw new Error(error.message);
  }

  return { token, deepLink: `https://t.me/${botUsername()}?start=${token}` };
}

type TelegramUpdate = {
  message?: {
    text?: string;
    chat?: { id?: number | string };
    from?: { id?: number | string; username?: string };
  };
};

/**
 * Verwerkt een inkomende Telegram-update (webhook). Ondersteunt alleen de
 * `/start <token>`-koppelstap; alle andere berichten worden genegeerd.
 *
 * Faalt nooit hard: Telegram verwacht altijd 200 OK, anders blijft het
 * retryen. Fouten worden gelogd, niet doorgegooid.
 */
export async function handleTelegramWebhook(update: TelegramUpdate): Promise<void> {
  try {
    const message = update?.message;
    const text = message?.text?.trim();
    const chatId = message?.chat?.id;
    if (!text || chatId == null) return;

    const match = /^\/start(?:\s+(\S+))?/.exec(text);
    if (!match) return;

    const token = match[1];
    if (!token) {
      await safeSend(String(chatId), "Stuur de koppellink vanuit het AIMI-portaal om je Telegram te koppelen.");
      return;
    }

    const { data: row } = await supabaseAdmin
      .from("telegram_link_tokens" as any)
      .select("*")
      .eq("token", token)
      .maybeSingle();

    if (!row || (row as any).used_at || new Date((row as any).expires_at).getTime() < Date.now()) {
      await safeSend(String(chatId), "⚠️ Deze koppellink is ongeldig of verlopen. Vraag in het portaal een nieuwe aan.");
      return;
    }

    const username = message?.from?.username ?? null;
    const linkedAt = new Date().toISOString();

    if ((row as any).scope === "recipient") {
      await supabaseAdmin
        .from("telegram_notification_recipients" as any)
        .update({ telegram_chat_id: String(chatId), telegram_username: username, telegram_linked_at: linkedAt })
        .eq("id", (row as any).recipient_id);
    } else {
      await supabaseAdmin
        .from("profiles")
        .update({ telegram_chat_id: String(chatId), telegram_username: username, telegram_linked_at: linkedAt } as any)
        .eq("id", (row as any).profile_id);
    }

    await supabaseAdmin
      .from("telegram_link_tokens" as any)
      .update({ used_at: linkedAt })
      .eq("id", (row as any).id);

    await safeSend(String(chatId), "✅ Telegram gekoppeld aan het AIMI-portaal. Je kunt dit venster sluiten.");
  } catch (err) {
    console.error("[telegram] webhook-verwerking mislukt:", err);
  }
}

async function safeSend(chatId: string, text: string): Promise<void> {
  try {
    await sendTelegramMessage(chatId, text);
  } catch (err) {
    console.error("[telegram] bevestigingsbericht mislukt:", err);
  }
}

// ---------------------------------------------------------------------------
// MFA-codes
// ---------------------------------------------------------------------------

/**
 * Genereert een 6-cijferige MFA-code (5 min geldig), slaat 'm op en stuurt 'm
 * via Telegram. Rate limit: max 1 code per 60 sec per profiel.
 *
 * Retourneert `{ sent: false, retryAfter }` als de rate limit is geraakt, of
 * `{ sent: false, reason: 'not_linked' }` als er geen chat_id gekoppeld is.
 */
export async function generateAndSendMfaCode(
  profileId: string,
): Promise<{ sent: boolean; retryAfter?: number; reason?: "not_linked" }> {
  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("telegram_chat_id")
    .eq("id", profileId)
    .maybeSingle();
  const chatId = (profile as any)?.telegram_chat_id as string | null;
  if (!chatId) return { sent: false, reason: "not_linked" };

  // Rate limit: recentste code < 60s geleden → weiger opnieuw versturen.
  const { data: recent } = await supabaseAdmin
    .from("telegram_mfa_codes" as any)
    .select("created_at")
    .eq("profile_id", profileId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (recent) {
    const elapsed = Date.now() - new Date((recent as any).created_at).getTime();
    if (elapsed < 60 * 1000) {
      return { sent: false, retryAfter: Math.ceil((60 * 1000 - elapsed) / 1000) };
    }
  }

  const code = String(randomInt(0, 1_000_000)).padStart(6, "0");
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

  const { error } = await supabaseAdmin.from("telegram_mfa_codes" as any).insert({
    profile_id: profileId,
    code,
    expires_at: expiresAt,
    attempts: 0,
  });
  if (error) throw new Error(error.message);

  await sendTelegramMessage(
    chatId,
    `🔐 *AIMI portaal* — je inlogcode is:\n\n*${code}*\n\nDeze code is 5 minuten geldig. Deel 'm met niemand.`,
  );
  return { sent: true };
}

/**
 * Verifieert een ingevoerde MFA-code tegen de recentste ongebruikte code.
 * - Verhoogt `attempts` bij een foute poging; blokkeert na 5 pogingen.
 * - Markeert de code als gebruikt bij een match.
 */
export async function verifyMfaCode(profileId: string, code: string): Promise<boolean> {
  const { data: row } = await supabaseAdmin
    .from("telegram_mfa_codes" as any)
    .select("*")
    .eq("profile_id", profileId)
    .is("used_at", null)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!row) return false;
  const r = row as any;

  if (new Date(r.expires_at).getTime() < Date.now()) return false;
  if (r.attempts >= 5) return false;

  if (r.code !== code.trim()) {
    await supabaseAdmin
      .from("telegram_mfa_codes" as any)
      .update({ attempts: r.attempts + 1 })
      .eq("id", r.id);
    return false;
  }

  await supabaseAdmin
    .from("telegram_mfa_codes" as any)
    .update({ used_at: new Date().toISOString() })
    .eq("id", r.id);
  return true;
}
