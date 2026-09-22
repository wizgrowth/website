import type { ReactNode } from 'react';
import '../fresh.css';
import '../journal.css';
import { CHAT_WA, CONTACT_DIALOG, FOOTER, SYMBOLS } from './chrome';

// The blog runs the Fresh Start design system (the home page's), extended by
// journal.css. Brand system v2.0 pages live in (site) with their own layout;
// the two stylesheets share class names, so links between the halves are
// plain anchors and the two are never in one document. Links inside the blog
// use next/link as usual.

export const viewport = {
  themeColor: '#10120f',
};

const NAV = [
  { href: '/services/', label: 'Services' },
  { href: '/work/', label: 'Work' },
  { href: '/blog/', label: 'Blog', current: true },
  { href: '/academy/', label: 'Academy' },
  { href: '/about/', label: 'About' },
];

const ARROW = (
  <svg className="arrow" aria-hidden="true">
    <use href="#arrow-up" />
  </svg>
);

export default function JournalLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div dangerouslySetInnerHTML={{ __html: SYMBOLS }} />
      <div className="j-top">
        <div className="shell">
          <header className="site-header">
            <a className="brand" href="/" aria-label="WizGrowth home">
              <svg className="mark" aria-hidden="true">
                <use href="#wg-mark" />
              </svg>
              wizgrowth
            </a>
            <nav className="desktop-nav" aria-label="Main navigation">
              {NAV.map((link) => (
                <a key={link.href} href={link.href} aria-current={link.current ? 'page' : undefined}>
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="header-right">
              {/* Without JavaScript this reaches the home page's contact
                  section; with it, the blog's script opens the enquiry dialog. */}
              <a className="header-cta" href="/#contact" data-enquiry="unsure" data-source="journal">
                Let’s talk {ARROW}
              </a>
            </div>
          </header>
        </div>
        <details className="j-mobile">
          <summary>Explore WizGrowth</summary>
          <nav aria-label="Mobile navigation">
            <a href="/">Home</a>
            {NAV.map((link) => (
              <a key={link.href} href={link.href} aria-current={link.current ? 'page' : undefined}>
                {link.label}
              </a>
            ))}
            <a href="/contact/">Contact</a>
          </nav>
        </details>
      </div>
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <div dangerouslySetInnerHTML={{ __html: FOOTER }} />
      <div dangerouslySetInnerHTML={{ __html: CHAT_WA }} />
      <div dangerouslySetInnerHTML={{ __html: CONTACT_DIALOG }} />
      {/* A real deferred script tag, as on the home page: the dialog is static
          markup, so its behaviour should not wait on React hydrating. */}
      <script defer src="/journal/app.js" />
    </>
  );
}
