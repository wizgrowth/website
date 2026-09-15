import Link from 'next/link';
import { ACADEMY } from '@/components/wg';

export function AcademyBlock() {
  return (
    <section className="shell section" id="academy" aria-labelledby="academy-h">
      <div className="ink-block on-ink">
        <span className="chip-gold">Admissions open — {ACADEMY.cadence}</span>
        <h2 id="academy-h">
          Learn growth from people who <span className="fx">do it</span>
        </h2>
        <p className="acad-lead">
          Twelve weeks. Real client campaigns from week two. Mentors who currently run accounts, and
          a portfolio on graduation — not just a certificate for the wall. In person in Kochi, or
          live online from anywhere.
        </p>
        <div className="acad-facts">
          <div className="acad-fact">
            <b>{ACADEMY.weeks} weeks</b>
            <span>live client work, not recorded theory</span>
          </div>
          <div className="acad-fact">
            <b>Week 2</b>
            <span>when you touch your first real campaign</span>
          </div>
          <div className="acad-fact">
            <b>Monthly</b>
            <span>{ACADEMY.cadence}</span>
          </div>
        </div>
        <p className="acad-price">
          {ACADEMY.fee} <small>or 3 monthly payments</small>
        </p>
        <div className="acad-ctas">
          <Link href="/academy/" className="btn btn-paper">
            Join the next batch
          </Link>
          <Link href="/academy/#syllabus" className="btn btn-secondary on-ink">
            See the syllabus
          </Link>
        </div>
      </div>
    </section>
  );
}
