-- Vult seo_title/seo_description in voor de 10 bestaande (gemigreerde) blogposts
-- uit 20260916120000_blog_cms_module.sql. Losse SEO-teksten aangeleverd door de
-- klant, matched op slug (dezelfde volgorde als de oorspronkelijke content).

UPDATE public.blog_posts SET
  seo_title = $st1$Wat gebeurt er als je WordPress-site gehackt wordt?$st1$,
  seo_description = $sd1$Een gehackte WordPress-site kost je klanten, rankings en vertrouwen. Lees wat er echt gebeurt bij een hack en hoe je het voorkomt.$sd1$
WHERE slug = 'wordpress-site-gehackt';

UPDATE public.blog_posts SET
  seo_title = $st2$Website-snelheid: waarom Core Web Vitals je meer klanten opleveren$st2$,
  seo_description = $sd2$Een trage website kost je bezoekers én omzet. Ontdek wat Core Web Vitals zijn en waarom snelheid direct invloed heeft op je aantal klanten.$sd2$
WHERE slug = 'core-web-vitals-website-snelheid';

UPDATE public.blog_posts SET
  seo_title = $st3$Self-hosten op een VPS: is dat iets voor kleine bedrijven?$st3$,
  seo_description = $sd3$VPS-hosting klinkt technisch, maar is vaak sneller, veiliger en voordeliger dan gedeelde hosting. Lees of het bij jouw bedrijf past.$sd3$
WHERE slug = 'vps-hosting-kleine-bedrijven';

UPDATE public.blog_posts SET
  seo_title = $st4$Gratis website-checker: wat wij controleren en waarom$st4$,
  seo_description = $sd4$Onze gratis website-checker scant snelheid, beveiliging en SEO in een paar minuten. Lees wat er precies gecontroleerd wordt en waarom dat telt.$sd4$
WHERE slug = 'gratis-website-checker-uitleg';

UPDATE public.blog_posts SET
  seo_title = $st5$Google Business Profile: 5 fouten die lokale bedrijven maken$st5$,
  seo_description = $sd5$Een slecht ingericht Google Business Profile kost je lokale klanten. Dit zijn de 5 meest voorkomende fouten en hoe je ze oplost.$sd5$
WHERE slug = 'google-business-profile-fouten';

UPDATE public.blog_posts SET
  seo_title = $st6$Waarom je website geen klanten oplevert (ook al is hij mooi)$st6$,
  seo_description = $sd6$Een mooie website betekent niet automatisch meer klanten. Lees waarom conversie en design twee dingen zijn en hoe je ze samenbrengt.$sd6$
WHERE slug = 'mooi-versus-converteert';

UPDATE public.blog_posts SET
  seo_title = $st7$Wat kost website-onderhoud per maand? Met echte voorbeelden$st7$,
  seo_description = $sd7$Een website is nooit "af" na livegang. Lees wat website-onderhoud in de praktijk kost, wat je ervoor krijgt en waarom het zichzelf terugverdient.$sd7$
WHERE slug = 'onderhoudskosten-na-livegang';

UPDATE public.blog_posts SET
  seo_title = $st8$Webshop vs. gewone website: wanneer heb je een webshop nodig?$st8$,
  seo_description = $sd8$Niet elk bedrijf heeft een webshop nodig. Lees wanneer een webshop wél zin heeft en wanneer een gewone website juist beter werkt.$sd8$
WHERE slug = 'webshop-vs-gewone-website';

UPDATE public.blog_posts SET
  seo_title = $st9$Website laten maken in Groningen: waarom veel bedrijven achterlopen$st9$,
  seo_description = $sd9$Veel bedrijven in Groningen en Drenthe hebben een verouderde website. Lees waarom dat zo is en wat het je aan klanten kost.$sd9$
WHERE slug = 'verouderde-websites-groningen-drenthe';

UPDATE public.blog_posts SET
  seo_title = $st10$Checklist: is het tijd voor een nieuwe website?$st10$,
  seo_description = $sd10$Twijfel je of je website nog voldoet? Deze checklist met 10 concrete punten laat zien of het tijd is voor een nieuwe website.$sd10$
WHERE slug = 'checklist-nieuwe-website';
