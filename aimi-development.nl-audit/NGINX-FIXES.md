# Server-fixes op de VPS — stap voor stap

Deze punten uit de SEO-audit zitten niet in de code maar in de nginx-config op de server.
Je hoeft geen nginx-kennis te hebben: volg de stappen letterlijk, van boven naar beneden.
Alles bij elkaar kost dit ± 20 minuten.

**Belangrijkste veiligheidsregel:** na élke wijziging eerst `sudo nginx -t` draaien.
Zolang die "syntax is ok" zegt, kan er niets kapot. Zegt hij iets anders → niet herladen,
maar de wijziging terugdraaien (staat bij elke stap).

---

## Stap 0 — Inloggen en voorbereiden (5 min)

**0.1** Log in op de VPS (zelfde manier als bij een deploy):

```bash
ssh <jouw-gebruiker>@<ip-van-de-vps>
```

**0.2** Kijk hoe je site-configuratie heet:

```bash
ls /etc/nginx/sites-enabled/
```

Je ziet waarschijnlijk iets als `aimi-development.nl` of `default`. **Onthoud die naam** —
overal waar hieronder `SITENAAM` staat, vul je die in.

**0.3** Maak een backup van de hele nginx-config (dan kunnen we altijd terug):

```bash
sudo cp -r /etc/nginx /etc/nginx.backup-$(date +%F)
```

Controleer dat de backup er staat:

```bash
ls -d /etc/nginx.backup-*
```

**0.4** Zo draai je straks een wijziging terug als er iets misgaat (nu alleen lezen, niet uitvoeren):

```bash
# alles terugzetten zoals het was:
sudo rm -r /etc/nginx && sudo cp -r /etc/nginx.backup-<datum> /etc/nginx
sudo nginx -t && sudo systemctl reload nginx
```

---

## Stap 1 — Versienummer verbergen (2 min, makkelijkste eerst)

*Waarom: de server vertelt nu aan iedereen "nginx/1.28.3 (Ubuntu)". Dat helpt aanvallers
en levert niets op. (Audit: TECH-6)*

**1.1** Open het hoofdconfiguratiebestand:

```bash
sudo nano /etc/nginx/nginx.conf
```

**1.2** Zoek het blok dat begint met `http {` (meestal bovenin). Zet **binnen** dat blok,
op een eigen regel direct onder `http {`, dit erbij:

```nginx
    server_tokens off;
```

Let op: mogelijk staat er al een regel `# server_tokens off;` met een `#` ervoor.
Dan hoef je alleen die `#` (en de spatie erna) weg te halen.

**1.3** Opslaan en sluiten: `Ctrl+O`, `Enter`, `Ctrl+X`.

**1.4** Testen en doorvoeren:

```bash
sudo nginx -t
```

Verwachte output: `syntax is ok` en `test is successful`. Dan:

```bash
sudo systemctl reload nginx
```

**1.5** Controleren (mag vanaf de VPS of vanaf je eigen laptop):

```bash
curl -sI https://aimi-development.nl/ | grep -i server
```

- **Goed:** `Server: nginx` (zonder versienummer)
- **Fout:** staat er nog `nginx/1.28.3` → stap 1.2 nog eens nalopen (staat de regel écht binnen `http { }`?)

---

## Stap 2 — Brotli-compressie aanzetten (5 min)

*Waarom: de site gebruikt nu alleen gzip. Brotli maakt bestanden ~15-20% kleiner,
dus ~60-90 KB minder per paginabezoek. (Audit: PERF-2)*

**2.1** Kijk eerst of de brotli-module al aanwezig is:

```bash
nginx -V 2>&1 | tr ' ' '\n' | grep -i brotli
```

- Zie je regels met `brotli` → module is er al, ga door naar **2.3**.
- Zie je niets → probeer hem te installeren (stap 2.2).

**2.2** Installeren:

```bash
sudo apt update && sudo apt install libnginx-mod-http-brotli
```

- Lukt dit → ga naar 2.3.
- Krijg je `Unable to locate package` → **stop hier en sla deze stap over.**
  (Jouw nginx komt dan uit een andere bron dan Ubuntu's pakketten en de module
  moet dan handmatig gecompileerd worden — dat is het niet waard; gzip werkt al.
  Ga gewoon door naar stap 3.)

**2.3** Maak een apart configuratiebestandje voor brotli:

```bash
sudo nano /etc/nginx/conf.d/brotli.conf
```

Plak hierin (het bestand is nieuw en leeg):

```nginx
brotli on;
brotli_comp_level 5;
brotli_static on;
brotli_types text/css application/javascript application/json image/svg+xml font/woff2 text/plain application/xml;
```

Opslaan: `Ctrl+O`, `Enter`, `Ctrl+X`.

**2.4** Testen en doorvoeren:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

Krijg je bij `nginx -t` een fout als `unknown directive "brotli"` → de module is toch
niet geladen. Verwijder dan het bestand weer en sla de stap over:

```bash
sudo rm /etc/nginx/conf.d/brotli.conf && sudo systemctl reload nginx
```

**2.5** Controleren:

