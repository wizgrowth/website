'use client';

/* eslint-disable @next/next/no-html-link-for-pages */
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

// type MobileNavBarProps = {
//   socialMedia: {
//     id: number
//     name: string
//     url: string
//     icon: React.JSX.Element
//   }[]
// }

// export function MobileNavBar({ socialMedia }: MobileNavBarProps) {
export function MobileNavBar() {
  const [toggle, setToggle] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  return (
    <div className="lg:hidden">
      <button
        className="my-1 hidden size-7 rounded px-[5px] max-lg:!block pt-[9.5px] pb-[9.5px]"
        type="button"
        onClick={() => {
          setToggle((prev) => !prev);
        }}
        aria-label="Toggle navigation"
      >
        <span className="block h-[1.5px] w-[18px] rounded-lg bg-black mb-[3px] "></span>
        <span className="block h-[1.5px] w-[18px] rounded-lg bg-black mb-[3px] opacity-100"></span>
        <span className="block h-[1.5px] w-[18px] rounded-lg bg-black "></span>
      </button>
      <div
        className={`w-72 max-xs:w-full h-dvh py-4 px-5 flex flex-col bg-primary-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-50 border absolute top-[68px] right-0 transition duration-300  ${toggle ? 'translate-x-[0]' : 'translate-x-[288px] max-xs:translate-x-full'}`}
      >
        <a
          href="/"
          className="font-medium hover:bg-primary-100 px-3 py-2 text-white hover:text-primary-300 rounded-md transition duration-200"
        >
          Home
        </a>
        <a
          href="/services/"
          className="font-medium hover:bg-primary-100 px-3 text-white py-2 rounded-md hover:text-primary-300 transition duration-200"
        >
          Services
        </a>
        <a
          href="/blog/"
          className="font-medium hover:bg-primary-100 px-3 py-2 text-white rounded-md hover:text-primary-300 transition duration-200"
        >
          Blog
        </a>
        <a
          href="/contact/"
          className="font-medium hover:bg-primary-100 px-3 py-2 text-white rounded-md hover:text-primary-300 transition duration-200"
        >
          Contact
        </a>
        <div className="flex flex-col">
          <button
            type="button"
            className="font-medium hover:bg-primary-100 px-3 py-2 text-white rounded-md hover:text-primary-300 transition duration-200 flex w-full items-center justify-between gap-2 text-left"
            aria-expanded={toolsOpen}
            aria-controls="mobile-tools-submenu"
            id="mobile-tools-button"
            onClick={() => setToolsOpen((open) => !open)}
          >
            Tools
            <ChevronDown
              className={`size-4 shrink-0 transition-transform ${toolsOpen ? 'rotate-180' : ''}`}
              aria-hidden
            />
          </button>
          {toolsOpen ? (
            <div id="mobile-tools-submenu" role="region" aria-labelledby="mobile-tools-button">
              <a
                href="https://invoicestack.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:bg-primary-100 block pl-8 pr-3 py-2 text-sm text-white/95 rounded-md hover:text-primary-300 transition duration-200"
                onClick={() => {
                  setToggle(false);
                  setToolsOpen(false);
                }}
              >
                Invoice generator
              </a>
            </div>
          ) : null}
        </div>
        {/* <div className="flex justify-start items-center gap-4 mt-10 px-3">
          {socialMedia.map((item) => (
            <a key={item.id} href={item.url}>
              {item.icon}
            </a>
          ))}
        </div> */}
      </div>
    </div>
  );
}
