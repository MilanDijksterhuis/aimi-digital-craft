// Kernpagina's van de site, voor de interne-link-picker in de blog-editor
// (naast de dynamische lijst van gepubliceerde blogposts). Bewust een platte,
// handmatig onderhouden lijst i.p.v. een databasetabel: dit zijn statische
// routes die met een code-deploy wijzigen, geen CMS-content.
export const CORE_PAGES: { title: string; path: string }[] = [
  { title: "Homepage", path: "/" },
  { title: "Website laten maken", path: "/website-laten-maken" },
  { title: "Webshop laten maken", path: "/webshop-laten-maken" },
  { title: "Onderhoud & hosting", path: "/onderhoud-hosting" },
  { title: "Website laten vernieuwen", path: "/website-laten-vernieuwen" },
  { title: "SEO", path: "/seo" },
  { title: "Tarieven", path: "/tarieven" },
  { title: "Gratis website-checker", path: "/website-checker" },
  { title: "WordPress of maatwerk", path: "/wordpress-of-maatwerk" },
  { title: "Werkwijze", path: "/werkwijze" },
  { title: "Branches", path: "/branches" },
  { title: "Over ons", path: "/over-ons" },
  { title: "Veelgestelde vragen", path: "/faq" },
  { title: "Contact", path: "/contact" },
];
