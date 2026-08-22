# Fuchsia 🌸

**Cook what you have. Waste nothing.**

Fuchsia is a Salt · Fat · Acid · Heat improvisation coach for using up food. Tell it
what's about to go off, and it hands you **one balanced meal** plus the exact salt,
fat, acid, and heat moves to make it taste finished — no recipe required.

It's the "eat the fridge before it dies" app, built on a chef's mental model instead
of a recipe database. FridgeSmart tracks inventory and matches recipes; Fuchsia teaches
you to *improvise* from what's on hand, so pragmatists save money and food, and quietly
become better cooks.

## The name

The four elements are hiding in the word itself: **f**u**c**·**h**·**s**·i·**a** carries
**F**at, **H**eat, **S**alt and **A**cid — the four elements of good cooking, in one color.
The name *is* the method, and it *is* the brand color.

## How it works

1. **Add what's in the fridge** — type it (with typeahead) or tap from the usual
   suspects. Flag anything on its last day with 🔥 *use first*.
2. **Diagnose the plate** — the engine classifies each item by element (salt/fat/acid)
   and plate role (protein/veg/starch/aromatic) and shows your balance on the
   four-element meter.
3. **Get coached to one meal** — it picks the dish *shape* that fits and uses the most
   perishable food, then writes the four moves (including the heat technique) and the
   one thing that would complete the balance.
4. **Learn the why** — a one-line lesson on the element you were missing, so the skill
   sticks.

## Architecture

Static web app — vanilla HTML/CSS/JS, **no build step, no backend, $0 to run**, works
offline, deploys straight to GitHub Pages. Your pantry persists in `localStorage`.

- `index.html` — markup + inline hamster mark
- `styles.css` — fuchsia-forward identity, color-coded elements (Heat = fuchsia), light/dark
- `js/data.js` — the knowledge base: ~110 ingredients, 10 dish shapes, lessons
- `js/engine.js` — the coaching engine (classify → score shapes → write moves), deterministic
- `js/app.js` — UI wiring, typeahead, meter, persistence

### Roadmap

- **v2 (Plus):** swap the rules engine for a Claude-powered coach that improvises free-form
  from any ingredients, remembers your pantry, and builds a "complete-the-balance" list.
- Saved meals, a "food saved" streak, and household sharing.

## Run locally

```bash
python3 -m http.server 8123 --directory .
# then open http://localhost:8123/
```

## Brand

- **Name:** Fuchsia — the four SFAH letters live inside the word (f‑u‑**c**‑**h**‑**s**‑i‑**a**), and the name is the hero color
- **Mascot:** a cheek-stuffing hamster — nature's anti-waste animal
- **Hero color:** fuchsia `#e01a79`, mapped to Heat across the UI
- **Type:** Fraunces (display) + Inter (body)
- **Repo:** `saltfatacidheat` (kept as the descriptive slug; display name is Fuchsia)
