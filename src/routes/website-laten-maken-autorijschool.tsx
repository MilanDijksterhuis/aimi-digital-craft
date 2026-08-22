import { createFileRoute } from "@tanstack/react-router";
import { BranchPage, type BranchPageData } from "@/components/BranchPage";
import { SITE_URL, OG_IMAGE_URL, ORG_ID, breadcrumbJsonLd } from "@/lib/seo";

const URL = `${SITE_URL}/website-laten-maken-autorijschool`;

const data: BranchPageData = {
  branch: "autorijschool",
  h1: "Website laten maken voor je rijschool",
  kicker: "Webdesign voor rijscholen",
  intro:
    "Een rijschool wordt gekozen door twee mensen tegelijk: de leerling die er zin in heeft, en de ouder die meebetaalt. De eerste kijkt op zijn telefoon naar sfeer en prijs, de tweede wil weten of je betrouwbaar bent en wat het totaal gaat kosten. Een website voor je rijschool moet allebei bedienen, zonder dat het pakketaanbod een rekensom wordt.",
  needsHeading: "Wat een rijschoolwebsite moet kunnen",
  needsBody: [
    "Prijzen zijn hier het gevoeligste onderdeel. Rijscholen werken met losse lessen, pakketten, tussentijdse toetsen, examengeld en soms een theoriecursus, en juist die opsomming maakt websites onoverzichtelijk. We zetten de prijzen daarom zo neer dat iemand in één blik ziet wat een pakket kost én wat er níét bij zit, want de verrassingen achteraf zijn precies waar slechte reviews over gaan.",
    "Slagingspercentages en ervaringen van eerdere leerlingen doen bij rijscholen meer dan bij vrijwel elke andere branche. Mensen kiezen op vertrouwen. We richten de site zo in dat echte ervaringen een prominente plek krijgen, met ruimte om ze aan te vullen naarmate je er meer verzamelt. Verzin ze niet: een handvol echte, herkenbare reacties werkt beter dan twintig vage complimenten.",
    "Aanmelden moet daarna heel eenvoudig zijn. Een leerling die overtuigd is, wil niet gebeld worden maar zich inschrijven. Een kort formulier met naam, leeftijd, of iemand al theorie heeft en wanneer hij ongeveer wil starten, is genoeg om het gesprek aan te gaan. Alles wat je daarbovenop vraagt, kost aanmeldingen.",
  ],
  pitfallsHeading: "Veelgemaakte fouten bij websites van rijscholen",
  pitfallsBody: [
    "De meest gemaakte fout is prijzen weglaten of achter 'neem contact op' verstoppen. Leerlingen vergelijken nu eenmaal, en een rijschool zonder prijzen valt bij het vergelijken simpelweg af. Je hoeft niet de goedkoopste te zijn, maar je moet wel duidelijk zijn: onduidelijkheid wordt uitgelegd als duur.",
    "Ook zien we sites die volledig op de auto en de instructeur zijn gericht, terwijl leerlingen vooral willen weten hoe het traject verloopt. Hoeveel lessen heb je gemiddeld nodig, hoe wordt het examen aangevraagd, wat gebeurt er als je zakt? Die vragen beantwoorden scheelt je een hoop telefoontjes en trekt precies de leerlingen aan die weten waar ze aan beginnen.",
    "Een derde valkuil is de site behandelen als iets dat af is. Rijscholen hebben drukke en rustige periodes. Als je in een rustige maand nergens kunt aangeven dat er direct plek is, mis je precies de leerlingen die snel willen beginnen. We bouwen daarom een plek waar je zelf de actuele beschikbaarheid kunt bijwerken.",
  ],
  approachHeading: "Zo pakken we het aan",
  approachSteps: [
    { title: "Kennismaking", desc: "We bespreken je pakketten, of je ook theorie aanbiedt en wat je onderscheidt van de andere rijscholen in je plaats." },
    { title: "Prijzen helder maken", desc: "We zetten de pakketten om in een overzicht dat in één oogopslag te vergelijken is, inclusief wat er niet bij inbegrepen zit." },
    { title: "Vertrouwen opbouwen", desc: "We geven ervaringen van leerlingen en informatie over de instructeurs een vaste plek, met ruimte om die later uit te breiden." },
    { title: "Aanmelden vereenvoudigen", desc: "We bouwen een kort inschrijfformulier dat genoeg vraagt om te kunnen inplannen, en niet meer dan dat." },
    { title: "Livegang en beheer", desc: "Na livegang kun je zelf prijzen en beschikbaarheid bijwerken; wij verzorgen hosting, back-ups en monitoring." },
  ],
  pricingHeading: "Wat kost een website voor een rijschool",
  pricingBody: [
    "Voor de meeste rijscholen is een meerpagina-site voldoende: een pagina met pakketten en prijzen, een pagina over de rijschool en de instructeurs, een pagina met veelgestelde vragen over het traject, en een inschrijfformulier. Dat past doorgaans binnen ons Pro-pakket.",
    "Wil je daarnaast een gekoppelde lesagenda of een online betaalmogelijkheid voor pakketten, dan wordt het maatwerk en krijg je daar vooraf een aparte prijs voor. Op de tarievenpagina zie je waar we beginnen; wat jouw rijschool nodig heeft bespreken we in het kennismakingsgesprek.",
  ],
  faqs: [
    { q: "Moet ik mijn prijzen echt op de website zetten?", a: "Wij raden het sterk aan. Leerlingen vergelijken rijscholen naast elkaar, en een school zonder prijzen valt bij dat vergelijken meestal af. Duidelijkheid over wat er wel en niet bij zit levert bovendien betere gesprekken op." },
    { q: "Kan ik zelf mijn pakketten en prijzen aanpassen?", a: "Ja. Prijzen wijzigen bij rijscholen regelmatig, dus dat moet je zelf kunnen doen zonder ons erbij te halen. Dat richten we in via het klantenportaal." },
    { q: "Kunnen leerlingen zich online inschrijven?", a: "Ja, met een kort formulier dat de gegevens verzamelt die je nodig hebt om te kunnen inplannen. Je krijgt de aanmelding per e-mail binnen en neemt zelf contact op." },
    { q: "Kan mijn lesagenda gekoppeld worden?", a: "Dat kan, maar het is maatwerk en niet voor elke rijschool nodig. Veel scholen zijn beter af met een eenvoudig aanmeldformulier en hun eigen planning. We bespreken vooraf wat in jouw situatie zinvol is." },
    { q: "Kan ik ervaringen van leerlingen tonen?", a: "Ja, daar maken we een vaste plek voor. Belangrijk: gebruik echte reacties van echte leerlingen. Verzonnen ervaringen zijn niet alleen misleidend, ze vallen bezoekers ook op." },
    { q: "Werken jullie ook voor rijscholen buiten Noord-Nederland?", a: "Ja. We zitten zelf in Veendam, maar het hele traject kan op afstand. Het werkgebied dat we op je site vermelden richten we in op de plaatsen waar jij daadwerkelijk lesgeeft." },
  ],
  related: [
    { label: "Alle branches", href: "/branches" },
    { label: "Website laten maken autobedrijf", href: "/website-laten-maken-autobedrijf" },
    { label: "Tarieven", href: "/tarieven" },
    { label: "Onze werkwijze", href: "/werkwijze" },
    { label: "Neem contact op", href: "/contact" },
  ],
  sectionOrder: ["needs", "approach", "pitfalls", "faq", "pricing"],
};

