import React from 'react';
import type { JSXConverters } from '@payloadcms/richtext-lexical/react';
import type { SerializedBlockNode } from '@payloadcms/richtext-lexical';
import type { InlineCtaBlock, PullQuoteBlock, StatCardBlock } from '@/payload-types';

const WHATSAPP_HREF =
  'https://wa.me/917907551261?text=Hi%20WizGrowth%20%E2%80%94%20I%E2%80%99d%20like%20to%20talk%20about%20growing%20my%20business.';

function StatCard({ figure, body, source }: StatCardBlock) {
  return (
    <aside className="my-10 max-w-[68ch] rounded-2xl border border-[rgba(14,23,21,0.16)] bg-[rgba(198,107,45,0.06)] p-8 max-[720px]:p-6">
      <p className="font-[family-name:var(--font-fraunces),Georgia,serif] text-[clamp(34px,4.4vw,52px)] font-medium leading-none tracking-[-0.03em] text-[#0E1715] [font-variation-settings:'opsz'_96,'SOFT'_30]">
        {figure}
      </p>
      <p className="mt-4 text-[15.5px] leading-[1.6] text-[rgba(14,23,21,0.82)]">{body}</p>
      {source && (
        <p className="mt-4 font-[family-name:var(--font-geist-mono),ui-monospace,Menlo,monospace] text-[11px] font-medium uppercase tracking-[0.14em] text-[rgba(14,23,21,0.62)]">
          {source}
        </p>
      )}
    </aside>
  );
}

function PullQuote({ quote, attribution }: PullQuoteBlock) {
  return (
    <figure className="my-12 max-w-[64ch] border-l-2 border-[#C66B2D] pl-7 max-[720px]:pl-5">
      <blockquote className="font-[family-name:var(--font-fraunces),Georgia,serif] text-[clamp(21px,2.4vw,29px)] font-medium leading-[1.32] tracking-[-0.02em] text-[#0E1715] [font-variation-settings:'opsz'_72,'SOFT'_24]">
        {quote}
      </blockquote>
      {attribution && (
        <figcaption className="mt-4 font-[family-name:var(--font-geist-mono),ui-monospace,Menlo,monospace] text-[11.5px] font-medium uppercase tracking-[0.14em] text-[rgba(14,23,21,0.62)]">
          {attribution}
        </figcaption>
      )}
    </figure>
  );
}

function InlineCta({ label, whatsappLabel, secondaryLabel, secondaryHref }: InlineCtaBlock) {
  return (
    <aside className="my-12 max-w-[68ch] rounded-2xl bg-[#14352A] p-9 text-[#F4EEE2] max-[720px]:p-6">
      <p className="max-w-[38ch] font-[family-name:var(--font-fraunces),Georgia,serif] text-[clamp(20px,2.2vw,27px)] font-medium leading-[1.24] tracking-[-0.02em] [font-variation-settings:'opsz'_72,'SOFT'_24]">
        {label}
      </p>
      <div className="mt-7 flex flex-wrap items-center gap-3.5">
        <a
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-[#F4EEE2] px-6 py-3 text-[14.5px] font-medium text-[#0E1715] transition-opacity hover:opacity-90"
        >
          {whatsappLabel || 'WhatsApp us'}
        </a>
        {secondaryLabel && (
          <a
            href={secondaryHref || '/contact/'}
            className="rounded-full border border-[rgba(244,238,226,0.4)] px-6 py-3 text-[14.5px] font-medium text-[#F4EEE2] transition-colors hover:border-[#F4EEE2]"
          >
            {secondaryLabel}
          </a>
        )}
      </div>
    </aside>
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
