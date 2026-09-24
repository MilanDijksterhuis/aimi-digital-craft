# Node Description Batch 45 of 57

Graphify is running in assistant/skill mode (no API key). You are the host
assistant (Claude Code / Codex / Gemini CLI). Read the prompt below and write
your JSON answer to the answer file.

## Prompt

You are documenting nodes in a knowledge graph.
For each entry below, write ONE concise factual plain-language sentence
describing what it is or does. Use only the provided context.
For a code symbol (kind=code-symbol — a function, class, or constant),
describe what the function/symbol does based on its name, source location
and neighbors — e.g. "Resolves the configured ontology profile from graphify.yaml.".
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "migrations_20260823120000_website_checker_public_cleanup_old_website_checks": "public.cleanup_old_website_checks()" | kind=code-symbol | source=supabase/migrations/20260823120000_website_checker.sql:L27 | neighbors=[20260823120000_website_checker.sql]
- "migrations_20260823120000_website_checker_public_website_checks": "public.website_checks" | kind=code-symbol | source=supabase/migrations/20260823120000_website_checker.sql:L8 | neighbors=[20260823120000_website_checker.sql]
- "migrations_20260916130000_blog_seo_fields_seed": "20260916130000_blog_seo_fields_seed.sql" | kind=code-symbol | source=supabase/migrations/20260916130000_blog_seo_fields_seed.sql:L1 | neighbors=[1727351 blog]
- "migrations_20260916140000_blog_posts_11_27_scheduled": "20260916140000_blog_posts_11_27_scheduled.sql" | kind=code-symbol | source=supabase/migrations/20260916140000_blog_posts_11_27_scheduled.sql:L1 | neighbors=[1727351 blog]
- "migrations_20260917090000_blog_seo_link_fields": "20260917090000_blog_seo_link_fields.sql" | kind=code-symbol | source=supabase/migrations/20260917090000_blog_seo_link_fields.sql:L1 | neighbors=[1727351 blog]
- "migrations_20260917110000_blog_batch2_seo_update_existing": "20260917110000_blog_batch2_seo_update_existing.sql" | kind=code-symbol | source=supabase/migrations/20260917110000_blog_batch2_seo_update_existing.sql:L1 | neighbors=[1727351 blog]
- "migrations_20260920090000_fix_wordpress_of_maatwerk_slug_collision": "20260920090000_fix_wordpress_of_maatwerk_slug_collision.sql" | kind=code-symbol | source=supabase/migrations/20260920090000_fix_wordpress_of_maatwerk_slug_collision.sql:L1 | neighbors=[4a960c6 SEO]
- "migrations_20260920093000_post_links_public_read": "20260920093000_post_links_public_read.sql" | kind=code-symbol | source=supabase/migrations/20260920093000_post_links_public_read.sql:L1 | neighbors=[4a960c6 SEO]
- "migrations_20260921100000_blog_batch3_comparison_drafts": "20260921100000_blog_batch3_comparison_drafts.sql" | kind=code-symbol | source=supabase/migrations/20260921100000_blog_batch3_comparison_drafts.sql:L1 | neighbors=[13e217a SEO]
- "public_site_error_body": "Body" | kind=code-symbol | source=src/routes/api/public/site-error.ts:L6 | neighbors=[site-error.ts]
- "public_site_error_cors": "cors" | kind=code-symbol | source=src/routes/api/public/site-error.ts:L12 | neighbors=[site-error.ts]
- "public_site_ping_body": "Body" | kind=code-symbol | source=src/routes/api/public/site-ping.ts:L6 | neighbors=[site-ping.ts]
- "public_site_ping_cors": "cors" | kind=code-symbol | source=src/routes/api/public/site-ping.ts:L12 | neighbors=[site-ping.ts]
- "routes_algemene_voorwaarden_voorwaardenpage": "VoorwaardenPage()" | kind=code-symbol | source=src/routes/algemene-voorwaarden.tsx:L26 | neighbors=[algemene-voorwaarden.tsx]
- "routes_authenticated_accountmenu": "AccountMenu()" | kind=code-symbol | source=src/routes/_authenticated.tsx:L148 | neighbors=[_authenticated.tsx]
- "routes_authenticated_authlayout": "AuthLayout()" | kind=code-symbol | source=src/routes/_authenticated.tsx:L34 | neighbors=[_authenticated.tsx]
- "routes_authenticated_inner": "Inner()" | kind=code-symbol | source=src/routes/_authenticated.tsx:L42 | neighbors=[_authenticated.tsx]
- "routes_b03bb73bce86422c6a74b3cfc829f2dd_txt_route": "Route" | kind=code-symbol | source=src/routes/b03bb73bce86422c6a74b3cfc829f2dd[.]txt.tsx:L7 | neighbors=[b03bb73bce86422c6a74b3cfc829f2dd[.]txt.…]
- "routes_blog_blog": "Blog()" | kind=code-symbol | source=src/routes/blog.tsx:L80 | neighbors=[blog.tsx]
- "routes_blog_bloglistitem": "BlogListItem" | kind=code-symbol | source=src/routes/blog.tsx:L10 | neighbors=[blog.tsx]
- "routes_blog_slug_blogpost": "BlogPost()" | kind=code-symbol | source=src/routes/blog_.$slug.tsx:L138 | neighbors=[blog_.$slug.tsx]
- "routes_blog_slug_blogpostdetail": "BlogPostDetail" | kind=code-symbol | source=src/routes/blog_.$slug.tsx:L18 | neighbors=[blog_.$slug.tsx]
- "routes_blog_slug_relatedpost": "RelatedPost" | kind=code-symbol | source=src/routes/blog_.$slug.tsx:L16 | neighbors=[blog_.$slug.tsx]
- "routes_blog_slug_route": "Route" | kind=code-symbol | source=src/routes/blog_.$slug.tsx:L38 | neighbors=[blog_.$slug.tsx]
- "routes_branches_branche": "Branche" | kind=code-symbol | source=src/routes/branches.tsx:L15 | neighbors=[branches.tsx]
- "routes_branches_branchegroup": "BrancheGroup" | kind=code-symbol | source=src/routes/branches.tsx:L16 | neighbors=[branches.tsx]
- "routes_branches_branches": "branches" | kind=code-symbol | source=src/routes/branches.tsx:L12 | neighbors=[branches.tsx]
- "routes_contact_contactpage": "ContactPage()" | kind=code-symbol | source=src/routes/contact.tsx:L54 | neighbors=[contact.tsx]
- "routes_faq_faqpage": "FaqPage()" | kind=code-symbol | source=src/routes/faq.tsx:L51 | neighbors=[faq.tsx]
- "routes_index_index": "Index()" | kind=code-symbol | source=src/routes/index.tsx:L66 | neighbors=[index.tsx]
- "routes_llms_full_txt_route": "Route" | kind=code-symbol | source=src/routes/llms-full[.]txt.tsx:L19 | neighbors=[llms-full[.]txt.tsx]
- "routes_llms_txt_route": "Route" | kind=code-symbol | source=src/routes/llms[.]txt.tsx:L88 | neighbors=[llms[.]txt.tsx]
- "routes_login_loginpage": "LoginPage()" | kind=code-symbol | source=src/routes/login.tsx:L20 | neighbors=[login.tsx]
- "routes_meer_diensten_bloom": "Bloom" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L121 | neighbors=[meer-diensten.tsx]
- "routes_meer_diensten_branch": "Branch" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L120 | neighbors=[meer-diensten.tsx]
- "routes_meer_diensten_detail_page": "DETAIL_PAGE" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L69 | neighbors=[meer-diensten.tsx]
- "routes_meer_diensten_embergroup": "EmberGroup" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L123 | neighbors=[meer-diensten.tsx]
- "routes_meer_diensten_fork": "FORK" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L89 | neighbors=[meer-diensten.tsx]
- "routes_meer_diensten_pt": "Pt" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L91 | neighbors=[meer-diensten.tsx]
- "routes_meer_diensten_qpoint": "qPoint()" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L93 | neighbors=[meer-diensten.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-044.json

Keep each description factual and concise (one sentence). No markdown, no prose
outside the JSON object. It is acceptable to omit a node if context is
insufficient — but include every node you can ground confidently.

Example answer format:
```json
{
  "node_id_1": "Resolves the configured ontology profile from graphify.yaml.",
  "node_id_2": "Colonel James Barclay, an antagonist in The Crooked Man."
}
```
