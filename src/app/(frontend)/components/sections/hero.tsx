import Link from 'next/link';

export function Hero() {
  return (
    <header className="shell hero">
      <p className="microlabel green">Agency + Academy · Kochi, Kerala</p>
      <h1>
        Growth you can <span className="fx">audit,</span> taught by people who do it
      </h1>
      <p className="lead">
        WizGrowth is a growth marketing agency and academy based in Kochi. We grow brands three
        ways — SEO, demand generation, and AI citations that get you named when buyers ask ChatGPT,
        Perplexity or Google’s AI answers — for clients across India and beyond. The academy trains
        the next generation of marketers on the same live work.
      </p>
      <div className="hero-ctas">
        <Link href="/contact/" className="btn btn-primary">
          Book a growth call
        </Link>
        <Link href="/academy/" className="btn btn-secondary">
          Explore the academy
        </Link>
      </div>
      <p className="hero-note">
        SEO growth · Demand generation · AI citations — reported monthly, misses included
      </p>
    </header>
  );
}
