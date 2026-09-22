import Image from 'next/image';
import Link from 'next/link';
import type { BlogInner } from '@/payload-types';
import { cardData } from '@/components/wg';

// "Worth your time": the two most recent articles after the spotlight.
export function Picks({ posts }: { posts: BlogInner[] }) {
  if (posts.length === 0) return null;
  return (
    <section className="wg-picks" aria-labelledby="picks-title">
      <div className="wg-section-heading">
        <h2 id="picks-title">Worth your time.</h2>
        <span className="j-label">EDITOR’S PICKS</span>
      </div>
      <div className="wg-picks-grid">
        {posts.map((post) => {
          const card = cardData(post);
          return (
            <Link className="wg-pick" href={card.href} key={card.id}>
              <div>
                <span className="wg-topic">{card.topic}</span>
                <h3>{card.title}</h3>
                <span className="wg-feature-meta">
                  {card.byline} <span aria-hidden="true">↗</span>
                </span>
              </div>
              <Image
                src={card.cover.src}
                alt={card.cover.alt}
                width={110}
                height={103}
                sizes="110px"
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
