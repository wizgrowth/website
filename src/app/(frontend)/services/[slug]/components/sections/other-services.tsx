import Link from 'next/link';
import type { ServicePage } from '@/payload-types';
import { ArrowIcon, Reveal, ServiceCard } from '../../../components/shared';

type OtherServicesProps = { current: ServicePage; services: ServicePage[] };

// Every service page links to every other one, so a visitor who landed on
// the wrong channel finds the right one without going back to the hub.
export function OtherServices({ current, services }: OtherServicesProps) {
  const others = services.filter((s) => s.slug !== current.slug);
  if (others.length === 0) return null;

  return (
    <section className="wg-shell wg-section" aria-labelledby="others-h">
      <Reveal className="wg-sec-head">
        <p className="wg-microlabel wg-microlabel--green wg-microlabel--dot">
          Also from the agency
        </p>
        <h2 id="others-h" className="wg-h2">
          Engines that pair with <span className="wg-fx">{current.name}</span>
        </h2>
      </Reveal>
      <ul className="wg-grid" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {others.map((service) => (
          <Reveal as="li" key={service.slug}>
            <ServiceCard service={service} compact />
          </Reveal>
        ))}
      </ul>
      <p style={{ marginTop: 28 }}>
        <Link href="/services/" className="wg-btn wg-btn--quiet">
          See every service in detail <ArrowIcon />
        </Link>
      </p>
    </section>
  );
}
