import Link from 'next/link';
import type { ReactNode } from 'react';
import { CONTACT } from './constants';
import { WhatsAppIcon } from './icons';
import { Reveal } from './reveal';

type EndCtaProps = {
  heading?: ReactNode;
  body?: ReactNode;
};

export function EndCta({
  heading = (
    <>
      Tell us what you’re trying to <span className="wg-fx">grow</span>
    </>
  ),
  body = 'Thirty minutes on a call. We’ll look at your numbers, tell you what we’d fix first, and put it in writing. If we’re not the right fit, we’ll say that too.',
}: EndCtaProps) {
  return (
    <section className="wg-shell wg-section wg-section--last" aria-labelledby="end-cta-h">
      <Reveal>
        <div className="wg-ink wg-on-ink">
          <div>
            <p className="wg-microlabel wg-microlabel--dot">Talk to us</p>
            <h2 id="end-cta-h" className="wg-h2">
              {heading}
            </h2>
            <p className="wg-ink-lead">{body}</p>
            <div className="wg-ink-actions">
              <Link href="/contact/" className="wg-btn wg-btn--paper">
                Book a growth call
              </Link>
              <a
                href={CONTACT.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="wg-btn wg-btn--wa"
              >
                <WhatsAppIcon /> WhatsApp us
              </a>
            </div>
          </div>
          <div className="wg-ink-contact">
            <span className="wg-microlabel">Direct</span>
            <a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a>
            <br />
            <a href={CONTACT.emailHref}>{CONTACT.email}</a>
            <br />
            {CONTACT.location}
            <br />
            {CONTACT.hours}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
