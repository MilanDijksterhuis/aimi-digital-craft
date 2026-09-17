import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { ensureAdmin, ensureStaff } from "./auth-guards.server";

const pathSchema = z.string().trim().min(1).max(300).regex(/^\//, "Moet met / beginnen.");

export const adminListRedirects = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    await ensureStaff(supabase, userId);
    const { adminListRedirectsImpl } = await import("./redirects.server");
    return adminListRedirectsImpl();
  });

export const adminCreateRedirect = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ from_path: pathSchema, to_path: pathSchema }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { adminCreateRedirectImpl } = await import("./redirects.server");
    return adminCreateRedirectImpl(data.from_path, data.to_path, userId);
  });

export const adminDeleteRedirect = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { adminDeleteRedirectImpl } = await import("./redirects.server");
    return adminDeleteRedirectImpl(data.id);
  });
