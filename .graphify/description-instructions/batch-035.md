# Node Description Batch 36 of 52

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

- "lib_admin_server_adminupdateuseremail": "adminUpdateUserEmail()" | kind=code-symbol | source=src/lib/admin.server.ts:L101 | neighbors=[admin.server.ts]
- "lib_admin_server_staff": "STAFF" | kind=code-symbol | source=src/lib/admin.server.ts:L226 | neighbors=[admin.server.ts]
- "lib_blog_functions_adminbulkdeleteblogposts": "adminBulkDeleteBlogPosts" | kind=code-symbol | source=src/lib/blog.functions.ts:L106 | neighbors=[blog.functions.ts]
- "lib_blog_functions_adminbulkscheduleblogposts": "adminBulkScheduleBlogPosts" | kind=code-symbol | source=src/lib/blog.functions.ts:L160 | neighbors=[blog.functions.ts]
- "lib_blog_functions_adminbulksetblogpoststatus": "adminBulkSetBlogPostStatus" | kind=code-symbol | source=src/lib/blog.functions.ts:L116 | neighbors=[blog.functions.ts]
- "lib_blog_functions_adminbulkshiftblogposts": "adminBulkShiftBlogPosts" | kind=code-symbol | source=src/lib/blog.functions.ts:L174 | neighbors=[blog.functions.ts]
- "lib_blog_functions_admincreateblogpost": "adminCreateBlogPost" | kind=code-symbol | source=src/lib/blog.functions.ts:L60 | neighbors=[blog.functions.ts]
- "lib_blog_functions_admindeleteblogpost": "adminDeleteBlogPost" | kind=code-symbol | source=src/lib/blog.functions.ts:L86 | neighbors=[blog.functions.ts]
- "lib_blog_functions_adminduplicateblogpost": "adminDuplicateBlogPost" | kind=code-symbol | source=src/lib/blog.functions.ts:L96 | neighbors=[blog.functions.ts]
- "lib_blog_functions_admingetblogpost": "adminGetBlogPost" | kind=code-symbol | source=src/lib/blog.functions.ts:L50 | neighbors=[blog.functions.ts]
- "lib_blog_functions_admingetpostlinks": "adminGetPostLinks" | kind=code-symbol | source=src/lib/blog.functions.ts:L130 | neighbors=[blog.functions.ts]
- "lib_blog_functions_adminlistblogposts": "adminListBlogPosts" | kind=code-symbol | source=src/lib/blog.functions.ts:L41 | neighbors=[blog.functions.ts]
- "lib_blog_functions_adminrescheduleblogpost": "adminRescheduleBlogPost" | kind=code-symbol | source=src/lib/blog.functions.ts:L150 | neighbors=[blog.functions.ts]
- "lib_blog_functions_adminsuggestlinktargets": "adminSuggestLinkTargets" | kind=code-symbol | source=src/lib/blog.functions.ts:L140 | neighbors=[blog.functions.ts]
- "lib_blog_functions_adminupdateblogpost": "adminUpdateBlogPost" | kind=code-symbol | source=src/lib/blog.functions.ts:L70 | neighbors=[blog.functions.ts]
- "lib_blog_functions_bulkscheduleoptionsschema": "bulkScheduleOptionsSchema" | kind=code-symbol | source=src/lib/blog.functions.ts:L34 | neighbors=[blog.functions.ts]
- "lib_blog_functions_faqitemschema": "faqItemSchema" | kind=code-symbol | source=src/lib/blog.functions.ts:L8 | neighbors=[blog.functions.ts]
- "lib_blog_functions_postinputschema": "postInputSchema" | kind=code-symbol | source=src/lib/blog.functions.ts:L13 | neighbors=[blog.functions.ts]
- "lib_blog_functions_statusenum": "statusEnum" | kind=code-symbol | source=src/lib/blog.functions.ts:L6 | neighbors=[blog.functions.ts]
- "lib_blog_links_parsedinternallink": "ParsedInternalLink" | kind=code-symbol | source=src/lib/blog-links.ts:L5 | neighbors=[blog-links.ts]
- "lib_blog_server_adminbulkdeleteblogpostsimpl": "adminBulkDeleteBlogPostsImpl()" | kind=code-symbol | source=src/lib/blog.server.ts:L472 | neighbors=[blog.server.ts]
- "lib_blog_server_adminbulkscheduleblogpostsimpl": "adminBulkScheduleBlogPostsImpl()" | kind=code-symbol | source=src/lib/blog.server.ts:L426 | neighbors=[blog.server.ts]
- "lib_blog_server_adminbulksetstatusimpl": "adminBulkSetStatusImpl()" | kind=code-symbol | source=src/lib/blog.server.ts:L478 | neighbors=[blog.server.ts]
- "lib_blog_server_adminbulkshiftblogpostsimpl": "adminBulkShiftBlogPostsImpl()" | kind=code-symbol | source=src/lib/blog.server.ts:L452 | neighbors=[blog.server.ts]
- "lib_blog_server_admindeleteblogpostimpl": "adminDeleteBlogPostImpl()" | kind=code-symbol | source=src/lib/blog.server.ts:L233 | neighbors=[blog.server.ts]
- "lib_blog_server_admingetblogpostimpl": "adminGetBlogPostImpl()" | kind=code-symbol | source=src/lib/blog.server.ts:L24 | neighbors=[blog.server.ts]
- "lib_blog_server_admingetpostlinksimpl": "adminGetPostLinksImpl()" | kind=code-symbol | source=src/lib/blog.server.ts:L291 | neighbors=[blog.server.ts]
- "lib_blog_server_adminlistblogpostsimpl": "adminListBlogPostsImpl()" | kind=code-symbol | source=src/lib/blog.server.ts:L15 | neighbors=[blog.server.ts]
- "lib_blog_server_adminrescheduleblogpostimpl": "adminRescheduleBlogPostImpl()" | kind=code-symbol | source=src/lib/blog.server.ts:L407 | neighbors=[blog.server.ts]
- "lib_blog_server_blogpostinput": "BlogPostInput" | kind=code-symbol | source=src/lib/blog.server.ts:L35 | neighbors=[blog.server.ts]
- "lib_blog_server_blogpoststatus": "BlogPostStatus" | kind=code-symbol | source=src/lib/blog.server.ts:L6 | neighbors=[blog.server.ts]
- "lib_blog_server_stopwords": "STOPWORDS" | kind=code-symbol | source=src/lib/blog.server.ts:L335 | neighbors=[blog.server.ts]
- "lib_contact_functions_admin_like": "ADMIN_LIKE" | kind=code-symbol | source=src/lib/contact.functions.ts:L7 | neighbors=[contact.functions.ts]
- "lib_contact_functions_admindeletecontactsubmission": "adminDeleteContactSubmission" | kind=code-symbol | source=src/lib/contact.functions.ts:L100 | neighbors=[contact.functions.ts]
- "lib_contact_functions_adminlistcontactsubmissions": "adminListContactSubmissions" | kind=code-symbol | source=src/lib/contact.functions.ts:L73 | neighbors=[contact.functions.ts]
- "lib_contact_functions_admintogglecontacthandled": "adminToggleContactHandled" | kind=code-symbol | source=src/lib/contact.functions.ts:L86 | neighbors=[contact.functions.ts]
- "lib_contact_functions_ensurestaff": "ensureStaff()" | kind=code-symbol | source=src/lib/contact.functions.ts:L9 | neighbors=[contact.functions.ts]
- "lib_contact_functions_notifycontactsubmission": "notifyContactSubmission()" | kind=code-symbol | source=src/lib/contact.functions.ts:L44 | neighbors=[contact.functions.ts]
- "lib_contact_functions_staff_roles": "STAFF_ROLES" | kind=code-symbol | source=src/lib/contact.functions.ts:L6 | neighbors=[contact.functions.ts]
- "lib_contact_functions_submitcontactform": "submitContactForm" | kind=code-symbol | source=src/lib/contact.functions.ts:L7 | neighbors=[contact.functions.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-035.json

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
