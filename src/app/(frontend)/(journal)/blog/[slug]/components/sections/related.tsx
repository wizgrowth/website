import Link from 'next/link';
import type { BlogInner } from '@/payload-types';
import { cardData, type BlogSummary } from '@/components/wg';
import { ArticleCard } from '../../../components/sections/article-card';

// Editor-chosen related posts first (populated with the collection's
// defaultPopulate, so without their bodies); otherwise the most recent
// others. The design's grid holds two, so the first two are shown.
export function Related({ post, recent }: { post: BlogInner; recent: BlogSummary[] }) {
  const chosen = (post.relatedPosts ?? []).filter(
    (p): p is BlogInner => typeof p === 'object' && p !== null,
  );
  const items = (chosen.length > 0 ? chosen : recent).slice(0, 2);
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
