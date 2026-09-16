import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { slugify } from "./slug";

export type BlogPostStatus = "draft" | "scheduled" | "published";

async function assertUniqueSlug(slug: string, excludeId?: string) {
  let query = supabaseAdmin.from("blog_posts").select("id").eq("slug", slug);
  if (excludeId) query = query.neq("id", excludeId);
  const { data } = await query.maybeSingle();
  if (data) throw new Error(`Slug "${slug}" is al in gebruik door een andere post.`);
}

export async function adminListBlogPostsImpl() {
  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) throw new Error(error.message);
  return { posts: data ?? [] };
}

export async function adminGetBlogPostImpl(id: string) {
  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Blogpost niet gevonden.");
  return { post: data };
}

export type BlogPostInput = {
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image_url: string | null;
  status: BlogPostStatus;
  published_at: string | null;
  seo_title: string | null;
  seo_description: string | null;
};

// Concept mag altijd zonder published_at. Gepland/gepubliceerd vereist een
// published_at (de UI vult "nu" in bij direct publiceren, en de gekozen
// datum/tijd bij inplannen).
function resolveStatusFields(input: BlogPostInput): Pick<BlogPostInput, "status" | "published_at"> {
  if (input.status === "draft") return { status: "draft", published_at: null };
  if (input.status === "scheduled") {
    if (!input.published_at) throw new Error("Kies een datum/tijd om in te plannen.");
    if (new Date(input.published_at).getTime() <= Date.now()) {
      throw new Error(
        "De geplande datum/tijd moet in de toekomst liggen. Kies 'Direct publiceren' voor nu.",
      );
    }
    return { status: "scheduled", published_at: input.published_at };
  }
  // published
  return { status: "published", published_at: input.published_at ?? new Date().toISOString() };
}

export async function adminCreateBlogPostImpl(input: BlogPostInput, authorId: string) {
  const slug = slugify(input.slug || input.title);
  if (!slug) throw new Error("Kon geen geldige slug afleiden van de titel.");
  await assertUniqueSlug(slug);
  const { status, published_at } = resolveStatusFields(input);

  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .insert({
      title: input.title,
      slug,
      excerpt: input.excerpt,
      content: input.content,
      featured_image_url: input.featured_image_url,
      status,
      published_at,
      seo_title: input.seo_title,
      seo_description: input.seo_description,
      author_id: authorId,
    })
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return { post: data };
}

export async function adminUpdateBlogPostImpl(id: string, input: BlogPostInput) {
  const slug = slugify(input.slug || input.title);
  if (!slug) throw new Error("Kon geen geldige slug afleiden van de titel.");
  await assertUniqueSlug(slug, id);
  const { status, published_at } = resolveStatusFields(input);

  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .update({
      title: input.title,
      slug,
      excerpt: input.excerpt,
      content: input.content,
      featured_image_url: input.featured_image_url,
      status,
      published_at,
      seo_title: input.seo_title,
      seo_description: input.seo_description,
    })
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return { post: data };
}

export async function adminDeleteBlogPostImpl(id: string) {
  const { error } = await supabaseAdmin.from("blog_posts").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return { ok: true };
}

export async function adminDuplicateBlogPostImpl(id: string, authorId: string) {
  const { data: original, error: fetchError } = await supabaseAdmin
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (fetchError) throw new Error(fetchError.message);
  if (!original) throw new Error("Blogpost niet gevonden.");

  const baseSlug = `${original.slug}-kopie`;
  let slug = baseSlug;
  let n = 2;
  while (true) {
    const { data: existing } = await supabaseAdmin
      .from("blog_posts")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();
    if (!existing) break;
    slug = `${baseSlug}-${n++}`;
  }

  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .insert({
      title: `${original.title} (kopie)`,
      slug,
      excerpt: original.excerpt,
      content: original.content,
      featured_image_url: original.featured_image_url,
      status: "draft",
      published_at: null,
      seo_title: original.seo_title,
      seo_description: original.seo_description,
      author_id: authorId,
    })
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return { post: data };
}

export async function adminBulkDeleteBlogPostsImpl(ids: string[]) {
  const { error } = await supabaseAdmin.from("blog_posts").delete().in("id", ids);
  if (error) throw new Error(error.message);
  return { ok: true };
}

export async function adminBulkSetStatusImpl(ids: string[], status: BlogPostStatus) {
  if (status === "scheduled") {
    throw new Error(
      "Bulk inplannen wordt niet ondersteund (elke post heeft een eigen datum/tijd nodig).",
    );
  }
  const published_at = status === "published" ? new Date().toISOString() : null;
  const { error } = await supabaseAdmin
    .from("blog_posts")
    .update({ status, published_at })
    .in("id", ids);
  if (error) throw new Error(error.message);
  return { ok: true };
}
