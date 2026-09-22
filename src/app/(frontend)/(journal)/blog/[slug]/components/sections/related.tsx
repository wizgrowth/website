import Link from 'next/link';
import type { BlogInner } from '@/payload-types';
import { cardData } from '@/components/wg';
import { ArticleCard } from '../../../components/sections/article-card';

// Editor-chosen related posts first; otherwise the most recent others. The
// design's grid holds two, so the first two are shown.
export function Related({ post, all }: { post: BlogInner; all: BlogInner[] }) {
  const chosen = (post.relatedPosts ?? []).filter(
    (p): p is BlogInner => typeof p === 'object' && p !== null,
  );
  const items = (chosen.length > 0 ? chosen : all.filter((p) => p.id !== post.id)).slice(0, 2);
  if (items.length === 0) return null;
  return (
    <section className="j-related" aria-label="Related articles">
      <div className="shell">
        <div className="j-section-head">
          <h2>Keep the ideas going.</h2>
          <Link className="text-link" href="/blog/">
            All articles{' '}
            <svg className="arrow" aria-hidden="true">
              <use href="#arrow-up" />
            </svg>
          </Link>
        </div>
        <div className="wg-related-grid">
          {items.map((p) => (
            <ArticleCard key={p.id} card={cardData(p)} />
          ))}
        </div>
      </div>
    </section>
  );
}
