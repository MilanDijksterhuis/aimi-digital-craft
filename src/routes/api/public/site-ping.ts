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
          await supabaseAdmin.from("site_pings").insert({
            user_id: body.user_id,
            status_ok: body.status_ok,
            response_ms: body.response_ms ?? null,
          });
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
