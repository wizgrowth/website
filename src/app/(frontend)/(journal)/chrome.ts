import { HOME_MARKUP } from '../home-markup';

// The blog shares the home page's footer, WhatsApp button and enquiry dialog.
// They are lifted out of the approved home markup here (the design hand-off
// did the same from its reference page) so the two can never drift apart. The
// home page's in-page anchors become links back to the home page, and its
// contact buttons become links that the blog's script turns into the dialog.

function pick(pattern: RegExp, name: string) {
  const match = HOME_MARKUP.match(pattern);
  if (!match) throw new Error(`home markup no longer contains the ${name}`);
  return match[0];
}

const ARROW = '<svg class="arrow" aria-hidden="true"><use href="#arrow-up"/></svg>';

export const SYMBOLS = pick(/<svg width="0" height="0"[\s\S]*?<\/svg>/, 'SVG symbol definitions');

export const FOOTER = pick(/<footer class="site-footer[\s\S]*?<\/footer>/, 'footer')
  .replaceAll('href="#top"', 'href="/"')
  .replaceAll('href="#expertise"', 'href="/#expertise"')
  .replaceAll('href="#about"', 'href="/#about"')
  .replaceAll('href="#approach"', 'href="/#approach"')
  .replaceAll('href="#academy"', 'href="/#academy"')
  .replace('<a href="/blog/">Journal</a>', '<a href="/blog/" aria-current="page">Journal</a>')
  .replace(
    /<button type="button" data-contact>[\s\S]*?<\/button>/g,
    `<a href="/#contact" data-enquiry="unsure" data-source="journal">Let's talk ${ARROW}</a>`,
  );

export const CONTACT_DIALOG = pick(/<dialog id="contact-dialog"[\s\S]*?<\/dialog>/, 'contact dialog');

export const CHAT_WA = pick(/<a class="chat-wa"[\s\S]*?<\/a>/, 'WhatsApp button');
