import React from 'react';
import type { JSXConverters } from '@payloadcms/richtext-lexical/react';
import type { SerializedBlockNode } from '@payloadcms/richtext-lexical';
import type { InlineCtaBlock, PullQuoteBlock, StatCardBlock } from '@/payload-types';
import { WA_GROWTH } from '@/components/wg/constants';
import { WaIcon } from '@/components/wg/wa-icon';

// The three in-body feature blocks from the article template, rendered with
// the reference class names so wg.css styles them.

function StatCard({ figure, body, source }: StatCardBlock) {
  return (
    <div className="stat-card">
      <p className="stat-big">{figure}</p>
      <div className="stat-body">
        {body}
        {source && <span className="stat-source">{source}</span>}
      </div>
    </div>
  );
}

function PullQuote({ quote, attribution }: PullQuoteBlock) {
  return (
    <div className="pullquote">
      <div className="pullquote-text">{quote}</div>
      {attribution && <div className="pullquote-attr">— {attribution}</div>}
    </div>
  );
}

function InlineCta({ label, whatsappLabel, secondaryLabel, secondaryHref }: InlineCtaBlock) {
  return (
    <div className="inline-cta on-ink">
      <div className="inline-cta-label">Talk to us</div>
      <h3>{label}</h3>
      <div className="inline-cta-actions">
        <a href={WA_GROWTH} className="btn btn-wa">
          <WaIcon /> {whatsappLabel || 'WhatsApp us'}
        </a>
        {secondaryLabel && (
          <a href={secondaryHref || '/contact/'} className="btn btn-secondary on-ink">
            {secondaryLabel}
          </a>
        )}
      </div>
    </div>
  );
}

type ArticleBlockNode =
  | SerializedBlockNode<StatCardBlock>
  | SerializedBlockNode<PullQuoteBlock>
  | SerializedBlockNode<InlineCtaBlock>;

export const blockConverter: JSXConverters<ArticleBlockNode> = {
  blocks: {
    statCard: ({ node }) => <StatCard {...node.fields} />,
    pullQuote: ({ node }) => <PullQuote {...node.fields} />,
    inlineCta: ({ node }) => <InlineCta {...node.fields} />,
  },
};
