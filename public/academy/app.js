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
