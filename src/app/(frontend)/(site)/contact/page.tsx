import { getPayload } from 'payload';
import config from '@payload-config';
import { getMeta } from '@/app/utils/get-meta';
import { Schema } from '@/components/scripts/schema';
import {
  Breadcrumb,
  CANONICAL_ORIGIN,
  EndCta,
  ORG_ID,
  StickyCta,
  WA_BOOK_CALL,
  breadcrumbSchema,
  fromMeta,
  schemaList,
} from '@/components/wg';
import BookingForm from './components/booking-form';
import { Channels, NextSteps } from './components/sections';

// Re-rendered on save from the admin panel, and hourly as a safety net.
export const revalidate = 3600;

const payload = await getPayload({ config });
const contactMetaData = await payload.findGlobal({ slug: 'contact' });

export async function generateMetadata() {
  return getMeta({
    meta: contactMetaData?.meta,
    path: '/contact/',
    fallback: {
      title: 'Contact WizGrowth — Book a Free Growth Call',
      description:
        'WhatsApp, call or email WizGrowth in Kochi, Kerala. A free 30-minute growth call: we look at your numbers and tell you what we’d fix first, in writing.',
    },
  });
}

const CRUMBS = [
  { label: 'Home', href: '/' },
  { label: 'Contact', href: '/contact/' },
];

const CONTACT_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  url: `${CANONICAL_ORIGIN}/contact/`,
  about: { '@id': ORG_ID },
};

export default function ContactPage() {
  return (
    <>
      <Schema
        structuredData={schemaList(
          fromMeta(contactMetaData?.meta?.schema),
          breadcrumbSchema(CRUMBS),
          CONTACT_SCHEMA,
        )}
      />
      <Breadcrumb items={CRUMBS} />
      <header className="shell page-hero">
        <p className="microlabel green">Contact WizGrowth</p>
        <h1>
          Tell us what you’re trying to <span className="fx">grow</span>
        </h1>
        <p className="lead">
          Three ways in — WhatsApp is fastest in our market, and we treat it that way. Whichever
          channel you pick, the first step is the same: a free thirty-minute growth call where we
          look at your numbers and tell you what we’d fix first.
        </p>
      </header>
      <Channels />
      <NextSteps />
      <BookingForm />
      <EndCta
        heading={
          <>
            Prefer to start on <span className="fx">WhatsApp?</span>
          </>
        }
        body="It’s the fastest channel we run — say hi and tell us what you’re growing."
        primary={{ href: WA_BOOK_CALL, label: 'Book a growth call' }}
      />
      <StickyCta
        reassure="Free 30-minute call · an honest read on your numbers"
        href={WA_BOOK_CALL}
        label="WhatsApp us now"
      />
    </>
  );
}
