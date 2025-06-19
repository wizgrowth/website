import Image from 'next/image'
import { ClockIcon } from '@components/icons/clock-icon'
// import { FaceBookIcon } from '../icons/facebook'
// import { InstagramIcon } from '../icons/instagram'
// import { Linkedin } from '../icons/linkedin'
import { PhoneIcon } from '../icons/phone'
import { EmailIcon } from '../icons/email-icon'
import { LocationIcon } from '../icons/location-icon'

export function Footer() {
  // social media to be added later
  // const socialMedia = [
  //   {
  //     id: 1,
  //     name: 'Facebook',
  //     url: '/facebook/',
  //     icon: (
  //       <FaceBookIcon
  //         width="13px"
  //         height="13px"
  //         className="p-2 rounded-full border border-primary-400 stroke-primary-300 fill-primary-300"
  //       />
  //     ),
  //   },
  //   {
  //     id: 2,
  //     name: 'Instagram',
  //     url: '/instagram/',
  //     icon: (
  //       <InstagramIcon
  //         width="13px"
  //         height="13px"
  //         className="p-2 rounded-full border border-primary-400 stroke-primary-300 fill-primary-300"
  //       />
  //     ),
  //   },
  //   {
  //     id: 3,
  //     name: 'LinkedIn',
  //     url: '/linkedin/',
  //     icon: (
  //       <Linkedin
  //         width="13px"
  //         height="13px"
  //         className="p-2 rounded-full border border-primary-400 stroke-primary-300 fill-primary-300"
  //       />
  //     ),
  //   },
  // ]
  const contactInfo = [
    {
      id: 1,
      content: '7907551261',
      icon: (
        <PhoneIcon width="15px" height="15px" className="stroke-primary-300 fill-primary-400" />
      ),
    },
    {
      id: 2,
      content: 'marketing@wizgrowth.com',
      icon: (
        <EmailIcon width="15px" height="15px" className="stroke-primary-300 fill-primary-400" />
      ),
    },
    {
      id: 3,
      content: 'Kerala, India',
      icon: (
        <LocationIcon width="15px" height="15px" className="stroke-primary-300 fill-primary-400" />
      ),
    },
  ]
  const quote = (
    <div className="mt-5">
      <p className="text-center text-2xl leading-9 font-semibold">
        “Beware of little expenses, a small leak will <br aria-hidden /> sink a great ship”
      </p>
      <p className="text-center text-base font-bold leading-6 text-primary-300 mt-2">
        — Benjamin Franklin
      </p>
      <Image
        src="https://vdskmkiggnujcnwluksm.supabase.co/storage/v1/object/sign/wizgrowth-assets/footer/leaf.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ3aXpncm93dGgtYXNzZXRzL2Zvb3Rlci9sZWFmLnBuZyIsImlhdCI6MTc0NDkxMzU1NCwiZXhwIjoyMDYwMjczNTU0fQ.jyUcvOLLw2qbbH9zagCp_t7YpgKyem1ew_ATuLjRHO0"
        width={100}
        height={100}
        alt="leaf image"
        className="mx-auto mt-6"
      />
    </div>
  )
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
            {/* <div className="mt-8 max-xl:mt-0">
              <p className="text-base text-primary-300 font-bold">Social Media</p>
              <div className="flex items-center gap-2 mt-2">
                {socialMedia.map((item) => (
                  <a key={item.id} href={item.url}>
                    {item.icon}
                  </a>
                ))}
              </div>
            </div> */}
          </div>
          {/* section-2 */}
          <div className="max-xl:hidden">{quote}</div>
          {/* sectioon-3 */}
          <div>
            <p className="text-base text-primary-300 font-bold">Contact Info</p>
            {contactInfo.map((item) => (
              // eslint-disable-next-line @next/next/no-html-link-for-pages
              <a href="/" className="flex items-center gap-2 mt-2" key={item.id}>
                {item.icon}
                <p className="text-base font-light leading-6 text-primary-400">{item.content}</p>
              </a>
            ))}
          </div>
        </div>
        <div className="mt-24 mr-8 max-xl:mr-0">
          <div className="xl:hidden mb-10">{quote}</div>
          <p className="text-sm font-normal leading-5 text-primary-400 text-center">
            Copyright © WizGrowth Inc. 2025
          </p>
        </div>
      </div>
    </section>
  )
}
