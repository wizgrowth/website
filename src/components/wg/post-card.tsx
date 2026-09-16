import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import type { BlogInner } from '@/payload-types';
import { categoryLabel, postDate, postHref, postImage } from './blog-data';

type PostCardProps = { post: BlogInner; priority?: boolean };

// Image-led card. Every article has a featured image today; the italic
// category fallback keeps the grid even when one does not.
export function PostCard({ post, priority = false }: PostCardProps) {
  const image = postImage(post);
  const date = postDate(post);
  return (
    <Link className="post-card has-thumb" href={postHref(post)}>
      <span className="post-thumb" aria-hidden="true">
        {image ? (
          <Image
            src={image.url!}
            alt=""
            width={640}
            height={360}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
          />
        ) : (
          <span className="post-thumb-text">{categoryLabel(post)}</span>
        )}
      </span>
      <span className="post-body">
        <span className="post-cat">{categoryLabel(post)}</span>
        <span className="post-title">{post.title}</span>
        <span className="post-meta row">
          <span>{post.readingTime || 'Read the article'}</span>
          {date && <time dateTime={date}>{format(new Date(date), 'd MMM yyyy')}</time>}
        </span>
      </span>
    </Link>
  );
}
