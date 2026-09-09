import type { BlogInner } from '@/payload-types';
import { Reveal } from '../reveal';

type FaqsProps = {
  innerData: BlogInner;
};

const displayH2 =
  "font-[family-name:var(--font-fraunces),Georgia,serif] text-[clamp(28px,3.6vw,44px)] font-medium leading-[1.06] tracking-[-0.025em] [font-variation-settings:'opsz'_96,'SOFT'_30]";

export function Faqs({ innerData }: FaqsProps) {
  const items = innerData?.faqs;
  if (!items || items.length === 0) return null;

  return (
    <section id="faq" className="py-24 text-[#0E1715] max-[720px]:py-16">
      <div className="mx-auto max-w-[1240px] px-8 max-[720px]:px-[22px]">
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-3 font-[family-name:var(--font-geist-mono),ui-monospace,Menlo,monospace] text-[11.5px] font-medium uppercase tracking-[0.14em] text-[#14352A]">
                <span className="text-[#C66B2D]">FAQ</span> Common questions
              </span>
              <h2 className={`mt-7 max-w-[18ch] ${displayH2}`}>
                Questions this <span className="text-[#C66B2D]">raises</span>.
              </h2>
            </Reveal>
          </div>

          <div>
            {items.map((item) => (
              <Reveal key={item.id ?? item.question}>
                <details className="article-qa border-t border-[rgba(14,23,21,0.32)] last:border-b last:border-[rgba(14,23,21,0.32)]">
                  <summary className="grid cursor-pointer grid-cols-[1fr_auto] items-center gap-6 py-6 font-[family-name:var(--font-fraunces),Georgia,serif] text-[clamp(18px,1.8vw,23px)] font-medium leading-[1.25] tracking-[-0.015em] text-[#0E1715] [font-variation-settings:'opsz'_60,'SOFT'_20]">
                    <span>{item.question}</span>
                    <span className="article-qa-arrow font-[family-name:var(--font-fraunces),Georgia,serif] text-[22px] font-medium leading-none text-[#C66B2D]">
                      +
                    </span>
                  </summary>
                  <div className="max-w-[64ch] whitespace-pre-line pb-7 text-[15.5px] leading-[1.65] text-[rgba(14,23,21,0.62)]">
                    {item.answer}
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
