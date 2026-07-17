// PM2 process-definitie voor de node-server build op de VPS.
//
// Waarom dit bestaat: de Nitro node-server output (.output/server/index.mjs)
// leest secrets uit process.env (SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY,
// SUPABASE_SERVICE_ROLE_KEY, MONITORING_ADMIN_KEY). PM2 laadt .env niet
// automatisch, dus zonder deze config verdwijnen de vars bij een restart/reboot
// of een `pm2 restart --update-env` vanuit een shell zonder die vars -> /portal
// faalt met "Missing Supabase environment variable(s)".
//
// Deze config parse't .env zelf (geen dotenv-dependency) en geeft het als env
// aan het proces mee, zodat élke start dezelfde runtime-env heeft.

const fs = require("fs");
const path = require("path");

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
      // Strip omringende quotes.
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      env[key] = value;
    }
  } catch (err) {
    console.error(`[ecosystem] kon .env niet lezen op ${file}: ${err.message}`);
  }
  return env;
}

const envFromFile = loadEnv(path.join(__dirname, ".env"));

module.exports = {
  apps: [
    {
      name: "aimi-digital-craft",
      script: ".output/server/index.mjs",
      cwd: __dirname,
      exec_mode: "fork",
      instances: 1,
      // Voorkom de crash-loop die de site plat legde: als de app kort na start
      // faalt, niet oneindig snel herstarten.
      min_uptime: "10s",
      max_restarts: 10,
      restart_delay: 2000,
      env: {
        NODE_ENV: "production",
        ...envFromFile,
      },
    },
  ],
};
