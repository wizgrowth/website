import type { ServicePage } from '@/payload-types';
import { Reveal, ServiceCard } from '../shared';

export function ServicesGrid({ services }: { services: ServicePage[] }) {
  if (services.length === 0) return null;

  return (
    <section id="what-we-do" className="wg-shell wg-section" aria-labelledby="services-h">
      <Reveal className="wg-sec-head">
        <p className="wg-microlabel wg-microlabel--green wg-microlabel--dot">What we run</p>
        <h2 id="services-h" className="wg-h2">
          Pick a channel, or bring us the <span className="wg-fx">goal</span>
        </h2>
        <p className="wg-intent">
          Each service is run as its own engine with its own numbers. Open one to see the method,
          what’s included, and the honest answer on timelines and cost.
        </p>
      </Reveal>
      <ul className="wg-grid" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {services.map((service, i) => (
          <Reveal as="li" key={service.slug}>
            <ServiceCard service={service} index={i} />
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
