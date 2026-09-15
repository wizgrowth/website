'use client';

import clsx from 'clsx';
import { useEffect, useRef } from 'react';

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'li' | 'article' | 'section';
};

// Content must never stay invisible: if the observer never fires the
// timeout shows it regardless.
const SAFETY_REVEAL_MS = 1500;

export function Reveal({ children, className, as: Tag = 'div' }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => el.classList.add('wg-reveal-in');

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={clsx('wg-reveal', className)}>
      {children}
    </Tag>
  );
}
