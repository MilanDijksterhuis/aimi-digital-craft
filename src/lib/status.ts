export const STATUS_LABEL: Record<string, string> = {
  pending: "Nieuw",
  in_review: "In onderzoek",
  approved: "Goedgekeurd",
  in_progress: "In uitvoering",
  waiting_customer: "Wacht op klant",
  review: "Review",
  done: "Gereed",
  invoiced: "Gefactureerd",
  rejected: "Afgewezen",
};

export const STATUS_FLOW = [
  "pending",
  "in_review",
  "approved",
  "in_progress",
  "waiting_customer",
  "done",
  "invoiced",
] as const;

export const STATUS_COLOR: Record<string, string> = {
  pending: "bg-muted text-muted-foreground",
  in_review: "bg-secondary/20 text-secondary",
  approved: "bg-primary/10 text-primary",
  in_progress: "bg-secondary/30 text-secondary-foreground",
  waiting_customer: "bg-amber-500/20 text-amber-600",
  review: "bg-primary/10 text-primary",
  done: "bg-primary/20 text-primary",
  invoiced: "bg-emerald-500/20 text-emerald-600",
  rejected: "bg-destructive/20 text-destructive",
};

export const PRIORITY_LABEL: Record<string, string> = {
  low: "Laag",
  normal: "Normaal",
  high: "Hoog",
  urgent: "Urgent",
};

export const PRIORITY_WEIGHT: Record<string, number> = {
  urgent: 4,
  high: 3,
  normal: 2,
  low: 1,
};

export const PRIORITY_COLOR: Record<string, string> = {
  low: "text-muted-foreground",
  normal: "text-foreground",
  high: "text-amber-500",
  urgent: "text-destructive font-semibold",
};

// ---------------- Categorieën & tarieven ----------------

export const CATEGORY_LABEL: Record<string, string> = {
  text: "Tekst & inhoud",
  styling: "Opmaak & styling",
  functionality: "Functionaliteit",
  media: "Media & beeld",
  data: "Data & bestanden",
  seo: "SEO & metadata",
  accessibility: "Toegankelijkheid",
  other: "Anders",
};

export const CATEGORY_KEYS = Object.keys(CATEGORY_LABEL);

// Eenvoudige changes (max ±15 min werk) → tellen mee tegen gratis quotum.
// Uitgebreide changes → €20 per change.
export const SIMPLE_CATEGORIES = new Set(["text", "styling", "media", "accessibility"]);

export function isCategoryFree(category: string | undefined | null): boolean {
  return SIMPLE_CATEGORIES.has(category ?? "other");
}

export const PAID_CHANGE_PRICE_EUR = 20;
export const RUSH_SURCHARGE_EUR = 15;

export function priceForChange(category: string, rush: boolean): number {
  const base = isCategoryFree(category) ? 0 : PAID_CHANGE_PRICE_EUR;
  return base + (rush ? RUSH_SURCHARGE_EUR : 0);
}

// Sjablonen voor snelle invoer
export const CHANGE_TEMPLATES: Array<{
  id: string;
  label: string;
  category: string;
  title: string;
  description: string;
}> = [
  {
    id: "phone",
    label: "Telefoonnummer wijzigen",
    category: "text",
    title: "Telefoonnummer wijzigen",
    description: "Nieuw telefoonnummer: \nWaar in de site moet dit aangepast worden: ",
  },
  {
    id: "logo",
    label: "Logo vervangen",
    category: "media",
    title: "Logo vervangen",
    description: "Het nieuwe logo zit in de bijlage. Waar moet het komen: ",
  },
  {
    id: "prices",
    label: "Prijstabel updaten",
    category: "text",
    title: "Prijstabel updaten",
    description: "Welke prijzen veranderen: \nGeldig vanaf: ",
  },
];
