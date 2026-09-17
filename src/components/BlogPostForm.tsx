import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ImagePlus,
  X,
  Eye,
  EyeOff,
  Link2,
  Plus,
  AlertTriangle,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { slugify } from "@/lib/slug";
import { MarkdownBody } from "@/lib/markdown";
import { hasInternalLink, countBodyImagesWithoutAlt, insertMarkdownLink } from "@/lib/blog-links";
import { SITE_URL } from "@/lib/seo";
import { InternalLinkPicker, type LinkPickTarget } from "@/components/InternalLinkPicker";
import { BlogPostLinksPanel } from "@/components/BlogPostLinksPanel";

export type BlogPostFaqItem = { q: string; a: string };

export type BlogPostFormPayload = {
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image_url: string | null;
  featured_image_alt: string | null;
  status: "draft" | "scheduled" | "published";
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
  faq_items: BlogPostFaqItem[];
  create_redirect?: boolean;
};

const ALLOWED_IMAGE_MIME = new Set(["image/png", "image/jpeg", "image/webp", "image/gif"]);
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

const inputCls =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary";

function FormField({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <div className="mt-1.5">{children}</div>
      {hint && <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>}
    </label>
  );
}

// datetime-local <-> ISO. datetime-local heeft geen tijdzone; we interpreteren
// het als lokale tijd van de browser, wat voor een enkele beheerder in NL prima is.
function isoToLocalInput(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

async function uploadBlogImage(file: File): Promise<string> {
  if (!ALLOWED_IMAGE_MIME.has(file.type)) {
    throw new Error("Alleen PNG, JPEG, WebP of GIF toegestaan.");
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error("Afbeelding te groot (max 5MB).");
  }
  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error: upErr } = await supabase.storage
    .from("blog-images")
    .upload(path, file, { upsert: false });
  if (upErr) throw upErr;
  const { data } = supabase.storage.from("blog-images").getPublicUrl(path);
  return data.publicUrl;
}

