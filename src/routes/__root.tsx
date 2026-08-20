import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import { useEffect } from "react";
import appCss from "../styles.css?url";
import { Toaster } from "@/components/ui/sonner";
import { ConfirmProvider } from "@/components/ConfirmDialog";
import { AnalyticsLoader } from "@/components/AnalyticsLoader";
import { SITE_URL, LOGO_URL, OG_IMAGE_URL, ORG_ID } from "@/lib/seo";

const SITE_TRACK_UID = "6a34e404-ba3e-42d4-965c-62d04aef0f93";

function NotFoundComponent() {
  // De noindex voor 404's wordt server-side afgedwongen via de
  // X-Robots-Tag-header (server.ts) — betrouwbaarder dan een client-side
  // meta-tag, die crawlers pas na JS-executie zien.
  useEffect(() => {
    document.title = "Pagina niet gevonden — AIMI";
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Pagina niet gevonden</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          De pagina die je zoekt bestaat niet (meer) of is verplaatst.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Naar de homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  // De root error boundary vangt de fout intern af (TanStack Router), dus
  // die bereikt window.onerror nooit — en dus ook nooit de site_errors-tabel
  // die track.js daarop baseert. Log hem hier expliciet zodat crashes
  // (bv. het "This page didn't load"-scherm na inloggen op mobiel) zichtbaar
  // worden in het Alerts-scherm ipv onzichtbaar te blijven.
  useEffect(() => {
    try {
      fetch(`/api/public/site-error`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: SITE_TRACK_UID,
          message: `RootErrorBoundary: ${error?.message ?? String(error)}`.slice(0, 1900),
          url: typeof location !== "undefined" ? location.href : undefined,
        }),
      }).catch(() => {});
    } catch {}
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Deze pagina kon niet laden
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Er ging iets mis aan onze kant. Probeer de pagina te verversen of ga terug naar de homepage.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Probeer opnieuw
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Naar de homepage
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AIMI — Web Agency" },
      { name: "description", content: "AIMI is een web agency van Aidan & Milan. Design, development & hosting voor groeiende merken." },
      { name: "author", content: "AIMI" },
      { property: "og:site_name", content: "AIMI" },
      { property: "og:title", content: "AIMI — Web Agency" },
      { property: "og:description", content: "Design, development & hosting door Aidan & Milan." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "nl_NL" },
      // Default og:image — dienstpagina's overschrijven dit met hun eigen tags,
      // maar pagina's die dat vergeten (of nieuw zijn) staan hierdoor nooit zonder.
      { property: "og:image", content: OG_IMAGE_URL },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "AIMI — Web Agency" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "AIMI — Web Agency" },
      { name: "twitter:description", content: "Design, development & hosting door Aidan & Milan." },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/manifest.json" },
      // Plus Jakarta Sans wordt nu self-hosted via @font-face in styles.css
      // (fonts.googleapis.com werd door onze CSP geblokkeerd). Preload de
      // primaire (latin) woff2 zodat tekst sneller in het juiste font rendert.
      {
        rel: "preload",
        href: "/fonts/plus-jakarta-sans-latin-wght-normal.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
    ],
    scripts: [
      {
        // Structured data: laat Google het AIMI-logo tonen naast de site in de zoekresultaten.
        // Eén entiteit op ORG_ID met een type-array (i.p.v. losse Organization/
        // ProfessionalService-blokken per pagina die hetzelfde @id claimden).
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["Organization", "ProfessionalService"],
          "@id": ORG_ID,
          name: "AIMI",
          alternateName: "AIMI Development",
          url: SITE_URL,
          logo: LOGO_URL,
          image: LOGO_URL,
          email: "sales@aimi-development.nl",
          description:
            "AIMI is een web agency van Aidan & Milan. We ontwerpen, bouwen en hosten snelle, premium websites voor groeiende merken.",
          areaServed: [
            { "@type": "AdministrativeArea", name: "Groningen" },
            { "@type": "AdministrativeArea", name: "Drenthe" },
            { "@type": "City", name: "Veendam" },
            { "@type": "City", name: "Hoogeveen" },
            { "@type": "Country", name: "Nederland" },
          ],
          founder: [
            { "@type": "Person", name: "Aidan" },
            { "@type": "Person", name: "Milan" },
          ],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Web services",
            itemListElement: [
              {
                "@type": "Offer",
                name: "Starter",
                price: "499",
                priceCurrency: "EUR",
                availability: "https://schema.org/InStock",
                url: `${SITE_URL}/#pricing`,
                priceValidUntil: "2027-08-19",
              },
              {
                "@type": "Offer",
                name: "Pro",
                price: "749",
                priceCurrency: "EUR",
                availability: "https://schema.org/InStock",
                url: `${SITE_URL}/#pricing`,
                priceValidUntil: "2027-08-19",
              },
            ],
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          url: SITE_URL,
          name: "AIMI",
          inLanguage: "nl-NL",
          publisher: { "@id": ORG_ID },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <head>
        <HeadContent />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Ga naar hoofdinhoud
        </a>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ConfirmProvider>
        <Outlet />
      </ConfirmProvider>
      <Toaster />
      <AnalyticsLoader />
    </QueryClientProvider>
  );
}
