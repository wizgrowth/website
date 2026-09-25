// Turns the service page hand-off into the files the site ships. See README.md.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { footerBase, footerRules } from '../shared/footer-rules.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../..');
const out = path.join(root, 'src/app/(frontend)/(services)/markup');

export const PAGES = [
  { id: 'hub', file: 'hub.html', url: '/services/', cms: null, name: 'Services' },
  { id: 'seo', file: 'seo.html', url: '/services/seo/', cms: 'seo', name: 'SEO' },
  { id: 'ai', file: 'ai-search-visibility.html', url: '/services/ai-search-visibility/', cms: 'ai-citations', name: 'AI Search Visibility' },
  { id: 'demand', file: 'demand-generation.html', url: '/services/demand-generation/', cms: 'performance-marketing', name: 'Demand Generation' },
  { id: 'content', file: 'content-marketing.html', url: '/services/content-marketing/', cms: 'content-marketing', name: 'Content Marketing' },
  { id: 'social', file: 'social-media-marketing.html', url: '/services/social-media-marketing/', cms: 'social-media-marketing', name: 'Social Media Marketing' },
  { id: 'web', file: 'web-development.html', url: '/services/web-development/', cms: 'web-development', name: 'Web Development' },
  // Draft until its prices, timelines, case studies and languages are confirmed: reachable, but not indexed or linked.
  { id: 'consult', file: 'marketing-consultation.html', url: '/services/marketing-consultation/', cms: null, name: 'Marketing Consultation', draft: true },
];

const escapeTs = (s) => s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const text = (s) => decode(s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());

// Rules for the hand-off's own header, footer and page resets: the layout
// supplies the site's, so these are dropped rather than scoped.
const CHROME = /^(\.site-top|\.site-header|\.brand|\.brand-mark|\.main-nav|\.nav-service|\.service-menu|\.menu-intro|\.menu-links|\.header-cta|\.menu-toggle|\.mobile-nav|\.footer|\.skip|html)(?![\w-])/;

// Scope every selector under the page's class so six sheets share one file.
function scopeCss(css, scope) {
  css = css.replace(/\/\*[\s\S]*?\*\//g, '');
  // Keyframe names are made unique per page (only inside animation values).
  const names = [...css.matchAll(/@keyframes\s+([\w-]+)/g)].map((m) => m[1]);
  for (const name of names) {
    css = css.replace(new RegExp(`@keyframes\\s+${name}(?![\\w-])`, 'g'), `@keyframes ${scope}-${name}`);
    css = css.replace(/(animation(?:-name)?\s*:[^;}]*)/g, (decl) => decl.replace(new RegExp(`(^|[\\s,:])${name}(?![\\w-])`, 'g'), `$1${scope}-${name}`));
  }
  function prefix(selector) {
    return selector.split(',').map((s) => s.trim()).filter(Boolean).map((s) => {
      if (s === ':root' || s === 'body') return `.${scope}`;
      if (s === '*') return `.${scope} *`;
      if (s.startsWith('::selection')) return `.${scope} ${s}`;
      return `.${scope} ${s}`;
    }).join(',');
  }
  function walk(t) {
    let outCss = '', i = 0;
    while (i < t.length) {
      const open = t.indexOf('{', i);
      if (open < 0) break;
      const selector = t.slice(i, open).trim();
      let depth = 1, j = open + 1;
      while (j < t.length && depth) { if (t[j] === '{') depth++; else if (t[j] === '}') depth--; j++; }
      const body = t.slice(open + 1, j - 1);
      i = j;
      if (!selector) continue;
      if (selector.startsWith('@media')) { const inner = walk(body); if (inner.trim()) outCss += `${selector}{${inner}}\n`; }
      else if (selector.startsWith('@keyframes')) outCss += `${selector}{${body}}\n`;
      else if (selector.startsWith('@')) outCss += `${selector}{${body}}\n`;
      else {
        const kept = selector.split(',').map((s) => s.trim()).filter((s) => s && !CHROME.test(s));
        if (kept.length) outCss += `${prefix(kept.join(','))}{${body.trim()}}\n`;
      }
    }
    return outCss;
  }
  return walk(css);
}

