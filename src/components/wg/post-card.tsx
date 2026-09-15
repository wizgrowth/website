import Link from 'next/link';
import type { BlogInner } from '@/payload-types';
import { categoryLabel, postHref } from './blog-data';

export function PostCard({ post }: { post: BlogInner }) {
  return (
    <Link className="post-card" href={postHref(post)}>
      <span className="post-cat">{categoryLabel(post)}</span>
      <span className="post-title">{post.title}</span>
      <span className="post-meta">Read the article</span>
    </Link>
  );
}
