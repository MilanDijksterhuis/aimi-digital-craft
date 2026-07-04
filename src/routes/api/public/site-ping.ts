import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { z } from "zod";

const Body = z.object({
  user_id: z.string().uuid(),
  status_ok: z.boolean().optional().default(true),
  response_ms: z.number().int().min(0).max(60000).optional(),
});

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const Route = createFileRoute("/api/public/site-ping")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: cors }),
      POST: async ({ request }) => {
        try {
          const body = Body.parse(await request.json());

          // Schrijf altijd naar site_response_times (response_ms mag null zijn na migratie)
          try {
            await supabaseAdmin.from("site_response_times" as any).insert({
              user_id: body.user_id,
              response_ms: body.response_ms ?? null,
              status_ok: body.status_ok,
            });
          } catch { /* ignore */ }

          // Behoud site_pings voor backward compat
          await supabaseAdmin.from("site_pings").insert({
            user_id: body.user_id,
            status_ok: body.status_ok,
            response_ms: body.response_ms ?? null,
          });

          // Alert als response time > 3000ms
          if (body.response_ms !== undefined && body.response_ms > 3000) {
            // Controleer of er al een actieve response_time alert is voor deze klant (max 1 per uur)
            const since1h = new Date(Date.now() - 3600000).toISOString();
            const { data: existing } = await supabaseAdmin
              .from("monitoring_alerts" as any)
              .select("id")
              .eq("user_id", body.user_id)
              .eq("type", "response_time")
              .is("archived_at", null)
              .gte("created_at", since1h)
              .limit(1)
              .maybeSingle();

            if (!existing) {
              await supabaseAdmin.from("monitoring_alerts" as any).insert({
                user_id: body.user_id,
                type: "response_time",
                severity: "warning",
                message: `Hoge response time: ${body.response_ms}ms (limiet: 3000ms)`,
              });
            }
          }

          // Alert als uptime < 95% in afgelopen 24u
          if (!body.status_ok) {
            const since24h = new Date(Date.now() - 86400000).toISOString();
            const { data: recent } = await supabaseAdmin
              .from("site_response_times" as any)
              .select("status_ok")
              .eq("user_id", body.user_id)
              .gte("created_at", since24h)
              .limit(200);

            if (recent && recent.length >= 10) {
              const okCount = (recent as any[]).filter((r: any) => r.status_ok).length;
              const uptimePct = (okCount / recent.length) * 100;
              if (uptimePct < 95) {
                const since1h = new Date(Date.now() - 3600000).toISOString();
                const { data: existing } = await supabaseAdmin
                  .from("monitoring_alerts" as any)
                  .select("id")
                  .eq("user_id", body.user_id)
                  .eq("type", "uptime")
                  .is("archived_at", null)
                  .gte("created_at", since1h)
                  .limit(1)
                  .maybeSingle();

                if (!existing) {
                  await supabaseAdmin.from("monitoring_alerts" as any).insert({
                    user_id: body.user_id,
                    type: "uptime",
                    severity: "critical",
                    message: `Uptime gedaald naar ${uptimePct.toFixed(1)}% in de afgelopen 24 uur`,
                  });
                }
              }
            }
          }

          return new Response(JSON.stringify({ ok: true }), {
            status: 200,
            headers: { "Content-Type": "application/json", ...cors },
          });
        } catch (e: any) {
          return new Response(JSON.stringify({ error: e.message }), {
            status: 400,
            headers: { "Content-Type": "application/json", ...cors },
          });
        }
      },
    },
  },
});
