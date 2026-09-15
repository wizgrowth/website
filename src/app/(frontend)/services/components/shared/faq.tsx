import type { ReactNode } from 'react';
import { Reveal } from './reveal';

export type FaqItem = { id?: string | null; question: string; answer: ReactNode };

type FaqProps = {
  eyebrow?: string;
  heading: ReactNode;
  intro?: ReactNode;
  items: FaqItem[];
};

// Native <details> so every answer is in the markup for crawlers and works
// without JavaScript.
export function Faq({ eyebrow = 'Before you ask', heading, intro, items }: FaqProps) {
  if (items.length === 0) return null;

  return (
    <section id="faq" className="wg-shell wg-section" aria-labelledby="faq-h">
      <div className="wg-split">
        <Reveal className="wg-split-aside">
          <p className="wg-microlabel wg-microlabel--green wg-microlabel--dot">{eyebrow}</p>
          <h2 id="faq-h" className="wg-h2">
            {heading}
          </h2>
          {intro && <p className="wg-intent">{intro}</p>}
        </Reveal>
        <Reveal>
          <div className="wg-faq">
            {items.map((item, i) => (
              <details key={item.id ?? item.question} open={i === 0}>
                <summary>
                  <span className="wg-q" aria-hidden="true">
                    Q.
                  </span>
                  <span>{item.question}</span>
                  <span className="wg-plus" aria-hidden="true">
                    +
                  </span>
                </summary>
                <div className="wg-a">{item.answer}</div>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
