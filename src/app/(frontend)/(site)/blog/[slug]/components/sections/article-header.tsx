import Link from 'next/link';
import type { BlogInner } from '@/payload-types';
import { categoryLabel } from '@/components/wg';
import { Avatar, authorOf, formatDate } from './author';

export function ArticleHeader({ post }: { post: BlogInner }) {
  const author = authorOf(post);
  const updated = formatDate(post.updatedAt);

  return (
    <header className="shell">
      <div className="article-header">
        <div className="category-row">
          <Link href="/blog/" className="category-pill">
            {categoryLabel(post)}
          </Link>
          <span className="read-meta">
            {post.readingTime ? `${post.readingTime} · ` : ''}Updated {updated}
          </span>
        </div>
        <h1 className="article-title">{post.title}</h1>
        {post.dek && <p className="dek">{post.dek}</p>}
        <div className="byline">
          <Avatar author={author} size={48} />
          <div>
            <span className="byline-author">{author?.name ?? 'WizGrowth'}</span>
            <span className="byline-meta">
              {author?.designation ?? 'WizGrowth'} · Updated {updated}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
