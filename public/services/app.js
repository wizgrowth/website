// WIZGROWTH / SERVICES — the behaviour of the six service pages, consolidated
// from the design hand-off (design/services/*.html). Every block checks for
// its own elements, so one script serves all pages.
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];

  // Reveal on scroll (also the SEO journey line and the web build stage).
  const revealed = $$('.reveal, .journey, .build-stage, .system');
  if ('IntersectionObserver' in window) {
    const o = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); o.unobserve(e.target); } }), { threshold: 0.12, rootMargin: '0px 0px -20px' });
    // Blocks already on screen stay visible (the hero is usually the LCP element); the rest hide until scrolled to.
    const fold = window.innerHeight;
    revealed.forEach((el) => { if (el.classList.contains('reveal') && el.getBoundingClientRect().top > fold) el.classList.add('pre'); o.observe(el); });
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

// Services hub: the growth check, the service workbench and the problem chooser.
(() => {
  const triage = document.querySelector('[data-triage]');
  if (triage && triage.querySelector('[data-triage-key]')) {
    const choices = [...triage.querySelectorAll('[data-triage-key]')];
    const stages = [...triage.querySelectorAll('[data-stage]')];
    const pulse = triage.querySelector('[data-journey-pulse]');
    const status = triage.querySelector('[data-triage-status]');
    const data = {
      found: { service: 'SEO', support: 'CONTENT MARKETING', why: 'Existing demand is there, but your pages are not visible enough at the moment of intent.', stages: [0], inspect: ['Indexing and technical health', 'Queries already generating impressions', 'Page and intent gaps'], link: '/services/seo/', cta: 'See the SEO approach' },
      ai: { service: 'AI SEARCH VISIBILITY', support: 'SEO', why: 'Your brand may exist online, but AI-assisted search may not find enough clear, consistent evidence to reference it confidently.', stages: [0, 2], inspect: ['Buyer questions where competitors get named', 'Entity consistency across public sources', 'Evidence, mentions and citations already available'], link: '/services/ai-search-visibility/', cta: 'See AI Search Visibility' },
      paid: { service: 'DEMAND GENERATION', support: 'WEB DEVELOPMENT', why: 'The bottleneck is not necessarily more spend. It is knowing which audience, message and landing experience creates qualified pipeline.', stages: [0, 3], inspect: ['Conversion tracking before spend', 'Cost per qualified lead by campaign', 'Landing-page drop-off and offer clarity'], link: '/services/demand-generation/', cta: 'See Demand Generation' },
      message: { service: 'CONTENT MARKETING', support: 'SEO', why: 'You have expertise, but it is not yet packaged around the questions buyers actually ask and the evidence they need to trust the answer.', stages: [1, 2], inspect: ['High-value buyer questions', 'Existing expertise that is buried or fragmented', 'Content gaps across search and AI discovery'], link: '/services/content-marketing/', cta: 'See Content Marketing' },
      social: { service: 'SOCIAL MEDIA', support: 'CONTENT MARKETING', why: 'Publishing is happening, but the content system may not be creating enough relevance, response or repeat attention.', stages: [1, 2], inspect: ['Which posts start actual conversations', 'Content themes buyers return to', 'Response and community patterns, not likes alone'], link: '/services/social-media-marketing/', cta: 'See Social Media' },
      site: { service: 'WEB DEVELOPMENT', support: 'CONTENT MARKETING', why: 'Attention is arriving, but the website may be making the offer hard to understand, trust or act on.', stages: [1, 2, 3], inspect: ['Where visitors abandon the journey', 'Clarity of the offer and next action', 'Speed, tracking and conversion friction'], link: '/services/web-development/', cta: 'See Web Development' },
    };
    const select = (key) => {
      const d = data[key]; if (!d) return;
      choices.forEach((b) => { const on = b.dataset.triageKey === key; b.classList.toggle('active', on); b.setAttribute('aria-pressed', String(on)); });
      stages.forEach((s, i) => s.classList.toggle('active', d.stages.includes(i)));
      const last = Math.max(...d.stages), positions = [7, 35.7, 64.3, 93];
      pulse.style.left = positions[last] + '%';
      status.textContent = 'BOTTLENECK · ' + stages[last].textContent.trim();
      triage.querySelector('[data-result-service]').textContent = d.service;
      triage.querySelector('[data-result-why]').textContent = d.why;
      triage.querySelector('[data-result-support]').textContent = 'SUPPORTING MOVE · ' + d.support;
      [1, 2, 3].forEach((n, i) => { triage.querySelector('[data-inspect-' + n + ']').textContent = d.inspect[i]; });
      const link = triage.querySelector('[data-result-link]'); link.href = d.link; link.firstChild.textContent = d.cta + ' ';
      triage.classList.remove('changing'); void triage.offsetWidth; triage.classList.add('changing');
    };
    choices.forEach((b) => b.addEventListener('click', () => select(b.dataset.triageKey)));
    select('found');
  }

  const services = {
    seo: { k: '01 / ORGANIC SEARCH', t: 'Be found when intent is already there.', c: 'Technical SEO, search intent, useful pages, local visibility and authority — built around qualified discovery rather than vanity rankings.', m: 'SEARCH → ANSWER → TRUST → ENQUIRY', l: 'See SEO', u: '/services/seo/', w: ['QUERY', 'PAGE', 'TRUST', 'ENQUIRY'] },
    ai: { k: '02 / AI SEARCH VISIBILITY', t: 'Become easier to retrieve, understand and reference.', c: 'Clearer entities, useful answers, first-party evidence, third-party authority and measurement across AI-assisted search experiences.', m: 'QUESTION → SOURCES → SIGNALS → CITATION', l: 'See AI Search Visibility', u: '/services/ai-search-visibility/', w: ['QUESTION', 'SOURCES', 'SIGNALS', 'CITATION'] },
    demand: { k: '03 / DEMAND GENERATION', t: 'Turn paid attention into a measurable learning loop.', c: 'Tracking, media, landing pages, creative testing and optimisation connected to lead cost, pipeline and revenue.', m: 'ATTENTION → CLICK → LEAD → PIPELINE', l: 'See Demand Generation', u: '/services/demand-generation/', w: ['ATTENTION', 'CLICK', 'LEAD', 'PIPELINE'] },
    content: { k: '04 / CONTENT MARKETING', t: 'Turn expertise into something buyers can find and use.', c: 'Question research, editorial strategy, evidence-led production, optimisation and refreshes designed for search, AI and human readers.', m: 'QUESTION → ANGLE → EVIDENCE → PUBLISH', l: 'See Content Marketing', u: '/services/content-marketing/', w: ['QUESTION', 'ANGLE', 'EVIDENCE', 'PUBLISH'] },
    social: { k: '05 / SOCIAL MEDIA', t: 'Make the brand easier to notice, remember and talk to.', c: 'A consistent content system, platform-native creative and community management built around conversations rather than filler.', m: 'PUBLISH → LISTEN → REPLY → LEARN', l: 'See Social Media', u: '/services/social-media-marketing/', w: ['PUBLISH', 'LISTEN', 'REPLY', 'LEARN'] },
    web: { k: '06 / WEB DEVELOPMENT', t: 'Turn attention into a clearer next step.', c: 'Conversion-first structure, fast development, SEO foundations, analytics and a site your team can actually own after launch.', m: 'LAND → UNDERSTAND → TRUST → ACT', l: 'See Web Development', u: '/services/web-development/', w: ['LAND', 'UNDERSTAND', 'TRUST', 'ACT'] },
  };
  const rows = [...document.querySelectorAll('.service-row')];
  if (rows.length) {
    const selectService = (row) => {
      rows.forEach((r) => { const active = r === row; r.classList.toggle('active', active); r.setAttribute('aria-selected', String(active)); });
      const d = services[row.dataset.service]; if (!d) return;
      document.getElementById('stage-kicker').textContent = d.k; document.getElementById('stage-title').textContent = d.t; document.getElementById('stage-copy').textContent = d.c; document.getElementById('stage-meta').textContent = d.m;
      const link = document.getElementById('stage-link'); link.href = d.u; link.firstChild.textContent = d.l + ' ';
      d.w.forEach((v, i) => { document.getElementById('word' + (i + 1)).textContent = v; });
      const line = document.querySelector('.pulse-line'); if (line && line.animate) line.animate([{ opacity: 0.4 }, { opacity: 1 }], { duration: 380 });
    };
    rows.forEach((r) => { r.addEventListener('mouseenter', () => selectService(r)); r.addEventListener('focus', () => selectService(r)); r.addEventListener('click', () => selectService(r)); });
  }

  const problems = {
    found: ['SEO owns the gap between existing search demand and your visibility.', 'See the SEO approach', '/services/seo/'],
    ai: ['AI Search Visibility owns the gap between what your brand knows and what AI-assisted search can confidently retrieve and reference.', 'See AI Search Visibility', '/services/ai-search-visibility/'],
    paid: ['Demand Generation owns the gap between paid attention and a lead economics model you can trust.', 'See Demand Generation', '/services/demand-generation/'],
    message: ['Content Marketing owns the gap between your expertise and the questions your market actually asks.', 'See Content Marketing', '/services/content-marketing/'],
    social: ['Social Media owns the gap between publishing activity and real audience conversation.', 'See Social Media', '/services/social-media-marketing/'],
    site: ['Web Development owns the gap between traffic arriving and a visitor understanding, trusting and taking the next step.', 'See Web Development', '/services/web-development/'],
  };
  const problemEls = [...document.querySelectorAll('.problem')];
  if (problemEls.length) {
    const selectProblem = (el) => {
      problemEls.forEach((p) => p.classList.toggle('active', p === el));
      const d = problems[el.dataset.problem]; if (!d) return;
      document.getElementById('problem-note').textContent = d[0];
      const a = document.getElementById('problem-link'); a.href = d[2]; a.firstChild.textContent = d[1] + ' ';
    };
    problemEls.forEach((el) => { el.addEventListener('click', () => selectProblem(el)); el.addEventListener('mouseenter', () => selectProblem(el)); el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectProblem(el); } }); });
  }
})();

