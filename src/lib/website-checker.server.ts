import { Agent, fetch as undiciFetch } from "undici";
import { lookup as dnsLookup } from "node:dns";
import * as cheerio from "cheerio";

// ============================================================
// SSRF-bescherming
// ============================================================
// De gebruiker geeft een URL op die de server vervolgens fetcht — het
// klassieke SSRF-scenario (interne diensten, cloud metadata-endpoint,
// localhost). Verdediging in drie lagen:
//  1. Alleen http(s) toegestaan, expliciet geen file/ftp/andere schemes.
//  2. Een custom `lookup` op de undici Agent onderschept ELKE DNS-resolutie
//     (dus ook die van redirect-targets) en gooit voordat een socket wordt
//     geopend als het resultaat een private/loopback/link-local IP is. Dit
//     dekt DNS-rebinding: het IP wordt vlak vóór de connectie gevalideerd,
//     niet in een los "check vooraf"-stapje dat een aanvaller kan omzeilen
//     door de DNS-TTL te laten verlopen tussen check en fetch.
//  3. redirect: "manual" — we volgen redirects zelf, valideren elke nieuwe
//     hostname opnieuw via dezelfde lookup, en breken na 5 hops.

const BLOCKED_HOSTNAMES = new Set(["localhost", "localhost.localdomain", "metadata.google.internal"]);

function ipToLong(ip: string): number {
  return ip.split(".").reduce((acc, part) => (acc << 8) + parseInt(part, 10), 0) >>> 0;
}

function inCidr(ip: string, cidr: string): boolean {
  const [range, bitsStr] = cidr.split("/");
  const bits = parseInt(bitsStr, 10);
  const mask = bits === 0 ? 0 : (~0 << (32 - bits)) >>> 0;
  return (ipToLong(ip) & mask) === (ipToLong(range) & mask);
}

const BLOCKED_IPV4_RANGES = [
  "0.0.0.0/8",
  "10.0.0.0/8",
  "100.64.0.0/10", // carrier-grade NAT
  "127.0.0.0/8",
  "169.254.0.0/16", // link-local, incl. 169.254.169.254 cloud metadata
  "172.16.0.0/12",
  "192.0.0.0/24",
  "192.168.0.0/16",
  "198.18.0.0/15",
  "224.0.0.0/4", // multicast
  "240.0.0.0/4",
];

function isBlockedIpv4(ip: string): boolean {
  return BLOCKED_IPV4_RANGES.some((cidr) => inCidr(ip, cidr));
}

function isBlockedIpv6(ip: string): boolean {
  const norm = ip.toLowerCase();
  if (norm === "::1" || norm === "::") return true;
  if (norm.startsWith("::ffff:")) {
    // IPv4-mapped IPv6 — unwrap en check als IPv4
    const v4 = norm.split(":").pop() ?? "";
    if (v4.includes(".")) return isBlockedIpv4(v4);
  }
  if (norm.startsWith("fe80:") || norm.startsWith("fc") || norm.startsWith("fd")) return true; // link-local / unique local
  return false;
}

function isBlockedIp(address: string, family: number): boolean {
  return family === 6 ? isBlockedIpv6(address) : isBlockedIpv4(address);
}

class SsrfBlockedError extends Error {
  constructor(host: string) {
    super(`Adres van "${host}" wijst naar een niet-toegestaan (privé/intern) IP-adres.`);
    this.name = "SsrfBlockedError";
  }
}

/** Custom lookup die op elke DNS-resolutie (initiële host + elke redirect)
 * het resultaat tegen de blocklist checkt vlak voordat undici er een socket
 * mee opent. */
function safeLookup(hostname: string, options: any, callback: any): void {
  if (BLOCKED_HOSTNAMES.has(hostname.toLowerCase())) {
    callback(new SsrfBlockedError(hostname));
    return;
  }
  dnsLookup(hostname, { all: true, verbatim: true }, (err, addresses) => {
    if (err) {
      callback(err);
      return;
    }
    const list = Array.isArray(addresses) ? addresses : [{ address: addresses as unknown as string, family: options?.family ?? 4 }];
    if (list.length === 0) {
      callback(new Error("DNS-resolutie leverde geen adressen op"));
      return;
    }
    for (const a of list) {
      if (isBlockedIp(a.address, a.family)) {
        callback(new SsrfBlockedError(hostname));
        return;
      }
    }
    if (options?.all) {
      callback(null, list);
    } else {
      const chosen = list[0];
      callback(null, chosen.address, chosen.family);
    }
  });
}

const MAX_RESPONSE_BYTES = 2 * 1024 * 1024; // 2MB
const FETCH_TIMEOUT_MS = 10_000;
const MAX_REDIRECTS = 5;
const USER_AGENT = "AIMI-WebsiteChecker/1.0 (+https://aimi-development.nl/website-checker)";