export const Route = createFileRoute("/website-laten-maken-autorijschool")({
  head: () => ({
    meta: [
      { title: "Website laten maken voor je autorijschool | AIMI" },
      { name: "description", content: "Website voor je rijschool met heldere pakketprijzen, ervaringen van leerlingen en een eenvoudig inschrijfformulier." },
      { property: "og:title", content: "Website laten maken voor je autorijschool | AIMI" },
      { property: "og:description", content: "Webdesign voor rijscholen: duidelijke pakketten, vertrouwen opbouwen en makkelijk inschrijven." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Website laten maken voor je autorijschool | AIMI" },
      { name: "twitter:description", content: "Webdesign voor rijscholen: duidelijke pakketten, vertrouwen opbouwen en makkelijk inschrijven." },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Website laten maken voor je autorijschool",
          serviceType: "Webdesign",
          description: "Websites op maat voor rijscholen, met heldere pakketprijzen, leerlingervaringen en online inschrijven.",
          url: URL,
          provider: { "@id": ORG_ID },
        }),
      },
      breadcrumbJsonLd([["Home", "/"], ["Branches", "/branches"], ["Website laten maken voor je autorijschool", "/website-laten-maken-autorijschool"]]),
    ],
  }),
  component: () => <BranchPage data={data} />,
});
