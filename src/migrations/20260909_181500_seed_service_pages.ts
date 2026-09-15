import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'

// Seeds the seven service pages. Content is written through the Local API
// rather than raw SQL so the array tables, ordering and richtext shape are
// produced by Payload itself. Everything here is editable in the admin panel
// afterwards; this only creates pages that do not already exist.

type Run = { text: string; italic?: boolean; href?: string }

const txt = (text: string, italic?: boolean) => ({
  type: 'text',
  version: 1,
  detail: 0,
  format: italic ? 2 : 0,
  mode: 'normal',
  style: '',
  text,
})

const run = (r: Run) =>
  r.href
    ? {
        type: 'link',
        version: 3,
        direction: 'ltr',
        format: '',
        indent: 0,
        fields: { linkType: 'custom', url: r.href, newTab: false },
        children: [txt(r.text)],
      }
    : txt(r.text, r.italic)

const para = (runs: Run[]) => ({
  type: 'paragraph',
  version: 1,
  direction: 'ltr',
  format: '',
  indent: 0,
  textFormat: 0,
  children: runs.map(run),
})

const richText = (paras: Run[][]) => ({
  root: {
    type: 'root',
    version: 1,
    direction: 'ltr',
    format: '',
    indent: 0,
    children: paras.map(para),
  },
})

