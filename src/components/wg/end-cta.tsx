import Link from 'next/link';
import type { ReactNode } from 'react';
import { CONTACT, WA_GROWTH } from './constants';
import { WaIcon } from './wa-icon';

type EndCtaProps = {
  eyebrow?: string;
  heading?: ReactNode;
  body?: ReactNode;
  primary?: { href: string; label: string };
  whatsapp?: { href: string; label: string };
};

export function EndCta({
  eyebrow = 'Talk to us',
  heading = (
    <>
      Tell us what you’re trying to <span className="fx">grow</span>
    </>
  ),
  body = 'Thirty minutes on a call. We’ll look at your numbers, tell you what we’d fix first, and put it in writing. If we’re not the right fit, we’ll say that too.',
  primary = { href: '/contact/', label: 'Book a growth call' },
  whatsapp = { href: WA_GROWTH, label: 'WhatsApp us' },
}: EndCtaProps) {
  const external = primary.href.startsWith('http');
  return (
    <section className="shell section-tight" aria-label="Contact call to action">
      <div className="end-cta">
        <p className="microlabel green">{eyebrow}</p>
        <h2>{heading}</h2>
        <p>{body}</p>
        <div className="end-cta-actions">
          {external ? (
            <a href={primary.href} className="btn btn-primary">
              {primary.label}
            </a>
          ) : (
            <Link href={primary.href} className="btn btn-primary">
              {primary.label}
            </Link>
          )}
          <a href={whatsapp.href} className="btn btn-wa">
            <WaIcon /> {whatsapp.label}
          </a>
        </div>
        <p className="contact-line">
          <a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a> ·{' '}
          <a href={CONTACT.emailHref}>{CONTACT.email}</a>
        </p>
      </div>
    </section>
  );
}
