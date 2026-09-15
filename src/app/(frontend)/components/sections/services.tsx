import Link from 'next/link';
import type { ServicePage } from '@/payload-types';
import { ServiceCard } from '@/components/wg';

const WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];

// The first three services in CMS order are the core engines; the rest are
// the supporting services in the 4-up grid.
export function Services({ services }: { services: ServicePage[] }) {
  if (services.length === 0) return null;
  const core = services.slice(0, 3);
  const supporting = services.slice(3);
  const count = WORDS[services.length] ?? String(services.length);

  return (
    <section className="shell section" id="services" aria-labelledby="services-h">
      <div className="sec-head">
        <p className="microlabel green">WizGrowth Agency</p>
        <h2 id="services-h">
          Growth, run like a <span className="fx">craft</span>
        </h2>
        <p className="intent">
          Three engines do the heavy lifting — SEO, demand generation and AI citations — with four
          supporting services around them. One rule everywhere: targets agreed up front, results
          reviewed monthly, misses included.
        </p>
      </div>
      <div className="svc-grid">
        {core.map((s) => (
          <ServiceCard key={s.slug} service={s} />
        ))}
      </div>
      {supporting.length > 0 && (
        <>
          <p className="microlabel green" style={{ display: 'block', margin: '32px 0 16px' }}>
            Supporting services
          </p>
          <div className="svc-grid svc-grid-4">
            {supporting.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </>
      )}
      <div className="svc-cta">
        <Link href="/contact/" className="btn btn-primary">
          Book a growth call
        </Link>
        <Link href="/services/" className="btn btn-quiet">
          See all {count} services in detail
        </Link>
      </div>
    </section>
  );
}
