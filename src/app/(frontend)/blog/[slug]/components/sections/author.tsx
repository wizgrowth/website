import Image from 'next/image';
import { format } from 'date-fns';
import type { BlogInner, Media, User } from '@/payload-types';

export function authorOf(post: BlogInner): User | null {
  return post.publishedBy && typeof post.publishedBy === 'object' ? post.publishedBy : null;
}

export function formatDate(iso: string | null | undefined) {
  if (!iso) return '';
  return format(new Date(iso), 'MMM d, yyyy');
}

function pictureOf(author: User | null): Media | null {
  const p = author?.profilePicture;
  return p && typeof p === 'object' ? p : null;
}

export function Avatar({ author, size }: { author: User | null; size: number }) {
  const picture = pictureOf(author);
  const name = author?.name ?? 'WizGrowth';
  if (picture?.url) {
    return (
      <Image
        className="avatar"
        src={picture.url}
        alt={picture.alt || name}
        width={size}
        height={size}
      />
    );
  }
  return (
    <div className="avatar" aria-hidden="true">
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

export function AuthorBio({ post }: { post: BlogInner }) {
  const author = authorOf(post);
  if (!author) return null;
  return (
    <section className="shell section-tight" aria-label="Author">
      <aside className="author-bio">
        <Avatar author={author} size={96} />
        <div>
          <div className="author-bio-label">Written by</div>
          <div className="author-bio-name">{author.name}</div>
          {author.designation && <div className="author-bio-title">{author.designation}</div>}
          {author.description && <p className="author-bio-text">{author.description}</p>}
        </div>
      </aside>
    </section>
  );
}
