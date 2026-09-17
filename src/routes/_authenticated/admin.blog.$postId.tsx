import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ChevronLeft } from "lucide-react";
import { adminGetBlogPost, adminUpdateBlogPost } from "@/lib/blog.functions";
import {
  BlogPostForm,
  type BlogPostFormPayload,
  type BlogPostFaqItem,
} from "@/components/BlogPostForm";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/_authenticated/admin/blog/$postId")({
  head: () => ({
    meta: [{ title: "Post bewerken — Admin — AIMI" }, { name: "robots", content: "noindex" }],
  }),
  component: AdminBlogPostDetailPage,
});

function AdminBlogPostDetailPage() {
  const { postId } = Route.useParams();
  const qc = useQueryClient();

  const getFn = useServerFn(adminGetBlogPost);
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-blog-post", postId],
    queryFn: () => getFn({ data: { id: postId } }),
  });

  const updateFn = useServerFn(adminUpdateBlogPost);
  const updateM = useMutation({
    mutationFn: (payload: BlogPostFormPayload) => updateFn({ data: { id: postId, ...payload } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-blog-post", postId] });
      qc.invalidateQueries({ queryKey: ["admin-blog-posts"] });
      toast.success("Post opgeslagen.");
    },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <div className="w-screen relative left-1/2 -translate-x-1/2 max-w-[1600px] px-6 lg:px-10 space-y-6">
      <Link
        to="/admin/blog"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronLeft className="w-4 h-4" /> Terug naar Blog
      </Link>

      {isLoading ? (
        <div className="space-y-3 max-w-4xl">
          <Skeleton className="h-10 w-1/2" />
          <Skeleton className="h-64 w-full" />
        </div>
      ) : error ? (
        <p className="text-destructive text-sm">{(error as Error).message}</p>
      ) : (
        <>
          <div>
            <h1 className="font-display text-3xl font-bold">{data?.post.title}</h1>
            <p className="text-muted-foreground text-sm">/blog/{data?.post.slug}</p>
          </div>
          <BlogPostForm
            postId={postId}
            initial={{
              title: data?.post.title,
              slug: data?.post.slug,
              excerpt: data?.post.excerpt,
              content: data?.post.content,
              featured_image_url: data?.post.featured_image_url,
              featured_image_alt: data?.post.featured_image_alt,
              status: data?.post.status,
              published_at: data?.post.published_at,
              seo_title: data?.post.seo_title,
              seo_description: data?.post.seo_description,
              og_title: data?.post.og_title,
              og_description: data?.post.og_description,
              og_image_url: data?.post.og_image_url,
              noindex: data?.post.noindex,
              canonical_url: data?.post.canonical_url,
              focus_keyword: data?.post.focus_keyword,
              tags: data?.post.tags,
              faq_items: data?.post.faq_items as BlogPostFaqItem[] | undefined,
            }}
            onSave={(payload) => updateM.mutate(payload)}
            saving={updateM.isPending}
            submitLabel="Wijzigingen opslaan"
          />
        </>
      )}
    </div>
  );
}
