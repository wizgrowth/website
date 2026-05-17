import { Reveal } from '../reveal';

export function DemoBand() {
  return (
    <div className="border-y border-[rgba(14,23,21,0.12)] bg-[#EFE9DC] py-16 text-[#0E1715]">
      <div className="mx-auto max-w-[1240px] px-8 max-[720px]:px-[22px]">
        <div className="grid grid-cols-1 items-center gap-10 max-[720px]:gap-6 lg:grid-cols-[1fr_auto] lg:gap-10">
          <Reveal>
            <span className="mb-3 inline-flex items-center gap-3 font-[family-name:var(--font-geist-mono),ui-monospace,Menlo,monospace] text-[11.5px] font-medium uppercase tracking-[0.14em] text-[#14352A]">
              <span className="text-[#C66B2D]">→</span> Risk-free first step
            </span>
            <h3 className="mt-3.5 max-w-[24ch] font-[family-name:var(--font-fraunces),Georgia,serif] text-[clamp(24px,3vw,36px)] font-medium leading-[1.05] tracking-[-0.02em] text-[#0E1715] [font-variation-settings:'opsz'_96,'SOFT'_30]">
              Not sure yet? Book a <span className="text-[#C66B2D]">free 30-minute discovery call</span>{' '}
              with Vismaya.
            </h3>
            <p className="mt-2 max-w-[60ch] text-base leading-[1.55] text-[rgba(14,23,21,0.62)]">
              No sales pitch. A conversation about your background, goals, and whether the cohort is
              the right fit. Many applicants leave the call with a clearer plan even if they don&apos;t
              enrol.
            </p>
          </Reveal>
          <Reveal>
            <a
              href="tel:+917907551261"
              className="inline-flex w-fit items-center gap-2.5 whitespace-nowrap rounded-md bg-[#0E1715] px-[22px] py-[13px] text-[14.5px] font-medium tracking-[-0.005em] text-[#F4EEE2] transition-all duration-[220ms] [transition-timing-function:cubic-bezier(0.2,0.7,0.2,1)] hover:-translate-y-px hover:bg-[#14352A]"
            >
              Book the call{' '}
              <span className="font-[family-name:var(--font-fraunces),Georgia,serif] text-[17px] font-normal leading-none">
                →
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
