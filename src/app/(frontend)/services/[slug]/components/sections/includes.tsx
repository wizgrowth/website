import type { ServicePage } from '@/payload-types';
import { Reveal } from '../../../components/shared';

export function Includes({ service }: { service: ServicePage }) {
  const items = service.includes ?? [];
  if (items.length === 0) return null;

  return (
    <section className="wg-shell wg-section" aria-labelledby="includes-h">
      <div className="wg-split">
        <Reveal className="wg-split-aside">
          <p className="wg-microlabel wg-microlabel--green wg-microlabel--dot">The retainer</p>
          <h2 id="includes-h" className="wg-h2">
            What’s <span className="wg-fx">included</span>
          </h2>
          <p className="wg-intent">
            The usual shape of the engagement. The exact scope is agreed on the growth call and
            written down before anything is billed.
          </p>
        </Reveal>
        <Reveal>
          <div className="wg-glance" style={{ boxShadow: 'var(--shadow-sm)' }}>
            <ul className="wg-checks">
              {items.map((entry) => (
                <li key={entry.id ?? entry.item}>{entry.item}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
