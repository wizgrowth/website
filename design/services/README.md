# Service page design hand-off

Six service pages ship as approved static markup, the way the academy does.
`generate.mjs` reads the HTML files here and writes:

- `src/app/(frontend)/services.css` — every page's stylesheet, each scoped
  under its own `.svc-<id>` class so six sheets can share one document, plus
  the site footer's rules lifted from fresh.css
- `src/app/(frontend)/(services)/markup/*.ts` — each page's `<main>` with the
  hand-off's header, footer and scripts removed (the layout supplies the site
  header and footer; `public/services/app.js` carries the behaviour), plus the
  page's title, description, structured data and FAQs

Run `node design/services/generate.mjs` after replacing a file. Do not edit
the generated files by hand.

| File | Live URL | CMS slug (SEO fields) |
|---|---|---|
| seo.html | /services/seo/ | seo |
| ai-search-visibility.html | /services/ai-search-visibility/ | ai-citations |
| demand-generation.html | /services/demand-generation/ | performance-marketing |
| content-marketing.html | /services/content-marketing/ | content-marketing |
| social-media-marketing.html | /services/social-media-marketing/ | social-media-marketing |
| web-development.html | /services/web-development/ | web-development |

The analytics page and the services hub have no hand-off yet and stay on the
previous design.
