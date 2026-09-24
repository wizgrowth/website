export type AcademyPage = {
  url: string;
  title: string;
  description: string;
  /** The design's JSON-LD (a @graph), emitted as-is beside the breadcrumb list. */
  schema: unknown;
  /** What Little Wiz says in the hero, rotated by /academy/app.js. */
  wizMessages: string[];
  /** Header, main and footer, as in the design file. */
  html: string;
};
