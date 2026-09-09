'use client';

import clsx from 'clsx';
import { useEffect, useRef } from 'react';

type RevealProps = {
  children: React.ReactNode;
  className?: string;
};

// Content must never be left invisible. The reveal starts at opacity 0, so if
// the observer never fires — unsupported API, an element parked in the
// viewport band the rootMargin excludes, a missed intersection during
// hydration — the text would be permanently unreadable. Hence the plain
// threshold, the pixel rootMargin, and the timeout that shows it regardless.
const SAFETY_REVEAL_MS = 1500;

export function Reveal({ children, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => el.classList.add('service-reveal-in');

    if (typeof IntersectionObserver === 'undefined') {
      show();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            show();
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: '0px 0px -40px 0px' },
    );

    io.observe(el);

    const safety = window.setTimeout(() => {
      show();
      io.disconnect();
    }, SAFETY_REVEAL_MS);

    return () => {
      window.clearTimeout(safety);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className={clsx('service-reveal', className)}>
      {children}
    </div>
  );
}
