# Fuchsia — next steps

A running roadmap. Fuchsia is a Salt·Fat·Acid·Heat **flavor lab** that turns what's about
to expire into one balanced meal — and *teaches* home cooks to improvise (the thing most
food apps skip).

## Shipped (live on GitHub Pages)
- Flavor-lab visual identity: animated lab test-tubes with ingredient dispensers + reaction
  bubbles, animated Erlenmeyer flask, pH strip on Acid, chemistry dots on chips
- Fridge + stocked-pantry illustrations, cute food-character set, real flavor-lab photo
- The four elements (Salt · Fat · Acid · Heat) as labeled specimen cards — "Balance is everything"
- Meal-aware engine: ~145 ingredients, 18 dish shapes, best pick per **breakfast / lunch / dinner**
- Inputs: manual typing (fast), photo → Claude vision, **voice dictation** ("just say your fridge")
- Stock-the-pantry guide (vinegar shelf, chile-level scale), savings value-prop, "meet the maker"
- Mobile-hardened + animated (respects reduced-motion)

## Next up (prioritized)
1. **Expiration reminders (toggleable).** Optional per-item expiry + "use these first" nudges;
   a settings switch to turn it on/off. Keeps the spur-of-the-moment essence for people who
   don't want date-tracking, while helping others waste nothing.
2. **More input methods** (supplements to the photo): **barcode scan** and **receipt scan**
   → auto-fill the fridge. Voice + manual already shipped.
3. **Save & revisit:** saved meals, a "food rescued" streak, and a running "$ saved" counter
   (reinforces the $50–$100/month value).
4. **Deeper teaching:** expand the "why it works" lessons and per-move technique tips — lean
   into the differentiator that other apps miss.

## Business / decisions
- **Pricing (proposed):** Free core; **Plus at $2.99/mo or $24/yr**. Plus likely gates the
  LLM photo/vision reader, saved meals, expiration reminders, and unlimited history.
- **Apple App Store path:** the web app can be wrapped for iOS (PWA → Capacitor/WKWebView
  shell) and submitted. See the submission checklist we discussed.
- **Name:** keep **Fuchsia** (correct spelling; hides S·F·A·H); hold **Fuchsia Labs** for a
  parent/company brand. See BRANDING.md.
- **OpenStove recipes:** NOT usable — licensed CC BY-NC-SA 4.0 (NonCommercial + ShareAlike),
  incompatible with a commercial/proprietary app. Build our own dish library (done) and/or
  link out to OpenStove with attribution.

## Deploy notes
- Live: https://clinical-trials.github.io/saltfatacidheat/ (serves `main`)
- `main` is the current build; old pre-graphics version preserved in history at `4621e6d`
- Assets are cache-busted with `?v=N` — bump N in index.html on a deploy if a change isn't showing
