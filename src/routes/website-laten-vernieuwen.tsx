import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  SITE_URL,
  OG_IMAGE_URL,
  breadcrumbJsonLd,
  faqJsonLd,
  howToJsonLd,
  serviceJsonLd,
} from "@/lib/seo";

const URL = `${SITE_URL}/website-laten-vernieuwen`;
const RED = "#fe2c02";
const FONT = "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif";

/* ---------------------------------------------------------------------------
 * /website-laten-vernieuwen — dekt een zoekintentie die duidelijk anders is
 * dan "website laten maken": deze bezoeker heeft al een site en twijfelt
 * tussen opknappen en opnieuw bouwen. Die intentie kwam op de site alleen
 * terug als los FAQ-antwoord, terwijl het commercieel een van de sterkste
 * ingangen is: er is al budget en al een bedrijf.
 * ------------------------------------------------------------------------- */

const signals = [
  {
    title: "Hij is niet te bedienen op een telefoon",
    desc: "Meer dan de helft van je bezoek komt van mobiel. Moet iemand inzoomen en horizontaal scrollen, dan haakt hij af voordat hij weet wat je doet.",
  },
  {
    title: "Hij is traag",
    desc: "Sites van een paar jaar oud slepen vaak zware thema's, ongebruikte plugins en niet-geoptimaliseerde afbeeldingen mee. Dat kost bezoekers én is een van de weinige factoren die Google expliciet meeweegt.",
  },
  {
    title: "Je kunt er zelf niets in aanpassen",
    desc: "Als elke tekstwijziging een e-mail naar een bureau vereist, verandert er niets meer aan je site. Na een jaar staat er verouderde informatie die klanten actief wegjaagt.",
  },
  {
    title: "Hij levert geen aanvragen op",
    desc: "Een site die er prima uitziet maar nooit tot contact leidt, mist meestal geen ontwerp maar richting: onduidelijk aanbod, geen duidelijke volgende stap, of een formulier dat te veel vraagt.",
  },
  {
    title: "Er zitten beveiligingsproblemen in",
    desc: "Verouderde software met bekende kwetsbaarheden is een reëel risico. Bij een gehackte site ben je niet alleen je site kwijt, maar ook het vertrouwen van bezoekers en soms je positie in Google.",
  },
  {
    title: "Je bedrijf is veranderd, je site niet",
    desc: "Nieuwe diensten, een ander werkgebied of een andere doelgroep. Als je site nog het bedrijf van drie jaar geleden beschrijft, trek je de verkeerde aanvragen aan.",
  },
];

const steps = [
  { title: "We kijken naar je huidige site", desc: "Wat werkt er, wat niet, en wat is de daadwerkelijke reden dat je wilt vernieuwen? Soms is dat het ontwerp, vaak is het iets anders." },
  { title: "Opknappen of opnieuw bouwen", desc: "We zeggen eerlijk wat in jouw geval verstandiger is. Bij een gezonde basis is gericht verbeteren goedkoper; bij een verouderd fundament is doorrepareren weggegooid geld." },
  { title: "Behouden wat waarde heeft", desc: "Je bestaande URL's, teksten en afbeeldingen zijn vaak meer waard dan mensen denken. We inventariseren wat mee moet, zodat je niet opnieuw begint bij nul." },
  { title: "Bouwen en overzetten", desc: "We bouwen de nieuwe site naast de bestaande, zodat je huidige site gewoon online blijft tot de nieuwe klaar is." },
  { title: "Livegang met redirects", desc: "Verandert een URL, dan zetten we een permanente redirect van oud naar nieuw. Zo behoud je de posities en links die je in de loop der jaren hebt opgebouwd." },
];

const preserved = [
  "Je domeinnaam blijft gewoon van jou en verandert niet",
  "Bestaande URL's die goed gevonden worden, houden we waar mogelijk identiek",
  "Verandert een URL toch, dan komt er een 301-redirect van oud naar nieuw",
  "Teksten die aantoonbaar bezoekers trekken, nemen we mee in plaats van te herschrijven",
  "Je e-mailadressen en mailboxen blijven ongemoeid",
];

