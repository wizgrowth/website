import type { ServicePage } from '@/payload-types';
import { Reveal } from '../../../components/shared';

export function Method({ service }: { service: ServicePage }) {
  const steps = service.steps ?? [];
  if (steps.length === 0) return null;

  return (
    <section className="wg-shell wg-section" aria-labelledby="method-h">
      <div className="wg-split">
        <Reveal className="wg-split-aside">
          <p className="wg-microlabel wg-microlabel--green wg-microlabel--dot">The method</p>
          <h2 id="method-h" className="wg-h2">
            How we <span className="wg-fx">run it</span>
          </h2>
          <p className="wg-intent">
            {steps.length} steps, in the order they happen. You see the same numbers we do from
            day one.
          </p>
        </Reveal>
        <ol className="wg-steps">
          {steps.map((step) => (
            <Reveal as="li" key={step.id ?? step.label}>
              <b>{step.label}</b>
              <span>{step.text}</span>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
