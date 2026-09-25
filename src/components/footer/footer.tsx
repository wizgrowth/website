import Link from 'next/link';
import { CONTACT } from '@/components/wg/constants';

const AGENCY = [
  { href: '/services/seo/', label: 'SEO' },
  { href: '/services/ai-search-visibility/', label: 'AI search visibility' },
  { href: '/services/demand-generation/', label: 'Demand generation' },
  { href: '/services/content-marketing/', label: 'Content marketing' },
  { href: '/services/social-media-marketing/', label: 'Social media' },
  { href: '/services/web-development/', label: 'Web development' },
];

const COMPANY = [
  { href: '/academy/', label: 'Academy', reload: true },
  { href: '/work/', label: 'Work' },
  // Plain anchor on purpose: the blog runs the other design system.
  { href: '/blog/', label: 'Blog', reload: true },
  { href: '/about/', label: 'About' },
  { href: '/contact/', label: 'Contact' },
];

// Brand rule: no opening hours and no street address in the contact
// column. The city appears in the tagline and the copyright line only.
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer on-ink">
      <div className="footer-grid">
        <div>
          {/* Plain anchor on purpose — see the header. */}
          <a href="/" className="wm on-ink">
            WizGrowth
          </a>
          <p className="footer-tag">
            Grow brands. Grow people. A growth marketing agency and academy in Kochi, Kerala.
          </p>
        </div>
        <nav aria-label="Agency links">
          <h3>Agency</h3>
          <ul>
            {AGENCY.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Company links">
          <h3>Company</h3>
          <ul>
            {COMPANY.map((l) => (
              <li key={l.href}>
                {'reload' in l ? <a href={l.href}>{l.label}</a> : <Link href={l.href}>{l.label}</Link>}
              </li>
            ))}
          </ul>
        </nav>
        <div className="footer-contact">
          <h3>Talk to us</h3>
          <p>
            <a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a>
          </p>
          <p>
            <a href={CONTACT.emailHref}>{CONTACT.email}</a>
          </p>
          <h3 style={{ marginTop: 22 }}>Follow</h3>
          <div className="social-row">
            <a
              href="https://x.com/wiz_growth"
              aria-label="WizGrowth on X"
              rel="me noopener"
              target="_blank"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.9 1.2h3.7l-8.1 9.3 9.5 12.3h-7.5l-5.8-7.6-6.7 7.6H.3l8.6-9.9L-.2 1.2h7.7l5.3 6.9 6.1-6.9zm-1.3 19.5h2L6.4 3.3H4.2l13.4 17.4z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/wiz-growth/"
              aria-label="WizGrowth on LinkedIn"
              rel="me noopener"
              target="_blank"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.37 4.26 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/wiz_growth/"
              aria-label="WizGrowth on Instagram"
              rel="me noopener"
              target="_blank"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.8.31-1.47.72-2.14 1.4C1.32 2.7.91 3.37.6 4.16.3 4.93.1 5.8.04 7.08.01 8.35 0 8.76 0 12s.01 3.65.07 4.93c.06 1.27.26 2.15.56 2.91.31.8.72 1.47 1.4 2.14.67.67 1.34 1.09 2.14 1.4.77.3 1.64.5 2.91.56 1.28.06 1.69.07 4.93.07s3.65-.01 4.93-.07c1.27-.06 2.15-.26 2.91-.56.8-.31 1.47-.72 2.14-1.4.67-.67 1.09-1.34 1.4-2.14.3-.77.5-1.64.56-2.91.06-1.28.07-1.69.07-4.93s-.01-3.65-.07-4.93c-.06-1.27-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.4-2.14A5.88 5.88 0 0 0 19.84.63C19.07.33 18.2.13 16.93.07 15.65.01 15.24 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4zm7.85-10.4a1.44 1.44 0 1 1-1.44-1.44 1.44 1.44 0 0 1 1.44 1.44z" />
              </svg>
            </a>
          </div>
          <h3 style={{ marginTop: 22 }}>Find us on</h3>
          <p>
            <a href="https://clutch.co/profile/wizgrowth" rel="noopener" target="_blank">
              Clutch
            </a>{' '}
            ·{' '}
            <a
              href="https://www.trustpilot.com/review/wizgrowth.com"
              rel="noopener"
              target="_blank"
            >
              Trustpilot
            </a>
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {year} WizGrowth · Kochi, Kerala</span>
        <span>
          Grow brands. Grow <span className="fx">people.</span>
        </span>
      </div>
    </footer>
  );
}
