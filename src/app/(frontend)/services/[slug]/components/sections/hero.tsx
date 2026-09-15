import Link from 'next/link';
import type { ServicePage } from '@/payload-types';
import { ENGAGEMENT_RULES, Reveal } from '../../../components/shared';

export function Hero({ service }: { service: ServicePage }) {
  const steps = service.steps?.length ?? 0;
  const includes = service.includes?.length ?? 0;
  const rows = [
    ...ENGAGEMENT_RULES.slice(0, 4),
    ...(steps > 0
      ? [
          {
            k: 'The method',
            v: `${steps} steps${includes > 0 ? ` · ${includes} things included` : ''}`,
          },
        ]
      : []),
  ];

  return (
    <header className="wg-shell wg-hero">
      <Reveal>
        <p className="wg-microlabel wg-microlabel--green wg-microlabel--dot">
          WizGrowth Agency · Service
        </p>
        <h1 className="wg-h1">
          {service.h1}
          {service.h1Accent && (
            <>
              {' '}
              <span className="wg-fx">{service.h1Accent}</span>
            </>
          )}
        </h1>
        {service.lead && <p className="wg-lead">{service.lead}</p>}
        <div className="wg-hero-ctas">
          <Link href="/contact/" className="wg-btn wg-btn--primary">
            Book a growth call
          </Link>
          <Link href="/services/" className="wg-btn wg-btn--secondary">
            See all services
          </Link>
        </div>
      </Reveal>

      <Reveal>
        <aside className="wg-glance" aria-label={`${service.name} at a glance`}>
          <p className="wg-microlabel wg-microlabel--green">At a glance</p>
          <ul className="wg-glance-rows">
            {rows.map((row) => (
              <li key={row.k}>
                <span className="wg-k">{row.k}</span>
                <span className="wg-v">{row.v}</span>
              </li>
            ))}
          </ul>
          {(service.faqs?.length ?? 0) > 0 && (
            <p className="wg-glance-foot">
              Questions on cost or timelines?{' '}
              <a href="#faq" className="wg-link">
                Answered below
              </a>
              .
            </p>
          )}
        </aside>
      </Reveal>
    </header>
  );
}
