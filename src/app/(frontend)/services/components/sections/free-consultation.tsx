import { Button } from '@/components/buttons/button'
import Image from 'next/image'

export function FreeConsultation() {
  return (
    <section className="pb-24 max-sm:pb-16">
      <div className="container">
        <div className="mt-40 bg-primary-200 rounded-3xl flex items-center justify-around px-10 max-sm:px-5 max-sm:pt-12 max-lg:flex-col max-lg:pt-20 max-lg:mt-16">
          <div>
            <p className="text-4xl font-extrabold leading-tight text-black max-lg:text-center max-md:text-3xl">
              Together We Can Do More
            </p>
            <p className="text-lg font-normal leading-tight text-primary-400 mt-5 max-lg:text-center">
              Call me today at +91 7907551261
            </p>
            <Button
              href="tel:123456789"
              className="px-8 py-3 bg-primary-400 text-white rounded-lg hover:opacity-90 transition duration-300 ease-in-out mt-8 block w-fit font-medium text-lg max-lg:mx-auto"
              Btntext="Free Consultation"
            />
          </div>

          <Image
            src="https://vdskmkiggnujcnwluksm.supabase.co/storage/v1/object/sign/wizgrowth-assets/services/call-to-action-section-image.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMzljOWM1OS0zNzJhLTRkNzQtYTllNC1lZTA2OWU3YWI0ZWEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3aXpncm93dGgtYXNzZXRzL3NlcnZpY2VzL2NhbGwtdG8tYWN0aW9uLXNlY3Rpb24taW1hZ2UucG5nIiwiaWF0IjoxNzQ5MzI0OTQyLCJleHAiOjIwNjQ2ODQ5NDJ9.YileBCIjv0Q9tQheptaa8aagsA_kJhgo4lXQ_3U9DbY"
            alt="call to action image"
            width={541}
            height={424}
            className="-mt-12 max-lg:mt-12"
          />
        </div>
      </div>
    </section>
  )
}
