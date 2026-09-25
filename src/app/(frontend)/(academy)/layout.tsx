import type { ReactNode } from 'react';
import '../academy.css';
import '../header.css';
import { siteFooter, siteHeader } from '../chrome';
import { LEAD_SHEET } from './markup/lead-sheet';

// The academy pages are the design hand-off's markup shipped verbatim (see
// design/academy/README.md), on their own stylesheet. Like the home page and
// the blog they are a separate half of the site from the brand v2.0 pages in
// (site): links between the halves are plain anchors, so the stylesheets are
// never in one document.

export const viewport = {
  themeColor: '#10120f',
};

// The two symbols every page's markup references with <use href="#…">.
const SYMBOLS = `<svg width="0" height="0" aria-hidden="true" style="position:absolute;overflow:hidden"><defs>
<symbol id="wg-mark" viewBox="0 0 80 80"><path d="M7 12h17l9 26 9-26h17L45 52H29zM28 43h17l8 24H36zM59 12h14L57 59l-8-24z"/></symbol>
<symbol id="arrow-up" viewBox="0 0 24 24"><path d="M5 19 19 5M5 5h14v14"/></symbol>
</defs></svg>`;

// The home page's footer, with its academy link pointing here and its
// "Let's talk" opening the academy's own enquiry sheet.
// "Let's talk" carries data-lead-open, which /academy/app.js binds to the sheet.
const HEADER = siteHeader({ contact: 'href="/academy/#enquire" data-lead-open' });

const FOOTER = siteFooter({
  contact: 'href="/academy/#enquire" data-lead-open',
  rewrites: { '<a href="/academy/">Academy</a>': '<a href="/academy/" aria-current="page">Academy</a>' },
});

export default function AcademyLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div dangerouslySetInnerHTML={{ __html: SYMBOLS }} />
      <div dangerouslySetInnerHTML={{ __html: HEADER }} />
      {children}
      <div dangerouslySetInnerHTML={{ __html: FOOTER }} />
      {/* The enquiry sheet every page's buttons open; see markup/lead-sheet.ts. */}
      <div dangerouslySetInnerHTML={{ __html: LEAD_SHEET }} />
      {/* A real deferred script tag, as on the home page: the markup is static,
          so its behaviour should not wait on React hydrating. */}
      <script defer src="/academy/app.js" />
      <script defer src="/header.js" />
    </>
  );
}
