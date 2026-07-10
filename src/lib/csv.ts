// Kleine, afhankelijkheidsvrije CSV-parser.
// Ondersteunt , ; en tab als scheidingsteken, quoted velden en "" als escape.

function detectDelimiter(headerLine: string): string {
  const candidates = [";", ",", "\t"];
  let best = ";";
  let bestCount = -1;
  for (const d of candidates) {
    // tel alleen scheidingstekens buiten quotes
    let count = 0;
    let inQuotes = false;
    for (let i = 0; i < headerLine.length; i++) {
      const ch = headerLine[i];
      if (ch === '"') inQuotes = !inQuotes;
      else if (ch === d && !inQuotes) count++;
    }
    if (count > bestCount) {
      bestCount = count;
      best = d;
    }
  }
  return best;
}

/** Parseert CSV-tekst naar een array van rijen (array van cellen). */
export function parseCsv(text: string): string[][] {
  // BOM strippen
  const src = text.replace(/^﻿/, "");
  const firstLineEnd = src.search(/\r?\n/);
  const headerLine = firstLineEnd === -1 ? src : src.slice(0, firstLineEnd);
  const delim = detectDelimiter(headerLine);

  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < src.length; i++) {
    const ch = src[i];

    if (inQuotes) {
      if (ch === '"') {
        if (src[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
      continue;
    }

    if (ch === '"') {
      inQuotes = true;
    } else if (ch === delim) {
      row.push(field);
      field = "";
    } else if (ch === "\n") {
      row.push(field);
      field = "";
      rows.push(row);
      row = [];
    } else if (ch !== "\r") {
      field += ch;
    }
  }
  // laatste veld/rij
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows.filter((r) => r.some((c) => c.trim() !== ""));
}

const norm = (s: string) => s.trim().toLowerCase().replace(/[^a-z]/g, "");

// Welke kolomnamen we accepteren voor elk veld.
const HEADER_ALIASES: Record<string, string[]> = {
  company_name: ["bedrijfsnaam", "bedrijf", "company", "companyname", "naam", "name"],
  has_website: ["websiteaanwezig", "website", "heeftwebsite", "haswebsite", "site"],
  phone: ["telefoonnummer", "telefoon", "tel", "phone", "phonenumber", "nummer"],
  email: ["mail", "email", "emailadres", "mailadres"],
};

const TRUE_VALUES = ["ja", "j", "yes", "y", "true", "1", "x", "waar"];

export type ParsedLead = {
  company_name: string;
  has_website: boolean;
  phone: string | null;
  email: string | null;
};

export type CsvParseResult = {
  leads: ParsedLead[];
  errors: string[];
  missingColumns: string[];
};

/** Zet CSV-tekst om naar leads, met validatie en duidelijke foutmeldingen. */
export function parseLeadsCsv(text: string): CsvParseResult {
  const rows = parseCsv(text);
  if (rows.length === 0) {
    return { leads: [], errors: ["Het bestand is leeg."], missingColumns: [] };
  }

  const header = rows[0].map(norm);
  const indexOf = (field: string) => {
    const aliases = HEADER_ALIASES[field];
    for (let i = 0; i < header.length; i++) {
      if (aliases.includes(header[i])) return i;
    }
    return -1;
  };

  const idx = {
    company_name: indexOf("company_name"),
    has_website: indexOf("has_website"),
    phone: indexOf("phone"),
    email: indexOf("email"),
  };

  // Alleen bedrijfsnaam is echt verplicht.
  const missingColumns: string[] = [];
  if (idx.company_name === -1) missingColumns.push("bedrijfsnaam");
  if (missingColumns.length > 0) return { leads: [], errors: [], missingColumns };

  const leads: ParsedLead[] = [];
  const errors: string[] = [];

  for (let r = 1; r < rows.length; r++) {
    const cells = rows[r];
    const get = (i: number) => (i >= 0 && i < cells.length ? cells[i].trim() : "");

    const company = get(idx.company_name);
    if (!company) {
      errors.push(`Rij ${r + 1}: bedrijfsnaam ontbreekt — overgeslagen.`);
      continue;
    }

    const websiteRaw = get(idx.has_website);
    const phone = get(idx.phone);
    const email = get(idx.email);

    leads.push({
      company_name: company.slice(0, 200),
      has_website: TRUE_VALUES.includes(websiteRaw.toLowerCase()),
      phone: phone ? phone.slice(0, 50) : null,
      email: email ? email.slice(0, 200) : null,
    });
  }

  return { leads, errors, missingColumns: [] };
}