const faqs = [
  {
    q: "Wat kost het om een website te laten vernieuwen?",
    a: "Een vernieuwing valt qua prijs meestal in dezelfde range als een nieuwe site: vanaf € 499 voor een eenvoudige één-pagina site en € 749 voor een meerpagina-site met eigen ontwerp en CMS. Is je bestaande site technisch gezond en gaat het vooral om ontwerp en teksten, dan kan het minder werk zijn. Dat bepalen we na een blik op je huidige site.",
  },
  {
    q: "Verlies ik mijn positie in Google als ik mijn site vernieuw?",
    a: "Niet als het goed gebeurt. Het risico ontstaat wanneer URL's veranderen zonder dat er redirects worden ingesteld, of wanneer bestaande content zomaar verdwijnt. Wij houden URL's waar mogelijk gelijk en zetten permanente redirects waar dat niet kan. Een tijdelijke schommeling in de eerste weken is normaal; blijvend verlies hoort niet te gebeuren.",
  },
  {
    q: "Kan mijn huidige website blijven draaien tijdens de bouw?",
    a: "Ja. We bouwen de nieuwe site in een aparte omgeving, zodat je huidige site gewoon bereikbaar blijft. Pas als jij akkoord bent, zetten we hem live. De daadwerkelijke omschakeling duurt meestal niet langer dan een moment.",
  },
  {
    q: "Kan ik mijn bestaande teksten en foto's meenemen?",
    a: "Meestal wel, en vaak is dat ook verstandig. Teksten die goed gevonden worden, gooi je niet zomaar weg. We kijken samen wat waarde heeft, wat aangepast moet worden en wat weg kan.",
  },
  {
    q: "Is opknappen niet goedkoper dan opnieuw bouwen?",
    a: "Soms wel. Als het fundament gezond is en het probleem vooral in vormgeving of teksten zit, is gericht verbeteren de goedkoopste route. Maar bij een verouderd systeem met tientallen plugins gaat elke euro op aan repareren, en dan is opnieuw bouwen op termijn goedkoper. We zeggen eerlijk wat we zien, ook als het antwoord ons minder werk oplevert.",
  },
  {
    q: "Hoe lang duurt een vernieuwing?",
    a: "Voor de meeste sites rekenen we op ongeveer twee weken, gerekend vanaf het moment dat de teksten en het beeldmateriaal er zijn. Het aanleveren van content is in de praktijk vaker de vertragende factor dan het bouwen zelf.",
  },
  {
    q: "Ik weet niet wie mijn huidige site beheert. Is dat een probleem?",
    a: "Meestal niet. We kunnen bijna altijd achterhalen waar je domeinnaam en hosting staan. Zolang jij aantoonbaar de eigenaar van het domein bent, kunnen we de verhuizing regelen, ook als het contact met je vorige bouwer is verwaterd.",
  },
];

export const Route = createFileRoute("/website-laten-vernieuwen")({
  head: () => ({
    meta: [
      { title: "Website laten vernieuwen | Opknappen of opnieuw bouwen — AIMI" },
      {
        name: "description",
        content:
          "Website laten vernieuwen zonder je posities in Google te verliezen. We zeggen eerlijk of opknappen genoeg is of dat opnieuw bouwen goedkoper uitpakt.",
      },
      { property: "og:title", content: "Website laten vernieuwen — AIMI" },
      {
        property: "og:description",
        content: "Oude website opknappen of opnieuw bouwen? Met behoud van je URL's, teksten en posities.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Website laten vernieuwen — AIMI" },
      {
        name: "twitter:description",
        content: "Oude website opknappen of opnieuw bouwen? Met behoud van je URL's, teksten en posities.",
      },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      serviceJsonLd({
        id: `${URL}#service`,
        name: "Website laten vernieuwen",
        serviceType: "Websiteredesign en migratie",
        description:
          "Bestaande websites vernieuwen met behoud van URL's, content en posities, inclusief redirects en migratie.",
        url: URL,
      }),
      howToJsonLd({
        name: "Zo vernieuwen we je website",
        description:
          "Van analyse van je huidige site tot livegang met redirects, met behoud van wat al waarde heeft.",
        steps,
      }),
      faqJsonLd(faqs),
      breadcrumbJsonLd([["Home", "/"], ["Website laten vernieuwen", "/website-laten-vernieuwen"]]),
    ],
  }),
  component: VernieuwenPage,
});

