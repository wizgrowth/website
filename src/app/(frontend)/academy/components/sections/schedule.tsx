import { Reveal } from '../reveal';

const weeks = [
  ['Week 01', 'Foundations & growth strategy'],
  ['Week 02', 'Frameworks & growth loops'],
  ['Week 03', 'Brand & positioning'],
  ['Week 04', 'Modern SEO foundations'],
  ['Week 05', 'SEO at scale'],
  ['Week 06', 'GEO & AI search'],
  ['Week 07', 'Content systems I'],
  ['Week 08', 'Content systems II'],
  ['Week 09', 'Analytics & instrumentation'],
  ['Week 10', 'Experimentation'],
  ['Week 11', 'AI-native workflows'],
  ['Week 12', 'Portfolio & showcase'],
] as const;

const rhythm = [
  {
    when: 'Sat & Sun',
    what: 'Live sessions',
    text: 'Two 90-minute interactive live sessions per weekend. Built around discussion, not slides.',
  },
  {
    when: 'Mon — Fri',
    what: 'Self-paced work',
    text: 'Reading, exercises, and project work on your own time. Roughly 4 hours per week.',
  },
  {
    when: 'Every 2 weeks',
    what: '1:1 with Vismaya',
    text: '30-minute one-to-one review of your work, strategy, and questions.',
  },
  {
    when: 'Week 12',
    what: 'Final showcase',
    text: 'Present the work you built to the cohort. Walk out with a portfolio, not just a certificate.',
  },
] as const;

const displayH2 =
  "font-[family-name:var(--font-fraunces),Georgia,serif] text-[clamp(32px,4.2vw,54px)] font-medium leading-[1.04] tracking-[-0.025em] [font-variation-settings:'opsz'_96,'SOFT'_30]";

export function Schedule() {
  return (
    <section className="py-28 text-[#0E1715] max-[720px]:py-16">
      <div className="mx-auto max-w-[1240px] px-8 max-[720px]:px-[22px]">
        <Reveal>
          <span className="inline-flex items-center gap-3 font-[family-name:var(--font-geist-mono),ui-monospace,Menlo,monospace] text-[11.5px] font-medium uppercase tracking-[0.14em] text-[#14352A]">
            <span className="text-[#C66B2D]">06</span> Schedule
          </span>
        </Reveal>

        <div className="mb-14 mt-4 grid grid-cols-1 items-end gap-16 max-[920px]:grid-cols-1 max-[920px]:gap-6 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className={`max-w-[18ch] ${displayH2}`}>
              12 weeks. Live. <span className="text-[#C66B2D]">Designed to finish.</span>
            </h2>
          </Reveal>
          <Reveal>
            <p className="max-w-[64ch] text-[clamp(17px,1.3vw,19px)] font-normal leading-[1.55] text-[#0E1715]">
              Two live sessions on weekends. Self-paced material weekdays. A 1:1 review with Vismaya
              every two weeks. A final showcase day where you present the work you&apos;ve built.
              The structure is the curriculum&apos;s enforcement mechanism — it&apos;s why people
              finish.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-2 max-[480px]:grid-cols-2 max-[920px]:grid-cols-3 lg:grid-cols-6">
          {weeks.map(([wk, topic]) => (
            <Reveal key={wk}>
              <div className="rounded-lg border border-[rgba(14,23,21,0.12)] bg-[#FAF7F1] px-4 py-[18px] transition-all duration-200 ease-in-out hover:border-[#14352A] hover:bg-[#EFE9DC] h-full">
                <div className="mb-2 font-[family-name:var(--font-geist-mono),ui-monospace,Menlo,monospace] text-[11px] font-medium uppercase tracking-[0.1em] text-[#C66B2D]">
                  {wk}
                </div>
                <div className="font-[family-name:var(--font-fraunces),Georgia,serif] text-base font-medium leading-[1.18] tracking-[-0.01em] text-[#0E1715] [font-variation-settings:'opsz'_36,'SOFT'_20]">
                  {topic}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-1 gap-px border-t border-[rgba(14,23,21,0.32)] bg-[rgba(14,23,21,0.12)] pt-14 sm:grid-cols-2 lg:grid-cols-4">
          {rhythm.map((r) => (
            <Reveal key={r.when} className="bg-[#F4EEE2] px-6 py-7">
              <div className="mb-3 font-[family-name:var(--font-geist-mono),ui-monospace,Menlo,monospace] text-[11px] font-medium uppercase tracking-[0.14em] text-[#C66B2D]">
                {r.when}
              </div>
              <div className="mb-2 font-[family-name:var(--font-fraunces),Georgia,serif] text-[21px] font-medium leading-[1.2] tracking-[-0.015em] text-[#0E1715]">
                {r.what}
              </div>
              <p className="m-0 text-[14px] leading-[1.5] text-[rgba(14,23,21,0.62)]">{r.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
