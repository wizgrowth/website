// WIZGROWTH / SERVICES — the behaviour of the six service pages, consolidated
// from the design hand-off (design/services/*.html). Every block checks for
// its own elements, so one script serves all pages.
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];

  // Reveal on scroll (also the SEO journey line and the web build stage).
  const revealed = $$('.reveal, .journey, .build-stage');
  if ('IntersectionObserver' in window) {
    const o = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); o.unobserve(e.target); } }), { threshold: 0.12, rootMargin: '0px 0px -20px' });
    revealed.forEach((el) => o.observe(el));
  } else revealed.forEach((el) => el.classList.add('in'));

  // Rotating example queries (SEO and AI heroes).
  const rotate = (el, items, every) => {
    if (!el || reduce) return;
    let i = 0;
    setInterval(() => {
      i = (i + 1) % items.length;
      el.animate([{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(-6px)' }], { duration: 200, fill: 'forwards' }).onfinish = () => {
        el.textContent = items[i];
        el.animate([{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 260, fill: 'forwards' });
      };
    }, every);
  };
  rotate($('[data-query]'), ['SEO agency for B2B SaaS', 'local SEO company Kochi', 'technical SEO help', 'SEO content strategy'], 3200);
  rotate($('[data-ai-query]'), ['Which agency can improve AI search visibility for a B2B brand?', 'What makes a brand easier for AI search to reference?', 'How do I measure visibility in AI-assisted search?'], 3600);

  // SEO: capability rows drive the sticky panel.
  const capData = {
    technical: ['FOUNDATION / 01', 'Make the site easy to crawl, understand and trust.', 'We audit indexing, crawl paths, speed, site structure, canonicals, structured data and the technical issues that can quietly suppress otherwise strong pages.', 'CRAWL / INDEX / STRUCTURE'],
    intent: ['DEMAND / 02', 'Target the searches that reveal real intent.', 'Keyword volume alone is not strategy. We group searches by the job the buyer is trying to do, then map those needs to pages that deserve to exist.', 'INTENT / DEMAND / MAPPING'],
    content: ['ANSWER / 03', 'Build the page a good search deserves.', 'We improve or create pages that answer the core question early, then add the depth, proof and context a serious buyer needs before taking the next step.', 'CONTENT / ANSWERS / PROOF'],
    authority: ['TRUST / 04', 'Give other sites a reason to reference you.', 'Authority comes from useful expertise, credible mentions, relevant citations, digital PR and assets worth linking to — not from buying volume.', 'PR / CITATIONS / LINKS'],
    local: ['PLACE / 05', 'Own the searches that happen close to home.', 'For local businesses, we connect Google Business Profile, location pages, reviews, citations and local intent so proximity is supported by relevance and trust.', 'LOCAL / GBP / REVIEWS'],
  };
  const capRows = $$('.cap-row');
  if (capRows.length) {
    const select = (row) => {
      capRows.forEach((r) => r.classList.toggle('active', r === row));
      const d = capData[row.dataset.cap];
      if (!d) return;
      $('#cap-kicker').textContent = d[0]; $('#cap-title').textContent = d[1]; $('#cap-copy').textContent = d[2];
      const micro = $('.cap-visual .micro span'); if (micro) micro.textContent = d[3];
    };
    capRows.forEach((row) => { row.addEventListener('mouseenter', () => select(row)); row.addEventListener('focus', () => select(row)); row.addEventListener('click', () => select(row)); });
  }

  // AI: buyer questions drive the visibility map.
  const queryData = [
    { q: 'Which AI search visibility agency should a B2B company consider?', a: 'Brands are more likely to be surfaced when their expertise is clear, corroborated and easy to retrieve across multiple trusted sources.', on: [0, 1, 3] },
    { q: 'Which CRM is a good fit for a 50-person sales team?', a: 'Comparison-style questions reward clear product definitions, practical criteria, first-party evidence and independent third-party validation.', on: [0, 2, 4] },
    { q: 'How does AI search visibility differ from SEO?', a: 'Clear definitions, well-structured explanations and consistent entity context help systems connect a brand with the right topic and question.', on: [0, 1, 2] },
    { q: 'Which option fits a company that already ranks well in Google?', a: 'When traditional visibility is strong, the next gap may be brand clarity, third-party corroboration, referenceable evidence or measurement across AI-assisted search.', on: [1, 2, 3, 4] },
  ];
  const queryButtons = $$('.query-btn');
  if (queryButtons.length) {
    const nodes = $$('.source-node');
    queryButtons.forEach((b, i) => b.addEventListener('click', () => {
      queryButtons.forEach((x, n) => x.classList.toggle('active', n === i));
      nodes.forEach((n, idx) => n.classList.toggle('on', queryData[i].on.includes(idx)));
      $('#map-question').textContent = queryData[i].q; $('#map-answer').textContent = queryData[i].a;
    }));
  }

  // Content: the typing line and the editorial desk tabs.
  const typed = $('[data-type]');
  if (typed && !reduce) {
    const words = ['What should a buyer understand before choosing you?', 'What would a practitioner actually send to a client?', 'What is missing from the answers already ranking?'];
    let wi = 0, ci = 0, del = false;
    (function type() {
      const w = words[wi];
      if (!del) { ci++; typed.textContent = w.slice(0, ci); if (ci === w.length) { del = true; setTimeout(type, 1500); return; } }
      else { ci--; typed.textContent = w.slice(0, ci); if (ci === 0) { del = false; wi = (wi + 1) % words.length; } }
      setTimeout(type, del ? 24 : 43);
    })();
  } else if (typed) typed.textContent = 'What should a buyer understand before choosing you?';
  const deskData = {
    question: ['QUESTION / 01', 'Start with what your buyer is actually trying to solve.', 'We mine search demand, sales conversations, support questions and competitor gaps to find questions that deserve a page. The topic is only useful when it connects to a real decision.'],
    angle: ['ANGLE / 02', 'Give the question a point of view worth remembering.', 'A useful page needs more than coverage. We decide what the piece should argue, clarify or simplify so it earns attention instead of repeating the average answer.'],
    evidence: ['EVIDENCE / 03', 'Collect proof before prose.', 'Practitioner input, first-party examples, named sources and original observations are assembled before drafting so the article has something real to say.'],
    draft: ['DRAFT / 04', 'Answer early. Then earn the depth.', 'The draft gives the core answer quickly, then adds examples, nuance, objections and internal links without padding the page to hit a word count.'],
    edit: ['EDIT / 05', 'Remove anything that sounds borrowed.', 'Human editing checks accuracy, rhythm, brand voice, claims, sourcing and whether a practitioner would be comfortable putting their name on the page.'],
    refresh: ['REFRESH / 06', 'Treat publishing as the beginning, not the finish.', 'Pages with traction get revisited with fresh evidence, stronger links, clearer answers and new context so useful content stays useful.'],
  };
  $$('[data-editor]').forEach((b) => b.addEventListener('click', () => {
    $$('[data-editor]').forEach((x) => x.classList.toggle('active', x === b));
    const d = deskData[b.dataset.editor]; if (!d) return;
    $('#paper-kicker').textContent = d[0]; $('#paper-title').textContent = d[1]; $('#paper-copy').textContent = d[2];
  }));

  // Demand: lead dots travel the funnel path.
  const pipePath = $('.pipe path'), dots = [$('.d1'), $('.d2'), $('.d3')];
  if (pipePath && dots.every(Boolean) && !reduce && pipePath.getTotalLength) {
    const len = pipePath.getTotalLength(); const start = performance.now();
    (function tick(now) {
      const t = (now - start) / 5200;
      dots.forEach((d, i) => { const p = (t + i * 0.24) % 1; const pt = pipePath.getPointAtLength(len * p); d.setAttribute('cx', pt.x); d.setAttribute('cy', pt.y); });
      requestAnimationFrame(tick);
    })(start);
  }
})();
