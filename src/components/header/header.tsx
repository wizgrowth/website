/* eslint-disable @next/next/no-html-link-for-pages */
'use client';

import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { MobileNavBar } from './mobile-navbar';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathName = usePathname();
  const [toolsOpen, setToolsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);
  const resourcesActive =
    pathName.startsWith('/blog/') || pathName.startsWith('/academy/');

  useEffect(() => {
    if (!toolsOpen && !resourcesOpen) return;
    function handlePointerDown(event: MouseEvent) {
      const target = event.target as Node;
      if (toolsOpen && toolsRef.current && !toolsRef.current.contains(target)) {
        setToolsOpen(false);
      }
      if (
        resourcesOpen &&
        resourcesRef.current &&
        !resourcesRef.current.contains(target)
      ) {
        setResourcesOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setToolsOpen(false);
        setResourcesOpen(false);
      }
    }
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [toolsOpen, resourcesOpen]);

  return (
    <section className="py-8 fixed top-0 left-0 right-0 bg-white z-10 shadow-md">
      <div className="relative">
        <div className="container flex justify-between items-center">
          <a href="/">
            <Image
              src="https://ibffbzwoucksfljolszp.supabase.co/storage/v1/object/public/wizgrowth-assets/header/wizgrowth-header-logo.png"
              alt="Wizgrowth logo"
              width={190}
              height={30}
              priority
            />
          </a>
          {/* desktop navbar */}
          <div className="flex justify-center items-center gap-4 max-lg:hidden">
            <a
              href="/"
              className={`font-medium hover:bg-primary-100 px-3 py-2 rounded-md ${pathName === '/' ? 'bg-primary-100' : ''}`}
            >
              Home
            </a>
            <a
              href="/services/"
              className={`font-medium hover:bg-primary-100 px-3 py-2 rounded-md ${pathName === '/services/' ? 'bg-primary-100' : ''}`}
            >
              Services
            </a>
            <div
              className="relative"
              ref={resourcesRef}
              onMouseEnter={() => setResourcesOpen(true)}
              onMouseLeave={() => setResourcesOpen(false)}
            >
              <button
                type="button"
                className={`font-medium hover:bg-primary-100 px-3 py-2 rounded-md inline-flex items-center gap-1 ${resourcesOpen || resourcesActive ? 'bg-primary-100' : ''}`}
                aria-expanded={resourcesOpen}
                aria-haspopup="menu"
                id="resources-menu-button"
              >
                Resources
                <ChevronDown
                  className={`size-4 shrink-0 transition-transform ${resourcesOpen ? 'rotate-180' : ''}`}
                  aria-hidden
                />
              </button>
              {resourcesOpen ? (
                <div
                  className="absolute right-0 top-full z-20 pt-1"
                  role="menu"
                  aria-labelledby="resources-menu-button"
                >
                  <div className="min-w-[12rem] rounded-md border border-neutral-200 bg-white py-1 shadow-lg">
                    <a
                      href="/blog/"
                      role="menuitem"
                      className={`block px-3 py-2 text-sm font-medium text-neutral-800 hover:bg-primary-100 ${pathName.startsWith('/blog/') ? 'bg-primary-100' : ''}`}
                      onClick={() => setResourcesOpen(false)}
                    >
                      Blog
                    </a>
                    <a
                      href="/academy/"
                      role="menuitem"
                      className={`block px-3 py-2 text-sm font-medium text-neutral-800 hover:bg-primary-100 ${pathName.startsWith('/academy/') ? 'bg-primary-100' : ''}`}
                      onClick={() => setResourcesOpen(false)}
                    >
                      Academy
                    </a>
                  </div>
                </div>
              ) : null}
            </div>
            <a
              href="/contact/"
              className={`font-medium hover:bg-primary-100 px-3 py-2 rounded-md ${pathName === '/contact/' ? 'bg-primary-100' : ''}`}
            >
              Contact
            </a>
            <div
              className="relative"
              ref={toolsRef}
              onMouseEnter={() => setToolsOpen(true)}
              onMouseLeave={() => setToolsOpen(false)}
            >
              <button
                type="button"
                className={`font-medium hover:bg-primary-100 px-3 py-2 rounded-md inline-flex items-center gap-1 ${toolsOpen ? 'bg-primary-100' : ''}`}
                aria-expanded={toolsOpen}
                aria-haspopup="menu"
                id="tools-menu-button"
              >
                Tools
                <ChevronDown
                  className={`size-4 shrink-0 transition-transform ${toolsOpen ? 'rotate-180' : ''}`}
                  aria-hidden
                />
              </button>
              {toolsOpen ? (
                <div
                  className="absolute right-0 top-full z-20 pt-1"
                  role="menu"
                  aria-labelledby="tools-menu-button"
                >
                  <div className="min-w-[12rem] rounded-md border border-neutral-200 bg-white py-1 shadow-lg">
                    <a
                      href="https://invoicestack.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      role="menuitem"
                      className="block px-3 py-2 text-sm font-medium text-neutral-800 hover:bg-primary-100"
                      onClick={() => setToolsOpen(false)}
                    >
                      Invoice generator
                    </a>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <MobileNavBar />
        </div>
      </div>
    </section>
  );
}
