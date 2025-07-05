import { Button } from '@/components/buttons/button'
import Image from 'next/image'

type ServiesProp = {
  id: number
  imgSrc: string
  title: string
  description: string
}

export function Services() {
  const services: ServiesProp[] = [
    {
      id: 1,
      imgSrc:
        'https://ibffbzwoucksfljolszp.supabase.co/storage/v1/object/public/wizgrowth-assets/front-page/tax-consultation.png',
      title: 'SEO',
      description: 'Get found and get traffic with data driven SEO.',
    },
    {
      id: 2,
      imgSrc:
        'https://ibffbzwoucksfljolszp.supabase.co/storage/v1/object/public/wizgrowth-assets/front-page/finance-consultation.png',
      title: 'Social Media Marketing',
      description: 'Build your brand and connect with your audience across all platforms.',
    },
    {
      id: 3,
      imgSrc:
        'https://ibffbzwoucksfljolszp.supabase.co/storage/v1/object/public/wizgrowth-assets/front-page/business-consultation.png',
      title: 'Paid Advertising (PPC)',
      description: "Boost your brand's presence on social media platforms.",
    },
  ]
  return (
    <section className="mt-28 pb-24 max-sm:mt-12">
      <div className="container">
        <div className="p-20 bg-primary-200 rounded-3xl max-sm:px-5 max-sm:py-16">
          <p className="text-lg font-bold leading-6 text-primary-400 max-lg:text-center">
            What we do
          </p>
          <div className="flex justify-between items-center mt-2 max-lg:flex-col max-lg:gap-6">
            <h2 className="text-4xl font-extrabold leading-snug max-sm:text-3xl max-lg:text-center">
              Digital Marketing Services
            </h2>
            <Button
              className="py-3 px-8 bg-primary-400 text-white rounded-lg text-lg font-bold block w-fit"
              Btntext="All Services"
              href="/services/"
            />
          </div>
          <div className="grid gap-6 mt-16">
            {services.map((item) => {
              return (
                <div
                  key={item.id}
                  className="bg-white py-10 px-14 flex items-center gap-12 rounded-3xl max-lg:gap-6 max-md:flex-col max-xs:px-5"
                >
                  <p className="text-4xl font-extrabold leading-snug text-primary-300">
                    0{item.id}.
                  </p>
                  <Image
                    src={item.imgSrc}
                    className="rounded-xl"
                    alt={item.title}
                    title={item.title}
                    width={130}
                    height={130}
                  />
                  <div>
                    <h3 className="text-2xl font-extrabold leading-snug text-primary-300 max-md:text-center max-md:mt-5">
                      {item.title}
                    </h3>
                    <p className="text-base font-normal leading-6 text-primary-300 mt-4 max-md:text-center">
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
