import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

// Merkkleuren uit public/og-image.svg: bg #0f0e0d, accent #fe2c02.
const CITIES = [
  "Assen",
  "Coevorden",
  "Drachten",
  "Emmen",
  "Groningen",
  "Heerenveen",
  "Hoogeveen",
  "Hoogezand",
  "Leeuwarden",
  "Meppel",
  "Roden",
  "Sneek",
  "Stadskanaal",
  "Veendam",
  "Winschoten",
];

const OUT = "public/og";
fs.mkdirSync(OUT, { recursive: true });

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function svg(city) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0f0e0d"/>
  <text x="90" y="130" font-family="Georgia, 'Times New Roman', serif" font-size="60" font-weight="400" fill="#ffffff">A<tspan fill="#fe2c02">.</tspan></text>
  <rect x="92" y="250" width="70" height="6" fill="#fe2c02"/>
  <text x="90" y="345" font-family="Arial, Helvetica, sans-serif" font-size="52" font-weight="700" fill="#8a8a90">Website laten maken</text>
  <text x="90" y="430" font-family="Arial, Helvetica, sans-serif" font-size="86" font-weight="700" fill="#ffffff">in ${esc(city)}</text>
  <text x="90" y="545" font-family="Arial, Helvetica, sans-serif" font-size="27" font-weight="400" fill="#8a8a90">AIMI &#183; webdesign uit Veendam &#183; vanaf &#8364; 499</text>
</svg>`;
}

for (const city of CITIES) {
  const file = path.join(OUT, `website-laten-maken-${city.toLowerCase()}.png`);
  await sharp(Buffer.from(svg(city)))
    .png({ compressionLevel: 9 })
    .toFile(file);
  const kb = (fs.statSync(file).size / 1024).toFixed(1);
  console.log(`${city.padEnd(12)} -> ${file} (${kb} kB)`);
}
console.log("\nklaar");
