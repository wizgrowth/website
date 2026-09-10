import Image from 'next/image';
import { ClockIcon } from '@components/icons/clock-icon';
import { PhoneIcon } from '../icons/phone';
import { EmailIcon } from '../icons/email-icon';
import { LocationIcon } from '../icons/location-icon';

const SITE_LINKS = [
  { href: '/services/', label: 'Services' },
  { href: '/academy/', label: 'Academy' },
  { href: '/blog/', label: 'Blog' },
  { href: '/contact/', label: 'Contact' },
];

export function Footer() {
  const CONTACT_INFO = [
    {
      id: 1,
      link: 'tel:7907551261',
      content: '7907551261',
      icon: (
        <PhoneIcon width="15px" height="15px" className="stroke-primary-300 fill-primary-400" />
      ),
    },
    {
      id: 2,
      link: 'mailto:marketing@wizgrowth.com',
      content: 'marketing@wizgrowth.com',
      icon: (
        <EmailIcon width="15px" height="15px" className="stroke-primary-300 fill-primary-400" />
      ),
    },
  ];
  const quote = (
    <div className="mt-5">
      <p className="text-center text-2xl leading-9 font-semibold">
        “Beware of little expenses, a small leak will <br aria-hidden /> sink a great ship”
      </p>
      <p className="text-center text-base font-bold leading-6 text-primary-300 mt-2">
        — Benjamin Franklin
      </p>
      <Image
        src="https://ibffbzwoucksfljolszp.supabase.co/storage/v1/object/public/wizgrowth-assets/footer/leaf.png"
        width={100}
        height={100}
        alt="leaf image"
        className="mx-auto mt-6"
      />
    </div>
  );
  const year = new Date().getFullYear();
  return (
    <section className="bg-primary-100 pt-20  pb-8">
      <div className="container">
        <div className="flex item-center justify-between max-xl:justify-center max-xl:gap-20 max-sm:flex-col">
          {/* section-1 */}
          <div className="basis-56 max-xl:flex max-xl:basis-auto max-xl:gap-20 max-md:flex-col">
            <div>
              <p className="text-base text-primary-300 font-bold">Opening Hours</p>
              <div className="flex items-center gap-2 mt-5">
                <ClockIcon width="17px" height="17px" />
                <p className="text-sm font-light text-primary-400">Mon - Fri 9AM - 8PM</p>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <ClockIcon width="17px" height="17px" />
                <p className="text-sm font-light text-primary-400">Sat - Sun 10AM - 5PM</p>
              </div>
            </div>
          </div>
          {/* section-2 */}
          <div className="max-xl:hidden">{quote}</div>
          {/* sectioon-3 */}
          <div>
            <p className="text-base text-primary-300 font-bold">Contact Info</p>
            {CONTACT_INFO.map((item) => (
              <a href={item.link} className="flex items-center gap-2 mt-2" key={item.id}>
                {item.icon}
                <p className="text-base font-light leading-6 text-primary-400">{item.content}</p>
              </a>
            ))}
            <div className="flex items-center gap-2 mt-2">
              <LocationIcon
                width="15px"
                height="15px"
                className="stroke-primary-300 fill-primary-400"
              />
              <p className="text-base font-light leading-6 text-primary-400">Kerala, India</p>
            </div>
          </div>
        </div>
        {/* The header renders Academy inside a dropdown that only mounts once
            it is opened, so nothing on the site linked to /academy/ at all —
            neither readers scanning a page nor crawlers ever saw it. These
            links are always in the markup. */}
        <nav aria-label="Footer" className="mt-20 border-t border-primary-200 pt-10">
          <p className="text-base text-primary-300 font-bold">Explore</p>
          <ul className="mt-4 flex flex-wrap gap-x-10 gap-y-2.5">
            {SITE_LINKS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-base font-light leading-6 text-primary-400 hover:underline"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-16 mr-8 max-xl:mr-0">
          <div className="xl:hidden mb-10">{quote}</div>
          <p className="text-sm font-normal leading-5 text-primary-400 text-center">
            Copyright © WizGrowth Inc. {year}
          </p>
        </div>
      </div>
    </section>
  );
}
