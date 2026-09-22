import Image from 'next/image';
import Link from 'next/link';
import type { CardData } from '@/components/wg';

// The design's card, used in the index grid and under related articles. No
// 'use client' here: it renders on the server, and inside the client-side
// filter when the grid is filtered.
type ArticleCardProps = { card: CardData; priority?: boolean; hidden?: boolean };

export function ArticleCard({ card, priority = false, hidden = false }: ArticleCardProps) {
  return (
    <article className="wg-card" data-category={card.topicValue} hidden={hidden}>
      <Link className="wg-card-image" href={card.href} aria-label={card.title} tabIndex={-1}>
        <Image
          src={card.cover.src}
          alt={card.cover.alt}
          width={card.cover.width}
          height={card.cover.height}
          sizes="(max-width: 700px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
        />
      </Link>
      <div className="wg-card-copy">
        <span className="wg-topic">{card.topic}</span>
        <h3>
          <Link href={card.href}>{card.title}</Link>
        </h3>
        {card.dek && <p>{card.dek}</p>}
        <div className="wg-card-meta">
          <span>{card.byline}</span>
          <Link href={card.href} aria-label={`Read: ${card.title}`}>
            ↗
          </Link>
        </div>
      </div>
    </article>
  );
}
