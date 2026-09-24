import { Schema } from '@/components/scripts/schema';
import { breadcrumbSchema, schemaList } from '@/components/wg';
import type { AcademyPage } from './markup/types';

type Props = {
  page: AcademyPage;
  crumbs: { label: string; href: string }[];
  /** Structured data pasted into the CMS SEO tab, when the page has one. */
  editorSchema?: unknown[];
};

// One renderer for the four academy pages: structured data, then the design's
// markup with Little Wiz's messages attached for /academy/app.js.
export function AcademyMarkup({ page, crumbs, editorSchema = [] }: Props) {
  const messages = JSON.stringify(page.wizMessages).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  const html = page.html.replace('data-wiz-speech=""', `data-wiz-speech="" data-wiz-messages="${messages}"`);
  return (
    <>
      <Schema structuredData={schemaList(editorSchema, breadcrumbSchema(crumbs), page.schema)} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
