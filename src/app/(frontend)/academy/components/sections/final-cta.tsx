import { Reveal } from '../reveal';

const displayH2 =
  "font-[family-name:var(--font-fraunces),Georgia,serif] text-[clamp(32px,4.2vw,54px)] font-medium leading-[1.04] tracking-[-0.025em] text-[#F4EEE2] [font-variation-settings:'opsz'_96,'SOFT'_30]";

export function FinalCta() {
  return (
    <section
      id="apply"
      className="relative overflow-hidden bg-[#0E1715] py-28 text-center text-[#F4EEE2] before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_50%_40%_at_50%_30%,rgba(198,107,45,0.22),transparent_70%),radial-gradient(ellipse_70%_60%_at_50%_100%,rgba(31,77,58,0.42),transparent_70%)] max-[720px]:py-16"
    >
      <div className="relative z-[2] mx-auto max-w-[1240px] px-8 max-[720px]:px-[22px]">
        <Reveal>
          <span className="inline-flex items-center gap-3 font-[family-name:var(--font-geist-mono),ui-monospace,Menlo,monospace] text-[11.5px] font-medium uppercase tracking-[0.14em] text-[#F4EEE2]">
            <span className="text-[#C66B2D]">→</span> Founding cohort · Now enrolling
          </span>
          <h2 className={`mx-auto my-7 max-w-[20ch] ${displayH2}`}>
            Stop collecting certificates. Start <span className="text-[#C66B2D]">building</span>{' '}
            things that work.
          </h2>
          <p className="mx-auto mb-9 max-w-[56ch] text-[17px] leading-[1.55] text-[rgba(244,238,226,0.74)]">
            The founding cohort is intentionally small. A 20-person group is what keeps the
            operator-led model intact. If WizGrowth is the right fit, the next step is a short
            conversation — not a sales call.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="tel:+917907551261"
              className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-md bg-[#C66B2D] px-[22px] py-[13px] text-[14.5px] font-medium tracking-[-0.005em] text-[#F4EEE2] transition-all duration-[220ms] [transition-timing-function:cubic-bezier(0.2,0.7,0.2,1)] hover:-translate-y-px hover:bg-[#D08745]"
            >
              Book a discovery call{' '}
              <span className="font-[family-name:var(--font-fraunces),Georgia,serif] text-[17px] font-normal leading-none">
                →
              </span>
            </a>
            <a
              href="#curriculum"
              className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-md border border-[rgba(244,238,226,0.32)] px-[22px] py-[13px] text-[14.5px] font-medium tracking-[-0.005em] text-[#F4EEE2] transition-all duration-[220ms] [transition-timing-function:cubic-bezier(0.2,0.7,0.2,1)] hover:-translate-y-px hover:border-[#C66B2D] hover:text-[#C66B2D]"
            >
              Re-read the curriculum
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
