import { Button } from '@/components/buttons/button'
import Image from 'next/image'

export function Hero() {
  return (
    <section>
      <div className="container">
        <div className="mt-40 bg-primary-200 rounded-3xl flex items-center justify-evenly max-xl:lg:gap-10 max-xl:lg:pl-10 max-lg:flex-col max-lg:pt-16 max-lg:px-24 lg:pr-5 max-sm:px-7">
          <div>
            <h1 className="font-extrabold text-5xl leading-tight text-black max-xl:text-4xl max-lg:text-center max-xl:leading-snug">
              Don’t Know What To Do?
              <br aria-hidden className="max-xl:hidden" /> Call Us Today
            </h1>
            <Button
              href="tel:7907551261"
              className="px-8 py-3 bg-primary-400 text-white rounded-lg hover:opacity-90 transition duration-300 ease-in-out mt-8 block w-fit font-medium text-lg max-lg:mx-auto"
              Btntext="Call Now"
            />
          </div>
          <Image
            src="https://ibffbzwoucksfljolszp.supabase.co/storage/v1/object/public/wizgrowth-assets/contact-us-page/contact-page-hero-image.png"
            alt="Hero Image"
            width={443}
            height={407}
            className="-mt-7 max-lg:mt-16"
            priority
          />
        </div>
      </div>
    </section>
  )
}
