import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { checkRateLimit } from "@/lib/rate-limit";
import { z } from "zod";

const Body = z.object({
  user_id: z.string().uuid(),
  message: z.string().min(1).max(2000),
  url: z.string().max(1000).optional(),
});

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const Route = createFileRoute("/api/public/site-error")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: cors }),
      POST: async ({ request }) => {
        try {
          const body = Body.parse(await request.json());

          // Per-user_id rate limit: de UID staat publiek in de track.js-snippet
          // (view-source van de klantsite) en is dus door iedereen te achterhalen.
          // Zonder deze limiet kan een aanvaller met een bekende UID onbeperkt
          // valse errors namens die klant injecteren, ongeacht het eigen IP.
          const { allowed } = await checkRateLimit(`site-error:${body.user_id}`, 20, 10 * 60 * 1000);
          if (!allowed) {
            return new Response(JSON.stringify({ ok: true }), {
              status: 200,
              headers: { "Content-Type": "application/json", ...cors },
            });
          }

          // Valideer dat de user_id een bestaand profiel is — voorkomt dat
          // willekeurige/gespoofde ID's rijen aanmaken. Onbekende users worden
          // stil genegeerd (geen enumeratie, geen breuk voor de tracking-snippet).
          const { data: profile } = await supabaseAdmin
            .from("profiles")
            .select("id")
            .eq("id", body.user_id)
            .maybeSingle();
          if (!profile) {
            return new Response(JSON.stringify({ ok: true }), {
              status: 200,
              headers: { "Content-Type": "application/json", ...cors },
            });
          }

          await supabaseAdmin.from("site_errors").insert({
            user_id: body.user_id,
            message: body.message,
            url: body.url ?? null,
          });
          return new Response(JSON.stringify({ ok: true }), {
            status: 200,
            headers: { "Content-Type": "application/json", ...cors },
          });
        } catch {
          // Geen interne details lekken naar de client.
          return new Response(JSON.stringify({ error: "Invalid request" }), {
            status: 400,
            headers: { "Content-Type": "application/json", ...cors },
          });
        }
      },
    },
  },
});
