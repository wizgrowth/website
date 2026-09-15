import { Reveal } from '../shared';
import { HUB_STEPS } from './constants';

export function Engagement() {
  return (
    <section className="wg-band" aria-labelledby="engagement-h">
      <div className="wg-shell">
        <Reveal className="wg-sec-head">
          <p className="wg-microlabel wg-microlabel--green wg-microlabel--dot">
            How it works
          </p>
          <h2 id="engagement-h" className="wg-h2">
            How an engagement <span className="wg-fx">starts</span>
          </h2>
          <p className="wg-intent">
            The same four moves for every service, in the order they happen. Nothing is billed
            before you’ve seen the plan.
          </p>
        </Reveal>
        <Reveal>
          <ol className="wg-band-steps">
            {HUB_STEPS.map((step) => (
              <li key={step.label}>
                <b>{step.label}</b>
                <span>{step.text}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
