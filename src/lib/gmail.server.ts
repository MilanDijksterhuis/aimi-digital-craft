import { google } from "googleapis";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

function getOAuth2Client() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI ?? `${process.env.VITE_APP_URL}/api/auth/google/callback`,
  );
}

export function getGoogleAuthUrl(): string {
  const oauth2 = getOAuth2Client();
  return oauth2.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: ["https://mail.google.com/"],
  });
}

export async function exchangeCodeForTokens(code: string) {
  const oauth2 = getOAuth2Client();
  const { tokens } = await oauth2.getToken(code);
  return tokens;
}

export async function getGmailSettings(): Promise<{
  connected: boolean;
  email: string | null;
  from_name: string;
  from_email: string;
  refresh_token: string | null;
  access_token: string | null;
}> {
  const { data: rows } = await supabaseAdmin
    .from("app_settings")
    .select("key, value")
    .in("key", ["gmail_refresh_token", "gmail_access_token", "gmail_connected_email", "gmail_from_email", "gmail_from_name"]);

  const map: Record<string, string> = {};
  (rows ?? []).forEach((r: any) => { map[r.key] = r.value; });

  return {
    connected: !!map["gmail_refresh_token"],
    email: map["gmail_connected_email"] ?? null,
    from_name: map["gmail_from_name"] ?? "AIMI Backoffice",
    from_email: map["gmail_from_email"] ?? (map["gmail_connected_email"] ?? ""),
    refresh_token: map["gmail_refresh_token"] ?? null,
    access_token: map["gmail_access_token"] ?? null,
  };
}

export async function saveSetting(key: string, value: string) {
  await supabaseAdmin
    .from("app_settings")
    .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" });
}

export async function disconnectGmail() {
  await supabaseAdmin
    .from("app_settings")
    .delete()
    .in("key", ["gmail_refresh_token", "gmail_access_token", "gmail_connected_email"]);
}

export async function buildGmailTransporter() {
  const settings = await getGmailSettings();
  if (!settings.connected || !settings.refresh_token) {
    throw new Error("Gmail is niet gekoppeld. Koppel eerst een Google-account in de Connectors.");
  }

  const { default: nodemailer } = await import("nodemailer");
  return {
    transporter: nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2" as const,
        user: settings.email!,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: settings.refresh_token,
        accessToken: settings.access_token ?? undefined,
      },
    }),
    from: `"${settings.from_name}" <${settings.from_email || settings.email}>`,
  };
}
