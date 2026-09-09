import './styles.css';
import { getPayload } from 'payload';
import config from '@payload-config';
import { getMeta } from '@/app/utils/get-meta';
import { Schema } from '@/components/scripts/schema';
import { notFound } from 'next/navigation';
import type { ServicePage } from '@/payload-types';
import { EndCta, Faqs, Hero, Method } from './components';

export const revalidate = 3600;

const payload = await getPayload({ config });

type ParamsProps = {
  params: Promise<{ slug: string }>;
};

async function findService(slug: string) {
  const result = await payload.find({
    collection: 'servicePages',
    where: { slug: { equals: slug } },
    limit: 1,
  });
  return result.docs[0];
}

export async function generateMetadata({ params }: ParamsProps) {
  const { slug } = await params;
  const service = await findService(slug);
  return getMeta({ meta: service?.meta });
}

/** Service + FAQPage structured data, merged with anything the SEO plugin holds. */
function buildStructuredData(service: ServicePage) {
  const fromMeta = service?.meta?.schema;
  const base = Array.isArray(fromMeta) ? fromMeta : fromMeta ? [fromMeta] : [];
  const site = process.env.NEXT_PUBLIC_SITE_DOMAIN ?? 'https://www.wizgrowth.com';

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.lead ?? service.meta?.description ?? undefined,
    url: `${site}/services/${service.slug}/`,
    provider: { '@type': 'Organization', name: 'WizGrowth', url: site },
    areaServed: 'IN',
  };

  const faqs = service.faqs ?? [];
  const faqSchema =
    faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
          })),
        }
      : null;

  return [...base, serviceSchema, ...(faqSchema ? [faqSchema] : [])];
}

export default async function ServiceDetailPage({ params }: ParamsProps) {
  const { slug } = await params;
  const service = await findService(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <Schema structuredData={buildStructuredData(service)} />
      <Hero service={service} />
      <Method service={service} />
      <Faqs service={service} />
      <EndCta />
    </>
  );
}

export async function generateStaticParams() {
  const result = await payload.find({ collection: 'servicePages', limit: 0, depth: 0 });
  return result.docs.map((doc) => ({ slug: doc.slug }));
}
