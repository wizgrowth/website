// Turns the academy design hand-off into the files the site ships. See README.md.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../..');
const out = path.join(root, 'src/app/(frontend)/(academy)/markup');

const wa = (text) => `https://wa.me/917907551261?text=${encodeURIComponent(text)}`;

// Design file → live URL, and the WhatsApp messages behind each page's placeholder buttons.
const PAGES = [
  {
    id: 'hub',
    file: 'academy.html',
    url: '/academy/',
    whatsapp: wa("Hi WizGrowth Academy — I'd like details about the next batch."),
  },
  {
    id: 'course',
    file: 'digital-marketing-course.html',
    url: '/academy/digital-marketing-course/',
    whatsapp: wa("Hi WizGrowth Academy — I'd like to join the next 12-week Digital Marketing Course with AI."),
  },
  {
    id: 'mentorship',
    file: 'advanced-mentorship.html',
    url: '/academy/advanced-digital-marketing-mentorship/',
    whatsapp: wa("Hi WizGrowth Academy — I'd like to apply for the Advanced Digital Marketing Mentorship. My current role and the website I would work on:"),
  },
  {
    id: 'owners',
    file: 'business-owners.html',
    url: '/academy/digital-marketing-for-business-owners/',
    whatsapp: wa("Hi WizGrowth Academy — I'd like to book a 15-minute fit call about Digital Marketing for Business Owners."),
  },
];

const FILE_TO_URL = {
  'academy-v7-standalone.html': '/academy/',
  'digital-marketing-course-v7-standalone.html': '/academy/digital-marketing-course/',
  'advanced-mentorship-v7-standalone.html': '/academy/advanced-digital-marketing-mentorship/',
  'business-owners-v7-standalone.html': '/academy/digital-marketing-for-business-owners/',
};

// The one embedded image: the trainer portrait, shipped as a file instead.
const PORTRAIT = {
  src: '/images/academy/vismaya-babu-wizgrowth-academy-trainer.webp',
  width: 1100,
  height: 1375,
};

const escapeTs = (s) => s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');

function convert(page, html) {
  const head = html.match(/<head>([\s\S]*?)<\/head>/)[1];
  const title = head.match(/<title>([^<]*)<\/title>/)[1].trim();
  const description = (head.match(/<meta content="([^"]*)" name="description"/) || [])[1] || '';
  const schema = JSON.parse((head.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/) || [, 'null'])[1]);
  const styles = [...head.matchAll(/<style>([\s\S]*?)<\/style>/g)].map((m) => m[1]);
  // The messages are a JS array literal with mixed quotes; evaluate it as one.
  const wiz = new Function(`return ${(html.match(/const wizMessages = (\[[^\]]*\])/) || [, '[]'])[1]}`)();

  let body = html.match(/<body[^>]*>([\s\S]*)<\/body>/)[1];
  body = body
    .replace(/<script[\s\S]*?<\/script>/g, '') // behaviour lives in /academy/app.js
    .replace(/<svg[^>]*width="0"[\s\S]*?<\/svg>/, '') // symbols come from the layout
    .replace(/<img alt="([^"]*)" loading="lazy" src="data:image\/webp;base64,[^"]*"\/>/, (m, alt) =>
      `<img alt="${alt}" loading="lazy" src="${PORTRAIT.src}" width="${PORTRAIT.width}" height="${PORTRAIT.height}"/>`);
  for (const [file, url] of Object.entries(FILE_TO_URL)) body = body.replaceAll(`href="${file}"`, `href="${url}"`);
  // The wordmark in the footer goes to the main site; the button beside it scrolls up.
  body = body.replace('class="signature-word" href="#top"', 'class="signature-word" href="/"');
  // Placeholder buttons: WhatsApp for enquiries, the services hub for "done for you".
  body = body.replace(/<a class="button ghost" href="#">Prefer it done for you\?/, '<a class="button ghost" href="/services/">Prefer it done for you?');
  body = body.replace(/<a class="button dark" href="#"/g, `<a class="button dark" href="${page.whatsapp}" target="_blank" rel="noopener noreferrer"`);
  body = body.replace(/<a class="button lime" href="#enquire">/g, `<a class="button lime" href="${page.whatsapp}" target="_blank" rel="noopener noreferrer">`);
  const leftover = [...body.matchAll(/href="#"/g)].length;
  if (leftover) throw new Error(`${page.file}: ${leftover} placeholder link(s) left`);
  // The current page's own link in the nav is marked; the design left it to the file name.
  body = body.replace(new RegExp(`<a href="${page.url}">`, 'g'), `<a aria-current="page" href="${page.url}">`).replace(/aria-current="page" aria-current="page"/g, 'aria-current="page"');
  body = body.trim();

  return { title, description, schema, styles, wiz, body };
}

fs.mkdirSync(out, { recursive: true });
let css = null;
const built = [];
for (const page of PAGES) {
  const file = path.join(here, page.file);
  if (!fs.existsSync(file)) { console.log(`skip ${page.id}: ${page.file} not supplied yet`); continue; }
  const p = convert(page, fs.readFileSync(file, 'utf8'));
  if (page.id === 'hub') css = p.styles;
  const ts = `// Generated from design/academy/${page.file} by design/academy/generate.mjs.
// The markup ships verbatim so the live page stays identical to the approved
// design; regenerate this file rather than editing it by hand.
import type { AcademyPage } from './types';

export const ${page.id.toUpperCase()}: AcademyPage = {
  url: ${JSON.stringify(page.url)},
  title: ${JSON.stringify(p.title)},
  description: ${JSON.stringify(p.description)},
  schema: ${JSON.stringify(p.schema)},
  wizMessages: ${JSON.stringify(p.wiz)},
  html: \`${escapeTs(p.body)}\`,
};
`;
  fs.writeFileSync(path.join(out, `${page.id}.ts`), ts);
  built.push(page.id);
}
fs.writeFileSync(path.join(out, 'types.ts'), `export type AcademyPage = {
  url: string;
  title: string;
  description: string;
  /** The design's JSON-LD (a @graph), emitted as-is beside the breadcrumb list. */
  schema: unknown;
  /** What Little Wiz says in the hero, rotated by /academy/app.js. */
  wizMessages: string[];
  /** Header, main and footer, as in the design file. */
  html: string;
};
`);
if (css) {
  fs.writeFileSync(path.join(root, 'src/app/(frontend)/academy.css'), `/* WIZGROWTH / ACADEMY
   Generated from design/academy/academy.html by design/academy/generate.mjs:
   the hand-off's stylesheet followed by its hero overrides. Loaded only by the
   (academy) route group. Regenerate rather than edit. */
${css.join('\n')}`);
}
console.log('built:', built.join(', '));
