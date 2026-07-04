import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { z } from "zod";

const Body = z.object({
  user_id: z.string().uuid(),
  status_ok: z.boolean().optional().default(true),
  // response_ms wordt hier genegeerd — meting gebeurt server-side via Sync of inloggen
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

          // Rate limit: max 1 uptime-meting per 5 minuten per klant
          const since5m = new Date(Date.now() - 5 * 60 * 1000).toISOString();
          const { data: recent } = await supabaseAdmin
            .from("site_response_times" as any)
            .select("id")
            .eq("user_id", body.user_id)
            .gte("created_at", since5m)
            .limit(1)
            .maybeSingle();

          if (!recent) {
            try {
              await supabaseAdmin.from("site_response_times" as any).insert({
                user_id: body.user_id,
                response_ms: null, // alleen uptime bijhouden, geen response_ms
                status_ok: body.status_ok,
              });
            } catch { /* tabel bestaat nog niet — SQL migratie nog uitvoeren */ }

            // Occasionele cleanup: verwijder records ouder dan 7 dagen (5% kans)
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
            response_ms: null,
          });

          // Alert: uptime < 95% in afgelopen 24u (max 1 per uur)
          if (!body.status_ok) {
            try {
              const since24h = new Date(Date.now() - 86400000).toISOString();
              const { data: rows } = await supabaseAdmin
                .from("site_response_times" as any)
                .select("status_ok")
                .eq("user_id", body.user_id)
                .gte("created_at", since24h)
                .limit(300);
              if (rows && rows.length >= 5) {
                const ok = (rows as any[]).filter((r) => r.status_ok).length;
                const pct = (ok / rows.length) * 100;
                if (pct < 95) {
                  const since1h = new Date(Date.now() - 3600000).toISOString();
                  const { data: ex } = await supabaseAdmin
                    .from("monitoring_alerts" as any)
                    .select("id").eq("user_id", body.user_id).eq("type", "uptime")
                    .is("archived_at", null).gte("created_at", since1h).limit(1).maybeSingle();
                  if (!ex) {
                    await supabaseAdmin.from("monitoring_alerts" as any).insert({
                      user_id: body.user_id, type: "uptime", severity: "critical",
                      message: `Uptime gedaald naar ${pct.toFixed(1)}% in de afgelopen 24 uur`,
                    });
                  }
                }
              }
            } catch { /* ignore als monitoring_alerts ontbreekt */ }
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
