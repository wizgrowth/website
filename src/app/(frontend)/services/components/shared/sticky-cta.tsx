import Link from 'next/link';

// Money pages get a fixed call to action on phones; hidden on wider screens.
export function StickyCta() {
  return (
    <div className="wg-sticky">
      <p>Free 30-minute call · targets in writing before you commit</p>
      <Link href="/contact/" className="wg-btn">
        Book a growth call
      </Link>
    </div>
  );
}
