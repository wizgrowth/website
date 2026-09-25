// The site-wide footer (the home page's markup) needs its rules from
// fresh.css: every rule whose selector mentions the footer, lifted out of that
// sheet including the ones inside media queries. Shared by the academy and
// services generators.
export function footerRules(source) {
  const wanted = /\.site-footer|\.footer-|\.signature-|\.review-|\.social-icons|\.clutch-dot|\.trust-star|#back-top|\.solid-icon|\.brand(?![\w-])/;
  const blocks = [];
  function walk(text, prelude) {
    let i = 0;
    while (i < text.length) {
      const open = text.indexOf('{', i);
      if (open < 0) break;
      const selector = text.slice(i, open).trim();
      let depth = 1, j = open + 1;
      while (j < text.length && depth) { if (text[j] === '{') depth++; else if (text[j] === '}') depth--; j++; }
      const body = text.slice(open + 1, j - 1);
      if (selector.startsWith('@media')) walk(body, selector);
      else if (!selector.startsWith('@') && wanted.test(selector)) blocks.push(prelude ? `${prelude}{${selector}{${body}}}` : `${selector}{${body}}`);
      i = j;
    }
  }
  walk(source.replace(/\/\*[\s\S]*?\*\//g, ''), '');
  return blocks.join('\n');
}

// What the lifted rules assume from fresh.css but do not carry: the design
// tokens, the base resets and the .shell width. Scoped to the footer so it
// works on any stylesheet without leaking into the page.
export const footerBase = `#site-footer{--ink:#10120f;--paper:#fff;--lime:#c5f86b;--lilac:#c3b9fb;--muted:#667063;--line:#dfe3dd;--dark-line:#353b31;--ease:cubic-bezier(.2,.8,.2,1);--gutter:clamp(22px,4.4vw,76px);--font:Arial,Helvetica,sans-serif;--mono:"Courier New",monospace;font-family:var(--font);color:#fff;background:var(--ink);-webkit-font-smoothing:antialiased}
#site-footer *{box-sizing:border-box}#site-footer a{color:inherit;text-decoration:none}#site-footer button{font:inherit;color:inherit;border:0;background:none;cursor:pointer;padding:0}#site-footer svg{display:block}#site-footer ul,#site-footer dl,#site-footer dd{list-style:none;margin:0;padding:0}#site-footer h3,#site-footer p,#site-footer blockquote{margin:0}#site-footer h3{font-weight:500}#site-footer address{font-style:normal}
#site-footer .shell{max-width:1680px;margin:auto;padding-inline:var(--gutter)}#site-footer .eyebrow{font:11px/1.5 var(--mono);letter-spacing:.08em;text-transform:uppercase}#site-footer .arrow{width:20px;height:20px;stroke:currentColor;stroke-width:1.7;fill:none}#site-footer .mark{width:32px;height:32px;fill:currentColor}
`;
