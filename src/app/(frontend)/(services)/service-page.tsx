import { getMeta } from '@/app/utils/get-meta';
import { Schema } from '@/components/scripts/schema';
import { breadcrumbSchema, faqSchema, fromMeta, getService, schemaList } from '@/components/wg';
import type { ServiceMarkup } from './markup/types';

// One renderer for the six service pages: the CMS document's SEO fields
// override the page's own title and description, structured data is the
// design's graph plus a breadcrumb list (and a FAQPage where the design has
// none), and the markup ships as generated.
export async function serviceMetadata(page: ServiceMarkup) {
  const service = page.cmsSlug ? await getService(page.cmsSlug) : undefined;
  return getMeta({
    meta: service?.meta,
    path: page.url,
    fallback: { title: page.title, description: page.description },
  });
}

function hasType(schema: unknown, type: string): boolean {
  if (Array.isArray(schema)) return schema.some((s) => hasType(s, type));
  if (schema && typeof schema === 'object') {
    const o = schema as Record<string, unknown>;
    if (o['@type'] === type) return true;
    if (o['@graph']) return hasType(o['@graph'], type);
  }
  return false;
}

export async function ServicePage({ page, editorSchema }: { page: ServiceMarkup; editorSchema?: unknown[] }) {
  const service = page.cmsSlug ? await getService(page.cmsSlug) : undefined;
  const crumbs = [{ label: 'Home', href: '/' }, { label: 'Services', href: '/services/' }];
  if (page.url !== '/services/') crumbs.push({ label: page.name, href: page.url });
  return (
    <>
      <Schema
        structuredData={schemaList(
          editorSchema ?? fromMeta(service?.meta?.schema),
          breadcrumbSchema(crumbs),
          page.schema,
          hasType(page.schema, 'FAQPage') ? null : faqSchema(page.faqs),
        )}
      />
      <div dangerouslySetInnerHTML={{ __html: page.html }} />
    </>
  );
}
