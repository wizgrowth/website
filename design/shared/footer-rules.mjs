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
