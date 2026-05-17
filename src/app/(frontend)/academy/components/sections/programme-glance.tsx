import { Reveal } from '../reveal';

const cards = [
  {
    ico: 'Duration',
    big: '12 Weeks',
    desc: 'From foundations to a built portfolio in three months. Designed to finish.',
  },
  {
    ico: 'Format',
    big: 'Live Cohort',
    desc: 'In-person in Kerala or live online pan-India. Same curriculum. Same instructor.',
  },
  {
    ico: 'Time / week',
    big: '6–8 hrs',
    desc: 'Two weekend live sessions plus self-paced weekday work. Job-friendly.',
  },
  {
    ico: 'Cohort cap',
    big: '20 max',
    desc: 'Small enough for direct attention. Large enough for peer learning.',
  },
  {
    ico: 'Reviews',
    big: 'Bi-weekly',
    desc: '1:1 work review with Vismaya — your strategy, your projects, your portfolio.',
  },
  {
    ico: 'Live work',
    big: 'Real briefs',
    desc: 'Strategy documents, content systems, and experiment briefs you actually build.',
  },
  {
    ico: 'Frameworks',
    big: 'Yours forever',
    desc: 'Every framework, brief template, and operating doc Vismaya uses — yours after.',
  },
  {
    ico: 'Career',
    big: 'Included',
    desc: 'Interview prep, freelance positioning, and portfolio-building module.',
  },
] as const;

const displayH2 =
  "font-[family-name:var(--font-fraunces),Georgia,serif] text-[clamp(32px,4.2vw,54px)] font-medium leading-[1.04] tracking-[-0.025em] [font-variation-settings:'opsz'_96,'SOFT'_30]";

export function ProgrammeGlance() {
  return (
    <section id="programme" className="bg-[#FAF7F1] py-28 text-[#0E1715] max-[720px]:py-16">
      <div className="mx-auto max-w-[1240px] px-8 max-[720px]:px-[22px]">
        <Reveal>
          <span className="inline-flex items-center gap-3 font-[family-name:var(--font-geist-mono),ui-monospace,Menlo,monospace] text-[11.5px] font-medium uppercase tracking-[0.14em] text-[#14352A]">
            <span className="text-[#C66B2D]">02</span> Programme
          </span>
        </Reveal>

        <div className="mb-16 mt-0 grid grid-cols-1 items-end gap-16 max-[920px]:grid-cols-1 max-[920px]:gap-6 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className={`max-w-[16ch] ${displayH2}`}>
              A digital marketing programme designed around how you&apos;ll{' '}
              <span className="text-[#C66B2D]">actually</span> use it.
            </h2>
          </Reveal>
          <Reveal>
            <p className="max-w-[64ch] text-[clamp(17px,1.3vw,19px)] font-normal leading-[1.55] text-[#0E1715]">
              Built for working professionals, founders, and serious students. Live enough to keep you
              accountable, flexible enough to fit around a job. Every detail of the structure —
              duration, cohort size, review cadence, time per week — is set so you finish, with work
              to show.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-4 max-[920px]:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <Reveal key={c.ico}>
              <div className="rounded-[10px] border border-[rgba(14,23,21,0.12)] bg-[#F4EEE2] p-6 transition-all duration-[250ms] ease-in-out hover:-translate-y-0.5 hover:border-[#14352A] max-[920px]:px-5 max-[920px]:py-7">
                <div className="mb-4 font-[family-name:var(--font-geist-mono),ui-monospace,Menlo,monospace] text-[11px] font-medium uppercase tracking-[0.14em] text-[#C66B2D]">
                  {c.ico}
                </div>
                <div className="mb-1.5 font-[family-name:var(--font-fraunces),Georgia,serif] text-4xl font-medium leading-none tracking-[-0.025em] text-[#0E1715] [font-variation-settings:'opsz'_96,'SOFT'_25]">
                  {c.big}
                </div>
                <p className="m-0 text-[14px] leading-[1.45] text-[rgba(14,23,21,0.62)]">{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
