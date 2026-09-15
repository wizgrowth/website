import { notFound } from 'next/navigation';
import { getMeta } from '@/app/utils/get-meta';
import { Schema } from '@/components/scripts/schema';
import type { ServicePage } from '@/payload-types';
import {
  Breadcrumb,
  EndCta,
  Faq,
  SITE_URL,
  breadcrumbSchema,
  faqSchema,
  fromMeta,
  getService,
  getServices,
} from '../components/shared';
import { Hero, Honesty, Includes, Method, OtherServices } from './components/sections';

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

/** Breadcrumb, Service and FAQPage structured data, plus anything from the SEO plugin. */
function buildStructuredData(service: ServicePage) {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.name} — WizGrowth`,
    serviceType: service.name,
    description: service.lead ?? service.meta?.description ?? undefined,
    url: `${SITE_URL}/services/${service.slug}/`,
    provider: { '@type': 'Organization', name: 'WizGrowth', url: `${SITE_URL}/` },
    areaServed: [
      { '@type': 'Country', name: 'India' },
      { '@type': 'City', name: 'Kochi' },
    ],
  };

  return [
    ...fromMeta(service.meta?.schema),
    breadcrumbSchema(crumbsFor(service)),
    serviceSchema,
    faqSchema(service.faqs ?? []),
  ].filter(Boolean);
}

export default async function ServiceDetailPage({ params }: ParamsProps) {
  const { slug } = await params;
  const [service, services] = await Promise.all([getService(slug), getServices()]);

  if (!service) {
    notFound();
  }

  return (
    <>
      <Schema structuredData={buildStructuredData(service)} />
      <Breadcrumb items={crumbsFor(service)} />
      <Hero service={service} />
      <Method service={service} />
      <Includes service={service} />
      <Honesty service={service} />
      <Faq
        heading={
          <>
            Questions we get <span className="wg-fx">asked</span>
          </>
        }
        intro={`The questions that come up about ${service.name} on almost every first call.`}
        items={(service.faqs ?? []).map((f) => ({
          id: f.id,
          question: f.question,
          answer: f.answer,
        }))}
      />
      <OtherServices current={service} services={services} />
      <EndCta
        heading={
          <>
            Want this run <span className="wg-fx">for you</span>?
          </>
        }
        body="A free thirty-minute growth call. We look at your numbers and tell you what we’d fix first — no pitch deck, no obligation."
      />
    </>
  );
}

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((doc) => ({ slug: doc.slug }));
}
