export type ServiceMarkup = {
  url: string;
  /** The servicePages document whose SEO fields override the page's own; null for the hub. */
  cmsSlug: string | null;
  name: string;
  /** Kept out of search results and site navigation until its placeholders are filled. */
  draft: boolean;
  title: string;
  description: string;
  /** The design's JSON-LD, emitted as-is beside the breadcrumb list. */
  schema: unknown;
  /** Questions and answers from the page's FAQ, for FAQPage schema when the design has none. */
  faqs: { question: string; answer: string }[];
  /** The page's main content, scoped under .svc-<id>. */
  html: string;
};
