const DEFAULT_STRUCTURED_DATA = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'WizGrowth',
    url: 'https://www.wizgrowth.com',
    logo: 'https://ibffbzwoucksfljolszp.supabase.co/storage/v1/object/public/wizgrowth-assets/header/wizgrowth-header-logo.png',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'WizGrowth',
    url: 'https://www.wizgrowth.com',
  },
];

type SchemaProps = { structuredData?: unknown };

// Rendered as a plain server-side <script type="application/ld+json">.
// It used to go through next/script with `lazyOnload`, which injected the
// JSON only after the page loaded — so crawlers that do not run JavaScript
// (most AI assistants, some validators) never saw any structured data.
export function Schema({ structuredData }: SchemaProps) {
  const data =
    structuredData === undefined || structuredData === null
      ? DEFAULT_STRUCTURED_DATA
      : structuredData;

  // "<" is escaped so a string inside the JSON can never close the tag.
  const json = JSON.stringify(data).replace(/</g, '\\u003c');

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
