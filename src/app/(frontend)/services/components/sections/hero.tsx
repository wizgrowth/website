import { Button } from '@/components/buttons/button'
import Image from 'next/image'

export function Hero() {
  return (
    <section>
      <div className="container">
        <div className="mt-40 bg-primary-200 rounded-3xl flex items-center justify-evenly max-xl:lg:gap-20 max-lg:py-10 max-lg:px-10 max-sm:px-5">
          <Image
            src="https://ibffbzwoucksfljolszp.supabase.co/storage/v1/object/public/wizgrowth-assets/service-page/services-page-hero-image.png"
            width={402}
            height={480}
            alt="Hero Image"
            className="-mt-7 max-lg:hidden max-xl:pl-10"
            priority
          />
          <div>
            <h1 className="font-extrabold text-5xl leading-tight text-black max-lg:text-center max-lg:text-4xl max-lg:leading-snug max-sm:text-3xl max-sm:leading-snug">
              Digital Marketing Services <br aria-hidden className="max-xl:hidden" /> That Drive
              Results
            </h1>
            <Button
              href="tel:7907551261"
              className="px-8 py-3 bg-primary-400 text-white rounded-lg hover:opacity-90 transition duration-300 ease-in-out mt-8 block w-fit font-medium text-lg max-lg:mx-auto"
              Btntext="Get Started Now"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
