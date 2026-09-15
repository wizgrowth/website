import Link from 'next/link';
import { CONTACT, ENGAGEMENT_RULES, Reveal, WhatsAppIcon } from '../shared';
import { countWord } from './constants';

export function Hero({ serviceCount }: { serviceCount: number }) {
  return (
    <header className="wg-shell wg-hero">
      <Reveal>
        <p className="wg-microlabel wg-microlabel--green wg-microlabel--dot">
          WizGrowth Agency · Kochi, Kerala
        </p>
        <h1 className="wg-h1">
          {countWord(serviceCount)} services. One rule: numbers you can{' '}
          <span className="wg-fx">check</span>
        </h1>
        <p className="wg-lead">
          Pick a channel or bring us the goal — either way, every engagement starts with a free
          growth call and a written scope, and reports monthly against targets you agreed to.
          Misses included.
        </p>
        <div className="wg-hero-ctas">
          <Link href="/contact/" className="wg-btn wg-btn--primary">
            Book a growth call
          </Link>
          <a
            href={CONTACT.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="wg-btn wg-btn--secondary"
          >
            <WhatsAppIcon /> WhatsApp us
          </a>
        </div>
        <p className="wg-hero-note">
          Retainers across D2C, SaaS and education · Clients in Kerala, across India and abroad
        </p>
      </Reveal>

      <Reveal>
        <aside className="wg-glance" aria-label="What every engagement includes">
          <p className="wg-microlabel wg-microlabel--green">Every engagement, every service</p>
          <ul className="wg-glance-rows">
            {ENGAGEMENT_RULES.map((rule) => (
              <li key={rule.k}>
                <span className="wg-k">{rule.k}</span>
                <span className="wg-v">{rule.v}</span>
              </li>
            ))}
          </ul>
          <p className="wg-glance-foot">
            If a budget is too small for a channel to work honestly, we say so on the call — and
            suggest what to do instead.
          </p>
        </aside>
      </Reveal>
    </header>
  );
}
