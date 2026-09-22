import Image from 'next/image';
import Link from 'next/link';
import type { BlogInner } from '@/payload-types';
import { coverOf, postDate, topicOf } from '@/components/wg';
import type { ArticleHeading } from '@/payload-components/richtext/headings';
import { Avatar, authorOf, formatDate } from './author';

type BannerProps = { post: BlogInner; headings: ArticleHeading[] };

// The design's article banner: breadcrumb, title and cover side by side,
// then the author row with the date.
export function Banner({ post, headings }: BannerProps) {
  const author = authorOf(post);
  const topic = topicOf(post);
  const cover = coverOf(post);
  const published = postDate(post);
  const updated = post.updatedAt;
  const changed = formatDate(updated) !== formatDate(published);

  return (
    <div className="wg-article-banner">
      <div className="shell">
        <nav className="wg-crumb" aria-label="Breadcrumb">
          {/* Plain anchor: the home page is the other half of the site. */}
          <a href="/">Home</a>
          <span>/</span>
          <Link href="/blog/">Blog</Link>
          <span>/</span>
          <span aria-current="page">{post.crumb || topic.label}</span>
        </nav>
        <header className="wg-article-heading">
          <div className="wg-article-title">
            <div className="wg-article-tags">
              <span className="wg-topic">{topic.label}</span>
              {post.readingTime && <span>{post.readingTime}</span>}
            </div>
            <h1>{post.title}</h1>
            {post.dek && <p>{post.dek}</p>}
            {headings[0] && (
              <a className="wg-read" href={`#${headings[0].id}`}>
                Start reading <span aria-hidden="true">↓</span>
              </a>
            )}
          </div>
          <figure className="wg-article-cover">
            <Image
              src={cover.src}
              alt={cover.alt}
              width={cover.width}
              height={cover.height}
              sizes="(max-width: 700px) 100vw, 50vw"
              priority
            />
          </figure>
        </header>
        <div className="wg-author-row">
          <Avatar author={author} size={36} />
          <div>
            <strong>{author?.name ?? 'WizGrowth'}</strong>
            <span>{author?.designation ?? 'Practical ideas. A clearer next step.'}</span>
          </div>
          <time dateTime={changed ? updated : published}>
            {changed ? `Updated ${formatDate(updated)}` : formatDate(published)}
          </time>
        </div>
      </div>
    </div>
  );
}