export function BlogPostForm({
  postId,
  initial,
  onSave,
  saving,
  submitLabel = "Opslaan",
}: {
  postId?: string;
  initial?: Partial<BlogPostFormPayload> & {
    slug?: string;
    status?: BlogPostFormPayload["status"];
  };
  onSave: (payload: BlogPostFormPayload) => void;
  saving: boolean;
  submitLabel?: string;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!initial?.slug);
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [featuredImageUrl, setFeaturedImageUrl] = useState<string | null>(
    initial?.featured_image_url ?? null,
  );
  const [featuredImageAlt, setFeaturedImageAlt] = useState(initial?.featured_image_alt ?? "");
  const [status, setStatus] = useState<BlogPostFormPayload["status"]>(initial?.status ?? "draft");
  const [publishedAtLocal, setPublishedAtLocal] = useState(
    isoToLocalInput(initial?.published_at ?? null),
  );
  const [seoTitle, setSeoTitle] = useState(initial?.seo_title ?? "");
  const [seoDescription, setSeoDescription] = useState(initial?.seo_description ?? "");
  const [ogTitle, setOgTitle] = useState(initial?.og_title ?? "");
  const [ogDescription, setOgDescription] = useState(initial?.og_description ?? "");
  const [ogImageUrl, setOgImageUrl] = useState(initial?.og_image_url ?? "");
  const [noindex, setNoindex] = useState(initial?.noindex ?? false);
  const [canonicalUrl, setCanonicalUrl] = useState(initial?.canonical_url ?? "");
  const [focusKeyword, setFocusKeyword] = useState(initial?.focus_keyword ?? "");
  const [tagsInput, setTagsInput] = useState((initial?.tags ?? []).join(", "));
  const [faqItems, setFaqItems] = useState<BlogPostFaqItem[]>(initial?.faq_items ?? []);
  const [createRedirect, setCreateRedirect] = useState(true);

  const [preview, setPreview] = useState(false);
  const [uploadingFeatured, setUploadingFeatured] = useState(false);
  const [uploadingOg, setUploadingOg] = useState(false);
  const [linkPickerOpen, setLinkPickerOpen] = useState(false);

  const contentRef = useRef<HTMLTextAreaElement>(null);
  const pendingCursorRef = useRef<number | null>(null);

  useEffect(() => {
    if (pendingCursorRef.current !== null && contentRef.current) {
      const pos = pendingCursorRef.current;
      contentRef.current.focus();
      contentRef.current.setSelectionRange(pos, pos);
      pendingCursorRef.current = null;
    }
  }, [content]);

  const handleTitleChange = (v: string) => {
    setTitle(v);
    if (!slugTouched) setSlug(slugify(v));
  };

  const handleFeaturedImageUpload = async (file: File) => {
    setUploadingFeatured(true);
    try {
      setFeaturedImageUrl(await uploadBlogImage(file));
    } catch (e: any) {
      toast.error(e.message ?? "Uploaden mislukt.");
    } finally {
      setUploadingFeatured(false);
    }
  };

  const handleOgImageUpload = async (file: File) => {
    setUploadingOg(true);
    try {
      setOgImageUrl(await uploadBlogImage(file));
    } catch (e: any) {
      toast.error(e.message ?? "Uploaden mislukt.");
    } finally {
      setUploadingOg(false);
    }
  };

  const insertLinkTarget = (target: LinkPickTarget) => {
    const el = contentRef.current;
    const start = el?.selectionStart ?? content.length;
    const end = el?.selectionEnd ?? content.length;
    const anchor = start !== end ? content.slice(start, end) : target.title;
    const result = insertMarkdownLink(content, start, end, anchor, target.path);
    setContent(result.content);
    pendingCursorRef.current = result.cursor;
  };

  const insertLinkAtEnd = (target: LinkPickTarget) => {
    const sep = content.trim().length > 0 ? "\n\n" : "";
    setContent(`${content}${sep}[${target.title}](${target.path})`);
  };

  const addFaqItem = () => setFaqItems((f) => [...f, { q: "", a: "" }]);
  const updateFaqItem = (i: number, patch: Partial<BlogPostFaqItem>) =>
    setFaqItems((f) => f.map((item, idx) => (idx === i ? { ...item, ...patch } : item)));
  const removeFaqItem = (i: number) => setFaqItems((f) => f.filter((_, idx) => idx !== i));

  const originalSlug = initial?.slug ?? "";
  const wasPublished = initial?.status === "published";
  const slugChanged = wasPublished && slug.trim() !== "" && slugify(slug) !== originalSlug;

  const requiresImageAlt = !!featuredImageUrl && featuredImageAlt.trim().length === 0;
  const canSubmit =
    title.trim().length >= 3 &&
    (status !== "scheduled" || publishedAtLocal !== "") &&
    !requiresImageAlt;

  const bodyImagesWithoutAlt = countBodyImagesWithoutAlt(content);

  // Punt 16: niet-blokkerende SEO-checklist.
  const checklist = [
    {
      label: "SEO-titel ingevuld (≤60 tekens)",
      ok: seoTitle.trim().length > 0 && seoTitle.length <= 60,
    },
    {
      label: "Meta-omschrijving ingevuld (≤155 tekens)",
      ok: seoDescription.trim().length > 0 && seoDescription.length <= 155,
    },
    { label: "Slug ingesteld", ok: slug.trim().length > 0 },
    { label: "Minstens één interne link", ok: hasInternalLink(content) },
    {
      label: "Uitgelichte afbeelding met alt-tekst",
      ok: !!featuredImageUrl && featuredImageAlt.trim().length > 0,
    },
    { label: "Focus-zoekwoord ingevuld", ok: focusKeyword.trim().length > 0 },
  ];

  const handleSubmit = () => {
    const finalSlug = slugify(slug || title);
    let published_at: string | null = null;
    if (status === "scheduled") {
      if (!publishedAtLocal) {
        toast.error("Kies een datum/tijd om in te plannen.");
        return;
      }
      published_at = new Date(publishedAtLocal).toISOString();
    } else if (status === "published") {
      published_at = publishedAtLocal
        ? new Date(publishedAtLocal).toISOString()
        : new Date().toISOString();
    }
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const cleanFaqItems = faqItems.filter((f) => f.q.trim() && f.a.trim());

    onSave({
      title: title.trim(),
      slug: finalSlug,
      excerpt: excerpt.trim() || null,
      content,
      featured_image_url: featuredImageUrl,
      featured_image_alt: featuredImageAlt.trim() || null,
      status,
      published_at,
      seo_title: seoTitle.trim() || null,
      seo_description: seoDescription.trim() || null,
      og_title: ogTitle.trim() || null,
      og_description: ogDescription.trim() || null,
      og_image_url: ogImageUrl.trim() || null,
      noindex,
      canonical_url: canonicalUrl.trim() || null,
      focus_keyword: focusKeyword.trim() || null,
      tags,
      faq_items: cleanFaqItems,
      create_redirect: slugChanged ? createRedirect : undefined,
    });
  };

  const previewSeoTitle = seoTitle || title || "(titel)";
  const previewSeoDescription = seoDescription || excerpt || "";
  const previewOgTitle = ogTitle || seoTitle || title || "(titel)";
  const previewOgDescription = ogDescription || seoDescription || excerpt || "";
  const previewOgImage = ogImageUrl || featuredImageUrl;

  return (
    <div className="max-w-4xl space-y-5">
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="p-6 space-y-4 border-b border-border">
          <FormField label="Titel">
            <input
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Titel van de post…"
              className={inputCls}
            />
          </FormField>
          <FormField label="Slug" hint={`/blog/${slug || "…"}`}>
            <input
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
                setSlugTouched(true);
              }}
              placeholder="wordt-automatisch-gegenereerd"
              className={inputCls}
            />
          </FormField>
          {slugChanged && (
            <div className="flex items-start gap-2 rounded-md border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-700">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="space-y-1.5">
                <p>
                  Je wijzigt de slug van een gepubliceerde post. Bezoekers en zoekmachines die naar{" "}
                  <code>/blog/{originalSlug}</code> linken krijgen anders een 404.
                </p>
                <label className="flex items-center gap-1.5">
                  <input
                    type="checkbox"
                    checked={createRedirect}
                    onChange={(e) => setCreateRedirect(e.target.checked)}
                  />
                  Automatisch een 301-redirect instellen van de oude naar de nieuwe URL
                </label>
              </div>
            </div>
          )}
          <FormField
            label="Samenvatting / excerpt"
            hint={`Verschijnt in het blogoverzicht, als fallback meta-omschrijving en voor AI-extractie. Richtlijn: 40-60 woorden (nu: ${excerpt.trim() ? excerpt.trim().split(/\s+/).length : 0}).`}
          >
            <textarea
              rows={2}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className={inputCls}
            />
          </FormField>
          <div className="grid sm:grid-cols-2 gap-4">
            <FormField label="Tags" hint="Komma-gescheiden, bv: seo, hosting, wordpress">
              <input
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className={inputCls}
              />
            </FormField>
            <FormField label="Focus-zoekwoord" hint="Het belangrijkste zoekwoord voor deze post.">
              <input
                value={focusKeyword}
                onChange={(e) => setFocusKeyword(e.target.value)}
                className={inputCls}
              />
            </FormField>
          </div>
        </div>

        <div className="p-6 space-y-3 border-b border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Uitgelichte afbeelding
            </span>
            {featuredImageUrl && (
              <button
                type="button"
                onClick={() => setFeaturedImageUrl(null)}
                className="text-xs text-destructive hover:underline inline-flex items-center gap-1"
              >
                <X className="w-3 h-3" /> Verwijderen
              </button>
            )}
          </div>
          {featuredImageUrl ? (
            <img
              src={featuredImageUrl}
              alt=""
              className="max-h-56 rounded-lg border border-border object-cover"
            />
          ) : (
            <label className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border p-8 text-sm text-muted-foreground cursor-pointer hover:border-primary/40">
              <ImagePlus className="w-5 h-5" />
              {uploadingFeatured
                ? "Bezig met uploaden…"
                : "Klik om een afbeelding te uploaden (max 5MB)"}
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                className="hidden"
                disabled={uploadingFeatured}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFeaturedImageUpload(f);
                  e.target.value = "";
                }}
              />
            </label>
          )}
          {featuredImageUrl && (
            <FormField label="Alt-tekst (verplicht)">
              <input
                value={featuredImageAlt}
                onChange={(e) => setFeaturedImageAlt(e.target.value)}
                placeholder="Beschrijf wat er op de afbeelding te zien is…"
                className={`${inputCls} ${requiresImageAlt ? "border-destructive" : ""}`}
              />
            </FormField>
          )}
        </div>

        <div className="p-6 space-y-3 border-b border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Content (markdown)
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setLinkPickerOpen(true)}
                disabled={preview}
                className="text-xs text-primary hover:underline inline-flex items-center gap-1 disabled:opacity-40"
              >
                <Link2 className="w-3.5 h-3.5" /> Link invoegen
              </button>
              <button
                type="button"
                onClick={() => setPreview((p) => !p)}
                className="text-xs text-primary hover:underline inline-flex items-center gap-1"
              >
                {preview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                {preview ? "Terug naar bewerken" : "Live preview"}
              </button>
            </div>
          </div>
          {preview ? (
            <div
              className="rounded-lg p-6 space-y-4 text-sm leading-relaxed"
              style={{ background: "#1a1a1a", color: "#a4a9b2" }}
            >
              <h1
                className="text-white"
                style={{ fontSize: "1.8rem", fontWeight: 300, letterSpacing: "-0.02em" }}
              >
                {title || "(geen titel)"}
              </h1>
              <MarkdownBody content={content || "_Nog geen content…_"} />
            </div>
          ) : (
            <textarea
              ref={contentRef}
              rows={16}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={
                "Schrijf in platte tekst met lege regel tussen alinea's.\n## Kopje\n**vet**, *cursief*, [link](/pad), ![alt](/afbeelding.jpg)\n- lijst-item"
              }
              className={`${inputCls} font-mono text-xs`}
            />
          )}
          {bodyImagesWithoutAlt > 0 && (
            <p className="text-xs text-amber-600 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> {bodyImagesWithoutAlt} afbeelding(en) in de
              body zonder alt-tekst.
            </p>
          )}
          <InternalLinkPicker
            open={linkPickerOpen}
            onOpenChange={setLinkPickerOpen}
            onPick={insertLinkTarget}
            excludePostId={postId}
          />
        </div>

        {postId && <BlogPostLinksPanel postId={postId} onSuggestionPick={insertLinkAtEnd} />}

        <div className="p-6 space-y-4 border-b border-border">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            SEO
          </span>
          <div className="grid sm:grid-cols-2 gap-4">
            <FormField
              label="SEO-titel"
              hint={`${seoTitle.length}/60${seoTitle.length > 60 ? " — te lang" : ""}`}
            >
              <input
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                className={`${inputCls} ${seoTitle.length > 60 ? "border-amber-500" : ""}`}
              />
            </FormField>
            <FormField
              label="Meta-omschrijving"
              hint={`${seoDescription.length}/155${seoDescription.length > 155 ? " — te lang" : ""}`}
            >
              <input
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                className={`${inputCls} ${seoDescription.length > 155 ? "border-amber-500" : ""}`}
              />
            </FormField>
          </div>

          <div className="rounded-lg border border-border p-4 bg-muted/20">
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground mb-2">
              Google-preview
            </p>
            <p className="text-sm" style={{ color: "#1a0dab" }}>
              {previewSeoTitle}
            </p>
            <p className="text-xs" style={{ color: "#006621" }}>
              {SITE_URL.replace(/^https?:\/\//, "")} › blog › {slug || "…"}
            </p>
            <p className="text-xs mt-1" style={{ color: "#545454" }}>
              {previewSeoDescription || "(geen omschrijving)"}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <FormField label="Canonical URL" hint={`Standaard: ${SITE_URL}/blog/${slug || "…"}`}>
              <input
                value={canonicalUrl}
                onChange={(e) => setCanonicalUrl(e.target.value)}
                placeholder={`${SITE_URL}/blog/${slug || "…"}`}
                className={inputCls}
              />
            </FormField>
            <FormField label="Indexering">
              <label className="flex items-center gap-2 text-sm mt-2">
                <input
                  type="checkbox"
                  checked={noindex}
                  onChange={(e) => setNoindex(e.target.checked)}
                />
                Uitsluiten van zoekmachines (noindex)
              </label>
            </FormField>
          </div>
        </div>

        <div className="p-6 space-y-4 border-b border-border">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Open Graph / social share
          </span>
          <div className="grid sm:grid-cols-2 gap-4">
            <FormField label="OG-titel" hint="Leeg = SEO-titel / titel.">
              <input
                value={ogTitle}
                onChange={(e) => setOgTitle(e.target.value)}
                className={inputCls}
              />
            </FormField>
            <FormField label="OG-omschrijving" hint="Leeg = meta-omschrijving / excerpt.">
              <input
                value={ogDescription}
                onChange={(e) => setOgDescription(e.target.value)}
                className={inputCls}
              />
            </FormField>
          </div>
          <FormField label="OG-afbeelding" hint="Leeg = uitgelichte afbeelding.">
            <div className="flex items-center gap-3">
              <input
                value={ogImageUrl}
                onChange={(e) => setOgImageUrl(e.target.value)}
                placeholder={featuredImageUrl ?? "https://…"}
                className={inputCls}
              />
              <label className="shrink-0 text-xs text-primary hover:underline cursor-pointer">
                {uploadingOg ? "Bezig…" : "Upload"}
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  className="hidden"
                  disabled={uploadingOg}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleOgImageUpload(f);
                    e.target.value = "";
                  }}
                />
              </label>
            </div>
          </FormField>

          <div className="rounded-lg border border-border overflow-hidden max-w-sm">
            {previewOgImage && (
              <img src={previewOgImage} alt="" className="w-full h-32 object-cover" />
            )}
            <div className="p-3 bg-muted/20">
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                {SITE_URL.replace(/^https?:\/\//, "")}
              </p>
              <p className="text-sm font-medium truncate">{previewOgTitle}</p>
              <p className="text-xs text-muted-foreground line-clamp-2">{previewOgDescription}</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4 border-b border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              FAQ-blokken (optioneel)
            </span>
            <button
              type="button"
              onClick={addFaqItem}
              className="text-xs text-primary hover:underline inline-flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Vraag toevoegen
            </button>
          </div>
          <p className="text-xs text-muted-foreground">
            Ingevulde paren worden zichtbaar getoond onder de post én gebruikt voor FAQPage-schema.
            Alleen invullen als het écht op de pagina moet staan.
          </p>
          {faqItems.map((item, i) => (
            <div key={i} className="rounded-lg border border-border p-3 space-y-2 relative">
              <button
                type="button"
                onClick={() => removeFaqItem(i)}
                className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <input
                value={item.q}
                onChange={(e) => updateFaqItem(i, { q: e.target.value })}
                placeholder="Vraag…"
                className={inputCls}
              />
              <textarea
                value={item.a}
                onChange={(e) => updateFaqItem(i, { a: e.target.value })}
                placeholder="Antwoord…"
                rows={2}
                className={inputCls}
              />
            </div>
          ))}
        </div>

        <div className="p-6 space-y-4 border-b border-border">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Publicatie
          </span>
          <div className="grid sm:grid-cols-2 gap-4">
            <FormField label="Status">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className={inputCls}
              >
                <option value="draft">Concept</option>
                <option value="scheduled">Inplannen</option>
                <option value="published">Direct publiceren</option>
              </select>
            </FormField>
            {status === "scheduled" && (
              <FormField label="Publiceren op">
                <input
                  type="datetime-local"
                  value={publishedAtLocal}
                  onChange={(e) => setPublishedAtLocal(e.target.value)}
                  className={inputCls}
                />
              </FormField>
            )}
          </div>
        </div>

        <div className="p-6 space-y-2 border-b border-border">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            SEO-checklist
          </span>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
            {checklist.map((c) => (
              <li key={c.label} className="flex items-center gap-1.5">
                {c.ok ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                ) : (
                  <Circle className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                )}
                <span className={c.ok ? "" : "text-muted-foreground"}>{c.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 flex items-center justify-end gap-3 bg-muted/20">
          {!canSubmit && (
            <span className="text-xs text-muted-foreground mr-auto">
              {requiresImageAlt
                ? "Vul een alt-tekst in voor de uitgelichte afbeelding."
                : "Vul minimaal een titel in (en bij inplannen: een datum/tijd)."}
            </span>
          )}
          <button
            onClick={handleSubmit}
            disabled={!canSubmit || saving}
            className="btn-primary text-sm px-5"
          >
            {saving ? "Bezig…" : submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
