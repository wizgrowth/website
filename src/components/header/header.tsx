'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const LINKS = [
  { href: '/services/', label: 'Services' },
  { href: '/work/', label: 'Work' },
  // The blog runs the other design system, so its link is a plain anchor
  // (full page load) — see the layout comment in src/app/(frontend).
  { href: '/blog/', label: 'Blog', reload: true },
  { href: '/academy/', label: 'Academy', reload: true },
  { href: '/about/', label: 'About' },
];

// The reference markup toggles the phone menu with a hidden checkbox. In
// React that is state instead, so the menu also closes on navigation.
export function Header() {
  const pathname = usePathname() ?? '/';
  // The menu is open only for the path it was opened on, so navigating
  // closes it without an effect that sets state.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (next: boolean) => setOpenOn(next ? pathname : null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenOn(null);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const isCurrent = (href: string) => pathname === href || pathname.startsWith(href);

  return (
    <nav className="nav" aria-label="Main">
      <div className="nav-inner">
        {/* Plain anchor on purpose: the home page runs the other design
            system, so it needs a full page load. */}
        <a href="/" className="wm">
          WizGrowth
        </a>
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
              {'reload' in link ? (
                <a href={link.href}>{link.label}</a>
              ) : (
                <Link href={link.href} aria-current={isCurrent(link.href) ? 'page' : undefined}>
                  {link.label}
                </Link>
              )}
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
