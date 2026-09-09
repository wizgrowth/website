import { RichTextConverterComponent } from '@/payload-components/richtext/richtext-convertor';
import type { ServicePage } from '@/payload-types';
import { Reveal } from '../reveal';

type MethodProps = { service: ServicePage };

const displayH2 =
  "font-[family-name:var(--font-fraunces),Georgia,serif] text-[clamp(26px,3.2vw,38px)] font-medium leading-[1.08] tracking-[-0.025em] text-[#0E1715] [font-variation-settings:'opsz'_96,'SOFT'_30]";

export function Method({ service }: MethodProps) {
  const steps = service.steps ?? [];
  const includes = service.includes ?? [];
  const hasHonesty = Boolean(service.honesty);

  if (steps.length === 0 && includes.length === 0 && !hasHonesty) return null;

  return (
    <section className="pt-24 max-[720px]:pt-16">
      <div className="mx-auto max-w-[1240px] px-8 max-[720px]:px-[22px]">
        {steps.length > 0 && (
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
            <Reveal>
              <h2 className={`max-w-[14ch] ${displayH2}`}>How we run it</h2>
            </Reveal>
            <ol className="flex flex-col gap-8">
              {steps.map((step, i) => (
                <Reveal key={step.id ?? step.label}>
                  <li className="grid grid-cols-[auto_1fr] gap-5 border-t border-[rgba(14,23,21,0.16)] pt-6">
                    <span className="font-[family-name:var(--font-geist-mono),ui-monospace,Menlo,monospace] text-[11.5px] font-medium tracking-[0.14em] text-[#C66B2D]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>
                      <strong className="block text-[17px] font-semibold leading-snug text-[#0E1715]">
                        {step.label}
                      </strong>
                      <span className="mt-2 block max-w-[62ch] text-[15.5px] leading-[1.65] text-[rgba(14,23,21,0.62)]">
                        {step.text}
                      </span>
                    </span>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        )}

        {includes.length > 0 && (
          <div className="mt-24 grid grid-cols-1 items-start gap-12 max-[720px]:mt-16 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
            <Reveal>
              <h2 className={`max-w-[14ch] ${displayH2}`}>What&rsquo;s included</h2>
            </Reveal>
            <Reveal>
              <ul className="grid grid-cols-1 gap-x-8 gap-y-3.5 sm:grid-cols-2">
                {includes.map((entry) => (
                  <li
                    key={entry.id ?? entry.item}
                    className="grid grid-cols-[auto_1fr] gap-3 text-[15.5px] leading-[1.55] text-[rgba(14,23,21,0.82)]"
                  >
                    <span aria-hidden="true" className="mt-[9px] h-1 w-1 rounded-full bg-[#C66B2D]" />
                    <span>{entry.item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        )}

        {hasHonesty && (
          <div className="mt-24 grid grid-cols-1 items-start gap-12 max-[720px]:mt-16 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
            <Reveal>
              <h2 className={`max-w-[14ch] ${displayH2}`}>Timelines, pricing, honesty</h2>
            </Reveal>
            <Reveal>
              <div className="service-prose rounded-2xl border border-[rgba(14,23,21,0.16)] bg-[rgba(20,53,42,0.04)] p-9 max-[720px]:p-6">
                <RichTextConverterComponent data={service.honesty as never} />
              </div>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}