const ssrfSafeAgent = new Agent({
  connect: { lookup: safeLookup as any, timeout: FETCH_TIMEOUT_MS },
});

function assertHttpUrl(url: URL): void {
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("Alleen http en https URLs zijn toegestaan.");
  }
}

interface FetchedPage {
  finalUrl: string;
  status: number;
  headers: Headers;
  body: string;
  timingMs: number;
  usedHttps: boolean;
  httpRedirectedToHttps: boolean;
}

/** Haalt een pagina op met alle SSRF-mitigaties, volgt redirects handmatig
 * (elke hop opnieuw gevalideerd via safeLookup), en kapt de body af op
 * MAX_RESPONSE_BYTES om memory-exhaustion te voorkomen. */
async function fetchSafely(startUrl: URL): Promise<FetchedPage> {
  let current = startUrl;
  let usedHttps = current.protocol === "https:";
  let httpRedirectedToHttps = false;
  const startedAsHttp = current.protocol === "http:";
  const start = Date.now();

  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    assertHttpUrl(current);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    let res: Response;
    try {
      res = (await undiciFetch(current, {
        redirect: "manual",
        dispatcher: ssrfSafeAgent,
        signal: controller.signal,
        headers: { "User-Agent": USER_AGENT, Accept: "text/html,*/*" },
      })) as unknown as Response;
    } finally {
      clearTimeout(timeout);
    }

    if (res.status >= 300 && res.status < 400 && res.headers.get("location")) {
      const next = new URL(res.headers.get("location") as string, current);
      assertHttpUrl(next);
      if (startedAsHttp && next.protocol === "https:") httpRedirectedToHttps = true;
      current = next;
      usedHttps = current.protocol === "https:";
      continue;
    }

    // Body inlezen met harde cap op grootte.
    const reader = res.body?.getReader();
    let received = 0;
    const chunks: Uint8Array[] = [];
    if (reader) {
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        received += value.byteLength;
        if (received > MAX_RESPONSE_BYTES) {
          await reader.cancel().catch(() => {});
          break;
        }
        chunks.push(value);
      }
    }
    const body = Buffer.concat(chunks.map((c) => Buffer.from(c))).toString("utf-8");

    return {
      finalUrl: current.toString(),
      status: res.status,
      headers: res.headers,
      body,
      timingMs: Date.now() - start,
      usedHttps,
      httpRedirectedToHttps,
    };
  }

  throw new Error("Te veel redirects (mogelijke redirect-loop).");
}

// ============================================================
// Checks + scoring
// ============================================================

export type CheckStatus = "pass" | "warning" | "fail";

export interface CheckResult {
  id: string;
  label: string;
  status: CheckStatus;
  detail: string;
  why: string;
}

export interface CategoryScore {
  naam: string;
  score: number; // 0-100
  checks: CheckResult[];
}

export interface WebsiteCheckReport {
  url: string;
  finalUrl: string;
  score: number;
  categorieen: CategoryScore[];
}

function safeText(value: unknown, max = 500): string {
  // Alles wat uit gescande HTML komt wordt hier tot platte tekst gereduceerd
  // en afgekapt — het wordt in de UI altijd als tekst gerenderd (nooit
  // dangerouslySetInnerHTML), dus dit is vooral een opslag-/lengtegrens.
  return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, max);
}

async function fetchText(url: URL): Promise<{ body: string | null; status: number | null }> {
  try {
    const page = await fetchSafely(url);
    return { body: page.body, status: page.status };
  } catch {
    return { body: null, status: null };
  }
}

