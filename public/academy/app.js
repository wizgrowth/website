// WIZGROWTH / ACADEMY — behaviour for the academy pages, from the design
// hand-off (design/academy/*.html). One script serves all four pages; the
// Little Wiz messages come from the page's data attribute.
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const wizSpeech = document.querySelector('[data-wiz-speech]');
  if (wizSpeech && !reduceMotion) {
    let wizMessages = [];
    try { wizMessages = JSON.parse(wizSpeech.dataset.wizMessages || '[]'); } catch { wizMessages = []; }
    if (wizMessages.length > 1) {
      let wizMessageIndex = 0;
      setInterval(() => {
        wizSpeech.classList.add('is-changing');
        setTimeout(() => {
          wizMessageIndex = (wizMessageIndex + 1) % wizMessages.length;
          wizSpeech.textContent = wizMessages[wizMessageIndex];
          wizSpeech.classList.remove('is-changing');
        }, 220);
      }, 3000);
    }
  }

  // Small pointer response in the hero artwork; disabled for touch/reduced motion.
  const hero = document.querySelector('.hero');
  const artInner = document.querySelector('.hero-art > div');
  if (hero && artInner && !reduceMotion && window.matchMedia('(pointer:fine)').matches) {
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 10;
      const y = ((e.clientY - r.top) / r.height - 0.5) * 8;
      artInner.style.transform = `translate3d(${x}px,${y}px,0)`;
    });
    hero.addEventListener('pointerleave', () => { artInner.style.transform = 'translate3d(0,0,0)'; });
  }

  const menu = document.querySelector('[data-menu]');
  const nav = document.querySelector('[data-mobile-nav]');
  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = nav.hasAttribute('data-open');
      nav.toggleAttribute('data-open', !open);
      menu.setAttribute('aria-expanded', String(!open));
    });
    nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
      nav.removeAttribute('data-open');
      menu.setAttribute('aria-expanded', 'false');
    }));
  }
  document.querySelectorAll('[data-top]').forEach((btn) =>
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })));
})();

// Enquiry sheet, from the course page of the hand-off: one step, WhatsApp-first.
// Buttons carry data-lead-open and data-lead-course; the sheet is in the layout.
(() => {
  const dialog = document.getElementById('academy-lead');
  const form = document.getElementById('academy-lead-form');
  if (!dialog || !form) return;
  const course = document.getElementById('lead-course');
  const error = document.getElementById('lead-error');
  const defaultCourse = 'Digital Marketing Course with AI';
  function openLead(value) {
    course.value = value || defaultCourse;
    if (course.value !== (value || defaultCourse)) course.value = defaultCourse;
    if (typeof dialog.showModal === 'function') dialog.showModal(); else dialog.setAttribute('open', '');
    document.body.style.overflow = 'hidden';
    setTimeout(() => document.getElementById('lead-name').focus({ preventScroll: true }), 60);
  }
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-lead-open]');
    if (!btn || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    openLead(btn.dataset.leadCourse || defaultCourse);
  });
  document.querySelectorAll('[data-lead-close]').forEach((btn) => btn.addEventListener('click', () => dialog.close()));
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => { document.body.style.overflow = ''; error.textContent = ''; });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('lead-name').value.trim();
    const phone = document.getElementById('lead-phone').value.trim();
    const note = document.getElementById('lead-note').value.trim();
    if (!name || !phone) { error.textContent = 'Please add your name and WhatsApp number.'; return; }
    error.textContent = '';
    const lines = ['Hi WizGrowth Academy — I would like to enquire about a course.', '', 'Name: ' + name, 'My WhatsApp number: ' + phone, 'Interested in: ' + course.value];
    if (note) lines.push('Note: ' + note);
    const url = 'https://wa.me/917907551261?text=' + encodeURIComponent(lines.join('\n'));
    const win = window.open(url, '_blank', 'noopener,noreferrer');
    if (!win) location.href = url;
  });
})();
