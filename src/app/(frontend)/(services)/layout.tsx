import type { ReactNode } from 'react';
import '../services.css';
import '../header.css';
import { siteFooter, siteHeader } from '../chrome';

// The six service pages are the design hand-off's markup shipped verbatim
// (see design/services/README.md), each scoped under its own class in
// services.css, with the site header and footer around them. Like the home
// page, blog and academy they run apart from the brand v2.0 pages in (site),
// so links between the halves are plain anchors.

export const viewport = {
  themeColor: '#10120f',
};

// The symbols the pages reference with <use href="#…">.
const SYMBOLS = `<svg width="0" height="0" aria-hidden="true" style="position:absolute;overflow:hidden"><defs>
<symbol id="wg-mark" viewBox="0 0 80 80"><path d="M7 12h17l9 26 9-26h17L45 52H29zM28 43h17l8 24H36zM59 12h14L57 59l-8-24z"/></symbol>
<symbol id="arrow-up" viewBox="0 0 24 24"><path d="M5 19 19 5M5 5h14v14"/></symbol>
<symbol id="chev" viewBox="0 0 16 16"><path d="m3 6 5 5 5-5"/></symbol>
<symbol id="search" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.4 15.4 5 5"/></symbol>
</defs></svg>`;

// "Talk to us" goes to each page's own contact section, which offers email
// and WhatsApp with a pre-written brief.
const HEADER = siteHeader({ contact: 'href="#contact"' });
const FOOTER = siteFooter({ contact: 'href="#contact"' });

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div dangerouslySetInnerHTML={{ __html: SYMBOLS }} />
      <div className="wgh-sticky" dangerouslySetInnerHTML={{ __html: HEADER }} />
      {children}
      <div dangerouslySetInnerHTML={{ __html: FOOTER }} />
      <script defer src="/services/app.js" />
      <script defer src="/header.js" />
    </>
  );
}
