import { Reveal } from '../reveal';

const items = [
  {
    q: 'What exactly is WizGrowth Academy?',
    a: (
      <>
        WizGrowth Academy is a <strong className="font-medium text-[#0E1715]">digital marketing academy in Kerala, India</strong>. It&apos;s a{' '}
        <strong className="font-medium text-[#0E1715]">12-week operator-led founding cohort</strong> that teaches modern digital marketing with a growth mindset — strategy, modern SEO and GEO, content systems, brand and positioning, analytics, experimentation, and AI-native workflows. Founded by Vismaya, a 10+ year operator across SaaS and global brands.
      </>
    ),
  },
  {
    q: 'What does the curriculum cover?',
    a: (
      <>
        <strong className="font-medium text-[#0E1715]">Seven pillars</strong>: growth strategy and frameworks, modern SEO and Generative Engine Optimization (GEO), content systems and distribution, brand and positioning, analytics and experimentation, AI-native marketing workflows, and career and portfolio. Every module ends in a built artefact — a strategy doc, a content system, an experiment brief — not a quiz.
      </>
    ),
  },
  {
    q: 'How long is it and how much time does it take per week?',
    a: (
      <>
        <strong className="font-medium text-[#0E1715]">12 weeks. Roughly 6–8 hours per week.</strong> Two interactive live sessions on weekends (90 minutes each) plus self-paced project work weekdays. The structure is built for working professionals — most students do their weekday work in 1-hour evening blocks.
      </>
    ),
  },
  {
    q: 'How much does it cost?',
    a: (
      <>
        Founding-cohort terms are discussed transparently in a free 30-minute discovery call with Vismaya. The programme is priced for working professionals and students; specific terms, payment plans, and any scholarship considerations are shared on the call before any commitment is made.
      </>
    ),
  },
  {
    q: 'Is there a refund or trial?',
    a: (
      <>
        Yes. WizGrowth offers a money-back window in the first week of the cohort. Specific terms are confirmed on the discovery call before any payment is made — so the fit is clear on both sides before money changes hands.
      </>
    ),
  },
  {
    q: "I'm a complete beginner. Will this work for me?",
    a: (
      <>
        Yes. The first two weeks are foundational and assume no prior digital-marketing background. From week three onwards, the work is hands-on. Career switchers from product, sales, design, and engineering are welcome. The only prerequisite is intent and willingness to do the work.
      </>
    ),
  },
  {
    q: 'How is this different from a free YouTube course?',
    a: (
      <>
        YouTube teaches tactics in isolation — a video on SEO, a video on funnels, a video on AI prompts. WizGrowth teaches a <strong className="font-medium text-[#0E1715]">system</strong>: how those pieces fit together inside a real growth strategy, taught by an active operator, with weekly accountability, 1:1 reviews, live work, and a finished portfolio. Free content gives you knowledge. A live cohort gives you operating skill.
      </>
    ),
  },
  {
    q: 'How is this different from other digital marketing institutes in Kerala or India?',
    a: (
      <>
        WizGrowth is a digital marketing academy too — but it teaches digital marketing differently. Three differences. First, the curriculum is built around <strong className="font-medium text-[#0E1715]">growth thinking</strong> — strategy, modern SEO and GEO, content systems, experimentation, AI-native workflows — not surface-level on-page and off-page checklists. Second, every cohort is taught by Vismaya, an active operator, not a rotating panel of generalist trainers. Third, AI is treated as a core layer of the modern marketing stack, not a single bonus module. Students leave with a portfolio of real work, not just a certificate.
      </>
    ),
  },
  {
    q: 'What if I miss a live class?',
    a: (
      <>
        Live sessions are interactive — built around peer discussion and feedback, not lectures. If you have to miss one, session notes and frameworks are shared with the cohort, and your bi-weekly 1:1 review with Vismaya is the place to bring back questions. Founding cohort members also have direct access to Vismaya throughout the programme, so missing a session doesn&apos;t put you behind.
      </>
    ),
  },
  {
    q: 'Will I really get personal attention?',
    a: (
      <>
        Yes — the founding cohort is <strong className="font-medium text-[#0E1715]">capped at 20 students</strong> specifically for this reason. You get a 30-minute 1:1 review with Vismaya every two weeks (six 1:1s over the programme), plus direct access throughout as a founding-cohort member. This isn&apos;t a 100-student lecture model.
      </>
    ),
  },
  {
    q: 'Where can I attend?',
    a: (
      <>
        Two modes. <strong className="font-medium text-[#0E1715]">In-person intensive cohorts in Kerala</strong>, or <strong className="font-medium text-[#0E1715]">live online cohorts open pan-India</strong> — accessible from Bengaluru, Mumbai, Delhi NCR, Chennai, Hyderabad, and across the Gulf. Same curriculum, same instructor, same 1:1 reviews.
      </>
    ),
  },
  {
    q: 'How do I apply?',
    a: (
      <>
        Call{' '}
        <a href="tel:+917907551261" className="font-medium text-[#0E1715] hover:underline">
          +91 7907 551 261
        </a>{' '}
        or{' '}
        <a href="tel:+917907551261" className="font-medium text-[#0E1715] hover:underline">
          book a free 30-minute discovery call
        </a>{' '}
        with Vismaya. Applicants are evaluated on intent and fit, not just background. Founding cohort seats are intentionally limited — the small-cohort model is what makes the operator-led teaching possible.
      </>
    ),
  },
] as const;

