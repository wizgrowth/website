import Link from 'next/link';
import type { BlogInner } from '@/payload-types';
import { Reveal } from '../reveal';
import { categoryLabel } from './categories';

type RelatedPostsProps = {
  innerData: BlogInner;
};

const displayH2 =
  "font-[family-name:var(--font-fraunces),Georgia,serif] text-[clamp(26px,3.2vw,38px)] font-medium leading-[1.08] tracking-[-0.025em] [font-variation-settings:'opsz'_96,'SOFT'_30]";

export function RelatedPosts({ innerData }: RelatedPostsProps) {
  const related = (innerData?.relatedPosts ?? []).filter(
    (post): post is BlogInner => typeof post === 'object' && post !== null,
  );

  if (related.length === 0) return null;

  return (
    <section className="pb-24 max-[720px]:pb-16">
      <div className="mx-auto max-w-[1240px] px-8 max-[720px]:px-[22px]">
        <Reveal>
          <h2 className={`mb-10 max-w-[20ch] ${displayH2}`}>Keep reading</h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((post) => {
            const category = categoryLabel(post.category);
            return (
              <Reveal key={post.id}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex h-full flex-col gap-4 rounded-2xl border border-[rgba(14,23,21,0.16)] p-7 transition-colors hover:border-[rgba(14,23,21,0.4)]"
                >
                  {category && (
                    <span className="font-[family-name:var(--font-geist-mono),ui-monospace,Menlo,monospace] text-[11px] font-medium uppercase tracking-[0.14em] text-[#C66B2D]">
                      {category}
                    </span>
                  )}
                  <span className="font-[family-name:var(--font-fraunces),Georgia,serif] text-[20px] font-medium leading-[1.25] tracking-[-0.015em] text-[#0E1715] [font-variation-settings:'opsz'_60,'SOFT'_20]">
                    {post.title}
                  </span>
                  <span className="mt-auto font-[family-name:var(--font-geist-mono),ui-monospace,Menlo,monospace] text-[11px] font-medium uppercase tracking-[0.14em] text-[rgba(14,23,21,0.62)]">
                    {post.readingTime ? `${post.readingTime} read` : 'Read the article'}
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
