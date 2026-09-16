import Link from 'next/link';
import type { BlogInner } from '@/payload-types';
import { postHref } from '@/components/wg';

// The ink-grounded featured card. The number is the page's single marigold
// element, so nothing else on the blog index may use marigold.
export function Featured({ post }: { post: BlogInner }) {
  return (
    <section className="shell section-tight" aria-label="Featured article">
      <Link className="featured-post on-ink" href={postHref(post)}>
        <div className="featured-body">
          <p className="microlabel tint">{post.featuredLabel || 'Featured'}</p>
          <h2>{post.title}</h2>
          {post.dek && <p>{post.dek}</p>}
          <span className="featured-cta">Read the article →</span>
        </div>
        {post.featuredStat && (
          <div className="featured-stat">
            <span className="featured-num">{post.featuredStat}</span>
            {post.featuredStatCaption && (
              <span className="featured-src">{post.featuredStatCaption}</span>
            )}
          </div>
        )}
      </Link>
    </section>
  );
}
