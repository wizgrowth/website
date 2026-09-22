type EnquiryButtonProps = {
  label: string;
  /** A goal the enquiry dialog knows: ai, seo, social, paid, website, unsure or academy. */
  goal?: string;
  /** Where the click came from, for analytics; the article slug on article pages. */
  source?: string;
  className?: string;
};

// Every call to action on the blog opens the shared enquiry dialog (bound by
// /journal/app.js through data-enquiry). Without JavaScript the link still
// reaches the contact section of the home page.
export function EnquiryButton({
  label,
  goal = 'unsure',
  source = 'journal',
  className = 'button black',
}: EnquiryButtonProps) {
  return (
    <a
      className={className}
      href="/#contact"
      data-enquiry={goal}
      data-source={source}
      {...(goal === 'academy' ? { 'data-academy-interest': '' } : {})}
    >
      {label}
      <span aria-hidden="true">↗</span>
    </a>
  );
}
