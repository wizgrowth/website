export default function NotFound() {
  return (
    <main>
      <section className="section">
        <div className="shell">
          <div className="section-head">
            <span className="eyebrow">PAGE NOT FOUND</span>
          </div>
          <h1 className="display">
            That page has <span className="muted">moved on.</span>
          </h1>
          <p className="lede">The academy has four pages. The overview lists every course.</p>
          <p>
            <a className="button dark" href="/academy/">
              Back to the academy
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
