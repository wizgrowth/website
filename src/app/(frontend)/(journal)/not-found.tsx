import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="shell j-missing">
      <span className="j-label">PAGE NOT FOUND</span>
      <h1>
        That article has <span>moved on.</span>
      </h1>
      <p>
        It may have been renamed or retired. The blog index has everything that is live, and the
        search there is the quickest way to find what you were after.
      </p>
      <h2 className="sr-only">Where to go next</h2>
      <Link className="button black" href="/blog/">
        Browse the blog <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}
