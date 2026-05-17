import { Reveal } from '../reveal';

const modules = [
  {
    num: '01 / Pillar',
    title: 'Growth strategy & frameworks',
    body: "The mental models that separate operators from executors. AARRR. ICE prioritisation. North-star metrics and counter-metrics. Growth loops versus funnels. Jobs-to-be-Done. How to read a business and design a growth motion that fits — not a copy of someone else's playbook.",
    tags: ['Frameworks', 'Growth Loops', 'JTBD'],
  },
  {
    num: '02 / Pillar',
    title: 'Modern SEO & GEO',
    body: 'Search has split. Half the discovery now happens inside large language models. Learn technical SEO that still matters in 2026, content systems that rank in competitive verticals, and Generative Engine Optimization — getting your brand cited inside ChatGPT, Gemini, Claude, and Perplexity answers.',
    tags: ['Technical SEO', 'GEO', 'Content Systems'],
  },
  {
    num: '03 / Pillar',
    title: 'Content systems & distribution',
    body: 'Content that compounds — not content that fills a calendar. Editorial systems. Distribution-led publishing. The mechanics of writing for both human readers and machine retrieval. How to build a content engine that produces consistently without burning out.',
    tags: ['Editorial', 'Distribution', 'Content Engines'],
  },
  {
    num: '04 / Pillar',
    title: 'Brand & positioning',
    body: 'Why most "branding" advice in India is dressed-up logo design. Real positioning: category design, JTBD-led messaging, narrative architecture, and the difference between a tagline and a strategic wedge. Built around April Dunford\'s frameworks and how modern challenger brands actually operate.',
    tags: ['Positioning', 'Category Design', 'Narrative'],
  },
  {
    num: '05 / Pillar',
    title: 'Analytics & experimentation',
    body: 'Instrumentation before optimisation. GA4 fundamentals. Event taxonomy that doesn\'t break in six months. A/B testing — and why most "tests" in India are statistical noise. How to run an experimentation backlog with prioritisation, hypotheses, and decision logs.',
    tags: ['GA4', 'A/B Testing', 'Instrumentation'],
  },
  {
    num: '06 / Pillar',
    title: 'AI-native marketing',
    body: 'Not "ChatGPT for blog posts." LLMs as a layer underneath the entire marketing function — research, brief generation, creative iteration, content engines, customer-research synthesis, competitive intelligence. The workflows that compress weeks into days when used correctly.',
    tags: ['LLMs', 'AI Workflows', 'Content Engines'],
  },
  {
    num: '07 / Pillar',
    title: 'Career & portfolio',
    body: 'Interview prep for growth and marketing roles at SaaS, consumer, and global companies. Freelance positioning that lands senior client work. A portfolio of real work — not certificates — that you can put in front of a hiring manager.',
    tags: ['Interviews', 'Freelance', 'Portfolio'],
  },
] as const;

const displayH2 =
  "font-[family-name:var(--font-fraunces),Georgia,serif] text-[clamp(32px,4.2vw,54px)] font-medium leading-[1.04] tracking-[-0.025em] [font-variation-settings:'opsz'_96,'SOFT'_30]";

export function Curriculum() {
  return (
    <section id="curriculum" className="py-28 text-[#0E1715] max-[720px]:py-16">
      <div className="mx-auto max-w-[1240px] px-8 max-[720px]:px-[22px]">
        <Reveal>
          <span className="inline-flex items-center gap-3 font-[family-name:var(--font-geist-mono),ui-monospace,Menlo,monospace] text-[11.5px] font-medium uppercase tracking-[0.14em] text-[#14352A]">
            <span className="text-[#C66B2D]">03</span> The curriculum
          </span>
        </Reveal>

        <div className="mb-16 mt-0 grid grid-cols-1 items-end gap-16 max-[920px]:grid-cols-1 max-[920px]:gap-6 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className={`max-w-[14ch] ${displayH2}`}>
              What you&apos;ll <span className="text-[#C66B2D]">actually</span> learn.
            </h2>
          </Reveal>
          <Reveal>
            <p className="max-w-[64ch] text-[clamp(17px,1.3vw,19px)] font-normal leading-[1.55] text-[#0E1715]">
              Seven pillars of a modern digital marketing curriculum. Built around how digital
              marketing actually works inside SaaS, consumer, and service businesses today — not how
              a textbook described it seven years ago. Every module ends in a built artefact: a
              strategy doc, a content system, an experiment brief, a positioning document.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 border-t border-[rgba(14,23,21,0.32)] max-[720px]:grid-cols-1">
          {modules.map((m, i) => (
            <Reveal
              key={m.num}
              className={`relative border-b border-[rgba(14,23,21,0.12)] py-9 max-[720px]:py-7 ${
                i % 2 === 0
                  ? 'border-r border-[rgba(14,23,21,0.12)] pr-10 max-[720px]:border-r-0 max-[720px]:pr-0 lg:pr-12'
                  : 'pl-10 max-[720px]:pl-0 lg:pl-12'
              }`}
            >
              <div className="mb-3 font-[family-name:var(--font-geist-mono),ui-monospace,Menlo,monospace] text-[11px] font-medium uppercase tracking-[0.18em] text-[#C66B2D]">
                {m.num}
              </div>
              <h3 className="mb-3.5 font-[family-name:var(--font-fraunces),Georgia,serif] text-[clamp(20px,2vw,26px)] font-medium leading-[1.18] tracking-[-0.012em] text-[#0E1715] [font-variation-settings:'opsz'_60,'SOFT'_20]">
                {m.title}
              </h3>
              <p className="m-0 text-[15px] leading-[1.55] text-[rgba(14,23,21,0.62)]">{m.body}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {m.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded border border-[rgba(14,23,21,0.12)] px-2 py-1 font-[family-name:var(--font-geist-mono),ui-monospace,Menlo,monospace] text-[10.5px] font-medium uppercase tracking-[0.06em] text-[#14352A]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
