'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const LINKS = [
  { href: '/services/', label: 'Services' },
  { href: '/work/', label: 'Work' },
  { href: '/blog/', label: 'Blog' },
  { href: '/academy/', label: 'Academy' },
  { href: '/about/', label: 'About' },
];

// The reference markup toggles the phone menu with a hidden checkbox. In
// React that is state instead, so the menu also closes on navigation.
export function Header() {
  const pathname = usePathname() ?? '/';
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const isCurrent = (href: string) => pathname === href || pathname.startsWith(href);

  return (
    <nav className="nav" aria-label="Main">
      <div className="nav-inner">
        <Link href="/" className="wm">
          WizGrowth
        </Link>
        <input
          type="checkbox"
          id="nav-toggle"
          className="nav-toggle"
          checked={open}
          onChange={(e) => setOpen(e.target.checked)}
          aria-hidden="true"
          tabIndex={-1}
        />
        <ul className="nav-links" id="nav-menu">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} aria-current={isCurrent(link.href) ? 'page' : undefined}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="nav-right">
          <Link href="/contact/" className="btn btn-primary">
            Talk to us
          </Link>
          <label
            htmlFor="nav-toggle"
            className="nav-burger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-controls="nav-menu"
            aria-expanded={open}
            role="button"
          >
            <span />
            <span />
            <span />
          </label>
        </div>
      </div>
    </nav>
  );
}
