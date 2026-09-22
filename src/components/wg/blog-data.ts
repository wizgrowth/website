import { cache } from 'react';
import { getPayload } from 'payload';
import config from '@payload-config';
import type { BlogInner, Media } from '@/payload-types';

// See services-data.ts: a schema-behind database must not break the build.
function schemaBehind(err: unknown) {
  console.error('[blogInner] query failed; rendering without posts:', err);
}

export const getPosts = cache(async (): Promise<BlogInner[]> => {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: 'blogInner',
      limit: 0,
      depth: 1,
      sort: '-createdAt',
    });
    return result.docs.filter((d) => Boolean(d.slug?.trim()));
  } catch (err) {
    schemaBehind(err);
    return [];
  }
});

export const getPost = cache(async (slug: string): Promise<BlogInner | undefined> => {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: 'blogInner',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 2,
    });
    return result.docs[0];
  } catch (err) {
    schemaBehind(err);
    return undefined;
  }
});

export function postHref(post: Pick<BlogInner, 'slug'>) {
  return `/blog/${post.slug.trim()}/`;
}

// Display order of the blog index sections. Categories the CMS knows but
// this list does not fall to the end under their own label.
export const CATEGORY_ORDER: { value: string; label: string; heading: [string, string, string] }[] =
  [
    { value: 'career', label: 'Career', heading: ['The career nobody ', 'sugar-coats', ''] },
    {
      value: 'seo-content',
      label: 'SEO & content',
      heading: ['How search ', 'actually', ' works'],
    },
    {
      value: 'business-owners',
      label: 'For business owners',
      heading: ['For the people signing the ', 'invoices', ''],
    },
    {
      value: 'local-business',
      label: 'Local business',
      heading: ['Local, found, and ', 'busy', ''],
    },
    { value: 'academy', label: 'Academy', heading: ['Before you pay for any ', 'course', ''] },
    { value: 'tools', label: 'Tools', heading: ['The working ', 'toolbox', ''] },
    { value: 'general', label: 'General', heading: ['More from the ', 'team', ''] },
    { value: 'best of', label: 'Best of', heading: ['The ones worth ', 'keeping', ''] },
    { value: 'ai', label: 'AI', heading: ['Marketing in the age of ', 'AI', ''] },
  ];

const LABELS: Record<string, string> = Object.fromEntries(
  CATEGORY_ORDER.map((c) => [c.value, c.label]),
);

export function categoryLabel(post: Pick<BlogInner, 'category'>) {
  const first = post.category?.[0];
  if (!first) return 'Article';
  return LABELS[first] ?? first.charAt(0).toUpperCase() + first.slice(1);
}

/** Posts grouped in the fixed section order; each post appears once, under its first category. */
export function groupByCategory(posts: BlogInner[]) {
  const buckets = new Map<string, BlogInner[]>();
  for (const post of posts) {
    const key = post.category?.[0] ?? 'general';
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key)!.push(post);
  }
  const ordered = CATEGORY_ORDER.filter((c) => buckets.has(c.value)).map((c) => ({
    ...c,
    posts: buckets.get(c.value)!,
  }));
  const known = new Set(CATEGORY_ORDER.map((c) => c.value));
  for (const [key, list] of buckets) {
    if (!known.has(key)) {
      ordered.push({
        value: key,
        label: key,
        heading: [`More on ${key}`, '', ''],
        posts: list,
      });
    }
  }
  return ordered;
}

/** The featured image as a Media object, or null when missing or unresolved. */
export function postImage(post: Pick<BlogInner, 'featuredImage'>): Media | null {
  const img = post.featuredImage;
  return img && typeof img === 'object' && img.url ? img : null;
}

export function postDate(post: Pick<BlogInner, 'publishedDate' | 'createdAt'>) {
  return post.publishedDate ?? post.createdAt;
}

/** The editor-flagged featured article, else the newest one. */
export function pickFeatured(posts: BlogInner[]): BlogInner | undefined {
  return posts.find((p) => p.featured) ?? posts[0];
}

/** The topic a post is filed under: its first category, with the display label. */
export function topicOf(post: Pick<BlogInner, 'category'>) {
  return { value: post.category?.[0] ?? 'general', label: categoryLabel(post) };
}

/** Topics present in a set of posts, in display order, with counts. */
export function topicCounts(posts: BlogInner[]) {
  const counts = new Map<string, { value: string; label: string; count: number }>();
  for (const post of posts) {
    const topic = topicOf(post);
    const entry = counts.get(topic.value) ?? { ...topic, count: 0 };
    entry.count += 1;
    counts.set(topic.value, entry);
  }
  const order = new Map(CATEGORY_ORDER.map((c, i) => [c.value, i]));
  return [...counts.values()].sort(
    (a, b) => (order.get(a.value) ?? 99) - (order.get(b.value) ?? 99) || a.label.localeCompare(b.label),
  );
}

export type Cover = { src: string; alt: string; width: number; height: number };

// The two illustrations from the design hand-off, for articles without a
// featured image. File names and alt text describe the picture itself so
// image search and assistants can read them.
export const BLOG_COVERS = {
  search: {
    src: '/images/blog/lilac-magnifying-glass-finds-lime-conversation-bubble.webp',
    alt: 'A lilac magnifying glass finds a lime conversation bubble among website cursors.',
    width: 1536,
    height: 1024,
  },
  answers: {
    src: '/images/blog/open-book-with-lime-answer-bubble.webp',
    alt: 'An open lilac book with a lime answer bubble floating above it.',
    width: 1536,
    height: 1024,
  },
} satisfies Record<string, Cover>;

const SEARCH_TOPICS = new Set(['seo-content', 'local-business', 'tools', 'business-owners']);

/** The article's featured image, else the stock cover that suits its topic. */
export function coverOf(post: Pick<BlogInner, 'featuredImage' | 'category' | 'title'>): Cover {
  const image = postImage(post);
  if (image?.url) {
    return {
      src: image.url,
      alt: image.alt || post.title || '',
      width: image.width || 1536,
      height: image.height || 1024,
    };
  }
  return SEARCH_TOPICS.has(post.category?.[0] ?? '') ? BLOG_COVERS.search : BLOG_COVERS.answers;
}

/** Everything a card needs, as plain data, so client components can render it. */
export type CardData = {
  id: number;
  href: string;
  title: string;
  dek: string;
  topic: string;
  topicValue: string;
  byline: string;
  cover: Cover;
};

export function cardData(post: BlogInner): CardData {
  const topic = topicOf(post);
  const author = post.publishedBy && typeof post.publishedBy === 'object' ? post.publishedBy : null;
  return {
    id: post.id,
    href: postHref(post),
    title: post.title ?? 'Untitled',
    dek: post.dek ?? '',
    topic: topic.label,
    topicValue: topic.value,
    byline: [author?.name ?? 'WizGrowth', post.readingTime].filter(Boolean).join(' · '),
    cover: coverOf(post),
  };
}
