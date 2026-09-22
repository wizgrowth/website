import type {
  SerializedEditorState,
  SerializedLexicalNode,
} from '@payloadcms/richtext-lexical/lexical';
import { RichTextConverterComponent } from '@/payload-components/richtext/richtext-convertor';
import type { BlogInner } from '@/payload-types';
import { WA_CAREER_REVIEW } from '@/components/wg';
import { EnquiryButton } from '../../../components/sections/enquiry-button';
import { Publisher } from './author';

export type ArticleContent = SerializedEditorState<SerializedLexicalNode> | null | undefined;

export function Tldr({ post }: { post: BlogInner }) {
  const items = post.tldr ?? [];
  if (items.length === 0) return null;
  return (
    <div className="j-answer">
      <span className="j-label">TL;DR · The short answer</span>
      <ul>
        {items.map((item) => (
          <li key={item.id ?? item.text}>
            {item.label && <strong>{item.label} </strong>}
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Faqs({ post }: { post: BlogInner }) {
  const items = (post.faqs ?? []).filter((f) => f.question && f.answer);
  if (items.length === 0) return null;
  return (
    <section className="j-faq" aria-label="Frequently asked questions">
      <h2 id="faq">Frequently asked questions</h2>
      {items.map((item) => (
        <details key={item.id ?? item.question}>
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </section>
  );
}

type Offer = { goal: string; title: string; copy: string; label: string; whatsapp?: string };

// The call to action at the end of the body, chosen by the article's topic.
// Goals are the ones the enquiry dialog offers; 'academy' pre-selects the
// academy route, as the home page's own academy buttons do.
const OFFERS: Record<string, Offer> = {
  career: {
    goal: 'academy',
    title: 'Stuck at the ₹6–8 LPA wall? Let’s look at why.',
    copy: 'A 30-minute review of your portfolio and your last two case studies, with the one thing to fix before your next negotiation. No pitch.',
    label: 'Book a career review',
    whatsapp: WA_CAREER_REVIEW,
  },
  academy: {
    goal: 'academy',
    title: 'Curious about learning this properly?',
    copy: 'Tell us what you want to be able to do in six months. We’ll say honestly whether the academy is the right route, and what to do if it isn’t.',
    label: 'Ask about the academy',
  },
  'seo-content': {
    goal: 'seo',
    title: 'Let’s connect your expertise with the people looking for it.',
    copy: 'Share your website and the searches you want to show up for. Use the brief to explain what you’ve tried and where it stalled.',
    label: 'Discuss my SEO',
  },
  ai: {
    goal: 'ai',
    title: 'Make your expertise easier to understand.',
    copy: 'Share your website and the questions buyers ask. Tell us where you want help with your AI visibility.',
    label: 'Discuss my AI visibility',
  },
  'local-business': {
    goal: 'seo',
    title: 'Get found by the customers nearest to you.',
    copy: 'Tell us where you are, who you serve and how people find you today. We’ll start with the gap that matters most.',
    label: 'Discuss my local visibility',
  },
  'business-owners': {
    goal: 'unsure',
    title: 'Start with the problem you want to solve.',
    copy: 'Share your audience, current challenge and constraints. You don’t need to choose a marketing channel first.',
    label: 'Find my next growth step',
  },
};

const DEFAULT_OFFER: Offer = {
  goal: 'unsure',
  title: 'Turn what you’ve read into your next growth step.',
  copy: 'Tell us what’s holding your business back. Let’s work out where search, content or your website can help.',
  label: 'Discuss my growth goals',
};

export function offerFor(post: Pick<BlogInner, 'category'>): Offer {
  return OFFERS[post.category?.[0] ?? ''] ?? DEFAULT_OFFER;
}

export function ContextCta({ post }: { post: BlogInner }) {
  const offer = offerFor(post);
  return (
    <section className="j-context-cta">
      <span className="j-label">PUT THIS INTO PRACTICE</span>
      <h2>{offer.title}</h2>
      <p>{offer.copy}</p>
      <EnquiryButton label={offer.label} goal={offer.goal} source={post.slug} />
      {offer.whatsapp && (
        <a className="j-context-alt" href={offer.whatsapp}>
          or WhatsApp us ↗
        </a>
      )}
      <small>
        Choose your goals, add your brief, then review an email or WhatsApp draft. You decide when
        to send.
      </small>
    </section>
  );
}

// The reading column: TL;DR, the rich-text body, FAQs, the topic's call to
// action and the author. Headings inside the body carry ids from the same
// rule the contents rail uses, so anchors never drift.
export function Prose({ post, content }: { post: BlogInner; content: ArticleContent }) {
  return (
    <article className="j-prose">
      <Tldr post={post} />
      <div className="j-body">{content && <RichTextConverterComponent data={content} />}</div>
      <Faqs post={post} />
      <ContextCta post={post} />
      <Publisher post={post} />
    </article>
  );
}
