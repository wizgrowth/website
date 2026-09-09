import type { BlogInner } from '@/payload-types';

type CategoryValue = NonNullable<BlogInner['category']>[number];

/** Display labels for the category values on the blogInner collection. */
export const CATEGORY_LABELS: Record<CategoryValue, string> = {
  general: 'General',
  'best of': 'Best Of',
  ai: 'AI',
  career: 'Career',
  'seo-content': 'SEO & Content',
  tools: 'Tools',
  'local-business': 'Local Business',
  academy: 'Academy',
};

export function categoryLabel(category: BlogInner['category']): string | null {
  const first = category?.[0];
  if (!first) return null;
  return CATEGORY_LABELS[first] ?? first;
}
