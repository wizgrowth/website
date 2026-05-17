import { Reveal } from '../reveal';

const rows = [
  [
    'Random tactics taught one by one. No connecting thread.',
    'Digital marketing taught with a growth mindset — strategy first, tactics second.',
  ],
  [
    '2015–2017 SEO hacks. On-page, off-page checklists.',
    'Modern SEO & GEO — how content ranks across Google and is cited inside ChatGPT, Gemini, and Perplexity.',
  ],
  [
    'A panel of 100 generalist trainers reading slides.',
    'One operator. Every cohort. Every class. Taught by Vismaya.',
  ],
  [
    'A certificate no one in industry asks for.',
    'A portfolio of real work — strategy docs, content systems, experiment briefs.',
  ],
  [
    '"AI in marketing" as a single bonus module.',
    'AI as a core layer of the stack — research, briefs, content engines, experimentation.',
  ],
  ['Theory and slides. One-way lectures.', 'Live work. Real briefs. Bi-weekly 1:1 reviews. Built around peer discussion.'],
  [
    'Surface skills. "Digital marketing executive" jobs.',
    'Growth thinking. Strategy, experimentation, modern content. Roles that pay accordingly.',
  ],
] as const;

export function Compare() {
  return (
    <section className="pb-28 pt-0 text-[#0E1715] max-[720px]:pb-16 max-[720px]:pt-0">
      <div className="mx-auto max-w-[1240px] px-8 max-[720px]:px-[22px]">
        <Reveal>
          <div className="mb-8">
            <span className="inline-flex items-center gap-3 font-[family-name:var(--font-geist-mono),ui-monospace,Menlo,monospace] text-[11.5px] font-medium uppercase tracking-[0.14em] text-[#14352A]">
              <span className="text-[#C66B2D]">→</span> Side by side
            </span>
            <h3 className="mt-3.5 max-w-[26ch] font-[family-name:var(--font-fraunces),Georgia,serif] text-[clamp(20px,2vw,26px)] font-medium leading-[1.18] tracking-[-0.012em] text-[#0E1715] [font-variation-settings:'opsz'_60,'SOFT'_20]">
              What the average institute teaches versus what we teach.
            </h3>
          </div>
        </Reveal>

        <Reveal>
          <div className="overflow-hidden rounded-[10px] border border-[rgba(14,23,21,0.12)] bg-[#FAF7F1]">
            <div className="grid grid-cols-2 border-b border-[rgba(14,23,21,0.12)] bg-[#0E1715] text-[#F4EEE2]">
              <div className="border-r border-[rgba(244,238,226,0.14)] px-7 py-[18px] font-[family-name:var(--font-geist-mono),ui-monospace,Menlo,monospace] text-[11px] font-medium uppercase tracking-[0.14em] max-[720px]:px-[18px] max-[720px]:text-[10px]">
                Most digital marketing institutes
              </div>
              <div className="bg-[#0E1715] px-7 py-[18px] font-[family-name:var(--font-geist-mono),ui-monospace,Menlo,monospace] text-[11px] font-medium uppercase tracking-[0.14em] text-[#C66B2D] max-[720px]:px-[18px] max-[720px]:text-[10px]">
                WizGrowth Academy
              </div>
            </div>
            {rows.map(([a, b], rowIndex) => (
              <div
                key={rowIndex}
                className="grid grid-cols-2 border-b border-[rgba(14,23,21,0.12)] last:border-b-0"
              >
                <div className="border-r border-[rgba(14,23,21,0.12)] px-7 py-[22px] text-[15px] leading-[1.5] text-[rgba(14,23,21,0.62)] [text-decoration-line:line-through] [text-decoration-thickness:1px] [text-decoration-color:rgba(14,23,21,0.28)] max-[720px]:px-[18px] max-[720px]:py-4 max-[720px]:text-[14px]">
                  {a}
                </div>
                <div className="bg-[rgba(31,77,58,0.045)] px-7 py-[22px] text-[15px] font-medium leading-[1.5] text-[#0E1715] max-[720px]:px-[18px] max-[720px]:py-4 max-[720px]:text-[14px]">
                  {b}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
