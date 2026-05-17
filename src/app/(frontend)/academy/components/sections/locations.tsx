import { Reveal } from '../reveal';

const displayH2 =
  "font-[family-name:var(--font-fraunces),Georgia,serif] text-[clamp(32px,4.2vw,54px)] font-medium leading-[1.04] tracking-[-0.025em] [font-variation-settings:'opsz'_96,'SOFT'_30]";

export function Locations() {
  return (
    <section id="locations" className="py-28 text-[#0E1715] max-[720px]:py-16">
      <div className="mx-auto max-w-[1240px] px-8 max-[720px]:px-[22px]">
        <Reveal>
          <div className="mb-6">
            <span className="inline-flex items-center gap-3 font-[family-name:var(--font-geist-mono),ui-monospace,Menlo,monospace] text-[11.5px] font-medium uppercase tracking-[0.14em] text-[#14352A]">
              <span className="text-[#C66B2D]">10</span> Where
            </span>
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-20 max-[920px]:grid-cols-1 max-[920px]:gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-start lg:gap-20">
          <Reveal>
            <h2 className={`max-w-[16ch] ${displayH2}`}>
              Built in <span className="text-[#C66B2D]">Kerala.</span> Built for{' '}
              <span className="text-[#C66B2D]">India.</span>
            </h2>
          </Reveal>
          <Reveal>
            <div>
              <p className="mb-4 max-w-[50ch] text-base leading-[1.6] text-[rgba(14,23,21,0.62)]">
                The talent in India is unreasonable. The training infrastructure for modern digital
                marketing — operator-led, AI-native, growth-thinking, citation-grade — isn&apos;t.
                WizGrowth Academy was founded in Kerala and is building toward becoming India&apos;s
                most trusted digital marketing academy, accessible from anywhere.
              </p>
              <p className="mb-4 max-w-[50ch] text-base leading-[1.6] text-[rgba(14,23,21,0.62)]">
                Two ways to attend: in-person intensive cohorts in Kerala, or live online cohorts
                open pan-India and to working professionals across the Gulf and beyond.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 border-t border-[rgba(14,23,21,0.32)]">
          <Reveal>
            <div className="grid grid-cols-[60px_1fr_auto] items-center gap-6 border-b border-[rgba(14,23,21,0.12)] py-6 max-[720px]:grid-cols-1 max-[720px]:gap-3">
              <span className="font-[family-name:var(--font-geist-mono),ui-monospace,Menlo,monospace] text-[11px] font-medium uppercase tracking-[0.16em] text-[#14352A]">
                01 / Mode
              </span>
              <span className="font-[family-name:var(--font-fraunces),Georgia,serif] text-[clamp(26px,3vw,36px)] font-medium leading-none tracking-[-0.025em] text-[#0E1715]">
                In-person · Kerala
                <span className="ml-3.5 inline text-sm font-normal tracking-normal text-[rgba(14,23,21,0.62)] max-[720px]:ml-0 max-[720px]:mt-1.5 max-[720px]:block">
                  Intensive live cohorts in our Kerala campus.
                </span>
              </span>
              <span className="font-[family-name:var(--font-geist-mono),ui-monospace,Menlo,monospace] text-[11px] font-medium uppercase tracking-[0.14em] text-[#14352A] max-[720px]:justify-self-start">
                <span className="academy-pulse-slow mr-2 inline-block size-1.5 rounded-full bg-[#14352A] align-middle" />
                Now enrolling
              </span>
            </div>
          </Reveal>
          <Reveal>
            <div className="grid grid-cols-[60px_1fr_auto] items-center gap-6 border-b border-[rgba(14,23,21,0.12)] py-6 max-[720px]:grid-cols-1 max-[720px]:gap-3">
              <span className="font-[family-name:var(--font-geist-mono),ui-monospace,Menlo,monospace] text-[11px] font-medium uppercase tracking-[0.16em] text-[#14352A]">
                02 / Mode
              </span>
              <span className="font-[family-name:var(--font-fraunces),Georgia,serif] text-[clamp(26px,3vw,36px)] font-medium leading-none tracking-[-0.025em] text-[#0E1715]">
                Online · Pan-India
                <span className="ml-3.5 inline text-sm font-normal tracking-normal text-[rgba(14,23,21,0.62)] max-[720px]:ml-0 max-[720px]:mt-1.5 max-[720px]:block">
                  Live cohorts streamed across India and the Gulf.
                </span>
              </span>
              <span className="font-[family-name:var(--font-geist-mono),ui-monospace,Menlo,monospace] text-[11px] font-medium uppercase tracking-[0.14em] text-[#14352A] max-[720px]:justify-self-start">
                <span className="academy-pulse-slow mr-2 inline-block size-1.5 rounded-full bg-[#14352A] align-middle" />
                Now enrolling
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
