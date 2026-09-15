// Three deliberately modest, true numbers. There is no batch history and no
// placement record to quote, so none is quoted.
export function StatBand() {
  return (
    <section className="stat-band" aria-label="What we run">
      <div className="stat-band-inner">
        <div className="stat-cell">
          <p className="stat-big">3</p>
          <p className="stat-label">
            growth engines under one roof — SEO, demand generation and AI-citation optimization
            (GEO)
          </p>
          <span className="stat-source">The WizGrowth stack</span>
        </div>
        <div className="stat-cell">
          <p className="stat-big">0→1</p>
          <p className="stat-label">
            a B2B technology company taken from zero organic presence to consistent monthly inbound
            conversions
          </p>
          <span className="stat-source">Founder engagement · see Work</span>
        </div>
        <div className="stat-cell">
          <p className="stat-big">100%</p>
          <p className="stat-label">
            of public claims on this site carry a source. When client numbers clear review, you’ll
            see them here — sourced.
          </p>
          <span className="stat-source">The honesty doctrine</span>
        </div>
      </div>
    </section>
  );
}
