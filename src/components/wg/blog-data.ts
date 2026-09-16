import { cache } from 'react';
import { getPayload } from 'payload';
import config from '@payload-config';
import type { BlogInner } from '@/payload-types';

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
