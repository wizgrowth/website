import type { ReactNode } from 'react';
import '../fresh.css';
import '../journal.css';
import '../header.css';
import { CHAT_WA, CONTACT_DIALOG, FOOTER, SYMBOLS, siteHeader } from '../chrome';

// The blog runs the Fresh Start design system (the home page's), extended by
// journal.css. Brand system v2.0 pages live in (site) with their own layout;
// the two stylesheets share class names, so links between the halves are
// plain anchors and the two are never in one document. Links inside the blog
// use next/link as usual.

export const viewport = {
  themeColor: '#10120f',
};

// "Let's talk" carries data-enquiry, which /journal/app.js binds to the dialog.
const HEADER = siteHeader({
  contact: 'href="/#contact" data-enquiry="unsure" data-source="journal"',
  current: 'journal',
});

export default function JournalLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div dangerouslySetInnerHTML={{ __html: SYMBOLS }} />
      <div className="wgh-sticky" dangerouslySetInnerHTML={{ __html: HEADER }} />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <div dangerouslySetInnerHTML={{ __html: FOOTER }} />
      <div dangerouslySetInnerHTML={{ __html: CHAT_WA }} />
      <div dangerouslySetInnerHTML={{ __html: CONTACT_DIALOG }} />
      {/* A real deferred script tag, as on the home page: the dialog is static
          markup, so its behaviour should not wait on React hydrating. */}
      <script defer src="/journal/app.js" />
      <script defer src="/header.js" />
    </>
  );
}
