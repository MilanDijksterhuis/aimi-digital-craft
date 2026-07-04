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
          const now = new Date();

          // Rate limit: max 1 meting per 5 minuten per klant in site_response_times
          const since5m = new Date(Date.now() - 5 * 60 * 1000).toISOString();
          const { data: recentRt } = await supabaseAdmin
            .from("site_response_times" as any)
            .select("id")
            .eq("user_id", body.user_id)
            .gte("created_at", since5m)
            .limit(1)
            .maybeSingle();

          if (!recentRt) {
            // Schrijf naar site_response_times (response_ms mag null zijn)
            try {
              await supabaseAdmin.from("site_response_times" as any).insert({
                user_id: body.user_id,
                response_ms: body.response_ms ?? null,
                status_ok: body.status_ok,
              });
            } catch { /* tabel bestaat nog niet */ }

            // Occasionele cleanup: verwijder records ouder dan 7 dagen (1 op 20 kans)
            if (Math.random() < 0.05) {
              const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
              try {
                await supabaseAdmin
                  .from("site_response_times" as any)
                  .delete()
                  .lt("created_at", sevenDaysAgo);
              } catch { /* ignore */ }
            }
          }

          // Altijd site_pings bijhouden (backward compat)
          await supabaseAdmin.from("site_pings").insert({
            user_id: body.user_id,
            status_ok: body.status_ok,
            response_ms: body.response_ms ?? null,
          });

          // Alert: response time > 3000ms (max 1 per uur)
          if (body.response_ms !== undefined && body.response_ms > 3000) {
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

          // Alert: uptime < 95% afgelopen 24u (max 1 per uur)
          if (!body.status_ok) {
            try {
              const since24h = new Date(Date.now() - 86400000).toISOString();
              const { data: recent } = await supabaseAdmin
                .from("site_response_times" as any)
                .select("status_ok")
                .eq("user_id", body.user_id)
                .gte("created_at", since24h)
                .limit(300);
              if (recent && recent.length >= 5) {
                const okCount = (recent as any[]).filter((r: any) => r.status_ok).length;
                const pct = (okCount / recent.length) * 100;
                if (pct < 95) {
                  const since1h = new Date(Date.now() - 3600000).toISOString();
                  const { data: ex2 } = await supabaseAdmin
                    .from("monitoring_alerts" as any)
                    .select("id")
                    .eq("user_id", body.user_id)
                    .eq("type", "uptime")
                    .is("archived_at", null)
                    .gte("created_at", since1h)
                    .limit(1)
                    .maybeSingle();
                  if (!ex2) {
                    await supabaseAdmin.from("monitoring_alerts" as any).insert({
                      user_id: body.user_id,
                      type: "uptime",
                      severity: "critical",
                      message: `Uptime gedaald naar ${pct.toFixed(1)}% in de afgelopen 24 uur`,
                    });
                  }
                }
              }
            } catch { /* ignore als tabel ontbreekt */ }
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
