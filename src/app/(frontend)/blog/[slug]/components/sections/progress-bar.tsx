'use client';

import { useEffect, useRef } from 'react';

/** Thin reading-progress bar pinned under the site nav. */
export function ProgressBar() {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const fill = fillRef.current;
      if (!fill) return;

      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      fill.style.transform = `scaleX(${ratio})`;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className="fixed inset-x-0 top-0 z-40 h-[3px] bg-[rgba(14,23,21,0.08)]"
      aria-hidden="true"
    >
      <div
        ref={fillRef}
        className="h-full origin-left bg-[#C66B2D] will-change-transform"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}
