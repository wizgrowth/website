'use client';

import { useEffect, useRef } from 'react';

// Reading progress plus the active state of the contents rail — the same
// two scripts the reference article carries, as one client component.
export function ProgressBar() {
  const fill = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      if (fill.current) fill.current.style.width = `${max > 0 ? (h.scrollTop / max) * 100 : 0}%`;

      const sections = document.querySelectorAll<HTMLElement>('.article-body h2[id]');
      const links = document.querySelectorAll<HTMLAnchorElement>('.toc-list a');
      let current = '';
      sections.forEach((s) => {
        if (window.scrollY >= s.offsetTop - 200) current = s.id;
      });
      links.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === `#${current}`));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div className="progress" aria-hidden="true">
      <div className="progress-fill" ref={fill} />
    </div>
  );
}
