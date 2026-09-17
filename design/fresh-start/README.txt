WIZGROWTH / INTERACTIVE ENQUIRY UPDATE

OPEN
Double-click WizGrowth-Interactive-Enquiry.html for the self-contained version.
The editable project contains index.html, styles.css and app.js. Keep them together.
No libraries, images, web fonts, build step or external rendering dependency is required.

CHANGES
- The Little Wiz card headed "Give people a reason to join in." keeps its supplied
  text and now points to https://www.wizgrowth.com/services/ai-citations/.
- Its CTA now reads "See the AI visibility service". The AI card opens the same
  service page. SEO continues to open the existing search service section.
- The plain lead form is replaced by a three-step, responsive enquiry studio:
  goals, business context, contact details, followed by a review screen.
- Multi-select goals, academy interest, writing prompts, timing choices, validation,
  progress navigation, Little Wiz reactions and reduced-motion support are included.
- The approved header, hero artwork, colours, page sections, One Direction animation,
  Search Effect, footer, social links and badge state have been retained.

HAND-OFF / IMPORTANT
This is a front-end prototype, not a hosted submission service.
No enquiry is sent automatically and there is no CRM, database or email backend.
No form answers are persisted in localStorage or sent to analytics.
In-page answers remain until reset or page reload.
The review screen prepares:
  WhatsApp draft: +91 79075 51261
  Email draft: marketing@wizgrowth.com
Visitors review and send in the chosen app. WhatsApp requires access to WhatsApp;
email requires a configured email application. Copy and text-download fallbacks
are included. Links include the visitor's entered details only when explicitly opened.
No production contact was sent during testing.

TO CONNECT A BACKEND
The enquiry controller is initLeadStudio() in app.js. Implement a server-side
submission endpoint separately with validation, spam prevention, consent/privacy
handling, rate limits and delivery-error feedback. Never place private API keys
in this HTML or client-side JavaScript. Show a sent confirmation only after the
backend confirms delivery/acceptance.

TESTING
Tested in local Chromium by rendering the HTML directly, at viewport widths
320, 390, 768, 1024, 1440 and 1920 pixels. Includes keyboard focus containment,
Escape, validation, selected goals, draft review, link encoding, local download,
copy fallback, reopening, reset, academy entry and reduced motion.
The output does not modify the live website.

TRUSTPILOT
The confirmed profile https://www.trustpilot.com/review/wizgrowth.com is linked
in the footer badge and in SITE_PROFILES. No star rating is shown or invented.

WHATSAPP
A fixed "Chat on WhatsApp" button sits bottom-right on every screen size; the
motion control moved to the bottom-left to make room.
