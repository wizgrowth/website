import { Reveal } from '../reveal';

const outcomes = [
  'Build a growth strategy from a blank document — for a real company, with real numbers.',
  'Run a modern SEO and GEO programme that ranks on Google and gets cited inside LLMs.',
  'Ship a content system that produces consistently without burning the team out.',
  'Set up GA4 and an instrumentation stack that actually answers business questions.',
  'Run an experimentation backlog with proper prioritisation, hypotheses, and decision logs.',
  'Operate AI workflows that compress weeks of marketing work into days, used correctly.',
  'Walk out with a portfolio of real work — not a certificate that no one asks to see.',
] as const;

const displayH2 =
  "font-[family-name:var(--font-fraunces),Georgia,serif] text-[clamp(32px,4.2vw,54px)] font-medium leading-[1.04] tracking-[-0.025em] [font-variation-settings:'opsz'_96,'SOFT'_30]";

export function Outcomes() {
  return (
    <section className="border-y border-[rgba(14,23,21,0.12)] bg-[#FAF7F1] py-28 text-[#0E1715] max-[720px]:py-16">
      <div className="mx-auto max-w-[1240px] px-8 max-[720px]:px-[22px]">
        <Reveal>
          <span className="inline-flex items-center gap-3 font-[family-name:var(--font-geist-mono),ui-monospace,Menlo,monospace] text-[11.5px] font-medium uppercase tracking-[0.14em] text-[#14352A]">
            <span className="text-[#C66B2D]">07</span> Outcomes
          </span>
        </Reveal>

        <div className="mb-14 mt-4 grid grid-cols-1 items-end gap-16 max-[920px]:grid-cols-1 max-[920px]:gap-6 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className={`max-w-[18ch] ${displayH2}`}>
              What you&apos;ll be able <span className="text-[#C66B2D]">to do</span>.
            </h2>
          </Reveal>
          <Reveal>
            <p className="max-w-[64ch] text-[clamp(17px,1.3vw,19px)] font-normal leading-[1.55] text-[#0E1715]">
              Outcomes framed as capability, not salary promises. Each maps to a real artefact
              you&apos;ll build inside the cohort and walk out with — a tangible answer to
              &quot;what did you actually do for 12 weeks?&quot;
            </p>
          </Reveal>
        </div>

        <ol className="m-0 list-none border-t border-[rgba(14,23,21,0.32)] p-0">
          {outcomes.map((text, i) => (
            <li
              key={i}
              className="border-b border-[rgba(14,23,21,0.12)] p-0"
            >
              <Reveal className="grid grid-cols-[60px_1fr] gap-6 py-6 font-[family-name:var(--font-fraunces),Georgia,serif] text-[clamp(20px,2.2vw,28px)] font-medium leading-[1.25] tracking-[-0.018em] text-[#0E1715] max-[480px]:grid-cols-[48px_1fr] max-[480px]:gap-4">
                <span className="pt-2.5 font-[family-name:var(--font-geist-mono),ui-monospace,Menlo,monospace] text-[11.5px] font-medium uppercase tracking-[0.16em] text-[#C66B2D]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{text}</span>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
