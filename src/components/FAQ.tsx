import { useState } from "react";
import { motion } from "motion/react";
import { Plus } from "lucide-react";

export const faqItems = [
  {
    q: "Hoelang duurt een project?",
    a: "Een standaard website staat gemiddeld binnen 2 tot 4 weken live, afhankelijk van de omvang en hoe snel we content en feedback ontvangen. Een Pro-traject plan je in op 3–5 weken. Voor een spoedopdracht kunnen we vaak sneller schakelen.",
  },
  {
    q: "Wat als ik geen content of teksten heb?",
    a: "Geen probleem. We helpen je met een basis copystructuur. Voor uitgebreide copywriting werken we samen met vaste tekstschrijvers vraag ernaar tijdens het intakegesprek.",
  },
  {
    q: "Kan ik later upgraden van Starter naar Pro?",
    a: "Ja. We bouwen Starter-sites zo dat uitbreiding eenvoudig is. De investering die je al hebt gedaan verrekenen we deels in het Pro-traject.",
  },
  {
    q: "Wie is eigenaar van de website en de domeinnaam na oplevering?",
    a: "Jij. Na oplevering ben je volledig eigenaar van de website, de broncode en de domeinnaam. Er zit geen lock-in of afhankelijkheid van AIMI in de overeenkomst je kunt op elk moment overstappen naar een andere partij, mocht je dat willen.",
  },
  {
    q: "Kan ik zelf teksten en afbeeldingen aanpassen na livegang?",
    a: "Ja. Elke website die we opleveren krijgt een eenvoudig te gebruiken beheeromgeving waarmee je zelf teksten, afbeeldingen en content kunt bijwerken, zonder technische kennis nodig te hebben. Voor grotere aanpassingen aan structuur of design staan we uiteraard klaar.",
  },
  {
    q: "Wat kost het om mijn website later uit te breiden?",
    a: "Dat hangt af van de uitbreiding een extra pagina, een boekingsmodule of een webshop toevoegen zijn allemaal apart te offreren. Omdat we alles zelf bouwen en hosten, kunnen we een bestaande site eenvoudig uitbreiden zonder dat je opnieuw moet beginnen. Je krijgt altijd vooraf een heldere prijsopgave.",
  },
  {
    q: "Werken jullie met een contract en wat zijn de opzegtermijnen?",
    a: "Voor de bouw van een website werk je met een eenmalige offerte, geen doorlopend contract. Voor hosting en onderhoud geldt een maandabonnement zonder langlopende verplichting, met een opzegtermijn van één maand. Zo blijf je nergens aan vastzitten.",
  },
  {
    q: "Werken jullie ook voor bedrijven buiten Veendam of Hoogeveen?",
    a: "Zeker. We werken veel voor ondernemers in Veendam, Hoogeveen en de rest van Groningen en Drenthe, maar we bouwen websites voor klanten in heel Nederland. Alles kan op afstand, en persoonlijk contact blijft altijd mogelijk.",
  },
  {
    q: "Wat kost een website laten maken?",
    a: "Een professionele website bij AIMI start vanaf € 499. De uiteindelijke prijs hangt af van het aantal pagina's, de gewenste functionaliteiten en of je bijvoorbeeld een blog of boekingssysteem nodig hebt. Je krijgt altijd vooraf een vaste prijs — geen uurtje-factuurtje.",
  },
  {
    q: "Wat kost een webshop laten maken?",
    a: "Een webshop is maatwerk en start doorgaans hoger dan een reguliere website, omdat er betaalmethodes, producten en een beheeromgeving bij komen kijken. Je krijgt vooraf een heldere offerte op basis van jouw wensen en aantal producten.",
  },
  {
    q: "Wat kost hosting en onderhoud?",
    a: "Onze hosting start vanaf € 30 per maand, inclusief beveiliging, updates, back-ups en monitoring. Er zijn geen setup-kosten wanneer we een bestaande site overnemen.",
  },
  {
    q: "Is SEO inbegrepen?",
    a: "De technische SEO-basis zit standaard in elk project: snelle laadtijden, nette structuur, meta-tags en mobielvriendelijk. Uitgebreidere SEO-campagnes bieden we los aan.",
  },
  {
    q: "Komt mijn website ook goed vindbaar in Google?",
    a: "Ja. We bouwen elke site technisch SEO-proof, inclusief snelle laadtijden en nette productpagina's, en optimaliseren ook voor lokale zoekwoorden zoals 'website laten maken Veendam' of 'Hoogeveen'. Zo word je gevonden door klanten uit jouw regio.",
  },
  {
    q: "Wat houdt SEO-optimalisatie precies in?",
    a: "We combineren technische SEO (crawlbaarheid, sitemap, structured data, laadsnelheid) met content-SEO (zoekwoordonderzoek, paginateksten, interne links) zodat je site beter gevonden wordt op zoektermen die daadwerkelijk klanten opleveren, lokaal én landelijk.",
  },
  {
    q: "Hoe lang duurt het voordat SEO resultaat oplevert?",
    a: "De eerste technische verbeteringen zijn vaak binnen enkele weken zichtbaar in Search Console. Stijgingen in posities voor concurrerende zoekwoorden kosten doorgaans 2 tot 4 maanden, afhankelijk van je huidige startpositie en de concurrentie in jouw branche.",
  },
  {
    q: "Doen jullie ook lokale SEO voor Veendam, Hoogeveen of de regio?",
    a: "Ja. Naast landelijke vindbaarheid optimaliseren we ook specifiek voor lokale zoekopdrachten zoals 'website laten maken in de buurt', inclusief een correcte koppeling met je Google Bedrijfsprofiel en lokale structured data.",
  },
  {
    q: "Welke betaalmethodes zijn mogelijk bij een webshop?",
    a: "We koppelen gangbare Nederlandse betaalmethodes zoals iDEAL, creditcard en Bancontact via een betrouwbare betaalprovider, zodat klanten veilig en vertrouwd kunnen afrekenen.",
  },
  {
    q: "Kan ik zelf producten en voorraad beheren?",
    a: "Ja. Je krijgt een overzichtelijke beheeromgeving waarin je producten, prijzen, voorraad en bestellingen zelf kunt beheren, zonder technische kennis.",
  },
  {
    q: "Wat is inbegrepen bij hosting?",
    a: "SSL-certificaat, dagelijkse back-ups, 24/7 uptime-monitoring en automatische security-updates zitten standaard in het abonnement, zonder verborgen kosten. Je site draait op een eigen VPS met Nederlandse servers geen gedeelde hosting, geen verborgen limieten.",
  },
  {
    q: "Wat als ik al een website heb?",
    a: "Dan nemen we je bestaande site kosteloos over en migreren we 'm naar onze eigen Nederlandse VPS, ongeacht waar hij nu draait bij een andere hostingpartij, een bouwer als WordPress of Wix, of bij je huidige webbureau. Je hoeft zelf niets te doen: wij regelen DNS, e-mail en SSL. Of we bouwen een nieuwe versie en migreren alles voor je.",
  },
  {
    q: "Waar draaien de servers?",
    a: "We hosten op onze eigen VPS met Nederlandse servers. Zo houden we snelheid, beveiliging en beschikbaarheid volledig in eigen hand.",
  },
  {
    q: "Wat gebeurt er als mijn site plat gaat?",
    a: "Onze monitoring signaleert downtime direct en we grijpen zelf in, vaak nog voordat jij het merkt. Dankzij dagelijkse back-ups kunnen we een site binnen enkele minuten terugzetten naar de laatste werkende versie.",
  },
  {
    q: "Wat zijn Core Web Vitals en waarom zijn ze belangrijk?",
    a: "Core Web Vitals (LCP, CLS en INP) meten hoe snel je site laadt, hoe stabiel de pagina is tijdens het laden en hoe snel hij reageert op een klik. Google gebruikt deze meetwaarden direct als rankingfactor, en trage sites verliezen bovendien bezoekers: elke seconde extra laadtijd kost gemiddeld conversie.",
  },
  {
    q: "Hoe maken jullie een website sneller?",
    a: "We comprimeren en optimaliseren afbeeldingen naar moderne formaten, stellen caching en compressie (gzip/Brotli) goed in, verwijderen ongebruikte JavaScript en CSS, en zorgen dat de belangrijkste content als eerste laadt (fetchPriority, preloading). Elke optimalisatie wordt gemeten met een voor- en na-rapport in Lighthouse en PageSpeed Insights.",
  },
  {
    q: "Werkt performance-optimalisatie ook op een site die niet door AIMI gebouwd is?",
    a: "Ja. We voeren eerst een technische audit uit op je bestaande website — ongeacht het platform — en leveren daarna gerichte performance-optimalisaties, met een meetbaar resultaat op zowel mobiel als desktop.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-12" style={{ background: "#1a1a1a" }}>
      <div className="mx-auto max-w-3xl px-6">

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-3 text-sm font-medium"
          style={{ color: "#fe2c02", fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif", letterSpacing: "0.05em" }}
        >
          Alles wat je wil weten
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="text-white mb-12"
        >
          Veelgestelde vragen
        </motion.h2>

        <div className="divide-y" style={{ borderColor: "#2a2b2b" }}>
          {faqItems.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} style={{ borderColor: "#2a2b2b" }}>
                <h3 className="m-0">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                    className="w-full flex items-center justify-between gap-6 py-6 text-left"
                  >
                    <span
                      className="text-base font-medium text-white"
                      style={{ fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}
                    >
                      {item.q}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="shrink-0"
                      style={{ color: isOpen ? "#fe2c02" : "#a4a9b2" }}
                    >
                      <Plus className="w-5 h-5" strokeWidth={1.5} />
                    </motion.div>
                  </button>
                </h3>
                <motion.div
                  id={`faq-answer-${i}`}
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 text-base leading-relaxed" style={{ color: "#a4a9b2", fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}>
                    {item.a}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