// Marketing consultation: the situation picker in the hero.
(() => {
  const title = document.getElementById('triage-title'), copy = document.getElementById('triage-copy'), list = document.getElementById('triage-list');
  if (!title || !copy || !list) return;
  const triage = {
    revenue: { title: 'Fix the measurement picture before changing spend.', copy: 'If reports and revenue disagree, the first job is to check conversion definitions, attribution and CRM handoff before making channel decisions.', checks: ['Conversion tracking', 'Revenue / CRM handoff', 'Channel contribution'] },
    spend: { title: 'Find whether the leak is media, message or landing page.', copy: 'Rising spend is not automatically an ad-platform problem. We would separate traffic quality, creative fatigue, landing-page conversion and lead quality before moving budget.', checks: ['Cost per qualified lead', 'Landing-page conversion', 'Lead quality by source'] },
    hire: { title: 'Define the job before you hire the person or agency.', copy: 'Before signing a retainer or hiring a lead, we would make the target, measurement model, channel priorities and 90-day responsibilities explicit.', checks: ['Growth target', 'Channel ownership', 'Reporting standard'] },
    second: { title: 'Audit the work without assuming the agency is the problem.', copy: 'A second opinion should test the numbers, strategy and execution. If the current agency is doing good work, that is a useful answer too.', checks: ['Scope vs delivery', 'Reporting accuracy', 'Commercial impact'] },
  };
  const buttons = [...document.querySelectorAll('.triage-choice[data-triage]')];
  buttons.forEach((button) => button.addEventListener('click', () => {
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
    const d = triage[button.dataset.triage]; if (!d) return;
    title.textContent = d.title; copy.textContent = d.copy;
    list.replaceChildren(...d.checks.map((x) => { const li = document.createElement('li'); li.textContent = x; return li; }));
  }));
})();
