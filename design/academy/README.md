# Academy design hand-off (v7)

The four academy pages ship as approved static markup, the same way the home
page does. `generate.mjs` reads these HTML files and writes:

- `src/app/(frontend)/academy.css` — the hub's stylesheet plus its hero overrides
- `src/app/(frontend)/(academy)/markup/*.ts` — each page's body markup with
  links rewritten to live URLs, WhatsApp placeholders filled in, the trainer
  portrait pointed at `/images/academy/`, and the page's title, description,
  structured data and Little Wiz messages
- `public/academy/app.js` — the pages' behaviour, shared by all four

Run `node design/academy/generate.mjs` after replacing a design file; do not
edit the generated files by hand.

Pages: `academy.html` → /academy/, `digital-marketing-course.html` →
/academy/digital-marketing-course/, `advanced-mentorship.html` →
/academy/advanced-digital-marketing-mentorship/, `business-owners.html` →
/academy/digital-marketing-for-business-owners/.
