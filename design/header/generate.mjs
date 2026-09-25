// Turns design/header/header.html into src/app/(frontend)/header.css.
// The markup lives in src/app/(frontend)/chrome.ts (siteHeader), written by
// hand from the same file with relative links and no logo mark; the script in
// public/header.js is the design's, with the same class prefix. See the CSS
// file header for the class-prefix rule.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../..');
const design = fs.readFileSync(path.join(here, 'header.html'), 'utf8');
const cssAll = design.match(/<style>([\s\S]*?)<\/style>/)[1];
let css = cssAll.slice(cssAll.indexOf('/* =========================\n   HEADER'), cssAll.indexOf('/* preview floor only */')) + cssAll.slice(cssAll.indexOf('@media(hover:hover)'));
css = css.replace(/@media\(prefers-reduced-motion:reduce\)\{\*\{animation:none!important;transition:none!important\}\}/, '@media(prefers-reduced-motion:reduce){.wgh-wrap *{animation:none!important;transition:none!important}}');
const renames = [['header-wrap','wgh-wrap'],['site-header','wgh-bar'],['brand-mark-wrap','wgh-brand-mark'],['brand-word','wgh-word'],['brand','wgh-brand'],['desktop-nav','wgh-nav'],['nav-item','wgh-item'],['nav-trigger','wgh-trigger'],['nav-link','wgh-link'],['header-right','wgh-right'],['header-cta-label','wgh-cta-label'],['header-cta-icon','wgh-cta-icon'],['header-cta','wgh-cta'],['menu-toggle','wgh-menu'],['dropdown-inner','wgh-drop-inner'],['dropdown-intro','wgh-drop-intro'],['dropdown-eyebrow','wgh-drop-eyebrow'],['dropdown-count','wgh-drop-count'],['dropdown-links','wgh-drop-links'],['dropdown-link','wgh-drop-link'],['dropdown-agency','wgh-drop-agency'],['dropdown-academy','wgh-drop-academy'],['dropdown','wgh-drop'],['mobile-panel','wgh-mobile'],['mobile-inner','wgh-mobile-inner'],['mobile-top-note','wgh-mobile-note'],['mobile-section','wgh-mobile-section'],['mobile-accordion','wgh-mobile-accordion'],['mobile-sub','wgh-mobile-sub'],['mobile-link','wgh-mobile-link'],['mobile-cta','wgh-mobile-cta'],['mark','wgh-mark'],['open','is-open'],['num','wgh-num'],['arr','wgh-arr']];
for (const [a, b] of renames) css = css.replace(new RegExp('\\.' + a.replace(/-/g, '\\-') + '(?![\\w-])', 'g'), '.' + b);
const vars = `.wgh-wrap{--ink:#10120f;--ink-2:#151914;--paper:#fff;--soft:#f4f6f2;--lime:#c5f86b;--lilac:#c3b9fb;--line:#343a31;--ease:cubic-bezier(.2,.8,.2,1);--mono:"Courier New",monospace;color:#fff}
:where(.wgh-wrap) a{color:inherit;text-decoration:none}:where(.wgh-wrap) button{font:inherit;color:inherit;border:0;background:none;cursor:pointer;padding:0}:where(.wgh-wrap) svg{display:block}:where(.wgh-wrap) h2{margin:0;font-weight:500}
`;
fs.writeFileSync(path.join(root, 'src/app/(frontend)/header.css'), `/* WIZGROWTH / SITE HEADER
   Generated from design/header/header.html by design/header/generate.mjs
   with every class prefixed "wgh-" so it can sit on top of fresh.css,
   journal.css or academy.css without touching their own header rules.
   Regenerate rather than edit. */
${vars}${css.trim()}
/* Additions: with the nav hidden on phones the right-hand group keeps to the right edge. */
.wgh-right{justify-self:end}
/* The layouts wrap the header markup in a div of its own height, so that wrapper carries the sticky positioning; in-page anchors land below the bar. */
.wgh-sticky{position:sticky;top:0;z-index:100}html{scroll-padding-top:96px}
/* A click on a hover-opened dropdown closes it (see header.js). */
.wgh-item.is-closed>.wgh-drop{opacity:0!important;visibility:hidden!important;pointer-events:none!important}.wgh-item.is-closed>.wgh-trigger svg{transform:none!important}.wgh-item.is-closed::after{opacity:0!important}
/* Dropdown titles are paragraphs, not document headings: they sit before the page's h1. */
.wgh-drop-intro .wgh-drop-title{font-size:29px;line-height:1.02;letter-spacing:-.055em;margin:22px 0 0;max-width:180px;font-weight:500}.wgh-drop-academy .wgh-drop-intro .wgh-drop-title{font-size:31px}
/* Skip link for the halves whose stylesheet lacks one (the academy). */
.skip-link{position:fixed;left:24px;top:-100px;background:#c5f86b;color:#10120f;padding:15px;z-index:500}.skip-link:focus{top:20px}
`);
console.log('header.css written');
