export const SITE_URL = process.env.NEXT_PUBLIC_SITE_DOMAIN ?? 'https://www.wizgrowth.com';
export const CANONICAL_ORIGIN = 'https://www.wizgrowth.com';
export const ORG_ID = `${CANONICAL_ORIGIN}/#organization`;

export const CONTACT = {
  phoneDisplay: '+91 79075 51261',
  phoneHref: 'tel:+917907551261',
  email: 'marketing@wizgrowth.com',
  emailHref: 'mailto:marketing@wizgrowth.com',
  whatsappBase: 'https://wa.me/917907551261',
};

/** A WhatsApp deep link with a pre-filled first message. */
export function wa(message: string) {
  return `${CONTACT.whatsappBase}?text=${encodeURIComponent(message)}`;
}

export const WA_GROWTH = wa('Hi WizGrowth — I’d like to talk about growing my business.');
export const WA_BOOK_CALL = wa("Hi WizGrowth — I'd like to book a growth call.");
export const WA_ACADEMY_DETAILS = wa(
  "Hi WizGrowth Academy — I'd like details about the next batch.",
);
export const WA_ACADEMY_JOIN = wa("Hi WizGrowth Academy — I'd like to join the next batch.");
export const WA_ACADEMY_SYLLABUS = wa('Hi WizGrowth Academy — please send me the syllabus.');
export const WA_ACADEMY_QUESTION = wa(
  'Hi WizGrowth Academy — I have a question about the programme.',
);
export const WA_ACADEMY_MORE = wa("Hi, I'd like to know more about WizGrowth Academy");
export const WA_CAREER_REVIEW = wa('Hi WizGrowth — I’d like a career review.');

// The fee, duration and cadence appear on the academy page, in its schema,
// on the home page and in article CTAs. One place to change them.
export const ACADEMY = {
  fee: '₹30,000',
  feeNumber: '30000',
  weeks: 12,
  cadence: 'a new batch every month',
};
