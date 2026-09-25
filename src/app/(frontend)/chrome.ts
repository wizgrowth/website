import { HOME_MARKUP } from './home-markup';

// The blog and the academy share the home page's footer, WhatsApp button and
// enquiry dialog. They are lifted out of the approved home markup here (the
// design hand-off did the same from its reference page) so the halves can
// never drift apart. The home page's in-page anchors become links back to the
// home page, and its contact buttons become whatever each half's script opens.

function pick(pattern: RegExp, name: string) {
  const match = HOME_MARKUP.match(pattern);
  if (!match) throw new Error(`home markup no longer contains the ${name}`);
  return match[0];
}

const ARROW = '<svg class="arrow" aria-hidden="true"><use href="#arrow-up"/></svg>';

export const SYMBOLS = pick(/<svg width="0" height="0"[\s\S]*?<\/svg>/, 'SVG symbol definitions');

type FooterOptions = {
  /** Attributes for the "Let's talk" link, e.g. the data attribute a script binds. */
  contact: string;
  /** Further href rewrites applied after the standard ones, e.g. to mark the current section. */
  rewrites?: Record<string, string>;
};

export function siteFooter({ contact, rewrites = {} }: FooterOptions) {
  let footer = pick(/<footer class="site-footer[\s\S]*?<\/footer>/, 'footer')
    .replaceAll('href="#top"', 'href="/"')
    .replaceAll('href="#expertise"', 'href="/#expertise"')
    .replaceAll('href="#about"', 'href="/#about"')
    .replaceAll('href="#approach"', 'href="/#approach"')
    .replaceAll('href="#academy"', 'href="/#academy"')
    .replace(/<button type="button" data-contact>[\s\S]*?<\/button>/g, `<a ${contact}>Let's talk ${ARROW}</a>`);
  for (const [from, to] of Object.entries(rewrites)) footer = footer.replace(from, to);
  return footer;
}

export const FOOTER = siteFooter({
  contact: 'href="/#contact" data-enquiry="unsure" data-source="journal"',
  rewrites: { '<a href="/blog/">Journal</a>': '<a href="/blog/" aria-current="page">Journal</a>' },
});

type HeaderOptions = {
  /** Attributes for the "Let's talk" link (desktop and mobile), e.g. the data attribute a script binds. */
  contact: string;
  /** Which top-level item is the current section, for aria-current. */
  current?: 'academy' | 'journal' | 'about' | 'agency';
};

const AGENCY_LINKS = [
  ['/#expertise', 'Search & organic growth', 'SEO, content and technical foundations.'],
  ['/#expertise', 'Demand generation & PPC', 'Campaigns with a clear commercial job.'],
  ['/#expertise', 'AI visibility', 'Make your expertise easier to reference.'],
  ['/services/social-media-marketing/', 'Social media marketing', 'Useful content and real conversations.'],
  ['/services/content-marketing/', 'Content marketing', 'Content built around intent and action.'],
  ['/services/web-development/', 'Website development', 'Clearer journeys from interest to enquiry.'],
];

const ACADEMY_LINKS = [
  ['/academy/digital-marketing-course/', 'Digital Marketing Course with AI', 'Beginner to job-ready in 12 weeks.'],
  ['/academy/advanced-digital-marketing-mentorship/', 'Advanced Mentorship', 'For working marketers ready to own growth.'],
  ['/academy/digital-marketing-for-business-owners/', 'For Business Owners', 'Learn to own or judge your organic growth.'],
];

const CHEVRON = '<svg aria-hidden="true"><use href="#wgh-chevron"/></svg>';

function dropLinks(links: string[][]) {
  return links
    .map(([href, title, sub], i) =>
      `<a class="wgh-drop-link" href="${href}"><span class="wgh-num">${String(i + 1).padStart(2, '0')}</span><span><strong>${title}</strong><small>${sub}</small></span><span class="wgh-arr">↗</span></a>`)
    .join('');
}

function mobileLinks(links: string[][]) {
  return links.map(([href, title]) => `<a href="${href}"><span>${title}</span><span>↗</span></a>`).join('');
}

// The site header from design/header/header.html: the wordmark (no logo
// mark), Agency and Academy dropdowns, About, Journal and "Let's talk", with a
// mobile panel of the same links. Classes carry the "wgh-" prefix; see header.css.
export function siteHeader({ contact, current }: HeaderOptions) {
  const cur = (key: HeaderOptions['current']) => (current === key ? ' aria-current="page"' : '');
  return `<svg width="0" height="0" aria-hidden="true" style="position:absolute;overflow:hidden"><defs><symbol id="wgh-chevron" viewBox="0 0 16 16"><path d="m3 6 5 5 5-5"/></symbol></defs></svg>
<div class="wgh-wrap" id="top">
  <div class="shell">
    <header class="wgh-bar">
      <a class="wgh-brand" href="/" aria-label="WizGrowth home"><span class="wgh-word">wizgrowth</span></a>
      <nav class="wgh-nav" aria-label="Main navigation">
        <div class="wgh-item" data-wgh-dropdown>
          <button class="wgh-trigger" type="button" aria-expanded="false"${cur('agency')}>Agency ${CHEVRON}</button>
          <div class="wgh-drop wgh-drop-agency" role="menu">
            <div class="wgh-drop-inner">
              <aside class="wgh-drop-intro"><div><div class="wgh-drop-eyebrow">AGENCY / SERVICES</div><h2>Growth, joined up.</h2><p>Search, demand and AI visibility working in the same direction.</p></div><div class="wgh-drop-count">06 CAPABILITIES</div></aside>
              <div class="wgh-drop-links">${dropLinks(AGENCY_LINKS)}</div>
            </div>
          </div>
        </div>
        <div class="wgh-item" data-wgh-dropdown>
          <button class="wgh-trigger" type="button" aria-expanded="false"${cur('academy')}>Academy ${CHEVRON}</button>
          <div class="wgh-drop wgh-drop-academy" role="menu">
            <div class="wgh-drop-inner">
              <aside class="wgh-drop-intro"><div><div class="wgh-drop-eyebrow">WIZGROWTH / ACADEMY</div><h2>Learn by doing.</h2><p>Live, practical programmes built around real work.</p></div><div class="wgh-drop-count">03 PROGRAMMES</div></aside>
              <div class="wgh-drop-links">${dropLinks(ACADEMY_LINKS)}</div>
            </div>
          </div>
        </div>
        <div class="wgh-item"><a class="wgh-link" href="/#about"${cur('about')}>About</a></div>
        <div class="wgh-item"><a class="wgh-link" href="/blog/"${cur('journal')}>Journal</a></div>
      </nav>
      <div class="wgh-right">
        <a class="wgh-cta" ${contact}><span class="wgh-cta-label">Let's talk</span><span class="wgh-cta-icon"><svg aria-hidden="true"><use href="#arrow-up"/></svg></span></a>
        <button class="wgh-menu" type="button" aria-label="Open menu" aria-expanded="false" data-wgh-menu><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 8h18M3 16h18"/></svg></button>
      </div>
    </header>
  </div>
  <div class="wgh-mobile" data-wgh-panel>
    <div class="wgh-mobile-inner">
      <div class="wgh-mobile-note">WIZGROWTH / NAVIGATION</div>
      <div class="wgh-mobile-section" data-wgh-section><button class="wgh-mobile-accordion" type="button" aria-expanded="false">Agency ${CHEVRON}</button><div class="wgh-mobile-sub"><div>${mobileLinks(AGENCY_LINKS)}</div></div></div>
      <div class="wgh-mobile-section" data-wgh-section><button class="wgh-mobile-accordion" type="button" aria-expanded="false">Academy ${CHEVRON}</button><div class="wgh-mobile-sub"><div>${mobileLinks(ACADEMY_LINKS)}</div></div></div>
      <a class="wgh-mobile-link" href="/#about"><span>About</span><span>↗</span></a>
      <a class="wgh-mobile-link" href="/blog/"><span>Journal</span><span>↗</span></a>
      <a class="wgh-mobile-cta" ${contact}><span>Let's talk</span><svg aria-hidden="true"><use href="#arrow-up"/></svg></a>
    </div>
  </div>
</div>`;
}

export const CONTACT_DIALOG = pick(/<dialog id="contact-dialog"[\s\S]*?<\/dialog>/, 'contact dialog');

export const CHAT_WA = pick(/<a class="chat-wa"[\s\S]*?<\/a>/, 'WhatsApp button');
