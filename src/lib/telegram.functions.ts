import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { randomBytes } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { ensureAdmin } from "./auth-guards.server";

// ===========================================================================
// Admin: koppelen / ontkoppelen / MFA-toggle van admin-accounts
// ===========================================================================

export const adminGenerateTelegramLink = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ user_id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { generateLinkToken } = await import("./telegram.server");
    const { deepLink } = await generateLinkToken({ scope: "profile", profileId: data.user_id });
    return { deepLink };
  });

// Lichte poll-endpoint: geeft de koppel/MFA-status van één account terug.
export const adminGetTelegramStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ user_id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { data: p } = await supabaseAdmin
      .from("profiles")
      .select("telegram_chat_id, telegram_username, telegram_linked_at, mfa_enabled")
      .eq("id", data.user_id)
      .maybeSingle();
    const row = (p ?? {}) as any;
    return {
      linked: !!row.telegram_chat_id,
      username: row.telegram_username ?? null,
      linked_at: row.telegram_linked_at ?? null,
      mfa_enabled: !!row.mfa_enabled,
    };
  });

export const adminUnlinkTelegram = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ user_id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    // Ontkoppelen zet MFA automatisch uit — anders zou het account niet meer
    // kunnen inloggen (geen chat_id = geen code).
    const { error } = await supabaseAdmin
      .from("profiles")
      .update({
        telegram_chat_id: null,
        telegram_username: null,
        telegram_linked_at: null,
        mfa_enabled: false,
      } as any)
      .eq("id", data.user_id);
    if (error) throw new Error(error.message);
    await supabase.from("audit_log").insert({
      user_id: userId,
      action: "telegram_unlinked",
      target_type: "user",
      target_id: data.user_id,
      details: {},
    });
    return { ok: true };
  });

export const adminSetMfaEnabled = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ user_id: z.string().uuid(), enabled: z.boolean() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);

    // MFA kan alleen aan als er een chat_id gekoppeld is (server-side afgedwongen,
    // niet alleen in de UI).
    if (data.enabled) {
      const { data: p } = await supabaseAdmin
        .from("profiles")
        .select("telegram_chat_id")
        .eq("id", data.user_id)
        .maybeSingle();
      if (!(p as any)?.telegram_chat_id) {
        throw new Error("Koppel eerst Telegram voordat je MFA inschakelt.");
      }
    }

    const { error } = await supabaseAdmin
      .from("profiles")
      .update({ mfa_enabled: data.enabled } as any)
      .eq("id", data.user_id);
    if (error) throw new Error(error.message);
    await supabase.from("audit_log").insert({
      user_id: userId,
      action: data.enabled ? "mfa_enabled" : "mfa_disabled",
      target_type: "user",
      target_id: data.user_id,
      details: {},
    });
    return { ok: true };
  });

// ===========================================================================
// Admin: notificatie-ontvangers (contactformulier)
// ===========================================================================

export const adminListRecipients = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { data, error } = await supabaseAdmin
      .from("telegram_notification_recipients" as any)
      .select("*")
      .order("created_at", { ascending: true });
    if (error) throw new Error(error.message);
    return { items: (data ?? []) as any[] };
  });

export const adminCreateRecipient = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({ label: z.string().trim().min(1).max(100), telegram_username: z.string().trim().max(100).optional() }).parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { data: row, error } = await supabaseAdmin
      .from("telegram_notification_recipients" as any)
      .insert({ label: data.label, telegram_username: data.telegram_username || null })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { id: (row as any).id as string };
  });

export const adminGenerateRecipientLink = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { generateLinkToken } = await import("./telegram.server");
    const { deepLink } = await generateLinkToken({ scope: "recipient", recipientId: data.id });
    return { deepLink };
  });

export const adminToggleRecipient = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid(), active: z.boolean() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { error } = await supabaseAdmin
      .from("telegram_notification_recipients" as any)
      .update({ active: data.active })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminSetRecipientNotify = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z
      .object({
        id: z.string().uuid(),
        notify_contact_form: z.boolean().optional(),
        notify_new_changes: z.boolean().optional(),
      })
      .parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const patch: Record<string, boolean> = {};
    if (data.notify_contact_form !== undefined) patch.notify_contact_form = data.notify_contact_form;
    if (data.notify_new_changes !== undefined) patch.notify_new_changes = data.notify_new_changes;
    if (Object.keys(patch).length === 0) return { ok: true };
    const { error } = await supabaseAdmin
      .from("telegram_notification_recipients" as any)
      .update(patch)
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminDeleteRecipient = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { error } = await supabaseAdmin
      .from("telegram_notification_recipients" as any)
      .delete()
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ===========================================================================
// Login-flow met MFA
//
// Deze functies draaien ZONDER auth-middleware: de gebruiker is nog niet
// ingelogd. De wachtwoord-check gebeurt server-side met de anon-client zodat we
// bij een MFA-account de sessie kunnen achterhouden tot de code klopt. De echte
// access/refresh-tokens gaan pas naar de client na geslaagde MFA-verificatie.
//
// Rate limiting loopt via de globale middleware (server.ts, general POST-limiet).
// ===========================================================================

function anonClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error("Supabase-omgevingsvariabelen ontbreken.");
  return createClient(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });
}

export const loginStart = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z.object({ email: z.string().trim().email().max(255), password: z.string().min(1).max(200) }).parse(d),
  )
  .handler(async ({ data }) => {
    const { data: auth, error } = await anonClient().auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (error || !auth.session || !auth.user) {
      // Neutrale foutmelding — geen onderscheid tussen "onbekend account" en
      // "fout wachtwoord".
      return { ok: false as const, error: "invalid_credentials" };
    }

    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("mfa_enabled, telegram_chat_id")
      .eq("id", auth.user.id)
      .maybeSingle();

    const mfaEnabled = !!(profile as any)?.mfa_enabled;

    if (!mfaEnabled) {
      // Geen MFA → sessie direct teruggeven, precies zoals vroeger.
      return {
        ok: true as const,
        mfa: false as const,
        session: { access_token: auth.session.access_token, refresh_token: auth.session.refresh_token },
      };
    }

    // MFA aan maar geen Telegram gekoppeld → fail closed (kan geen code sturen).
    if (!(profile as any)?.telegram_chat_id) {
      return { ok: false as const, error: "mfa_not_linked" };
    }

    // Stash de reeds-geverifieerde sessie server-side; de client krijgt alleen
    // een random pending-token.
    const pendingToken = randomBytes(32).toString("base64url");
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();
    await supabaseAdmin.from("telegram_pending_logins" as any).insert({
      profile_id: auth.user.id,
      pending_token: pendingToken,
      access_token: auth.session.access_token,
      refresh_token: auth.session.refresh_token,
      expires_at: expiresAt,
    });

    const { generateAndSendMfaCode } = await import("./telegram.server");
    const sendResult = await generateAndSendMfaCode(auth.user.id);
    if (!sendResult.sent && sendResult.reason === "not_linked") {
      return { ok: false as const, error: "mfa_not_linked" };
    }

    return { ok: true as const, mfa: true as const, pending_token: pendingToken };
  });

export const loginVerifyMfa = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z.object({ pending_token: z.string().min(10).max(200), code: z.string().trim().regex(/^\d{6}$/) }).parse(d),
  )
  .handler(async ({ data }) => {
    const { data: pending } = await supabaseAdmin
      .from("telegram_pending_logins" as any)
      .select("*")
      .eq("pending_token", data.pending_token)
      .maybeSingle();

    const p = pending as any;
    if (!p || p.used_at || new Date(p.expires_at).getTime() < Date.now()) {
      return { ok: false as const, error: "pending_expired" };
    }

    const { verifyMfaCode } = await import("./telegram.server");
    const valid = await verifyMfaCode(p.profile_id, data.code);
    if (!valid) return { ok: false as const, error: "invalid_code" };

    await supabaseAdmin
      .from("telegram_pending_logins" as any)
      .update({ used_at: new Date().toISOString() })
      .eq("id", p.id);

    return {
      ok: true as const,
      session: { access_token: p.access_token, refresh_token: p.refresh_token },
    };
  });

export const loginResendMfa = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ pending_token: z.string().min(10).max(200) }).parse(d))
  .handler(async ({ data }) => {
    const { data: pending } = await supabaseAdmin
      .from("telegram_pending_logins" as any)
      .select("*")
      .eq("pending_token", data.pending_token)
      .maybeSingle();

    const p = pending as any;
    if (!p || p.used_at || new Date(p.expires_at).getTime() < Date.now()) {
      return { ok: false as const, error: "pending_expired" };
    }

    const { generateAndSendMfaCode } = await import("./telegram.server");
    const result = await generateAndSendMfaCode(p.profile_id);
    if (!result.sent && result.retryAfter) {
      return { ok: false as const, error: "rate_limited", retry_after: result.retryAfter };
    }
    if (!result.sent) return { ok: false as const, error: "not_linked" };
    return { ok: true as const };
  });
