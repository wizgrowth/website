import Link from 'next/link';
import type { BlogInner } from '@/payload-types';
import { PostCard } from '@/components/wg';

type BlogTeaserProps = { posts: BlogInner[]; salaryReport?: BlogInner };

export function BlogTeaser({ posts, salaryReport }: BlogTeaserProps) {
  return (
    <section className="shell section" aria-labelledby="blog-h">
      <div className="sec-head">
        <p className="microlabel green">The WizGrowth blog</p>
        <h2 id="blog-h">
          The numbers nobody else will <span className="fx">print</span>
        </h2>
        <p className="intent">
          We publish what this industry keeps quiet — real salaries, real timelines, real methods.
          Generosity is the top of our funnel.
        </p>
      </div>
      {salaryReport && (
        <div className="hi-card">
          <p className="stat-big">₹22K</p>
          <div className="hi-body">
            Median fresher digital marketing salary in India, 2026 — based on 1,200+ entry-level
            listings sampled from Naukri, LinkedIn and AngelList.
            <span className="stat-source">Source: WizGrowth Hiring Index, 2026</span>
            <Link
              className="btn btn-quiet"
              style={{ padding: '8px 0 0', fontSize: 13.5 }}
              href={`/blog/${salaryReport.slug.trim()}/`}
            >
              Read the full salary report
            </Link>
          </div>
        </div>
      )}
      {posts.length > 0 && (
        <div className="post-grid">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
      <div className="svc-cta">
        <Link href="/blog/" className="btn btn-quiet">
          Browse all articles
        </Link>
      </div>
    </section>
  );
}
