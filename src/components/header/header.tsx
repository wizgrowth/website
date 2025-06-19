/* eslint-disable @next/next/no-html-link-for-pages */
'use client'

import Image from 'next/image'
// import { FaceBookIcon } from '../icons/facebook'
// import { InstagramIcon } from '../icons/instagram'
// import { Linkedin } from '../icons/linkedin'
import { MobileNavBar } from './mobile-navbar'
import { usePathname } from 'next/navigation'

export function Header() {
  const pathName = usePathname()

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
              src="https://vdskmkiggnujcnwluksm.supabase.co/storage/v1/object/sign/wizgrowth-assets/header/wizgrowth-header-logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ3aXpncm93dGgtYXNzZXRzL2hlYWRlci93aXpncm93dGgtaGVhZGVyLWxvZ28ucG5nIiwiaWF0IjoxNzQ0NjU2NzA3LCJleHAiOjIwNjAwMTY3MDd9.uZloCq7pQawSvku2tciZIWiMOHulTcq8LGYgJDTe9Dk"
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
  )
}
