// The global 404 catches URLs that match no route at all. It deliberately
// imports no global stylesheet: anything imported here is injected on every
// page of the site, and the two design systems' stylesheets must never meet.
// Its styles are scoped to this page under .nf-*. Pages inside the site render
// src/app/(frontend)/(site)/not-found.tsx instead, with the full chrome.
export const metadata = {
  title: 'Page not found',
  description: 'Page not found',
  openGraph: {
    title: 'Page not found',
    description: 'Page not found',
    type: 'website',
  },
};

const CSS = `
.nf-wrap{min-height:100vh;display:flex;flex-direction:column;justify-content:center;
  background:#10120f;color:#fff;font-family:Arial,Helvetica,sans-serif;
  padding:64px clamp(22px,6vw,76px);box-sizing:border-box}
.nf-brand{font-size:26px;font-weight:700;letter-spacing:-1.5px;color:#fff;text-decoration:none;
  display:inline-block;margin-bottom:auto}
.nf-brand span{color:#c5f86b}
.nf-code{font-size:clamp(72px,17vw,190px);line-height:.95;letter-spacing:-.075em;font-weight:700;
  margin:48px 0 0;color:#c5f86b}
.nf-title{font-size:clamp(26px,4vw,44px);line-height:1.1;letter-spacing:-.05em;font-weight:500;
  margin:18px 0 0;max-width:18ch}
.nf-lead{font-size:17px;line-height:1.7;color:#bfc6b9;margin:20px 0 0;max-width:46ch}
.nf-actions{display:flex;flex-wrap:wrap;gap:14px;margin:34px 0 auto}
.nf-btn{display:inline-flex;align-items:center;min-height:54px;padding:0 24px;border-radius:2px;
  font-size:15px;font-weight:600;text-decoration:none;border:1px solid transparent}
.nf-btn-lime{background:#c5f86b;color:#10120f}
.nf-btn-ghost{border-color:#4c5343;color:#fff}
.nf-btn:focus-visible{outline:3px solid #c3b9fb;outline-offset:4px}
.nf-foot{margin-top:56px;padding-top:22px;border-top:1px solid #353b31;
  font:11px "Courier New",monospace;letter-spacing:.08em;text-transform:uppercase;color:#9fa996}
`;

export default function RootNotFound() {
  return (
    <div className="nf-wrap">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <a className="nf-brand" href="/">
        wiz<span>growth</span>
      </a>
      <p className="nf-code">404</p>
      <h1 className="nf-title">This page isn’t here.</h1>
      <p className="nf-lead">
        The link may be out of date, or the page may have moved. The work is all still here — start
        from the home page, or tell us what you were looking for.
      </p>
      <div className="nf-actions">
        <a className="nf-btn nf-btn-lime" href="/">
          Back to home
        </a>
        <a className="nf-btn nf-btn-ghost" href="/contact/">
          Talk to us
        </a>
      </div>
      <p className="nf-foot">WizGrowth · Kochi, Kerala</p>
    </div>
  );
}
