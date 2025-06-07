/* eslint-disable @next/next/no-html-link-for-pages */
import { useState } from 'react'

type MobileNavBarProps = {
  socialMedia: {
    id: number
    name: string
    url: string
    icon: React.JSX.Element
  }[]
}

export function MobileNavBar({ socialMedia }: MobileNavBarProps) {
  const [toggle, setToggle] = useState(false)
  return (
    <div className="lg:hidden">
      <button
        className="my-1 hidden size-7 rounded px-[5px] max-lg:!block pt-[9.5px] pb-[9.5px]"
        type="button"
        onClick={() => {
          setToggle((prev) => !prev)
        }}
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
        <div className="flex justify-start items-center gap-4 mt-10 px-3">
          {socialMedia.map((item) => (
            <a key={item.id} href={item.url}>
              {item.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
