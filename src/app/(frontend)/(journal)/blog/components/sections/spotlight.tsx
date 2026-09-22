import Link from 'next/link';
import type { BlogInner } from '@/payload-types';
import { cardData } from '@/components/wg';
import { CoverImage } from './cover-image';

// The editor's spotlight: the editor-flagged featured article, else the newest.
export function Spotlight({ post }: { post: BlogInner }) {
  const card = cardData(post);
  return (
    <section className="wg-feature" aria-labelledby="feature-title">
      <div className="wg-feature-copy">
        <span className="j-label">{post.featuredLabel || 'THE EDITOR’S SPOTLIGHT'}</span>
        <span className="wg-topic">{card.topic}</span>
        <h2 id="feature-title">
          <Link href={card.href}>{card.title}</Link>
        </h2>
        {card.dek && <p>{card.dek}</p>}
        <Link className="wg-read" href={card.href}>
          Read the article <span aria-hidden="true">↗</span>
        </Link>
        <span className="wg-feature-meta">{card.byline}</span>
      </div>
      <Link className="wg-feature-image" href={card.href} aria-label={`Read: ${card.title}`}>
        <CoverImage
          cover={card.cover}
          fallback={card.fallback}
          sizes="(max-width: 700px) 100vw, 40vw"
          priority
        />
      </Link>
    </section>
  );
}
