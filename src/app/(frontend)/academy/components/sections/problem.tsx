import { Reveal } from '../reveal';

const displayH2 =
  "font-[family-name:var(--font-fraunces),Georgia,serif] text-[clamp(32px,4.2vw,54px)] font-medium leading-[1.04] tracking-[-0.025em] [font-variation-settings:'opsz'_96,'SOFT'_30]";

export function Problem() {
  return (
    <section className="py-28 text-[#0E1715] max-[720px]:py-16">
      <div className="mx-auto max-w-[1240px] px-8 max-[720px]:px-[22px]">
        <Reveal>
          <span className="inline-flex items-center gap-3 font-[family-name:var(--font-geist-mono),ui-monospace,Menlo,monospace] text-[11.5px] font-medium uppercase tracking-[0.14em] text-[#14352A]">
            <span className="text-[#C66B2D]">01</span> The problem
          </span>
        </Reveal>

        <div className="mt-6 grid grid-cols-1 gap-20 max-[920px]:grid-cols-1 max-[920px]:gap-9 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Reveal>
            <h2 className={`max-w-[18ch] ${displayH2}`}>
              The digital marketing course problem in <span className="text-[#C66B2D]">India</span>.
            </h2>
          </Reveal>
          <Reveal>
            <div>
              <p className="mb-4 max-w-[56ch] text-[17px] leading-[1.6] text-[#0E1715]">
                Walk into most digital marketing institutes in Kerala or anywhere in India and
                you&apos;ll learn the same things. On-page SEO checklists from a decade ago. A
                certificate no hiring manager actually asks for. A panel of generalist trainers
                reading slides. The market changed. The curricula didn&apos;t.
              </p>
              <p className="mb-4 max-w-[56ch] text-[17px] leading-[1.6] text-[#0E1715]">
                Search now happens inside ChatGPT, Gemini, and Perplexity as much as on Google.
                Content that compounds beats content that fills a calendar. AI compresses what used
                to take weeks into hours. And growth thinking — the discipline behind modern
                marketing — is barely taught at all.
              </p>
              <blockquote
                className={`mt-8 border-l-2 border-[#C66B2D] py-1.5 pl-[22px] font-[family-name:var(--font-fraunces),Georgia,serif] text-[clamp(26px,3vw,38px)] font-medium leading-[1.18] tracking-[-0.02em] text-[#0E1715] [font-variation-settings:'opsz'_96,'SOFT'_30]`}
              >
                Same field. <span className="text-[#C66B2D]">Different way</span> of teaching it.
              </blockquote>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
