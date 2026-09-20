-- SEO-audit 2026-09-20, bevinding A2-1: de scheduled blogpost 'wordpress-of-maatwerk'
-- botst met de bestaande statische pagina /wordpress-of-maatwerk. De bronmigratie
-- (20260917120000_blog_batch2_new_posts_scheduled.sql) is al aangepast naar de
-- nieuwe slug, maar als die migratie vóór deze fix al is toegepast op de database,
-- corrigeert deze UPDATE de al ingevoegde rij. Geen effect als de rij niet bestaat
-- of de slug al klopt.
UPDATE public.blog_posts
SET slug = 'wordpress-of-maatwerk-verschil'
WHERE slug = 'wordpress-of-maatwerk';
