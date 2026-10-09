import { ACADEMY_ID, CANONICAL_ORIGIN, ORG_ID, PERSON_ID } from './constants';

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
  founder: { '@id': PERSON_ID },
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
    '@id': ACADEMY_ID,
    name: 'WizGrowth Academy',
    parentOrganization: { '@id': ORG_ID },
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

/** The founder as one entity, the same node on every page that mentions her. */
export const FOUNDER_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Vismaya Babu',
  jobTitle: 'Founder',
  worksFor: { '@id': ORG_ID },
  url: `${CANONICAL_ORIGIN}/about/`,
  image: `${CANONICAL_ORIGIN}/vismaya.jpg`,
  sameAs: ['https://vismayababu.com'],
  knowsAbout: [
    'Search engine optimization',
    'Generative engine optimization',
    'Answer engine optimization',
    'Content marketing',
    'Demand generation',
    'Digital marketing training',
  ],
  description:
    'Founder of WizGrowth, a growth marketing agency and academy in Kochi, Kerala. Works across SEO, content and AI visibility, helping brands understand how they appear in search and AI-generated answers, and how that visibility translates into measurable business results.',
};

const hasType = (node: Record<string, unknown>, type: string) => {
  const t = node['@type'];
  return Array.isArray(t) ? t.includes(type) : t === type;
};

/**
 * Editors and the design hand-offs describe the company, the academy and the
 * founder inline, each time slightly differently. Search engines and AI
 * assistants build their picture of an entity from the nodes that share an
 * @id, so every such mention gets the site-wide id, and a Course names its
 * instructor.
 */
export function linkEntities<T>(node: T): T {
  if (Array.isArray(node)) return node.map(linkEntities) as T;
  if (!node || typeof node !== 'object') return node;
  const o: Record<string, unknown> = { ...(node as Record<string, unknown>) };
  for (const key of Object.keys(o)) if (key === '@graph' || !key.startsWith('@')) o[key] = linkEntities(o[key]);
  const name = typeof o.name === 'string' ? o.name : '';
  if (!o['@id']) {
    if (hasType(o, 'Person') && /vismaya\s+babu/i.test(name)) o['@id'] = PERSON_ID;
    else if (
      /wizgrowth/i.test(name) &&
      ['Organization', 'EducationalOrganization', 'LocalBusiness', 'ProfessionalService'].some((t) => hasType(o, t))
    )
      o['@id'] = /academy/i.test(name) ? ACADEMY_ID : ORG_ID;
  }
  if (hasType(o, 'Course') && !o.instructor) o.instructor = { '@id': PERSON_ID };
  return o as T;
}

/**
 * Drop nulls so a page can build its list without conditionals, link the
 * entities, and make sure the Organization and founder nodes that the other
 * nodes refer to by @id are present on the page: an @id reference only
 * resolves within the page it is on.
 */
export function schemaList(...items: unknown[]) {
  const given = items.flat().filter(Boolean);
  const list = given.map(linkEntities);
  if (!given.includes(ORGANIZATION_SCHEMA)) list.push(ORGANIZATION_SCHEMA);
  if (!given.includes(FOUNDER_SCHEMA)) list.push(FOUNDER_SCHEMA);
  return list;
}
