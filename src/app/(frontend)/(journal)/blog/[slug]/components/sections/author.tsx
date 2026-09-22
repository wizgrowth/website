import Image from 'next/image';
import { format } from 'date-fns';
import type { BlogInner, Media, User } from '@/payload-types';

export function authorOf(post: BlogInner): User | null {
  return post.publishedBy && typeof post.publishedBy === 'object' ? post.publishedBy : null;
}

export function formatDate(iso: string | null | undefined) {
  if (!iso) return '';
  return format(new Date(iso), 'd MMMM yyyy');
}

function pictureOf(author: User | null): Media | null {
  const p = author?.profilePicture;
  return p && typeof p === 'object' ? p : null;
}

// The design's round avatar: the author's photo, else their initials.
export function Avatar({ author, size }: { author: User | null; size: number }) {
  const picture = pictureOf(author);
  const name = author?.name ?? 'WizGrowth';
  if (picture?.url) {
    return (
      <span className="j-avatar">
        <Image src={picture.url} alt={picture.alt || name} width={size} height={size} />
      </span>
    );
  }
  const initials = author
    ? name
        .split(/\s+/)
        .map((part) => part.charAt(0))
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'WG';
  return (
    <span className="j-avatar" aria-hidden="true">
      {initials || 'WG'}
    </span>
  );
}

// The author block at the end of the body; the team byline when no author is set.
export function Publisher({ post }: { post: BlogInner }) {
  const author = authorOf(post);
  return (
    <section className="j-publisher">
      <Avatar author={author} size={43} />
      <div>
        <h2>{author ? `Written by ${author.name}` : 'Published by WizGrowth'}</h2>
        {author?.designation && <p>{author.designation}</p>}
        <p>
          {author?.description ||
            'Practical thinking on search, content and business growth from the WizGrowth team in Kochi.'}
        </p>
        {/* Plain anchor: the about page runs the other design system. */}
        <a href="/about/">About WizGrowth ↗</a>
      </div>
    </section>
  );
}
