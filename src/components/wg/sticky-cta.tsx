import Link from 'next/link';

type StickyCtaProps = {
  reassure: string;
  href: string;
  label: string;
};

// The reference toggles this with body.has-sticky. Pages cannot set body
// classes in Next, so the same two rules ship inline with the bar.
export function StickyCta({ reassure, href, label }: StickyCtaProps) {
  const external = href.startsWith('http');
  return (
    <>
      <style>{`@media (max-width:768px){body{padding-bottom:96px}.float-wa{display:none}}`}</style>
      <div className="sticky-cta">
        <p className="reassure">{reassure}</p>
        {external ? (
          <a href={href} className="btn">
            {label}
          </a>
        ) : (
          <Link href={href} className="btn">
            {label}
          </Link>
        )}
      </div>
    </>
  );
}
