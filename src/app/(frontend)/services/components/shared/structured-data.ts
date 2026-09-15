import { SITE_URL } from './constants';

type Crumb = { label: string; href?: string };

export function breadcrumbSchema(items: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: new URL(item.href, SITE_URL).toString() } : {}),
    })),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  if (items.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

/** Anything an editor pasted into the SEO plugin's Schema field, as an array. */
export function fromMeta(schema: unknown): unknown[] {
  if (Array.isArray(schema)) return schema;
  if (schema && typeof schema === 'object') return [schema];
  return [];
}
