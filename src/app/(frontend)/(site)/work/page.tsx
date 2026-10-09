import { getMeta } from '@/app/utils/get-meta';
import { Schema } from '@/components/scripts/schema';
import { Breadcrumb, EndCta, breadcrumbSchema, schemaList } from '@/components/wg';

export async function generateMetadata() {
  return getMeta({
    path: '/work/',
    fallback: {
      title: 'Work & Track Record — WizGrowth',
      description:
        'Where the WizGrowth method was built: growth roles at SurveySparrow and Emvigo Technologies, and a B2B funnel taken from zero to steady monthly inbound.',
    },
  });
}

const CRUMBS = [{ label: 'Home', href: '/' }, { label: 'Work', href: '/work/' }];

// The flagship client is not named. The track record names the companies
// as places the founder worked, which is different and is fine.
export default function WorkPage() {
  return (
    <>
      <Schema structuredData={schemaList(breadcrumbSchema(CRUMBS))} />
      <Breadcrumb items={CRUMBS} />

      <header className="shell page-hero">
        <p className="microlabel green">The founder’s track record</p>
        <h1>
          The work behind the <span className="fx">method</span>
        </h1>
        <p className="lead">
          WizGrowth is a young agency built on a working practitioner’s track record. Until client
          case studies clear review, here’s the honest version: where the method comes from, and
          what it has already built.
        </p>
      </header>

      <section className="shell section-tight" aria-label="Flagship engagement">
        <h2 className="sr-only">Flagship engagement</h2>
        <div className="case-card">
          <div>
            <p className="microlabel">
              Flagship engagement · B2B technology services · name in clearance
            </p>
            <h3>From zero to a compounding inbound engine</h3>
            <p className="case-body">
              A complete marketing funnel built from scratch: SEO foundations and technical cleanup,
              answer-first content engineered for AI citations, and Google Ads for immediate
              pipeline. The result — consistent monthly organic conversions, with ChatGPT and
              Perplexity now naming the brand in buyer-intent answers. We’ll walk you through the
              live dashboards on a call.
            </p>
          </div>
          <div className="case-stat">
            <p className="stat-big">0→1</p>
            <span className="stat-source">
              Zero to monthly inbound — organic, AI-cited and paid
            </span>
          </div>
        </div>
      </section>

      <section className="shell section-tight prose" aria-label="Track record">
        <h2>
          Where the method was <span className="fx">built</span>
        </h2>
        <p>
          Before WizGrowth, our founder built and ran growth in-house — the two chapters that shaped
          how we work:
        </p>
        <ol className="steps">
          <li>
            <b>SurveySparrow — global SaaS.</b>Growth marketing inside a fast-scaling
            survey-software company competing in a crowded worldwide category — where every
            experiment had to justify itself in numbers.
          </li>
          <li>
            <b>Emvigo Technologies — B2B IT services.</b>Built and ran the full marketing engine for
            a B2B technology services company: SEO, content, paid and analytics under one hat, from
            zero to a working inbound pipeline.
          </li>
        </ol>

        <h2>
          What a WizGrowth case study <span className="fx">includes</span>
        </h2>
        <ol className="steps">
          <li>
            <b>The baseline.</b>Where the numbers stood before we touched anything — no “400%
            growth” without showing the denominator.
          </li>
          <li>
            <b>What we tried, including the failures.</b>The structures that didn’t work teach more
            than the one that did.
          </li>
          <li>
            <b>The verified outcome.</b>Screenshots, periods, and the client’s sign-off on every
            figure.
          </li>
        </ol>
        <div className="panel">
          <span className="microlabel green">As client studies clear review</span>
          <p>
            They’ll appear here, to that standard. Until then, we’re happy to walk you through live
            dashboards and connect you with references on a call — ask, and we’ll set it up.
          </p>
        </div>
      </section>

      <EndCta />
    </>
  );
}
