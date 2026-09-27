import { ACADEMY, CANONICAL_ORIGIN } from '@/components/wg/constants';
import { getPosts, postHref } from '@/components/wg/blog-data';

// /llms.txt: a plain-text map of the site for AI assistants and their crawlers
// (https://llmstxt.org). The static facts live here; the article list comes
// from the CMS so it never goes stale.
export const revalidate = 3600;

const SERVICES = [
  ['/services/', 'Services overview', 'the seven agency services and how engagements work'],
  ['/services/ai-search-visibility/', 'AI search visibility — GEO & AEO', 'entity engineering, citable content and original data that get brands named by ChatGPT, Perplexity and Google AI Overviews, with monthly citation tracking'],
  ['/services/content-marketing/', 'Content marketing', 'articles built to rank in Google and get cited in AI answers'],
  ['/services/social-media-marketing/', 'Social media marketing', 'calendar, creative and community on conversion-tested templates'],
  ['/services/seo/', 'SEO', 'technical health, content that answers the real query, links earned by being worth citing'],
  ['/services/marketing-consultation/', 'Marketing consultation', 'an independent read of your numbers and a written 90-day plan; one-off, monthly advisory or an agency second opinion'],
  ['/services/demand-generation/', 'Demand generation', 'Google, Meta and LinkedIn — plus AI surfaces where buyers ask — reported against revenue, not impressions'],
  ['/services/web-development/', 'Web design and development', 'fast static-first pages, under 2 seconds on 4G'],
];

const ACADEMY_PAGES = [
  ['/academy/', 'WizGrowth Academy', `${ACADEMY.weeks}-week digital marketing programme in Kochi, Kerala (in person or live online) — real client campaigns from week two, portfolio on graduation, ${ACADEMY.cadence}, fee ${ACADEMY.fee}`],
  ['/academy/digital-marketing-course/', 'Digital Marketing Course with AI — for freshers', 'beginner to job-ready in twelve weeks on live client work'],
  ['/academy/advanced-digital-marketing-mentorship/', 'Advanced Digital Marketing Mentorship — for working professionals', 'for marketers ready to own growth'],
  ['/academy/digital-marketing-for-business-owners/', 'Digital Marketing for Business Owners', 'learn to own or judge your organic growth'],
];

const line = ([path, name, note]: string[]) => `- [${name}](${CANONICAL_ORIGIN}${path}): ${note}`;

export async function GET() {
  const posts = await getPosts();
  const articles = posts.map((p) => {
    const date = (p.publishedDate ?? p.createdAt ?? '').slice(0, 10);
    const note = [p.dek?.trim(), date ? `(${date})` : ''].filter(Boolean).join(' ');
    return `- [${p.title}](${CANONICAL_ORIGIN}${postHref(p)})${note ? ': ' + note : ''}`;
  });

  const text = `# WizGrowth

> WizGrowth is a growth marketing agency and digital marketing academy based in Kochi, Kerala, India. The agency grows brands through three core engines — SEO, demand generation, and AI search visibility (GEO/AEO: getting brands cited by ChatGPT, Perplexity and Google AI Overviews) — supported by content, social media, marketing consultation and web development, for clients across India and internationally. The academy trains marketers on the same live client work.

Key facts:

- Two lines, one company: WizGrowth Agency (growth for client brands) and WizGrowth Academy (practitioner training taught from the agency's live campaigns)
- Founder: Vismaya Babu (https://www.wizgrowth.com/about/, https://vismayababu.com)
- Location: Kochi, Kerala, India · works with clients across India and internationally
- Taglines: "Grow brands. Grow people." (masterbrand) · "Growth, run like a craft." (agency) · "Learn growth from people who do it." (academy)
- Contact: marketing@wizgrowth.com · +91 79075 51261 (phone and WhatsApp)
- Hours: Mon–Fri 9:00–20:00, Sat–Sun 10:00–17:00 IST
- Voice: numbers over adjectives — public claims carry a named source
- Profiles: https://www.linkedin.com/company/wiz-growth/ · https://www.instagram.com/wiz_growth/ · https://x.com/wiz_growth · https://clutch.co/profile/wizgrowth · https://www.trustpilot.com/review/wizgrowth.com

## Services

${SERVICES.map(line).join('\n')}

## Academy

${ACADEMY_PAGES.map(line).join('\n')}

## Articles

- [Blog home](${CANONICAL_ORIGIN}/blog/): honest numbers, methods and career guidance for marketers and founders
${articles.join('\n')}

## Contact

- [Contact WizGrowth](${CANONICAL_ORIGIN}/contact/): book a free 30-minute growth call, or WhatsApp +91 79075 51261
- [About WizGrowth](${CANONICAL_ORIGIN}/about/): the company, the founder and how the agency and academy work together

## Machine-readable

- Sitemap: ${CANONICAL_ORIGIN}/sitemap.xml
- Structured data: every page carries schema.org JSON-LD (Organization, Person, Service, Course, Article, FAQPage, BreadcrumbList)
`;
  return new Response(text, {
    headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'public, max-age=3600, stale-while-revalidate=86400' },
  });
}