export async function runWebsiteCheck(rawUrl: string): Promise<WebsiteCheckReport> {
  const startUrl = new URL(rawUrl);
  assertHttpUrl(startUrl);

  const technisch: CheckResult[] = [];
  const seo: CheckResult[] = [];
  const performance: CheckResult[] = [];
  const mobile: CheckResult[] = [];

  let page: FetchedPage;
  try {
    page = await fetchSafely(startUrl);
  } catch (err) {
    const message = err instanceof SsrfBlockedError ? err.message : "De website kon niet bereikt worden (timeout, DNS-fout of onbereikbaar).";
    technisch.push({
      id: "bereikbaarheid",
      label: "Bereikbaarheid",
      status: "fail",
      detail: message,
      why: "Een website die niet laadt, verliest alle bezoekers en scoort ook in Google slecht.",
    });
    return {
      url: rawUrl,
      finalUrl: rawUrl,
      score: 0,
      categorieen: [
        { naam: "Technisch", score: 0, checks: technisch },
        { naam: "SEO", score: 0, checks: [] },
        { naam: "Performance", score: 0, checks: [] },
        { naam: "Mobile", score: 0, checks: [] },
      ],
    };
  }

  const $ = cheerio.load(page.body);

  // ---- Technisch ----
  technisch.push({
    id: "bereikbaarheid",
    label: "Bereikbaarheid",
    status: page.status >= 200 && page.status < 400 ? "pass" : "fail",
    detail: page.status >= 200 && page.status < 400 ? "Website is bereikbaar." : "Website is niet goed bereikbaar.",
    why: "Een goed bereikbare server is de basisvoorwaarde voor alles daarna.",
  });

  const finalIsHttps = new URL(page.finalUrl).protocol === "https:";
  technisch.push({
    id: "https",
    label: "HTTPS/SSL",
    status: finalIsHttps ? "pass" : "fail",
    detail: finalIsHttps ? "Site laadt via HTTPS." : "Site laadt niet via HTTPS.",
    why: "Zonder HTTPS waarschuwt de browser bezoekers en verliest de site vertrouwen én Google-ranking.",
  });

  if (startUrl.protocol === "http:") {
    technisch.push({
      id: "http-redirect",
      label: "HTTP → HTTPS redirect",
      status: page.httpRedirectedToHttps ? "pass" : "warning",
      detail: page.httpRedirectedToHttps ? "HTTP wordt automatisch doorgestuurd naar HTTPS." : "Geen automatische redirect van HTTP naar HTTPS gevonden.",
      why: "Zonder redirect kunnen bezoekers per ongeluk op de onbeveiligde versie blijven hangen.",
    });
  }

  // ---- Performance ----
  // Strenger dan "typisch snel genoeg": we willen niet dat de meeste sites
  // hier probleemloos een pass scoren, dat holt de motivatie om contact op
  // te nemen uit.
  const timingStatus: CheckStatus = page.timingMs < 400 ? "pass" : page.timingMs < 1200 ? "warning" : "fail";
  performance.push({
    id: "response-tijd",
    label: "Responstijd",
    status: timingStatus,
    detail: timingStatus === "pass" ? "Snel genoeg." : timingStatus === "warning" ? "Kan sneller." : "Te traag.",
    why: "Trage laadtijden kosten bezoekers en conversie, en wegen mee in Google's ranking.",
  });

  // ---- Mobile ----
  const viewport = $('meta[name="viewport"]').attr("content");
  mobile.push({
    id: "viewport",
    label: "Viewport meta tag",
    status: viewport ? "pass" : "fail",
    detail: viewport ? "Viewport is ingesteld." : "Geen viewport meta tag gevonden.",
    why: "Zonder viewport tag rendert een pagina op mobiel vaak veel te klein of breed.",
  });

  // ---- SEO ----
  // Smallere pass-vensters dan wat SEO-tools doorgaans hanteren — bewust
  // strenger, zodat een "voldoende" title/description niet al als pass
  // telt en de score de bezoeker onterecht gerust stelt.
  const title = safeText($("title").first().text(), 200);
  const titleLen = title.length;
  seo.push({
    id: "title",
    label: "Title tag",
    status: !title ? "fail" : titleLen >= 30 && titleLen <= 60 ? "pass" : "warning",
    detail: !title ? "Geen title tag gevonden." : titleLen >= 30 && titleLen <= 60 ? "Goede lengte." : titleLen < 30 ? "Te kort." : "Te lang.",
    why: "De title tag is de belangrijkste tekst die Google in de zoekresultaten toont.",
  });

  const metaDesc = safeText($('meta[name="description"]').attr("content") ?? "", 300);
  seo.push({
    id: "meta-description",
    label: "Meta description",
    status: !metaDesc ? "fail" : metaDesc.length >= 70 && metaDesc.length <= 155 ? "pass" : "warning",
    detail: !metaDesc
      ? "Geen meta description gevonden."
      : metaDesc.length >= 70 && metaDesc.length <= 155
        ? "Goede lengte."
        : metaDesc.length < 70
          ? "Te kort."
          : "Te lang.",
    why: "De meta description bepaalt vaak of iemand in Google op je resultaat klikt.",
  });

  const h1s = $("h1");
  seo.push({
    id: "h1",
    label: "H1-kop",
    status: h1s.length === 1 ? "pass" : h1s.length === 0 ? "fail" : "warning",
    detail: h1s.length === 1 ? "Goed opgebouwd." : h1s.length === 0 ? "Ontbreekt." : "Niet goed opgebouwd.",
    why: "Eén duidelijke H1 helpt zowel bezoekers als zoekmachines de hoofdinhoud te begrijpen.",
  });

  const images = $("img");
  const withAlt = images.filter((_, el) => {
    const alt = $(el).attr("alt");
    return !!alt && alt.trim().length > 0;
  });
  const altPct = images.length === 0 ? 100 : Math.round((withAlt.length / images.length) * 100);
  seo.push({
    id: "alt-teksten",
    label: "Alt-teksten op afbeeldingen",
    status: images.length === 0 ? "pass" : altPct >= 98 ? "pass" : altPct >= 70 ? "warning" : "fail",
    detail:
      images.length === 0
        ? "Geen afbeeldingen gevonden."
        : altPct >= 98
          ? "Vrijwel overal aanwezig."
          : altPct >= 70
            ? "Deels aanwezig."
            : "Grotendeels afwezig.",
    why: "Alt-teksten zijn nodig voor toegankelijkheid (screenreaders) en helpen bij beeld-SEO.",
  });

  const jsonLd = $('script[type="application/ld+json"]');
  seo.push({
    id: "structured-data",
    label: "Structured data (JSON-LD)",
    status: jsonLd.length > 0 ? "pass" : "warning",
    detail: jsonLd.length > 0 ? "Aanwezig." : "Ontbreekt.",
    why: "Structured data helpt Google rijkere zoekresultaten te tonen (sterren, prijzen, etc.).",
  });

  const ogTitle = $('meta[property="og:title"]').attr("content");
  const ogDesc = $('meta[property="og:description"]').attr("content");
  const ogImage = $('meta[property="og:image"]').attr("content");
  const ogCount = [ogTitle, ogDesc, ogImage].filter(Boolean).length;
  seo.push({
    id: "open-graph",
    label: "Open Graph tags",
    status: ogCount === 3 ? "pass" : ogCount > 0 ? "warning" : "fail",
    detail: ogCount === 3 ? "Volledig aanwezig." : ogCount > 0 ? "Gedeeltelijk aanwezig." : "Ontbreekt.",
    why: "Open Graph tags bepalen hoe je pagina eruitziet als hij gedeeld wordt op social media.",
  });

  const favicon =
    $('link[rel="icon"]').attr("href") ||
    $('link[rel="shortcut icon"]').attr("href") ||
    $('link[rel="apple-touch-icon"]').attr("href");
  technisch.push({
    id: "favicon",
    label: "Favicon",
    status: favicon ? "pass" : "warning",
    detail: favicon ? "Favicon gevonden." : "Geen favicon gevonden.",
    why: "Een favicon oogt professioneel in browser-tabs en bladwijzers.",
  });

  // robots.txt + sitemap.xml (losse requests, ook via de veilige fetch-pad)
  const origin = new URL(page.finalUrl);
  const [robots, sitemap] = await Promise.all([
    fetchText(new URL("/robots.txt", origin)),
    fetchText(new URL("/sitemap.xml", origin)),
  ]);
  technisch.push({
    id: "robots-txt",
    label: "robots.txt",
    status: robots.status === 200 ? "pass" : "warning",
    detail: robots.status === 200 ? "robots.txt aanwezig." : "Geen robots.txt gevonden.",
    why: "robots.txt vertelt zoekmachines welke delen van de site wel/niet doorzocht mogen worden.",
  });
  technisch.push({
    id: "sitemap-xml",
    label: "sitemap.xml",
    status: sitemap.status === 200 ? "pass" : "warning",
    detail: sitemap.status === 200 ? "sitemap.xml aanwezig." : "Geen sitemap.xml gevonden.",
    why: "Een sitemap helpt zoekmachines alle pagina's van de site te vinden en indexeren.",
  });

  // Bewust streng: een "warning" telt maar voor een derde mee (niet de helft)
  // zodat kleine kanttekeningen niet bijna gratis tot een hoge score leiden.
  function scoreCategory(checks: CheckResult[]): number {
    if (checks.length === 0) return 100;
    const points = checks.reduce((sum, c) => sum + (c.status === "pass" ? 1 : c.status === "warning" ? 1 / 3 : 0), 0);
    return Math.round((points / checks.length) * 100);
  }

  const categorieen: CategoryScore[] = [
    { naam: "Technisch", score: scoreCategory(technisch), checks: technisch },
    { naam: "SEO", score: scoreCategory(seo), checks: seo },
    { naam: "Performance", score: scoreCategory(performance), checks: performance },
    { naam: "Mobile", score: scoreCategory(mobile), checks: mobile },
  ];

  // Het gemiddelde alleen is te vergevingsgezind: drie sterke categorieën
  // kunnen dan één zwakke plek volledig verbloemen. Het zwakste onderdeel
  // trekt het totaal daarom extra naar beneden, zodat er altijd een reden
  // overblijft om contact op te nemen als ergens een duidelijk gat zit.
  const gemiddelde = categorieen.reduce((sum, c) => sum + c.score, 0) / categorieen.length;
  const zwakste = Math.min(...categorieen.map((c) => c.score));
  const totalScore = Math.max(0, Math.round(gemiddelde - (100 - zwakste) * 0.25));

  return {
    url: rawUrl,
    finalUrl: page.finalUrl,
    score: totalScore,
    categorieen,
  };
}
