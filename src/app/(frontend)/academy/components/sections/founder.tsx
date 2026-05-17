import Image from 'next/image';
import { Reveal } from '../reveal';

const displayH2 =
  "font-[family-name:var(--font-fraunces),Georgia,serif] text-[clamp(32px,4.2vw,54px)] font-medium leading-[1.04] tracking-[-0.025em] text-[#F4EEE2] [font-variation-settings:'opsz'_96,'SOFT'_30]";

export function Founder() {
  return (
    <section
      id="founder"
      className="relative overflow-hidden border-t border-[rgba(244,238,226,0.14)] bg-[#0E1715] py-28 text-[#F4EEE2] before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_70%_50%_at_70%_50%,rgba(31,77,58,0.4),transparent_70%)] max-[720px]:py-16"
    >
      <div className="relative z-[2] mx-auto max-w-[1240px] px-8 max-[720px]:px-[22px]">
        <Reveal>
          <div className="mb-14">
            <span className="inline-flex items-center gap-3 font-[family-name:var(--font-geist-mono),ui-monospace,Menlo,monospace] text-[11.5px] font-medium uppercase tracking-[0.14em] text-[#F4EEE2]">
              <span className="text-[#C66B2D]">05</span> The founder
            </span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 items-center gap-20 max-[920px]:grid-cols-1 max-[920px]:gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-[rgba(244,238,226,0.14)] bg-[#1A2422]">
              <Image
                src="https://ibffbzwoucksfljolszp.supabase.co/storage/v1/object/public/wizgrowth-assets/academy/vismaya-portrait.png"
                alt="Vismaya, founder and lead instructor of WizGrowth Academy — a digital marketing academy in Kerala, India. 10+ years in digital marketing and growth across SaaS, service brands, and global clients."
                fill
                sizes="(max-width: 920px) 100vw, 42vw"
                className="object-cover [filter:grayscale(0.12)_contrast(1.04)]"
              />
              <span className="pointer-events-none absolute bottom-4 left-4 rounded bg-[rgba(14,23,21,0.8)] px-2.5 py-1.5 font-[family-name:var(--font-geist-mono),ui-monospace,Menlo,monospace] text-[10.5px] font-medium uppercase tracking-[0.16em] text-[#F4EEE2] backdrop-blur-md">
                VISMAYA · FOUNDER
              </span>
            </div>
          </Reveal>

          <Reveal>
            <div>
              <h2 className={`mb-7 max-w-[18ch] ${displayH2}`}>
                Taught by Vismaya. Not &quot;
                <span className="text-[#C66B2D]">a panel of 100 trainers</span>
                .&quot;
              </h2>
              <p className="mb-[18px] max-w-[56ch] text-[16.5px] leading-[1.6] text-[rgba(244,238,226,0.82)]">
                Vismaya has spent the last decade-plus inside digital marketing and growth teams —
                at SaaS companies, service-based brands, and global clients. SEO that ranked in
                competitive verticals. Content systems built before the AI wave. AI-augmented
                marketing workflows shipped before most institutes had heard the term.
              </p>
              <p className="mb-[18px] max-w-[56ch] text-[16.5px] leading-[1.6] text-[rgba(244,238,226,0.82)]">
                Now she&apos;s bringing all of that into the classroom — without the dilution that
                comes from outsourcing teaching to a rotating panel of generalists. Every cohort.
                Every module. Every live review. Taught by her.
              </p>
              <p className="mb-[18px] max-w-[56ch] text-[16.5px] leading-[1.6] text-[rgba(244,238,226,0.82)]">
                The thesis is simple: you don&apos;t learn to operate from someone who&apos;s never
                operated.
              </p>

              <div className="mt-9 grid grid-cols-3 gap-0 border-t border-[rgba(244,238,226,0.14)]">
                <div className="border-r border-[rgba(244,238,226,0.14)] pr-4 pt-5">
                  <div className="font-[family-name:var(--font-fraunces),Georgia,serif] text-[44px] font-medium leading-none tracking-[-0.025em] text-[#C66B2D] [font-variation-settings:'opsz'_144,'SOFT'_30]">
                    10+
                  </div>
                  <div className="mt-2 font-[family-name:var(--font-geist-mono),ui-monospace,Menlo,monospace] text-[11px] uppercase tracking-[0.14em] text-[rgba(244,238,226,0.62)]">
                    Years in growth
                  </div>
                </div>
                <div className="border-r border-[rgba(244,238,226,0.14)] px-4 pt-5">
                  <div className="font-[family-name:var(--font-fraunces),Georgia,serif] text-[44px] font-medium leading-none tracking-[-0.025em] text-[#C66B2D] [font-variation-settings:'opsz'_144,'SOFT'_30]">
                    SaaS
                  </div>
                  <div className="mt-2 font-[family-name:var(--font-geist-mono),ui-monospace,Menlo,monospace] text-[11px] uppercase tracking-[0.14em] text-[rgba(244,238,226,0.62)]">
                    B2B &amp; B2C operator
                  </div>
                </div>
                <div className="pt-5">
                  <div className="font-[family-name:var(--font-fraunces),Georgia,serif] text-[44px] font-medium leading-none tracking-[-0.025em] text-[#C66B2D] [font-variation-settings:'opsz'_144,'SOFT'_30]">
                    1:1
                  </div>
                  <div className="mt-2 font-[family-name:var(--font-geist-mono),ui-monospace,Menlo,monospace] text-[11px] uppercase tracking-[0.14em] text-[rgba(244,238,226,0.62)]">
                    No panel of trainers
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
