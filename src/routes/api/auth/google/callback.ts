import { createFileRoute } from "@tanstack/react-router";
import { exchangeCodeForTokens, saveSetting } from "@/lib/gmail.server";
import { google } from "googleapis";

export const Route = createFileRoute("/api/auth/google/callback")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const code = url.searchParams.get("code");
        const error = url.searchParams.get("error");

        const adminUrl = `${process.env.VITE_APP_URL ?? ""}/admin`;

        if (error || !code) {
          return Response.redirect(`${adminUrl}?connector_error=${encodeURIComponent(error ?? "no_code")}`, 302);
        }

        try {
          const tokens = await exchangeCodeForTokens(code);

          // Haal het verbonden Gmail-adres op
          const oauth2 = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
          );
          oauth2.setCredentials(tokens);
          const oauth2Api = google.oauth2({ version: "v2", auth: oauth2 });
          const { data: userInfo } = await oauth2Api.userinfo.get();

          await Promise.all([
            saveSetting("gmail_refresh_token", tokens.refresh_token ?? ""),
            saveSetting("gmail_access_token", tokens.access_token ?? ""),
            saveSetting("gmail_connected_email", userInfo.email ?? ""),
            // Stel standaard afzenderadres in als dat nog niet is ingesteld
          ]);

          // Zet ook standaard from_email als dit de eerste keer is
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const { data: existing } = await supabaseAdmin
            .from("app_settings")
            .select("key")
            .eq("key", "gmail_from_email")
            .maybeSingle();
          if (!existing) {
            await saveSetting("gmail_from_email", userInfo.email ?? "");
          }

          return Response.redirect(`${adminUrl}?connector_success=1`, 302);
        } catch (err: any) {
          console.error("[google-callback]", err);
          return Response.redirect(`${adminUrl}?connector_error=${encodeURIComponent(err.message ?? "unknown")}`, 302);
        }
      },
    },
  },
});
