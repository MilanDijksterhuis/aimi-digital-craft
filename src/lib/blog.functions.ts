import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { ensureAdmin, ensureStaff } from "./auth-guards.server";

const statusEnum = z.enum(["draft", "scheduled", "published"]);

const faqItemSchema = z.object({
  q: z.string().trim().min(1).max(300),
  a: z.string().trim().min(1).max(2000),
});

const postInputSchema = z.object({
  title: z.string().trim().min(3).max(200),
  slug: z.string().trim().max(200),
  excerpt: z.string().trim().max(500).nullable(),
  content: z.string(),
  featured_image_url: z.string().url().nullable(),
  featured_image_alt: z.string().trim().max(200).nullable(),
  status: statusEnum,
  published_at: z.string().nullable(),
  seo_title: z.string().trim().max(70).nullable(),
  seo_description: z.string().trim().max(200).nullable(),
  og_title: z.string().trim().max(70).nullable(),
  og_description: z.string().trim().max(200).nullable(),
  og_image_url: z.string().url().nullable(),
  noindex: z.boolean(),
  canonical_url: z.string().url().nullable(),
  focus_keyword: z.string().trim().max(100).nullable(),
  tags: z.array(z.string().trim().min(1).max(40)).max(20),
  faq_items: z.array(faqItemSchema).max(30),
});

const bulkScheduleOptionsSchema = z.object({
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  startTime: z.string().regex(/^\d{2}:\d{2}$/),
  intervalDays: z.number().int().min(1).max(90),
  workdaysOnly: z.boolean(),
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
  .inputValidator((d) =>
    z
      .object({ id: z.string().uuid(), create_redirect: z.boolean().optional() })
      .merge(postInputSchema)
      .parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { id, create_redirect, ...input } = data;
    const { adminUpdateBlogPostImpl } = await import("./blog.server");
    return adminUpdateBlogPostImpl(id, input, create_redirect ?? true);
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

export const adminGetPostLinks = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureStaff(supabase, userId);
    const { adminGetPostLinksImpl } = await import("./blog.server");
    return adminGetPostLinksImpl(data.id);
  });

export const adminSuggestLinkTargets = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureStaff(supabase, userId);
    const { adminSuggestLinkTargetsImpl } = await import("./blog.server");
    return adminSuggestLinkTargetsImpl(data.id);
  });

export const adminRescheduleBlogPost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid(), published_at: z.string() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { adminRescheduleBlogPostImpl } = await import("./blog.server");
    return adminRescheduleBlogPostImpl(data.id, data.published_at);
  });

export const adminBulkScheduleBlogPosts = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z
      .object({ ids: z.array(z.string().uuid()).min(1), options: bulkScheduleOptionsSchema })
      .parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { adminBulkScheduleBlogPostsImpl } = await import("./blog.server");
    return adminBulkScheduleBlogPostsImpl(data.ids, data.options);
  });

export const adminBulkShiftBlogPosts = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({ ids: z.array(z.string().uuid()).min(1), shiftDays: z.number().int() }).parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { adminBulkShiftBlogPostsImpl } = await import("./blog.server");
    return adminBulkShiftBlogPostsImpl(data.ids, data.shiftDays);
  });
