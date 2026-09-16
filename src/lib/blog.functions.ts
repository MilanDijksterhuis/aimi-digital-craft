import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { ensureAdmin, ensureStaff } from "./auth-guards.server";

const statusEnum = z.enum(["draft", "scheduled", "published"]);

const postInputSchema = z.object({
  title: z.string().trim().min(3).max(200),
  slug: z.string().trim().max(200),
  excerpt: z.string().trim().max(500).nullable(),
  content: z.string(),
  featured_image_url: z.string().url().nullable(),
  status: statusEnum,
  published_at: z.string().nullable(),
  seo_title: z.string().trim().max(70).nullable(),
  seo_description: z.string().trim().max(200).nullable(),
});

export const adminListBlogPosts = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    await ensureStaff(supabase, userId);
    const { adminListBlogPostsImpl } = await import("./blog.server");
    return adminListBlogPostsImpl();
  });

export const adminGetBlogPost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureStaff(supabase, userId);
    const { adminGetBlogPostImpl } = await import("./blog.server");
    return adminGetBlogPostImpl(data.id);
  });

export const adminCreateBlogPost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => postInputSchema.parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { adminCreateBlogPostImpl } = await import("./blog.server");
    return adminCreateBlogPostImpl(data, userId);
  });

export const adminUpdateBlogPost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid() }).merge(postInputSchema).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { id, ...input } = data;
    const { adminUpdateBlogPostImpl } = await import("./blog.server");
    return adminUpdateBlogPostImpl(id, input);
  });

export const adminDeleteBlogPost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { adminDeleteBlogPostImpl } = await import("./blog.server");
    return adminDeleteBlogPostImpl(data.id);
  });

export const adminDuplicateBlogPost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { adminDuplicateBlogPostImpl } = await import("./blog.server");
    return adminDuplicateBlogPostImpl(data.id, userId);
  });

export const adminBulkDeleteBlogPosts = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ ids: z.array(z.string().uuid()).min(1) }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { adminBulkDeleteBlogPostsImpl } = await import("./blog.server");
    return adminBulkDeleteBlogPostsImpl(data.ids);
  });

export const adminBulkSetBlogPostStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z
      .object({ ids: z.array(z.string().uuid()).min(1), status: z.enum(["draft", "published"]) })
      .parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { adminBulkSetStatusImpl } = await import("./blog.server");
    return adminBulkSetStatusImpl(data.ids, data.status);
  });
