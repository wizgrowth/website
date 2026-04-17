/* eslint-disable @next/next/no-html-link-for-pages */
'use client';

import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
// import { FaceBookIcon } from '../icons/facebook'
// import { InstagramIcon } from '../icons/instagram'
// import { Linkedin } from '../icons/linkedin'
import { MobileNavBar } from './mobile-navbar';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathName = usePathname();
  const [toolsOpen, setToolsOpen] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!toolsOpen) return;
    function handlePointerDown(event: MouseEvent) {
      if (toolsRef.current && !toolsRef.current.contains(event.target as Node)) {
        setToolsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setToolsOpen(false);
    }
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [toolsOpen]);

  // need to dry the code
  // social media to be added alter
  // const socialMedia = [
  //   {
  //     id: 1,
  //     name: 'Facebook',
  //     url: '/facebook/',
  //     icon: <FaceBookIcon width="15px" height="15px" className="p-3 rounded-full bg-primary-100" />,
  //   },
  //   {
  //     id: 2,
  //     name: 'Instagram',
  //     url: '/instagram/',
  //     icon: (
  //       <InstagramIcon width="15px" height="15px" className="p-3 rounded-full bg-primary-100" />
  //     ),
  //   },
  //   {
  //     id: 3,
  //     name: 'LinkedIn',
  //     url: '/linkedin/',
  //     icon: <Linkedin width="15px" height="15px" className="p-3 rounded-full bg-primary-100" />,
  //   },
  // ]
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
            <a
              href="/blog/"
              className={`font-medium hover:bg-primary-100 px-3 py-2 rounded-md ${pathName.startsWith('/blog/') ? 'bg-primary-100' : ''}`}
            >
              Blog
            </a>
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
          {/* <div className="flex justify-center items-center gap-4 max-lg:hidden">
            {socialMedia.map((item) => (
              <a key={item.id} href={item.url}>
                {item.icon}
              </a>
            ))}
          </div> */}

          {/* mobile navbar */}
          {/* <MobileNavBar socialMedia={socialMedia} /> */}
          <MobileNavBar />
        </div>
      </div>
    </section>
  );
}