function VernieuwenPage() {
  return (
    <div style={{ background: "#0f1010", minHeight: "100vh", fontFamily: FONT, color: "#efeff1" }}>
      <Nav />

      <main id="main-content">
        <section className="pt-32 pb-16">
          <div className="mx-auto max-w-7xl px-6">
            <Breadcrumbs className="mb-6" trail={[["Home", "/"], ["Website laten vernieuwen", "/website-laten-vernieuwen"]]} />
            <div className="text-[13px] font-medium mb-4" style={{ color: RED }}>
              Vernieuwen
            </div>
            <h1
              className="max-w-3xl"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1 }}
            >
              Website laten vernieuwen
            </h1>
            <p className="mt-6 max-w-2xl text-[16px] leading-relaxed" style={{ color: "#a4a9b2" }}>
              Je hebt al een website, maar hij doet niet meer wat hij zou moeten doen. De vraag is dan zelden
              "hoe ziet hij eruit" maar "is dit nog te redden". Wij kijken eerst naar je huidige site en zeggen
              eerlijk of opknappen genoeg is, of dat opnieuw bouwen je op termijn goedkoper uitkomt.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">
                Laat je site bekijken
              </Link>
              <Link to="/tarieven" className="btn-secondary">
                Bekijk tarieven
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16" style={{ background: "#161717" }}>
          <div className="mx-auto max-w-7xl px-6">
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
              Wanneer is vernieuwen de moeite waard?
            </h2>
            <p className="mt-4 max-w-2xl text-[15px]" style={{ color: "#a4a9b2" }}>
              Herken je twee of meer van deze punten, dan kost je huidige site je waarschijnlijk meer dan een
              nieuwe zou kosten.
            </p>
            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {signals.map((s) => (
                <div key={s.title} className="p-6" style={{ border: "1px solid #2a2b2b", borderRadius: "14px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 600 }}>{s.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed" style={{ color: "#a4a9b2" }}>
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-3xl px-6">
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
              Wat je niet kwijtraakt
            </h2>
            <p className="mt-4 text-[15px]" style={{ color: "#a4a9b2" }}>
              De grootste angst bij een vernieuwing is dat je jarenlang opgebouwde vindbaarheid weggooit. Dat hoeft
              niet te gebeuren, mits de migratie zorgvuldig verloopt.
            </p>
            <ul className="mt-8 space-y-3">
              {preserved.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[15px]" style={{ color: "#a4a9b2" }}>
                  <Check className="w-4 h-4 mt-1 shrink-0" style={{ color: "#49de80" }} />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[14px] leading-relaxed" style={{ color: "#868b94" }}>
              Twijfel je of je site überhaupt vernieuwd moet worden? Lees dan eerst{" "}
              <Link to="/wordpress-of-maatwerk" style={{ color: "#efeff1" }}>
                WordPress of maatwerk
              </Link>
              , of bekijk wat een{" "}
              <Link to="/seo" style={{ color: "#efeff1" }}>
                SEO-traject
              </Link>{" "}
              op je bestaande site kan opleveren.
            </p>
          </div>
        </section>

        <section className="py-16" style={{ background: "#161717" }}>
          <div className="mx-auto max-w-3xl px-6">
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
              Hoe een vernieuwing verloopt
            </h2>
            <ol className="mt-10 grid gap-6">
              {steps.map((s, i) => (
                <li key={s.title} className="flex gap-5">
                  <span style={{ color: RED, fontWeight: 700, fontSize: "13px", minWidth: "24px", marginTop: "3px" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 style={{ fontSize: "15.5px", fontWeight: 600 }}>{s.title}</h3>
                    <p className="mt-1.5 text-[14.5px] leading-relaxed" style={{ color: "#a4a9b2" }}>
                      {s.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-3xl px-6">
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
              Veelgestelde vragen over vernieuwen
            </h2>
            <div className="mt-10 space-y-6">
              {faqs.map((f) => (
                <div key={f.q} className="pb-6" style={{ borderBottom: "1px solid #2a2b2b" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 500 }}>{f.q}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed" style={{ color: "#a4a9b2" }}>
                    {f.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20" style={{ background: "#161717" }}>
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
              Even meekijken met je huidige site?
            </h2>
            <p className="mt-4 text-[16px]" style={{ color: "#a4a9b2" }}>
              Stuur je website-adres. Je krijgt binnen één werkdag een eerlijke inschatting: opknappen, opnieuw
              bouwen, of gewoon laten zoals hij is.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link to="/contact" className="btn-primary group">
                Vraag een beoordeling aan
                <ArrowRight className="w-4 h-4 arrow" />
              </Link>
              <Link to="/website-laten-maken" className="btn-secondary">
                Nieuwe website laten maken
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <CookieBanner />
    </div>
  );
}
