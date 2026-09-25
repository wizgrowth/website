import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getMeta } from '@/app/utils/get-meta';
import { Schema } from '@/components/scripts/schema';
import type { ServicePage } from '@/payload-types';
import {
  Breadcrumb,
  CANONICAL_ORIGIN,
  EndCta,
  Faq,
  ORG_ID,
  breadcrumbSchema,
  faqSchema,
  fromMeta,
  getService,
  getServices,
  schemaList,
} from '@/components/wg';
import { Method } from './components/sections';

export const revalidate = 3600;

type ParamsProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: ParamsProps) {
  const { slug } = await params;
  const service = await getService(slug);
  return getMeta({
    meta: service?.meta,
    path: `/services/${slug}/`,
    fallback: service
      ? { title: `${service.name} — WizGrowth`, description: service.lead ?? undefined }
      : undefined,
  });
}

function crumbsFor(service: ServicePage) {
  return [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services/' },
    { label: service.name, href: `/services/${service.slug}/` },
  ];
}

function buildStructuredData(service: ServicePage) {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.name} — WizGrowth`,
    serviceType: service.name,
    provider: { '@id': ORG_ID },
    areaServed: [
      { '@type': 'Country', name: 'India' },
      { '@type': 'City', name: 'Kochi' },
    ],
    url: `${CANONICAL_ORIGIN}/services/${service.slug}/`,
    description: service.meta?.description ?? service.lead ?? undefined,
  };
  return schemaList(
    fromMeta(service.meta?.schema),
    breadcrumbSchema(crumbsFor(service)),
    serviceSchema,
    faqSchema(service.faqs ?? []),
  );
}

export default async function ServiceDetailPage({ params }: ParamsProps) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();

  return (
    <>
      <Schema structuredData={buildStructuredData(service)} />
      <Breadcrumb items={crumbsFor(service)} />
      <header className="shell page-hero">
        <p className="microlabel green">WizGrowth Agency · Service</p>
        <h1>
          {service.h1}
          {service.h1Accent && (
            <>
              {' '}
              <span className="fx">{service.h1Accent}</span>
            </>
          )}
        </h1>
        {service.lead && <p className="lead">{service.lead}</p>}
        <div className="hero-ctas">
          <Link href="/contact/" className="btn btn-primary">
            Book a growth call
          </Link>
          <Link href="/services/" className="btn btn-secondary">
            See all services
          </Link>
        </div>
      </header>
      <Method service={service} />
      <Faq
        items={(service.faqs ?? []).map((f) => ({
          id: f.id,
          question: f.question,
          answer: f.answer,
        }))}
      />
      <EndCta />
    </>
  );
}

// Services with a redesigned static page (src/app/(frontend)/(services));
// this CMS-driven route only serves the rest, e.g. analytics.
const REDESIGNED = new Set([
  'seo',
  'ai-citations',
  'performance-marketing',
  'content-marketing',
  'social-media-marketing',
  'web-development',
]);

export async function generateStaticParams() {
  const services = await getServices();
  return services.filter((doc) => !REDESIGNED.has(doc.slug)).map((doc) => ({ slug: doc.slug }));
}