function convert(page, html) {
  const head = html.match(/<head>([\s\S]*?)<\/head>/)[1];
  const title = decode(head.match(/<title>([^<]*)<\/title>/)[1].trim());
  const description = decode((head.match(/<meta content="([^"]*)" name="description"/) || [])[1] || '');
  const schema = JSON.parse((head.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/) || [, 'null'])[1]);
  const css = head.match(/<style>([\s\S]*?)<\/style>/)[1];
  let main = html.match(/<main[\s\S]*?<\/main>/)[0];
  const rail = (html.match(/<(?:div|aside) class="service-rail">[\s\S]*?<\/(?:div|aside)>/) || [''])[0];
  main = main.replace('<main id="main">', '<main id="main" tabindex="-1">');
  main = main.replaceAll('href="https://www.wizgrowth.com/', 'href="/');
  const leftover = [...main.matchAll(/href="[^"]*\.html"/g)].length;
  if (leftover) throw new Error(`${page.file}: ${leftover} hand-off file link(s) left in the page`);
  const faqs = [...main.matchAll(/<details>\s*<summary>([\s\S]*?)<\/summary>\s*<p>([\s\S]*?)<\/p>/g)].map((m) => ({ question: text(m[1]), answer: text(m[2]) }));
  const body = `<div class="svc svc-${page.id}">${rail}${main}</div>`;
  return { title, description, schema, faqs, css: scopeCss(css, `svc-${page.id}`), body };
}

fs.mkdirSync(out, { recursive: true });
const sheets = [];
for (const page of PAGES) {
  const p = convert(page, fs.readFileSync(path.join(here, page.file), 'utf8'));
  sheets.push(`/* ---- ${page.url} (design/services/${page.file}) ---- */\n${p.css}`);
  fs.writeFileSync(path.join(out, `${page.id}.ts`), `// Generated from design/services/${page.file} by design/services/generate.mjs.
// The markup ships verbatim so the live page stays identical to the approved
// design; regenerate this file rather than editing it by hand.
import type { ServiceMarkup } from './types';

export const ${page.id.toUpperCase()}: ServiceMarkup = {
  url: ${JSON.stringify(page.url)},
  cmsSlug: ${JSON.stringify(page.cms)},
  name: ${JSON.stringify(page.name)},
  draft: ${JSON.stringify(Boolean(page.draft))},
  title: ${JSON.stringify(p.title)},
  description: ${JSON.stringify(p.description)},
  schema: ${JSON.stringify(p.schema)},
  faqs: ${JSON.stringify(p.faqs)},
  html: \`${escapeTs(p.body)}\`,
};
`);
  console.log('built', page.id, '| faqs', p.faqs.length, '| css', p.css.length);
}
fs.writeFileSync(path.join(out, 'types.ts'), `export type ServiceMarkup = {
  url: string;
  /** The servicePages document whose SEO fields override the page's own; null for the hub. */
  cmsSlug: string | null;
  name: string;
  /** Kept out of search results and site navigation until its placeholders are filled. */
  draft: boolean;
  title: string;
  description: string;
  /** The design's JSON-LD, emitted as-is beside the breadcrumb list. */
  schema: unknown;
  /** Questions and answers from the page's FAQ, for FAQPage schema when the design has none. */
  faqs: { question: string; answer: string }[];
  /** The page's main content, scoped under .svc-<id>. */
  html: string;
};
`);
fs.writeFileSync(path.join(root, 'src/app/(frontend)/services.css'), `/* WIZGROWTH / SERVICES
   Generated from design/services/*.html by design/services/generate.mjs. Each
   page's stylesheet is scoped under its own .svc-<id> class; the hand-off's
   header, footer and page resets are dropped (the layout supplies the site's)
   and the site footer's rules are lifted from fresh.css. Regenerate rather
   than edit. */
body{margin:0}html{scroll-behavior:smooth}.svc{overflow-x:clip}
.skip-link{position:fixed;left:24px;top:-100px;background:#c5f86b;color:#10120f;padding:15px;z-index:500}.skip-link:focus{top:20px}
${sheets.join('\n')}
/* The site-wide footer: its rules from fresh.css, so the home page footer renders here unchanged. */
${footerBase}
${footerRules(fs.readFileSync(path.join(root, 'src/app/(frontend)/fresh.css'), 'utf8'))}
`);
console.log('services.css written');
