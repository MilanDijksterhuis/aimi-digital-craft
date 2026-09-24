## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).





Werkregels:
Werk altijd lokaal in dit VS code project maak geen nieuwe worktrees aan.
ik push zelf naar github van mijn lokale code -> git add . -> git commit -m "" -> git push

## Build & assets

- Geen HTML, design-handoffs of werkbestanden in `assets/`; die horen in `design/` (buiten de build). Nitro bundelt alles onder `assets/` als server-asset en breekt op losse `.html`-bestanden met inline `<style>`. Runtime-afbeeldingen staan in `src/assets/` (geïmporteerd) of `public/` (via URL).
- `scripts/deploy.sh` faalt bewust vóór de build als er nog `.html` in `assets/` staat.

## Design-regels

- Geen grote genummerde kopjes/cijfers (01, 02, 03...) als visueel element in feature- of contentlijsten. Dit voelt als generieke AI-template-opmaak. Gebruik in plaats daarvan editorial patronen zonder nummering: bv. een accentbalkje, alleen typografie, of iconen.
- Vermijd generieke "AI slop": drie/vier identieke bordered cards in een grid, cirkel-iconen met nummers, standaard accordion-FAQ-look voor features. Kijk bij twijfel naar de redesign-existing-projects skill audit-checklist.