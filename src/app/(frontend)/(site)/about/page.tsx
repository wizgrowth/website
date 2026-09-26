import Image from 'next/image';
import Link from 'next/link';
import { getMeta } from '@/app/utils/get-meta';
import { Schema } from '@/components/scripts/schema';
import {
  Breadcrumb,
  CANONICAL_ORIGIN,
  EndCta,
  ORG_ID,
  breadcrumbSchema,
  schemaList,
} from '@/components/wg';

export async function generateMetadata() {
  return getMeta({
    path: '/about/',
    fallback: {
      title: 'About WizGrowth — Grow Brands. Grow People.',
      description:
        'WizGrowth is a growth marketing agency and academy in Kochi, Kerala, founded by Vismaya Babu. Client campaigns power the curriculum; trained talent powers the agency.',
    },
  });
}

const CRUMBS = [{ label: 'Home', href: '/' }, { label: 'About', href: '/about/' }];

const ABOUT_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  url: `${CANONICAL_ORIGIN}/about/`,
  about: { '@id': ORG_ID },
};

const PERSON_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Vismaya Babu',
  jobTitle: 'Founder',
  worksFor: { '@id': ORG_ID },
  url: `${CANONICAL_ORIGIN}/about/`,
  image: `${CANONICAL_ORIGIN}/vismaya.jpg`,
  description:
    'Founder of WizGrowth, a growth marketing agency and academy in Kochi, Kerala, specializing in SEO growth, demand generation and AI-citation optimization (GEO). Writes honest data on marketing careers and salaries in India.',
};

export default function AboutPage() {
  return (
    <>
      <Schema structuredData={schemaList(breadcrumbSchema(CRUMBS), ABOUT_SCHEMA, PERSON_SCHEMA)} />
      <Breadcrumb items={CRUMBS} />

      <header className="shell page-hero">
        <p className="microlabel green">About WizGrowth</p>
        <h1>
          Grow brands. Grow <span className="fx">people.</span>
        </h1>
        <p className="lead">
          WizGrowth is a growth marketing agency and digital marketing academy in Kochi, Kerala —
          one company, one flywheel. The agency runs growth as a craft for brands across India and
          beyond; the academy trains the next generation of marketers on that same live work.
        </p>
      </header>

      <section className="shell section-tight prose" aria-label="The story">
        <h2>
          Why one company does <span className="fx">both</span>
        </h2>
        <p>
          Agencies hoard method; academies recycle theory. We built WizGrowth on the bet that each
          one fixes the other. Client campaigns generate the proof and playbooks the academy teaches
          from, and the academy produces the talent, referrals and community that strengthen the
          agency. Say it in one line:{' '}
          <strong>we grow brands, and we grow the people who grow brands.</strong>
        </p>

        <h2>
          How we <span className="fx">work</span>
        </h2>
        <p>
          <strong>Honest:</strong> real numbers with named sources — we publish the figures this
          industry keeps quiet, including the ones that make our own market look less shiny.{' '}
          <strong>Warm:</strong> plain language, generous teaching, no jargon walls.{' '}
          <strong>Confident:</strong> a point of view stated once and backed by work, never by
          adjectives. <strong>In motion:</strong> current campaigns and this quarter’s numbers, not
          a 2019 slide deck.
        </p>
        <p>
          Those four words are enforced in writing: “next-level results” is banned vocabulary here.
          “₹22K median, from 1,200+ listings” is the brand.
        </p>
      </section>

      <section className="shell section-tight" aria-label="Founder">
        <div className="founder-grid">
          <Image
            className="founder-photo"
            src="/vismaya.jpg"
            alt="Vismaya Babu, founder of WizGrowth"
            width={640}
            height={960}
          />
          <div>
            <p className="microlabel">Founder</p>
            <h3>Vismaya Babu</h3>
            <p className="case-body">
              A growth marketer who built inbound engines in-house — at a global SaaS company and a
              B2B technology services firm — before founding WizGrowth to run the same method for
              clients and teach it in the academy. She writes about the parts of the marketing
              career nobody warns you about, starting with the salaries.
            </p>
            <Link className="btn btn-quiet" style={{ paddingLeft: 0 }} href="/work/">
              See the work behind the method
            </Link>
          </div>
        </div>
      </section>

      <EndCta />
    </>
  );
}
