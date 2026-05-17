import Image from 'next/image';
import { Reveal } from '../reveal';

const display =
  "font-[family-name:var(--font-fraunces),Georgia,serif] font-medium tracking-[-0.02em] [font-variation-settings:'opsz'_96,'SOFT'_30]";

export function Hero() {
  return (
    <header className="relative overflow-hidden border-b border-[rgba(14,23,21,0.12)] bg-[#F4EEE2] pb-14 pt-[88px] text-[#0E1715] before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_60%_50%_at_90%_10%,rgba(198,107,45,0.08),transparent_60%),radial-gradient(ellipse_70%_60%_at_0%_100%,rgba(31,77,58,0.06),transparent_70%)] sm:pb-[72px] sm:pt-[120px]">
      <div className="relative z-[2] mx-auto max-w-[1080px] px-5 text-center sm:px-8">
        <Reveal>
          <div className="mb-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-[family-name:var(--font-geist-mono),ui-monospace,Menlo,monospace] text-[11px] font-medium uppercase tracking-[0.14em] text-[#14352A] sm:mb-9 sm:gap-x-6 sm:text-[11.5px] max-sm:mt-10">
            <span className="inline-flex max-w-[min(100%,22rem)] items-center justify-center gap-2 sm:max-w-none">
              <span className="academy-pulse inline-block size-1.5 shrink-0 rounded-full bg-[#C66B2D] max-sm:hidden" />
              <span className="text-balance">Digital Marketing Academy · Kerala, India</span>
            </span>
            <span
              className="hidden h-3 w-px shrink-0 bg-[rgba(14,23,21,0.32)] sm:inline-block"
              aria-hidden
            />
            <span className="w-full text-balance sm:w-auto">12 Weeks · Live Cohort</span>
          </div>
        </Reveal>

        <Reveal>
          <h1
            className={`mx-auto mb-6 max-w-[min(100%,22ch)] text-balance text-[clamp(32px,5.5vw,64px)] font-medium leading-[1.05] tracking-[-0.025em] text-[#0E1715] ${display}`}
          >
            Digital marketing, taught by people who <span className="text-[#C66B2D]">actually</span>{' '}
            do it.
          </h1>
        </Reveal>

        <Reveal>
          <p className="mx-auto mb-8 max-w-[min(100%,58ch)] text-pretty text-[clamp(15px,1.35vw,18px)] font-normal leading-[1.55] text-[rgba(14,23,21,0.74)] sm:text-[clamp(16px,1.2vw,18px)]">
            WizGrowth is a digital marketing academy in Kerala, India — built for the next decade of
            marketers, not the last one. We teach digital marketing with a growth mindset: modern
            SEO and GEO, content systems, experimentation, and AI-native workflows. Operator skills,
            taught by an operator.
          </p>
        </Reveal>

        <Reveal>
          <div className="mb-12 flex flex-wrap items-center justify-center gap-2.5 max-sm:flex-col max-sm:items-stretch">
            <a
              href="#apply"
              className="inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-md bg-[#0E1715] px-5 py-3 text-[14px] font-medium tracking-[-0.005em] text-[#F4EEE2] transition-all duration-[220ms] [transition-timing-function:cubic-bezier(0.2,0.7,0.2,1)] hover:-translate-y-px hover:bg-[#14352A] sm:px-[22px] sm:py-[13px] sm:text-[14.5px]"
            >
              Apply to the founding cohort{' '}
              <span className="font-[family-name:var(--font-fraunces),Georgia,serif] text-[17px] font-normal leading-none">
                →
              </span>
            </a>
            <a
              href="#curriculum"
              className="inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-md border border-[rgba(14,23,21,0.32)] px-5 py-3 text-[14px] font-medium tracking-[-0.005em] text-[#0E1715] transition-all duration-[220ms] [transition-timing-function:cubic-bezier(0.2,0.7,0.2,1)] hover:-translate-y-px hover:border-[#0E1715] hover:bg-[rgba(14,23,21,0.04)] sm:px-[22px] sm:py-[13px] sm:text-[14.5px]"
            >
              See the curriculum
            </a>
          </div>
        </Reveal>

        <Reveal>
          <div className="mx-auto flex max-w-[min(100%,560px)] flex-col items-center gap-4 border-t border-[rgba(14,23,21,0.12)] pt-7 text-center sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-4 sm:gap-y-3">
            <Image
              src="https://ibffbzwoucksfljolszp.supabase.co/storage/v1/object/public/wizgrowth-assets/academy/vismaya-studio.png"
              alt="Vismaya, founder of WizGrowth Academy, a digital marketing academy in Kerala, India"
              width={44}
              height={44}
              className="size-11 shrink-0 rounded-full border border-[rgba(14,23,21,0.32)] object-cover [object-position:center_25%]"
            />
            <div className="min-w-0 max-w-md text-[13.5px] leading-[1.4] text-[#0E1715]">
              <strong className="font-medium text-[#0E1715]">
                Founded &amp; taught by Vismaya
              </strong>
              <span className="mt-0.5 block text-balance text-[12.5px] text-[rgba(14,23,21,0.62)]">
                10+ years across SaaS, service brands &amp; global clients
              </span>
            </div>
            <span className="inline-flex shrink-0 whitespace-nowrap rounded border border-[rgba(14,23,21,0.32)] px-2.5 py-1.5 font-[family-name:var(--font-geist-mono),ui-monospace,Menlo,monospace] text-[10.5px] font-medium uppercase tracking-[0.14em] text-[#C66B2D]">
              Founding Cohort
            </span>
          </div>
        </Reveal>
      </div>
    </header>
  );
}
