import { Reveal } from '../reveal';

const categories = [
  {
    head: 'SEO & Content',
    items: ['Ahrefs', 'Semrush', 'Google Search Console', 'Screaming Frog'],
  },
  {
    head: 'Analytics & Instrumentation',
    items: ['GA4', 'Microsoft Clarity', 'Hotjar', 'Looker Studio'],
  },
  {
    head: 'AI & Modern Workflows',
    items: ['ChatGPT', 'Claude', 'Gemini', 'Perplexity'],
  },
] as const;

const displayH2 =
  "font-[family-name:var(--font-fraunces),Georgia,serif] text-[clamp(32px,4.2vw,54px)] font-medium leading-[1.04] tracking-[-0.025em] text-[#F4EEE2] [font-variation-settings:'opsz'_96,'SOFT'_30]";

export function Tools() {
  return (
    <section className="relative overflow-hidden bg-[#0E1715] py-28 text-[#F4EEE2] before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_70%_60%_at_30%_100%,rgba(31,77,58,0.4),transparent_70%)] max-[720px]:py-16">
      <div className="relative z-[2] mx-auto max-w-[1240px] px-8 max-[720px]:px-[22px]">
        <Reveal>
          <span className="inline-flex items-center gap-3 font-[family-name:var(--font-geist-mono),ui-monospace,Menlo,monospace] text-[11.5px] font-medium uppercase tracking-[0.14em] text-[#F4EEE2]">
            <span className="text-[#C66B2D]">04</span> Tools
          </span>
        </Reveal>

        <div className="mb-16 mt-4 grid grid-cols-1 items-end gap-16 max-[920px]:grid-cols-1 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className={`max-w-[16ch] ${displayH2}`}>
              The exact digital marketing <span className="text-[#C66B2D]">stack</span> you&apos;ll
              learn to operate.
            </h2>
          </Reveal>
          <Reveal>
            <p className="max-w-[64ch] text-[clamp(17px,1.3vw,19px)] font-normal leading-[1.55] text-[rgba(244,238,226,0.78)]">
              Tool fluency follows from strategy, but it still matters. By the end of the cohort
              you&apos;ll have hands-on time in the modern digital marketing stack — the tools
              growth and content teams actually use today. We focus on a small set, used well,
              instead of a long list at surface level.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 border-t border-[rgba(244,238,226,0.14)] lg:grid-cols-3">
          {categories.map((cat, i) => (
            <Reveal
              key={cat.head}
              className={`border-b border-[rgba(244,238,226,0.14)] py-8 max-[920px]:px-0 lg:border-b-0 lg:py-8 ${
                i !== 2 ? 'lg:border-r lg:border-[rgba(244,238,226,0.14)]' : ''
              } ${i !== 0 ? 'lg:pl-8' : ''} ${i === 2 ? 'lg:pr-0' : 'lg:pr-8'}`}
            >
              <div className="mb-4 font-[family-name:var(--font-geist-mono),ui-monospace,Menlo,monospace] text-[10.5px] font-medium uppercase tracking-[0.16em] text-[#C66B2D]">
                {cat.head}
              </div>
              <ul className="m-0 list-none p-0">
                {cat.items.map((item) => (
                  <li
                    key={item}
                    className="border-b border-dashed border-[rgba(244,238,226,0.08)] py-2 text-[14.5px] text-[rgba(244,238,226,0.85)] last:border-b-0"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