```bash
curl -sI -H "Accept-Encoding: br" https://aimi-development.nl/ | grep -i content-encoding
```

- **Goed:** `content-encoding: br`
- **Fout:** `gzip` of niets → module draait niet; geen ramp, gzip blijft gewoon werken.

---

## Stap 3 — Dubbele headers opruimen (5 min)

*Waarom: sommige headers worden nu twee keer meegestuurd — één keer door de app (Node/Nitro)
en één keer door nginx. Dubbel is niet kapot, maar slordig en soms verwarrend voor browsers.
(Audit: TECH-4/TECH-5)*

**3.1** Kijk eerst welke headers dubbel zijn:

```bash
curl -sI https://aimi-development.nl/ | sort | uniq -di
```

Dit toont alléén regels die twee keer voorkomen. Typisch zie je hier bijvoorbeeld
`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` of `Permissions-Policy`.
Zie je **niets** → mooi, ga door naar stap 4.

**3.2** Open je site-config (vul de naam uit stap 0.2 in):

```bash
sudo nano /etc/nginx/sites-enabled/SITENAAM
```

**3.3** Zoek in dit bestand naar regels die beginnen met `add_header` en die dezelfde
header zetten als in je lijstje uit 3.1. Bijvoorbeeld:

```nginx
add_header X-Content-Type-Options nosniff;
add_header X-Frame-Options SAMEORIGIN;
```

Zet een `#` vóór elke `add_header`-regel die dubbel bleek (dan is hij uitgeschakeld
maar niet weg — makkelijk terug te zetten):

```nginx
# add_header X-Content-Type-Options nosniff;   # app stuurt deze al mee
```

**Alleen** de headers uit je lijstje van 3.1 uitschakelen. Andere `add_header`-regels
(bijvoorbeeld voor `/assets/` met `Cache-Control`) laat je staan, tenzij ook die in
het dubbel-lijstje stonden.

**3.4** Opslaan, testen, doorvoeren:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

**3.5** Controleren — zelfde commando als 3.1:

```bash
curl -sI https://aimi-development.nl/ | sort | uniq -di
```

- **Goed:** geen output meer (niets is dubbel).
- Ook even voor een asset checken:

```bash
curl -sI https://aimi-development.nl/assets/ 2>/dev/null | sort | uniq -di
```

---

## Stap 4 — Cache-header op HTML-pagina's (3 min)

*Waarom: HTML-pagina's hebben nu helemaal geen cache-instructie. Met een korte cache
(5 minuten) + "stale-while-revalidate" laden herhaalbezoeken sneller, terwijl een
deploy alsnog binnen 5 minuten overal zichtbaar is. (Audit: PERF-5)*

**4.1** Open de site-config:

```bash
sudo nano /etc/nginx/sites-enabled/SITENAAM
```

**4.2** Zoek het blok dat het verkeer naar de Node-app stuurt. Dat herken je aan
`proxy_pass` en ziet er ongeveer zo uit:

```nginx
location / {
    proxy_pass http://127.0.0.1:3000;
    ...
}
```

(Het poortnummer kan anders zijn — dat maakt niet uit.)

**4.3** Voeg **binnen** dat `location / { }`-blok, onder de bestaande regels, toe:

```nginx
    add_header Cache-Control "public, max-age=300, stale-while-revalidate=3600";
```

**Let op:** heb je in stap 3 hier `add_header`-regels uitgeschakeld? Dat blijft goed —
deze nieuwe regel is een andere header (Cache-Control op HTML) en mag er gewoon bij.

**4.4** Opslaan, testen, doorvoeren:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

**4.5** Controleren:

```bash
curl -sI https://aimi-development.nl/ | grep -i cache-control
```

- **Goed:** `cache-control: public, max-age=300, stale-while-revalidate=3600`
- **Fout:** niets → staat de regel echt bínnen het `location /`-blok (tussen de accolades)?

---

## Stap 5 — Hoofdletter-URL's (overslaan is prima)

*/CONTACT geeft nu een 200 in plaats van een doorverwijzing naar /contact. De audit
scoorde dit als Low en de canonical-tag vangt het al af voor Google. Nginx kan dit
niet zonder extra (perl-)module, dus: **deze stap bewust overslaan.***

---

## Eindcontrole (2 min)

Draai deze vier regels (mag vanaf je eigen laptop):

```bash
curl -sI https://aimi-development.nl/ | grep -i server            # → "Server: nginx" zonder versie
curl -sI -H "Accept-Encoding: br" https://aimi-development.nl/ | grep -i content-encoding   # → "br" (of gzip als stap 2 is overgeslagen)
curl -sI https://aimi-development.nl/ | grep -i cache-control     # → max-age=300, stale-while-revalidate
curl -sI https://aimi-development.nl/ | sort | uniq -di           # → geen output (niets dubbel)
```

Check daarna even in de browser of de site gewoon laadt: https://aimi-development.nl

**Gaat er iets mis en kom je er niet uit?** Draai de backup terug (stap 0.4) — dan
staat alles weer zoals vóór je begon — en noteer welke stap het was, dan kijken we er
samen naar.
