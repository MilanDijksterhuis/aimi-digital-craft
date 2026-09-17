# Blog-CMS: interne linking, SEO en planning

Uitbreiding op de bestaande blog-module (`supabase/migrations/20260916120000_blog_cms_module.sql`).
Alles hieronder is opt-in: bestaande posts blijven werken, nieuwe velden zijn
nullable of hebben een veilige default.

## Database

- `20260917090000_blog_seo_link_fields.sql` — extra kolommen op `blog_posts`:
  `og_title`, `og_description`, `og_image_url`, `noindex`, `canonical_url`,
  `focus_keyword`, `tags` (`text[]`), `faq_items` (`jsonb`), `featured_image_alt`.
- `20260917091000_post_links.sql` — `post_links`-tabel: relationele opslag van
  interne links (`from_post_id`, `to_post_id`/`to_post_slug` of `to_page_path`,
  `anchor_text`).
- `20260917092000_redirects.sql` — `redirects`-tabel (`from_path` → `to_path`).

## Interne links (punt 1-5 van de eisen)

- **Link-picker**: `src/components/InternalLinkPicker.tsx`, een doorzoekbare
  `cmdk`-dialoog (gepubliceerde posts + kernpagina's uit `src/lib/site-pages.ts`).
  Voegt `[titel](/pad)` in op de cursorpositie in de content-textarea
  (`BlogPostForm.tsx`).
- **Opslag**: bij elke create/update wordt `post_links` volledig herberekend
  uit de markdown-content (`syncPostLinks` in `blog.server.ts`) — de content is
  de bron van waarheid, geen aparte "link toevoegen"-actie nodig.
- **Inkomend/uitgaand + broken links**: `BlogPostLinksPanel.tsx`, gevoed door
  `adminGetPostLinks`. Een uitgaande link is "broken" als de doelpost niet meer
  bestaat of niet (meer) `published` is.
- **Suggesties**: `adminSuggestLinkTargets` scoort andere gepubliceerde posts
  op gedeelde tags (zwaar) en gedeelde woorden in titel/focus-zoekwoord
  (licht) — puur lokaal, geen externe API.

## SEO-velden (punt 6-16)

Alles in `BlogPostForm.tsx`, gegroepeerd in kaarten: SEO (titel/omschrijving +
Google-preview + canonical/noindex), Open Graph (met share-card-preview),
FAQ-blokken (optioneel, worden zichtbaar getoond op de post én gebruikt voor
FAQPage-schema — nooit verzonnen content), en een niet-blokkerende
SEO-checklist onderaan.

- Uitgelichte afbeelding: alt-tekst is verplicht zodra er een afbeelding is
  gekozen (blokkeert opslaan). Afbeeldingen in de body (`![alt](url)`, nieuw
  ondersteund in `src/lib/markdown.tsx`) zonder alt-tekst geven een
  waarschuwing (niet blokkerend).
- JSON-LD: `articleJsonLd` (nieuw) + bestaande `webPageJsonLd`/`breadcrumbJsonLd`
  + `faqJsonLd` (alleen als er FAQ-items zijn) worden gerenderd in
  `src/routes/blog_.$slug.tsx`.
- Sitemap (`src/routes/sitemap[.]xml.tsx`) sluit `noindex`-posts en
  niet-gepubliceerde posts uit.

## Redirects (punt 12)

- Beheer-UI: tab "Redirects" in `/admin/blog` (`RedirectsPanel.tsx`).
- Automatisch: wijzig je de slug van een **gepubliceerde** post, dan toont de
  editor een waarschuwing met een (standaard aangevinkte) optie om automatisch
  een 301-redirect van de oude naar de nieuwe URL aan te maken.
- Uitvoering: `src/server.ts` checkt op elke request (vóór routing) de
  `redirects`-tabel via een 60s in-memory cache en geeft een 301 terug bij een
  match.

## Planning & agenda (punt 17-22)

- Bulk-plannen: selecteer concepten in de lijst → "Plannen" opent
  `BulkScheduleDialog.tsx` (volgorde sleepbaar met `@dnd-kit`, startdatum/tijd,
  interval-presets + custom, "alleen werkdagen"-toggle, preview vóór
  bevestigen).
- Bulk-herplannen: "Herplannen" verschuift geselecteerde geplande posts met
  N dagen (`adminBulkShiftBlogPosts`).
- Agenda: tab "Kalender" (`BlogCalendar.tsx`) — maand/week/lijst-weergave.
  Chips zijn sleepbaar tussen dagen (reschedule, tijd-component blijft
  behouden) en klikbaar naar de editor.
- Automatisch publiceren: ongewijzigd — `scripts/publish-scheduled-posts.js`,
  draait via crontab op de VPS (zie het script zelf voor details). Zet
  `scheduled` → `published` zodra `published_at` verstreken is; de sitemap
  pakt gepubliceerde posts direct op bij de volgende request.

## Niet meegenomen / bewust simpel gehouden

- Geen nieuwe dependencies: `@dnd-kit/*`, `date-fns`, `cmdk` en de
  Radix Dialog/Command-componenten waren al aanwezig in het project.
- Concepten (zonder `published_at`) staan niet in de kalender — daar is geen
  zinvolle datum voor. Plan ze eerst via bulk-plannen of de editor.
- `types.ts` is normaliter gegenereerd (`supabase gen types typescript`, zie
  CODE-4); de nieuwe kolommen/tabellen zijn er handmatig aan toegevoegd zodat
  de types kloppen totdat je hem opnieuw genereert tegen de live database.
