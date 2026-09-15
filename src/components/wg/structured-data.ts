import { CANONICAL_ORIGIN, ORG_ID } from './constants';

type Crumb = { label: string; href?: string };

const abs = (path: string) => new URL(path, CANONICAL_ORIGIN).toString();

export function breadcrumbSchema(items: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: abs(item.href) } : {}),
    })),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  const valid = items.filter((i) => i.question && i.answer);
  if (valid.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: valid.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

/** The Organization node every other page refers to by @id. */
export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'ProfessionalService'],
  '@id': ORG_ID,
  name: 'WizGrowth',
  alternateName: 'Wizgrowth',
  url: `${CANONICAL_ORIGIN}/`,
  logo: `${CANONICAL_ORIGIN}/logo.png`,
  slogan: 'Grow brands. Grow people.',
  description:
    'WizGrowth is a growth marketing agency and digital marketing academy based in Kochi, Kerala, India. The agency grows brands through SEO, demand generation and AI-citation optimization (GEO), supported by content, social media, analytics and web development, for clients across India and internationally. The academy trains marketers on the same live client work.',
  sameAs: [
    'https://x.com/wiz_growth',
    'https://www.linkedin.com/company/wiz-growth/',
    'https://www.instagram.com/wiz_growth/',
    'https://clutch.co/profile/wizgrowth',
    'https://www.trustpilot.com/review/wizgrowth.com',
  ],
  email: 'marketing@wizgrowth.com',
  telephone: '+91-79075-51261',
  priceRange: '₹₹',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kochi',
    addressRegion: 'Kerala',
    addressCountry: 'IN',
  },
  areaServed: [
    { '@type': 'Country', name: 'India' },
    { '@type': 'AdministrativeArea', name: 'Kerala' },
    { '@type': 'City', name: 'Kochi' },
  ],
  knowsAbout: [
    'Search engine optimization',
    'Generative engine optimization',
    'Answer engine optimization',
    'AI citation optimization',
    'Demand generation',
    'Performance marketing',
    'Content marketing',
    'Social media marketing',
    'Web design and development',
    'Marketing analytics',
    'Digital marketing training',
  ],
  founder: { '@type': 'Person', name: 'Vismaya Babu', jobTitle: 'Founder, WizGrowth' },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '20:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday'],
      opens: '10:00',
      closes: '17:00',
    },
  ],
  subOrganization: {
    '@type': 'EducationalOrganization',
    name: 'WizGrowth Academy',
    url: `${CANONICAL_ORIGIN}/academy/`,
    description:
      "Digital marketing training in Kochi, Kerala — a twelve-week programme taught from WizGrowth Agency's live client work.",
  },
};

export const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${CANONICAL_ORIGIN}/#website`,
  url: `${CANONICAL_ORIGIN}/`,
  name: 'WizGrowth',
  publisher: { '@id': ORG_ID },
  inLanguage: 'en',
};

/** Anything an editor pasted into the SEO plugin's Schema field, as an array. */
export function fromMeta(schema: unknown): unknown[] {
  if (Array.isArray(schema)) return schema;
  if (schema && typeof schema === 'object') return [schema];
  return [];
}

/** Drop nulls so a page can build its list without conditionals. */
export function schemaList(...items: unknown[]) {
  return items.flat().filter(Boolean);
}
