#!/usr/bin/env node
// Publiceert geplande blogposts wiens published_at voorbij is. Bedoeld om via
// crontab elke paar minuten te draaien (zie docs voor de VPS-setup). Gebruikt
// de service-role key (bypasst RLS), dus dit script NOOIT client-side draaien.
//
// .env wordt zelf geparset (geen dotenv-dependency), zelfde aanpak als
// ecosystem.config.cjs, zodat dit script ook los van PM2 via system-crontab
// kan draaien met dezelfde secrets als de node-server.

import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, "..");
const LOG_DIR = path.join(REPO_ROOT, "logs");
const LOG_FILE = path.join(LOG_DIR, "publish-scheduled-posts.log");

function loadEnv(file) {
  const env = {};
  try {
    const raw = fs.readFileSync(file, "utf8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      env[key] = value;
    }
  } catch {
    // Geen .env-bestand: val terug op eventuele echte process.env vars (bv. system-crontab met env vars elders gezet).
  }
  return env;
}

function log(line) {
  const entry = `[${new Date().toISOString()}] ${line}`;
  console.log(entry);
  try {
    fs.mkdirSync(LOG_DIR, { recursive: true });
    fs.appendFileSync(LOG_FILE, entry + "\n");
  } catch (e) {
    console.error(`Kon niet naar logbestand schrijven (${LOG_FILE}):`, e.message);
  }
}

async function main() {
  const fileEnv = loadEnv(path.join(REPO_ROOT, ".env"));
  const SUPABASE_URL = process.env.SUPABASE_URL || fileEnv.SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || fileEnv.SUPABASE_SERVICE_ROLE_KEY;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      "Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY (verwacht in .env in de repo-root of als env var).",
    );
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const nowIso = new Date().toISOString();
  const { data: due, error: selectError } = await supabase
    .from("blog_posts")
    .select("id, title, slug, published_at")
    .eq("status", "scheduled")
    .lte("published_at", nowIso);

  if (selectError) throw new Error(`Ophalen geplande posts mislukt: ${selectError.message}`);

  if (!due || due.length === 0) {
    log("Geen geplande posts om te publiceren.");
    return;
  }

  const ids = due.map((p) => p.id);
  const { error: updateError } = await supabase.from("blog_posts").update({ status: "published" }).in("id", ids);

  if (updateError) {
    log(`FOUT bij publiceren van ${ids.length} post(s): ${updateError.message}`);
    throw new Error(updateError.message);
  }

  for (const p of due) {
    log(`Gepubliceerd: "${p.title}" (/blog/${p.slug}), gepland voor ${p.published_at}`);
  }
  log(`Klaar: ${due.length} post(s) gepubliceerd.`);
}

main().catch((err) => {
  log(`Onverwachte fout: ${err instanceof Error ? err.message : String(err)}`);
  process.exitCode = 1;
});