const displayH2 =
  "font-[family-name:var(--font-fraunces),Georgia,serif] text-[clamp(32px,4.2vw,54px)] font-medium leading-[1.04] tracking-[-0.025em] [font-variation-settings:'opsz'_96,'SOFT'_30]";

export function Faq() {
  return (
    <section id="faq" className="py-28 text-[#0E1715] max-[720px]:py-16">
      <div className="mx-auto max-w-[1240px] px-8 max-[720px]:px-[22px]">
        <Reveal>
          <span className="inline-flex items-center gap-3 font-[family-name:var(--font-geist-mono),ui-monospace,Menlo,monospace] text-[11.5px] font-medium uppercase tracking-[0.14em] text-[#14352A]">
            <span className="text-[#C66B2D]">11</span> FAQ
          </span>
        </Reveal>

        <div className="mt-7 grid grid-cols-1 items-start gap-16 max-[920px]:grid-cols-1 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div>
            <Reveal>
              <h2 className={`mb-14 max-w-[18ch] max-[920px]:mb-8 ${displayH2}`}>
                Frequently asked. <span className="text-[#C66B2D]">Honestly</span> answered.
              </h2>
              <p className="max-w-[32ch] text-[14.5px] leading-[1.55] text-[rgba(14,23,21,0.62)] max-[920px]:mb-8">
                Still have a question that isn&apos;t here? Call{' '}
                <a href="tel:+917907551261" className="font-medium text-[#0E1715] hover:underline">
                  +91 7907 551 261
                </a>
                . Vismaya picks up.
              </p>
            </Reveal>
          </div>

          <div>
            {items.map((item) => (
              <Reveal key={item.q}>
                <details className="academy-qa border-t border-[rgba(14,23,21,0.32)] last:border-b last:border-[rgba(14,23,21,0.32)]">
                  <summary className="grid cursor-pointer grid-cols-[1fr_auto] items-center gap-6 py-6 font-[family-name:var(--font-fraunces),Georgia,serif] text-[clamp(19px,1.9vw,24px)] font-medium leading-[1.25] tracking-[-0.015em] text-[#0E1715] [font-variation-settings:'opsz'_60,'SOFT'_20]">
                    <span>{item.q}</span>
                    <span className="academy-qa-arrow font-[family-name:var(--font-fraunces),Georgia,serif] text-[22px] font-medium leading-none text-[#C66B2D]">
                      +
                    </span>
                  </summary>
                  <div className="max-w-[64ch] pb-7 text-[15.5px] leading-[1.65] text-[rgba(14,23,21,0.62)]">{item.a}</div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
