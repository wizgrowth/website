import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import type { BlogInner } from '@/payload-types';
import { categoryLabel, postDate, postHref, postImage } from '@/components/wg';

// The ink-grounded featured card. With an editor-set stat it shows the
// number (the page's single marigold element); otherwise the article image.
export function Featured({ post }: { post: BlogInner }) {
  const image = postImage(post);
  const useStat = Boolean(post.featured && post.featuredStat);
  const date = postDate(post);

  return (
    <section className="shell section-tight" aria-label="Featured article">
      <Link
        className={`featured-post on-ink${useStat || !image ? '' : ' has-image'}`}
        href={postHref(post)}
      >
        <div className="featured-body">
          <p className="microlabel tint">
            {post.featuredLabel || (post.featured ? 'Featured' : 'Latest')} · {categoryLabel(post)}
          </p>
          <h2>{post.title}</h2>
          {post.dek && <p>{post.dek}</p>}
          <div className="featured-meta">
            {post.readingTime && <span>{post.readingTime}</span>}
            {date && <time dateTime={date}>{format(new Date(date), 'd MMM yyyy')}</time>}
          </div>
          <span className="featured-cta">Read the article →</span>
        </div>
        {useStat ? (
          <div className="featured-stat">
            <span className="featured-num">{post.featuredStat}</span>
            {post.featuredStatCaption && (
              <span className="featured-src">{post.featuredStatCaption}</span>
            )}
          </div>
        ) : image ? (
          <div className="featured-img">
            <Image
              src={image.url!}
              alt={image.alt || post.title || ''}
              width={image.width || 1536}
              height={image.height || 960}
              sizes="(max-width: 768px) 100vw, 45vw"
              priority
            />
          </div>
        ) : null}
      </Link>
    </section>
  );
}
