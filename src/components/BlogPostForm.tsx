import { useState, type ReactNode } from "react";
import { ImagePlus, X, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { slugify } from "@/lib/slug";
import { MarkdownBody } from "@/lib/markdown";

export type BlogPostFormPayload = {
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image_url: string | null;
  status: "draft" | "scheduled" | "published";
  published_at: string | null;
  seo_title: string | null;
  seo_description: string | null;
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

export function BlogPostForm({
  initial,
  onSave,
  saving,
  submitLabel = "Opslaan",
}: {
  initial?: Partial<BlogPostFormPayload>;
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
  const [status, setStatus] = useState<BlogPostFormPayload["status"]>(initial?.status ?? "draft");
  const [publishedAtLocal, setPublishedAtLocal] = useState(
    isoToLocalInput(initial?.published_at ?? null),
  );
  const [seoTitle, setSeoTitle] = useState(initial?.seo_title ?? "");
  const [seoDescription, setSeoDescription] = useState(initial?.seo_description ?? "");
  const [preview, setPreview] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleTitleChange = (v: string) => {
    setTitle(v);
    if (!slugTouched) setSlug(slugify(v));
  };

  const handleImageUpload = async (file: File) => {
    if (!ALLOWED_IMAGE_MIME.has(file.type)) {
      toast.error("Alleen PNG, JPEG, WebP of GIF toegestaan.");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      toast.error("Afbeelding te groot (max 5MB).");
      return;
    }
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("blog-images")
        .upload(path, file, { upsert: false });
      if (upErr) throw upErr;
      const { data } = supabase.storage.from("blog-images").getPublicUrl(path);
      setFeaturedImageUrl(data.publicUrl);
    } catch (e: any) {
      toast.error(e.message ?? "Uploaden mislukt.");
    } finally {
      setUploading(false);
    }
  };

  const canSubmit = title.trim().length >= 3 && (status !== "scheduled" || publishedAtLocal !== "");

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
    onSave({
      title: title.trim(),
      slug: finalSlug,
      excerpt: excerpt.trim() || null,
      content,
      featured_image_url: featuredImageUrl,
      status,
      published_at,
      seo_title: seoTitle.trim() || null,
      seo_description: seoDescription.trim() || null,
    });
  };

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
          <FormField
            label="Samenvatting / excerpt"
            hint="Verschijnt in het blogoverzicht en als fallback meta-omschrijving."
          >
            <textarea
              rows={2}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className={inputCls}
            />
          </FormField>
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
              {uploading ? "Bezig met uploaden…" : "Klik om een afbeelding te uploaden (max 5MB)"}
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                className="hidden"
                disabled={uploading}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleImageUpload(f);
                  e.target.value = "";
                }}
              />
            </label>
          )}
        </div>

        <div className="p-6 space-y-3 border-b border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Content (markdown)
            </span>
            <button
              type="button"
              onClick={() => setPreview((p) => !p)}
              className="text-xs text-primary hover:underline inline-flex items-center gap-1"
            >
              {preview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              {preview ? "Terug naar bewerken" : "Live preview"}
            </button>
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
              rows={16}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={
                "Schrijf in platte tekst met lege regel tussen alinea's.\n## Kopje\n**vet**, *cursief*, [link](/pad)\n- lijst-item"
              }
              className={`${inputCls} font-mono text-xs`}
            />
          )}
        </div>

        <div className="p-6 space-y-4 border-b border-border">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            SEO
          </span>
          <div className="grid sm:grid-cols-2 gap-4">
            <FormField label="SEO-titel" hint={`${seoTitle.length}/70`}>
              <input
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                maxLength={70}
                className={inputCls}
              />
            </FormField>
            <FormField label="SEO-omschrijving" hint={`${seoDescription.length}/200`}>
              <input
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                maxLength={200}
                className={inputCls}
              />
            </FormField>
          </div>
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

        <div className="p-6 flex items-center justify-end gap-3 bg-muted/20">
          {!canSubmit && (
            <span className="text-xs text-muted-foreground mr-auto">
              Vul minimaal een titel in (en bij inplannen: een datum/tijd).
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
