import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { slugify } from "./slug";
import { extractInternalLinks } from "./blog-links";
import { computeScheduleDates, type BulkScheduleOptions } from "./blog-schedule";

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
  featured_image_alt: string | null;
  status: BlogPostStatus;
  published_at: string | null;
  seo_title: string | null;
  seo_description: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image_url: string | null;
  noindex: boolean;
  canonical_url: string | null;
  focus_keyword: string | null;
  tags: string[];
  faq_items: { q: string; a: string }[];
};

/** Herberekent de post_links-rijen voor een post op basis van de huidige
 * content: de content is de bron van waarheid (de link-picker voegt gewoon
 * geldige markdown-links toe), dus we vervangen de volledige set bij elke
 * save i.p.v. losse insert/update/delete-logica bij te houden. */
async function syncPostLinks(postId: string, content: string) {
  const links = extractInternalLinks(content);
  await supabaseAdmin.from("post_links").delete().eq("from_post_id", postId);
  if (links.length === 0) return;

  const blogSlugs = links
    .map((l) => l.href.match(/^\/blog\/([^/?#]+)/)?.[1])
    .filter((s): s is string => !!s);

  const slugToId = new Map<string, string>();
  if (blogSlugs.length > 0) {
    const { data: targets } = await supabaseAdmin
      .from("blog_posts")
      .select("id, slug")
      .in("slug", Array.from(new Set(blogSlugs)));
    for (const t of targets ?? []) slugToId.set(t.slug, t.id);
  }

  const rows = links.map((l) => {
    const blogSlug = l.href.match(/^\/blog\/([^/?#]+)/)?.[1];
    if (blogSlug) {
      return {
        from_post_id: postId,
        to_post_id: slugToId.get(blogSlug) ?? null,
        to_post_slug: blogSlug,
        to_page_path: null,
        anchor_text: l.anchorText,
      };
    }
    return {
      from_post_id: postId,
      to_post_id: null,
      to_post_slug: null,
      to_page_path: l.href,
      anchor_text: l.anchorText,
    };
  });

  await supabaseAdmin.from("post_links").insert(rows);
}

/** Bij een slug-wijziging van een gepubliceerde post: legt een 301-redirect
 * vast van de oude naar de nieuwe blog-URL, en laat bestaande redirects die
 * naar de oude URL wezen meteen doorwijzen naar de nieuwe (voorkomt een
 * redirect-keten bij een post die meermaals hernoemd wordt). */
async function syncSlugRedirect(oldSlug: string, newSlug: string) {
  if (oldSlug === newSlug) return;
  const oldPath = `/blog/${oldSlug}`;
  const newPath = `/blog/${newSlug}`;

  // Als newPath toevallig een eerdere redirect-bron was (bv. slug A -> B -> A),
  // zou die anders een live URL naar zichzelf laten wijzen (en de
  // redirects_no_self_loop-check hieronder laten falen). Eerst opruimen.
  await supabaseAdmin.from("redirects").delete().eq("from_path", newPath);

  await supabaseAdmin
    .from("redirects")
    .upsert({ from_path: oldPath, to_path: newPath }, { onConflict: "from_path" });
  await supabaseAdmin
    .from("redirects")
    .update({ to_path: newPath })
    .eq("to_path", oldPath)
    .neq("from_path", newPath);
}

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
      featured_image_alt: input.featured_image_alt,
      status,
      published_at,
      seo_title: input.seo_title,
      seo_description: input.seo_description,
      og_title: input.og_title,
      og_description: input.og_description,
      og_image_url: input.og_image_url,
      noindex: input.noindex,
      canonical_url: input.canonical_url,
      focus_keyword: input.focus_keyword,
      tags: input.tags,
      faq_items: input.faq_items,
      author_id: authorId,
    })
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  await syncPostLinks(data.id, input.content);
  return { post: data };
}

export async function adminUpdateBlogPostImpl(
  id: string,
  input: BlogPostInput,
  createRedirectOnSlugChange: boolean,
) {
  const slug = slugify(input.slug || input.title);
  if (!slug) throw new Error("Kon geen geldige slug afleiden van de titel.");
  await assertUniqueSlug(slug, id);

  const { data: existing, error: existingError } = await supabaseAdmin
    .from("blog_posts")
    .select("slug, status")
    .eq("id", id)
    .maybeSingle();
  if (existingError) throw new Error(existingError.message);
  if (!existing) throw new Error("Blogpost niet gevonden.");

  const { status, published_at } = resolveStatusFields(input);

  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .update({
      title: input.title,
      slug,
      excerpt: input.excerpt,
      content: input.content,
      featured_image_url: input.featured_image_url,
      featured_image_alt: input.featured_image_alt,
      status,
      published_at,
      seo_title: input.seo_title,
      seo_description: input.seo_description,
      og_title: input.og_title,
      og_description: input.og_description,
      og_image_url: input.og_image_url,
      noindex: input.noindex,
      canonical_url: input.canonical_url,
      focus_keyword: input.focus_keyword,
      tags: input.tags,
      faq_items: input.faq_items,
    })
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw new Error(error.message);

  await syncPostLinks(id, input.content);
  if (createRedirectOnSlugChange && existing.status === "published" && existing.slug !== slug) {
    await syncSlugRedirect(existing.slug, slug);
  }

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
      featured_image_alt: original.featured_image_alt,
      status: "draft",
      published_at: null,
      seo_title: original.seo_title,
      seo_description: original.seo_description,
      og_title: original.og_title,
      og_description: original.og_description,
      og_image_url: original.og_image_url,
      noindex: original.noindex,
      canonical_url: null,
      focus_keyword: original.focus_keyword,
      tags: original.tags,
      faq_items: original.faq_items,
      author_id: authorId,
    })
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  await syncPostLinks(data.id, original.content);
  return { post: data };
}

export async function adminGetPostLinksImpl(postId: string) {
  const [{ data: outgoing, error: outErr }, { data: incoming, error: inErr }] = await Promise.all([
    supabaseAdmin
      .from("post_links")
      .select("id, to_post_id, to_post_slug, to_page_path, anchor_text")
      .eq("from_post_id", postId),
    supabaseAdmin
      .from("post_links")
      .select("id, from_post_id, anchor_text, blog_posts!post_links_from_post_id_fkey(title, slug)")
      .eq("to_post_id", postId),
  ]);
  if (outErr) throw new Error(outErr.message);
  if (inErr) throw new Error(inErr.message);

  const blogSlugs = (outgoing ?? []).map((l) => l.to_post_slug).filter((s): s is string => !!s);
  let targetStatusBySlug = new Map<string, { id: string; status: BlogPostStatus; title: string }>();
  if (blogSlugs.length > 0) {
    const { data: targets } = await supabaseAdmin
      .from("blog_posts")
      .select("id, slug, status, title")
      .in("slug", Array.from(new Set(blogSlugs)));
    targetStatusBySlug = new Map((targets ?? []).map((t) => [t.slug, t]));
  }

  const outgoingWithStatus = (outgoing ?? []).map((l) => {
    if (!l.to_post_slug) {
      return { ...l, broken: false, target_title: null as string | null };
    }
    const target = targetStatusBySlug.get(l.to_post_slug);
    const broken = !target || target.status !== "published";
    return { ...l, broken, target_title: target?.title ?? null };
  });

  const incomingFormatted = (incoming ?? []).map((l: any) => ({
    id: l.id,
    from_post_id: l.from_post_id,
    anchor_text: l.anchor_text,
    from_title: l.blog_posts?.title ?? "(onbekend)",
    from_slug: l.blog_posts?.slug ?? null,
  }));

  return { outgoing: outgoingWithStatus, incoming: incomingFormatted };
}

const STOPWORDS = new Set([
  "de",
  "het",
  "een",
  "en",
  "van",
  "voor",
  "met",
  "op",
  "je",
  "jouw",
  "is",
  "wat",
  "waarom",
  "hoe",
  "die",
  "dit",
  "dat",
  "niet",
  "aan",
  "in",
  "te",
]);

function significantWords(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((w) => w.length > 3 && !STOPWORDS.has(w)),
  );
}

/** Simpele, kosteloze suggestie-functie: rangschikt andere gepubliceerde
 * posts op gedeelde tags (zwaarder) en gedeelde betekenisvolle woorden in de
 * titel/focus-zoekwoord (lichter). Geen externe API's, puur lokale scoring. */
export async function adminSuggestLinkTargetsImpl(postId: string) {
  const { data: current, error: curErr } = await supabaseAdmin
    .from("blog_posts")
    .select("id, title, tags, focus_keyword")
    .eq("id", postId)
    .maybeSingle();
  if (curErr) throw new Error(curErr.message);
  if (!current) throw new Error("Blogpost niet gevonden.");

  const { data: others, error: othersErr } = await supabaseAdmin
    .from("blog_posts")
    .select("id, title, slug, tags, focus_keyword")
    .eq("status", "published")
    .neq("id", postId);
  if (othersErr) throw new Error(othersErr.message);

  const currentTags = new Set(current.tags ?? []);
  const currentWords = significantWords([current.title, current.focus_keyword ?? ""].join(" "));

  const scored = (others ?? []).map((o) => {
    const sharedTags = (o.tags ?? []).filter((t: string) => currentTags.has(t)).length;
    const otherWords = significantWords([o.title, o.focus_keyword ?? ""].join(" "));
    let sharedWords = 0;
    for (const w of otherWords) if (currentWords.has(w)) sharedWords++;
    return { post: o, score: sharedTags * 2 + sharedWords };
  });

  return {
    suggestions: scored
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map((s) => ({ id: s.post.id, title: s.post.title, slug: s.post.slug, score: s.score })),
  };
}

export async function adminRescheduleBlogPostImpl(id: string, publishedAt: string) {
  const { data: existing, error: existingError } = await supabaseAdmin
    .from("blog_posts")
    .select("status")
    .eq("id", id)
    .maybeSingle();
  if (existingError) throw new Error(existingError.message);
  if (!existing) throw new Error("Blogpost niet gevonden.");
  if (existing.status === "draft") {
    throw new Error("Concepten kunnen niet via de agenda herpland worden; open de post eerst.");
  }
  const { error } = await supabaseAdmin
    .from("blog_posts")
    .update({ published_at: publishedAt })
    .eq("id", id);
  if (error) throw new Error(error.message);
  return { ok: true };
}

export async function adminBulkScheduleBlogPostsImpl(
  orderedIds: string[],
  options: BulkScheduleOptions,
) {
  const dates = computeScheduleDates(orderedIds.length, options);
  const now = Date.now();
  for (const d of dates) {
    if (d.getTime() <= now) {
      throw new Error(
        "Een of meer berekende publicatiemomenten liggen in het verleden. Kies een startdatum/tijd in de toekomst.",
      );
    }
  }
  for (let i = 0; i < orderedIds.length; i++) {
    const { error } = await supabaseAdmin
      .from("blog_posts")
      .update({ status: "scheduled", published_at: dates[i].toISOString() })
      .eq("id", orderedIds[i]);
    if (error) throw new Error(error.message);
  }
  return {
    ok: true,
    scheduled: orderedIds.map((id, i) => ({ id, published_at: dates[i].toISOString() })),
  };
}

export async function adminBulkShiftBlogPostsImpl(ids: string[], shiftDays: number) {
  const { data: posts, error: fetchError } = await supabaseAdmin
    .from("blog_posts")
    .select("id, status, published_at")
    .in("id", ids);
  if (fetchError) throw new Error(fetchError.message);

  for (const p of posts ?? []) {
    if (p.status !== "scheduled" || !p.published_at) continue;
    const newDate = new Date(p.published_at);
    newDate.setDate(newDate.getDate() + shiftDays);
    const { error } = await supabaseAdmin
      .from("blog_posts")
      .update({ published_at: newDate.toISOString() })
      .eq("id", p.id);
    if (error) throw new Error(error.message);
  }
  return { ok: true };
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
