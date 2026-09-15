import type { ReactNode } from 'react';

export type FaqItem = {
  id?: string | null;
  question: string;
  /** The on-page answer. May contain links. */
  answer: ReactNode;
  /** Plain-text version for FAQPage schema. Falls back to `answer` when it is a string. */
  plain?: string;
};

type FaqProps = {
  eyebrow?: string;
  heading?: ReactNode;
  items: FaqItem[];
};

// Markup matches the reference exactly (.faq-item / .faq-q / .faq-a) so
// wg.css styles it; every answer is in the HTML for crawlers.
export function Faq({
  eyebrow = 'Before you ask',
  heading = (
    <>
      Frequently asked <span className="fx">questions</span>
    </>
  ),
  items,
}: FaqProps) {
  if (items.length === 0) return null;
  return (
    <section className="shell section-tight" aria-label="Frequently asked questions">
      <div className="sec-head">
        <p className="microlabel green">{eyebrow}</p>
        <h2>{heading}</h2>
      </div>
      <div className="faq">
        {items.map((item) => (
          <div className="faq-item" key={item.id ?? item.question}>
            <h3 className="faq-q">{item.question}</h3>
            <p className="faq-a">{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/** The schema text for an FAQ item: the plain version, else the string answer. */
export function faqPlain(item: FaqItem): string {
  if (item.plain) return item.plain;
  return typeof item.answer === 'string' ? item.answer : '';
}
