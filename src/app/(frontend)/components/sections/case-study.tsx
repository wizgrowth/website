import Link from 'next/link';

export function CaseStudy() {
  return (
    <section className="shell section" aria-labelledby="work-h">
      <div className="sec-head">
        <p className="microlabel green">Founder engagement · B2B technology services</p>
        <h2 id="work-h">
          Proof beats <span className="fx">promises</span>
        </h2>
      </div>
      <div className="case-card">
        <div>
          <p className="microlabel">Flagship engagement · name in clearance</p>
          <h3>From zero to a compounding inbound engine</h3>
          <p className="case-body">
            A complete marketing funnel built from scratch for a B2B technology services company:
            SEO foundations, content engineered to be cited, and Google Ads for immediate pipeline.
            Now producing consistent monthly organic conversions — with ChatGPT and Perplexity
            naming the brand in buyer-intent answers.
          </p>
          <Link className="btn btn-quiet" style={{ paddingLeft: 0 }} href="/work/">
            Read the full story
          </Link>
        </div>
        <div className="case-stat">
          <p className="stat-big">0→1</p>
          <span className="stat-source">Zero to monthly inbound — organic, AI-cited and paid</span>
        </div>
      </div>
    </section>
  );
}
