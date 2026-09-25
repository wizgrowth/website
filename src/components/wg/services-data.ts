import { cache } from 'react';
import { getPayload } from 'payload';
import config from '@payload-config';
import type { ServicePage } from '@/payload-types';

// One Payload query per request, shared by the page, its metadata and the
// "other services" strip.
// A query that fails because the database schema is behind the code (a
// preview database, or a production build racing the migration workflow)
// must not take the build down. Empty results render empty sections and
// ISR fills them in once the migration has run.
function schemaBehind(err: unknown) {
  console.error('[servicePages] query failed; rendering without services:', err);
  return [] as ServicePage[];
}

// Two services were renamed in the redesign; their CMS documents keep the
// old slug (the admin panel and the SEO fields), the pages live at the new
// addresses, and next.config.mjs redirects the old ones.
const RENAMED: Record<string, string> = {
  'ai-citations': 'ai-search-visibility',
  'performance-marketing': 'demand-generation',
};

/** Services retired with the redesign; their documents stay in the CMS but they have no page. */
export const RETIRED_SERVICES = new Set(['analytics']);

/** The live address of a service, given its CMS slug. */
export function serviceHref(slug: string) {
  return `/services/${RENAMED[slug] ?? slug}/`;
}

export const getServices = cache(async (): Promise<ServicePage[]> => {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: 'servicePages',
      limit: 0,
      depth: 0,
      sort: 'order',
    });
    return result.docs;
  } catch (err) {
    return schemaBehind(err);
  }
});

export const getService = cache(async (slug: string): Promise<ServicePage | undefined> => {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: 'servicePages',
      where: { slug: { equals: slug } },
      limit: 1,
    });
    return result.docs[0];
  } catch (err) {
    schemaBehind(err);
    return undefined;
  }
});
