import type { BlogInner } from '@/payload-types';
import { PostCard } from '@/components/wg';

// Editor-chosen related posts first; otherwise the three most recent others.
export function Related({ post, all }: { post: BlogInner; all: BlogInner[] }) {
  const chosen = (post.relatedPosts ?? []).filter(
    (p): p is BlogInner => typeof p === 'object' && p !== null,
  );
  const items = (chosen.length > 0 ? chosen : all.filter((p) => p.id !== post.id)).slice(0, 3);
  if (items.length === 0) return null;
  return (
    <section className="shell section-tight" aria-label="Related articles">
      <div className="sec-head">
        <p className="microlabel green">Keep reading</p>
        <h2>
          You might also <span className="fx">like</span>
        </h2>
      </div>
      <div className="post-grid">
        {items.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
      </div>
    </section>
  );
}
