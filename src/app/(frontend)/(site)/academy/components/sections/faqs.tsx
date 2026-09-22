import type { FaqItem } from '@/components/wg';
import { ACADEMY } from '@/components/wg';

// Plain anchor: the blog runs the other design system, so it needs a full page load.
const report = (text: string) => <a href="/blog/digital-marketing-salary-india/">{text}</a>;

export const ACADEMY_FAQS: FaqItem[] = [
  {
    question: 'Who is the WizGrowth Academy programme for?',
    answer:
      'Students, early-career marketers and career-switchers who want employable, practised skills. No marketing degree required — you need consistent time, a laptop, and the willingness to run real campaigns.',
    plain:
      'Students, early-career marketers and career-switchers. No marketing degree required — consistent time, a laptop, and willingness to run real campaigns.',
  },
  {
    question: 'Is the course online or in person?',
    answer:
      'In person in Kochi, or live online — the client campaigns, mentor reviews and portfolio work are the same either way. Batch timings are shared on WhatsApp enquiry.',
    plain:
      'In person in Kochi or live online; client campaigns, mentor reviews and portfolio work are identical either way.',
  },
  {
    question: 'What does the course cost?',
    answer: `${ACADEMY.fee}, or three monthly payments. That covers the full twelve weeks, live client work, mentor reviews and the placement sprint. Payment terms come in writing before you pay anything.`,
    plain: `${ACADEMY.fee}, or three monthly payments, covering the full twelve weeks, live client work, mentor reviews and the placement sprint.`,
  },
  {
    question: 'When does the next batch start?',
    answer:
      'A new batch starts every month. WhatsApp us for the exact date and timings of the upcoming one — seats per batch are limited so mentors can actually review your work.',
    plain:
      'A new WizGrowth Academy batch starts every month; exact dates and timings are shared on WhatsApp enquiry.',
  },
  {
    question: 'Do you guarantee placement?',
    answer: (
      <>
        No — and be careful with academies that do. We’re a young academy and we won’t invent
        placement statistics. What we promise is the work itself: real campaigns, written case
        studies and a public portfolio employers can verify — and we’ll publish real placement
        numbers as our first batches graduate. Read our honest take in {report('the salary report')}.
      </>
    ),
    plain:
      'No. WizGrowth Academy is young and does not invent placement statistics; it promises verifiable work — real campaigns, written case studies, a public portfolio — and will publish real placement numbers as batches graduate.',
  },
  {
    question: 'Will I really earn ₹50,000 a month after a course?',
    answer: (
      <>
        Probably not at first — most freshers earn ₹15,000–25,000 a month, whatever any academy
        advertises. What moves you past that is specialization and proof of work, which is exactly
        what the twelve weeks build. The full numbers are in {report('our salary report')}.
      </>
    ),
    plain:
      'Probably not at first: most freshers earn ₹15,000–25,000 per month. Specialization and verifiable proof of work move salaries past that — which is what the programme builds.',
  },
];
