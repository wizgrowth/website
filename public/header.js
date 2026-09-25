// WIZGROWTH / SITE HEADER — from design/header/header.html, with the "wgh-"
// class prefix the stylesheet uses. Loaded by the home page, the blog and the
// academy; each half's own script handles what "Let's talk" opens.
(() => {
  const items = [...document.querySelectorAll('[data-wgh-dropdown]')];
  const closeAll = (except = null) => items.forEach((item) => {
    if (item !== except) { item.classList.remove('is-open'); item.querySelector('.wgh-trigger').setAttribute('aria-expanded', 'false'); }
  });
  items.forEach((item) => {
    const trigger = item.querySelector('.wgh-trigger');
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const next = !item.classList.contains('is-open');
      closeAll(next ? item : null);
      item.classList.toggle('is-open', next);
      trigger.setAttribute('aria-expanded', String(next));
    });
  });
  document.addEventListener('click', () => closeAll());
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAll(); });

  const toggle = document.querySelector('[data-wgh-menu]');
  const panel = document.querySelector('[data-wgh-panel]');
  if (toggle && panel) {
    toggle.addEventListener('click', () => {
      const open = panel.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
  }
  document.querySelectorAll('[data-wgh-section]').forEach((section) => {
    const btn = section.querySelector('.wgh-mobile-accordion');
    btn.addEventListener('click', () => {
      const open = section.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
    });
  });
})();