const SERVICES = [
  {
    order: 1,
    slug: 'seo',
    name: 'SEO',
    metaTitle: 'SEO Services in Kochi, Kerala — WizGrowth',
    metaDescription:
      'SEO that ranks for searches that buy: technical health, answer-first content, earned links. For brands in Kerala, across India and beyond. Timelines in writing.',
    h1: 'SEO that ranks for searches that',
    h1Accent: 'buy',
    lead: 'Not vanity keywords — enquiries. WizGrowth runs search engine optimization as technical health, content that answers the real query, and links earned by being worth citing. For brands in Kochi, across India, and anywhere Google serves your customers.',
    card: 'Rank for searches that buy, not vanity keywords. Technical health, content that answers the real query, and links earned by being worth citing.',
    cardCta: 'How we run SEO',
    steps: [
      ['Audit and baseline.', 'A full technical crawl, Search Console review, and a keyword and competitor map. You see the same dashboard we do, from day one.'],
      ['Fix the foundations.', 'Speed, indexing, site structure, structured data. Rankings built on a broken site don’t hold.'],
      ['Build answer-first content.', 'Pages written to answer the query completely in the first sixty words — the format Google’s featured snippets and AI Overviews lift.'],
      ['Earn authority.', 'Digital PR, local citations, and original data other sites have to reference. No bought links, ever.'],
      ['Report monthly.', 'Rankings, traffic, and enquiries — with the misses named alongside the wins.'],
    ],
    includes: [
      'Technical audit and fixes',
      'Keyword and competitor strategy',
      'On-page optimization and schema markup',
      'Content briefs or full production',
      'Local SEO and Google Business Profile',
      'AEO groundwork — answer-first structure engines can lift',
      'Monthly reporting call',
    ],
    honesty: [
      [
        {
          text: 'Early movement typically shows in six to eight weeks; meaningful traffic takes three to six months, depending on where your site starts. Anyone promising page one in a week is guessing — we put timelines and targets in writing instead, after a free growth call.',
        },
      ],
      [
        { text: 'Ranking is only half of modern search: the other half is being ' },
        { text: 'named', italic: true },
        { text: ' inside AI answers, which is its own discipline — see ' },
        { text: 'AI citations (GEO & AEO)', href: '/services/ai-citations/' },
        { text: '. We wrote up exactly how Google discovers and indexes pages in our ' },
        { text: 'practical guide to Google crawling', href: '/blog/how-google-crawls-website/' },
        { text: ', and how local businesses in Kerala should approach it in our ' },
        { text: 'local SEO guide', href: '/blog/local-seo-kerala-businesses/' },
        { text: '.' },
      ],
    ],
    faqs: [
      ['How long does SEO take to show results?', 'Paid ads produce data in days; SEO compounds. Expect early movement in six to eight weeks and meaningful traffic in three to six months, depending on your site’s starting point and competition.'],
      ['Do you guarantee rankings?', 'No — nobody controls Google, and anyone who guarantees position one is selling you a story. We guarantee the work, transparent reporting, and agreed targets in writing.'],
      ['Do you do local SEO for Kochi and Kerala businesses?', 'Yes — Google Business Profile, local content and citations are part of the service. Our local SEO guide for Kerala businesses shows how we think.'],
      ['What does SEO cost at WizGrowth?', 'It’s a monthly retainer scoped on a free growth call — the price depends on your site’s state and your market’s competition. Scope, targets and timelines go in writing before you commit.'],
    ],
  },
  {
    order: 2,
    slug: 'ai-citations',
    name: 'AI citations (GEO & AEO)',
    metaTitle: 'AI Citation & GEO Agency — Get Cited by ChatGPT | WizGrowth',
    metaDescription:
      'Generative engine optimization (GEO) and answer engine optimization (AEO): make your brand the source ChatGPT, Perplexity and Google AI Overviews cite when buyers ask.',
    h1: 'Be the brand AI engines',
    h1Accent: 'cite',
    lead: 'When buyers ask ChatGPT, Perplexity or Google’s AI Overviews who to hire or what to buy, the engines answer by naming sources. We make you that source — with entity engineering, citable content and original data. It’s the search channel most of your competitors haven’t noticed yet.',
    card: 'Be the brand ChatGPT, Perplexity and Google’s AI Overviews name when buyers ask. Entity engineering, citable content, monthly citation tracking.',
    cardCta: 'How we earn citations',
    steps: [
      ['Citation audit.', 'We ask the engines the questions your buyers actually ask and log who gets named — you see exactly where you stand against competitors before we begin.'],
      ['Entity engineering.', 'One consistent brand definition across your site, schema, profiles and directories — plus llms.txt and structured data done properly — so engines consolidate who you are.'],
      ['Citable content.', 'Answer-first pages, definitions, comparisons and FAQs engineered in the format AI Overviews and chat answers actually lift.'],
      ['Original data.', 'Reports and statistics that exist nowhere else force citations — an engine has to name the source of a number.'],
      ['Presence where engines read.', 'Directories, reviews, communities and digital PR — the third-party sources AI systems trust get seeded and maintained.'],
      ['Monthly citation tracking.', 'The ten buyer questions that matter, asked across ChatGPT, Perplexity, Gemini and AI Overviews every month — logged, trended and reported with your AI-referral traffic.'],
    ],
    includes: [
      'Citation baseline audit',
      'Entity and schema engineering',
      'llms.txt and technical GEO setup',
      'Answer-first content production',
      'Original data assets and reports',
      'Monthly citation tracking + AI-referral reporting',
    ],
    honesty: [
      [
        { text: 'GEO is early, and anyone promising “guaranteed number one in ChatGPT” is guessing — nobody controls the models. What we control is everything that makes citations likely, and the monthly audit shows movement honestly, question by question. Citation work and ranking work compound each other, so this service pairs naturally with ' },
        { text: 'SEO', href: '/services/seo/' },
        { text: '.' },
      ],
    ],
    faqs: [
      ['What is AI citation optimization (GEO)?', 'Generative engine optimization is making your brand the source AI engines cite when they answer questions — through entity consistency, answer-first content, original data and presence on the third-party sources engines trust. AEO, its sibling, wins Google’s answer boxes and featured snippets.'],
      ['How is GEO different from SEO?', 'SEO earns positions in a ranked list; GEO earns being named inside the answer itself. The foundations overlap — technical health, authority, structured content — but GEO adds entity engineering, original data and third-party presence where AI engines read.'],
      ['Can you guarantee my brand appears in ChatGPT?', 'No — nobody controls the models, and anyone guaranteeing it is selling a story. We guarantee the audit, the work and honest monthly tracking, so you see citation share move question by question.'],
      ['How do you measure AI citations?', 'A fixed set of buyer-intent questions asked monthly across ChatGPT, Perplexity, Gemini and Google AI Overviews, with every citation logged — alongside an AI-referral segment in your analytics that tracks visitors arriving from those tools.'],
    ],
  },
  {
    order: 3,
    slug: 'performance-marketing',
    name: 'Demand generation',
    metaTitle: 'Demand Generation & Performance Marketing — WizGrowth',
    metaDescription:
      'Full-funnel demand generation: Google, Meta and LinkedIn plus the AI surfaces where buyers now ask — tuned to a cost per lead you can live with. Your accounts, always.',
    h1: 'Demand generation tuned to a cost per lead you can',
    h1Accent: 'live with',
    lead: 'Google, Meta and LinkedIn — plus the AI surfaces like ChatGPT where buyers now ask for recommendations — run against one number: what a lead costs and what it’s worth. We report pipeline and revenue, not impressions, and the ad accounts stay yours.',
    card: 'Google, Meta and LinkedIn — plus the AI surfaces where buyers now ask — tuned to a cost per lead you can live with, reported against revenue.',
    cardCta: 'How we build demand',
    steps: [
      ['Tracking before spending.', 'Most accounts we audit measure the wrong thing. Conversion tracking gets fixed first, or every rupee after it is a guess.'],
      ['Funnel before budget.', 'Landing pages get rebuilt before spend scales. Better pages beat bigger budgets, every time.'],
      ['Launch and learn fast.', 'Structured campaigns across Google, Meta, LinkedIn — and emerging AI placements where they fit your buyer — with weekly kill-or-scale calls. Losers die quickly, winners get the budget.'],
      ['Creative testing cadence.', 'A steady pipeline of new angles and formats, because fatigue is the tax every ad account pays.'],
      ['Report against revenue.', 'Monthly reviews on cost per lead, pipeline and return — misses included.'],
    ],
    includes: [
      'Account and tracking audit',
      'Campaign strategy and build',
      'Landing page recommendations or builds',
      'Ad creative and copy',
      'Weekly optimization, monthly review call',
      'Full access — your accounts, your data',
    ],
    honesty: [
      [
        { text: 'Paid produces data within days and usable lead flow in two to six weeks. Media budget is scoped on the call; when a budget is too small for paid to work honestly, we’ll say so — sometimes the right answer is ' },
        { text: 'SEO first', href: '/services/seo/' },
        { text: ', and we’d rather tell you that than take the retainer.' },
      ],
    ],
    faqs: [
      ['How fast do paid campaigns show results?', 'Data arrives within days; a stable, usable cost per lead usually takes two to six weeks of testing and optimization. We set that expectation in writing before launch.'],
      ['Who owns the ad accounts?', 'You do — always. We work inside your Google, Meta and LinkedIn accounts with full transparency. If we part ways, everything stays with you.'],
      ['Is there a minimum ad budget?', 'We scope media budget on the growth call. If your budget is too small for paid to work honestly in your market, we’ll say so and suggest what to do instead.'],
    ],
  },
  {
    order: 4,
    slug: 'content-marketing',
    name: 'Content marketing',
    metaTitle: 'Content Marketing Services — WizGrowth | Rank & Get Cited',
    metaDescription:
      'Articles built to rank in Google, get cited in AI answers (ChatGPT, Perplexity, AI Overviews), and give your sales team something worth sending. Named authors, real sources.',
    h1: 'Content built to rank — and to be',
    h1Accent: 'cited',
    lead: 'Search has two audiences now: people and the AI engines answering them. We build content that wins both — answer-first articles with named authors, original data and real sources, so Google ranks it and ChatGPT, Perplexity and AI Overviews cite it.',
    card: 'Articles built to rank in Google, get cited in AI answers, and give your sales team something worth sending.',
    cardCta: 'How we run content',
    steps: [
      ['Question mining.', 'We map what your buyers actually ask — from search data, People Also Ask, and the questions your own sales chats surface.'],
      ['Answer-first briefs.', 'Every piece answers its question completely in the first sixty words, then earns depth. That’s the format snippets and AI engines lift.'],
      ['Practitioner drafts, human editing.', 'Drafted with the people who do the work, edited until it sounds like a person, published under named authors.'],
      ['Schema and internal links.', 'Article, FAQ and breadcrumb markup on every piece, wired into your site’s link structure.'],
      ['Refresh cycle.', 'Top pages get updated quarterly with new data — freshness is a ranking and citation signal.'],
    ],
    includes: [
      'Content strategy and question map',
      'Answer-first article production',
      'Original data assets and reports',
      'Schema markup on every piece',
      'Internal linking and refresh cycle',
      'Distribution to social and email',
    ],
    honesty: [
      [
        { text: 'One good article beats four thin ones — cadence is scoped to what we can make genuinely useful, not to a word-count quota. The standard for every piece: would a practitioner send this to a client?' },
      ],
    ],
    faqs: [
      ['What is GEO (generative engine optimization)?', 'GEO is making your content the source AI engines cite when they answer questions — through original data, named sources, clear entity definitions and answer-first structure. It’s AEO’s sibling: AEO wins Google’s answer boxes, GEO wins ChatGPT, Perplexity and AI Overviews citations.'],
      ['Is AI-written content bad for SEO?', 'Engines rank helpful content and demote thin, unedited output — the tool matters less than the standard. Our content ships with named authors, original data, real sources and human editing.'],
      ['How often should a business publish?', 'As often as it can be genuinely useful — for most brands that’s two to four strong pieces a month plus quarterly refreshes of top pages, not a daily word-count quota.'],
    ],
  },
  {
    order: 5,
    slug: 'social-media-marketing',
    name: 'Social media',
    metaTitle: 'Social Media Marketing Agency Kochi — WizGrowth',
    metaDescription:
      'A feed that sounds like you and sells without shouting: calendar, creative and community run on conversion-tested templates. Instagram, LinkedIn, YouTube, X.',
    h1: 'A feed that sells without',
    h1Accent: 'shouting',
    lead: 'Social that sounds like your brand and moves your numbers — calendar, creative and community across Instagram, LinkedIn, YouTube and X, run on a template system built for the scroll.',
    card: 'A feed that sounds like you and sells without shouting. Calendar, creative and community, run on templates that convert.',
    cardCta: 'How we run social',
    steps: [
      ['Voice and template system.', 'We codify how your brand looks and talks on social — a template set your feed can keep for years, not a random post every day.'],
      ['Calendar with a point.', 'Every post has a job: authority, proof, education or conversion. Filler doesn’t ship.'],
      ['Creative production.', 'Design and copy in your system — carousels, statics, reel covers and captions, written hook-first.'],
      ['Community and replies.', 'Comments and DMs handled within agreed hours, with escalation rules for anything sensitive.'],
      ['Report on enquiries, not likes.', 'Monthly reviews track followers and reach, but the headline is always leads and conversations started.'],
    ],
    includes: [
      'Social audit and voice guide',
      'Template system per platform',
      'Content calendar and production',
      'Community management',
      'Paid boosting strategy where useful',
      'Monthly report and review call',
    ],
    honesty: [
      [
        { text: 'Consistency beats volume: a smaller cadence done well outperforms daily noise. Cadence and platforms are scoped to where your buyers actually are — a D2C brand and a B2B SaaS should not run the same calendar, and we won’t pretend otherwise.' },
      ],
    ],
    faqs: [
      ['Which platforms do you manage?', 'Instagram, LinkedIn, YouTube, X and WhatsApp — weighted by where your buyers are. B2B budgets lean LinkedIn; consumer brands lean Instagram and YouTube.'],
      ['How many posts per month do you publish?', 'Scoped per engagement. We’d rather ship twelve posts with a job each than thirty fillers — consistency and quality beat raw volume on every platform.'],
      ['Do you handle comments and DMs?', 'Yes, within agreed hours and with clear escalation rules — anything sensitive or sales-critical gets routed to your team immediately.'],
    ],
  },
  {
    order: 6,
    slug: 'web-development',
    name: 'Web development',
    metaTitle: 'Website Design & Development Kochi — WizGrowth',
    metaDescription:
      'Fast, honest websites that turn clicks into enquiries — static-first builds under 2 seconds on 4G, SEO and schema baked in. Kochi, Kerala; clients everywhere.',
    h1: 'Websites that turn clicks into',
    h1Accent: 'enquiries',
    lead: 'Design is what it looks like; development is whether it converts and how fast it loads. We build static-first, SEO-ready sites that clear two seconds on 4G — the same way this site is built.',
    card: 'Fast, honest pages that turn clicks into enquiries. Under 2 seconds on 4G — we hold our own site to it too.',
    cardCta: 'How we build sites',
    steps: [
      ['Conversion-first wireframes.', 'Every page answers “what should the visitor do next” before a pixel gets styled.'],
      ['Static-first build.', 'Hand-coded, framework-light pages on modern hosting — fast by architecture, not by plugins.'],
      ['SEO and schema baked in.', 'Titles, structured data, sitemaps and clean URLs ship with the build, not as an afterthought.'],
      ['Analytics wired.', 'GA4, Search Console and conversion events working before launch — you measure from day one.'],
      ['Handover and training.', 'Your site, your accounts, and a session teaching your team to update what they need.'],
    ],
    includes: [
      'UX wireframes and copy structure',
      'Design in your brand system',
      'Static-first development',
      'Speed budget: under 2s on 4G',
      'On-page SEO, schema, sitemap',
      'Analytics and conversion tracking',
    ],
    honesty: [
      [
        { text: 'WordPress or custom? Honest answer: static-first for speed and security when your team doesn’t need a daily editor; WordPress or a CMS when they do. We recommend based on your team, not our convenience — and we’ll put the reasoning in writing.' },
      ],
    ],
    faqs: [
      ['How long does a website build take?', 'A focused brochure or service site typically ships in weeks, not months — the exact timeline is scoped with the page list and put in writing before we start.'],
      ['Do you build on WordPress?', 'When your team needs its editor, yes. When speed and security matter more than daily edits, we build static-first. We recommend based on your team’s workflow and say why.'],
      ['Do you maintain sites after launch?', 'Yes — care retainers cover updates, monitoring, backups and small improvements. Or we hand over fully; your site and accounts are yours either way.'],
    ],
  },
  {
    order: 7,
    slug: 'analytics',
    name: 'Analytics & reporting',
    metaTitle: 'Marketing Analytics & Reporting — WizGrowth',
    metaDescription:
      'One dashboard, honest attribution, and a monthly call where misses are named too. GA4, Search Console and ad platforms wired into decisions, not decks.',
    h1: 'Know what’s working — and what',
    h1Accent: 'isn’t',
    lead: 'Most marketing reports are decks that flatter. Ours is one dashboard, honest attribution, and a monthly conversation where the misses get named alongside the wins — because that’s the only way numbers improve.',
    card: 'One dashboard, honest attribution, and a monthly call where we also tell you what didn’t work.',
    cardCta: 'How we report',
    steps: [
      ['Tracking audit.', 'We verify what’s actually being measured — most accounts count the wrong conversions or double-count the right ones.'],
      ['Wire the stack.', 'GA4, Search Console, ad platforms and your CRM connected into one picture.'],
      ['One dashboard.', 'The numbers that matter — leads, cost per lead, revenue by channel — on one page you can open any day.'],
      ['Monthly review.', 'A call that ends in decisions: what gets more budget, what gets fixed, what gets killed.'],
      ['Decision log.', 'Every call’s decisions written down, so next quarter we know what we tried and why.'],
    ],
    includes: [
      'Tracking and tag audit',
      'GA4 and Search Console setup',
      'Dashboard build',
      'Attribution review',
      'Monthly review call',
      'Decision log',
    ],
    honesty: [
      [
        { text: 'We also do second-opinion audits of reports from other agencies. If your current agency is doing good work, we’ll tell you that — an honest audit that ends in “keep them” is still a good audit.' },
      ],
    ],
    faqs: [
      ['Can you set up or fix GA4?', 'Yes — setup, migration cleanup, conversion events and reporting views are the most common starting point of this service.'],
      ['What’s in the monthly report?', 'Leads, cost per lead, revenue by channel, ranking and traffic movement — and a short written summary of what worked, what didn’t, and what we’re changing next month.'],
      ['Can you audit another agency’s reporting?', 'Yes — second-opinion audits are common. If their work is good, we say so; the audit’s job is truth, not a sales pitch.'],
    ],
  },
] as const

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  for (const s of SERVICES) {
    const existing = await payload.find({
      collection: 'servicePages',
      where: { slug: { equals: s.slug } },
      limit: 1,
      overrideAccess: true,
    })

    if (existing.docs.length > 0) {
      payload.logger.info(`servicePages: ${s.slug} already exists, skipping`)
      continue
    }

    await payload.create({
      collection: 'servicePages',
      overrideAccess: true,
      data: {
        name: s.name,
        slug: s.slug,
        order: s.order,
        h1: s.h1,
        h1Accent: s.h1Accent,
        lead: s.lead,
        card: s.card,
        cardCta: s.cardCta,
        steps: s.steps.map(([label, text]) => ({ label, text })),
        includes: s.includes.map((item) => ({ item })),
        honesty: richText(s.honesty as unknown as Run[][]),
        faqs: s.faqs.map(([question, answer]) => ({ question, answer })),
        meta: { title: s.metaTitle, description: s.metaDescription },
      } as never,
    })

    payload.logger.info(`servicePages: created ${s.slug}`)
  }
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  for (const s of SERVICES) {
    await payload.delete({
      collection: 'servicePages',
      where: { slug: { equals: s.slug } },
      overrideAccess: true,
    })
  }
}
