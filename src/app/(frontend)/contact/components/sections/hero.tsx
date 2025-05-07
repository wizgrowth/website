import { Button } from '@/components/buttons/button'
import Image from 'next/image'

export function Hero() {
  return (
    <section>
      <div className="container mt-40 bg-primary-200 rounded-3xl flex items-center justify-evenly">
        <div>
          <h1 className="font-extrabold text-5xl leading-tight text-black">
            Don’t Know What To Do?
            <br aria-hidden /> Call Me Today
          </h1>
          <Button
            href="tel:123456789"
            className="px-8 py-3 bg-primary-400 text-white rounded-lg hover:opacity-90 transition duration-300 ease-in-out mt-8 block w-fit font-medium text-lg"
            Btntext="Call Now"
          />
        </div>
        <Image
          src="https://vdskmkiggnujcnwluksm.supabase.co/storage/v1/object/sign/wizgrowth-assets/contact/contact-page-hero-image.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzMzOWM5YzU5LTM3MmEtNGQ3NC1hOWU0LWVlMDY5ZTdhYjRlYSJ9.eyJ1cmwiOiJ3aXpncm93dGgtYXNzZXRzL2NvbnRhY3QvY29udGFjdC1wYWdlLWhlcm8taW1hZ2UucG5nIiwiaWF0IjoxNzQ2NjMwMjcxLCJleHAiOjIwNjE5OTAyNzF9.8u4Hbe6Jg_XTK_61Wi51vWHOwQpDXtBX7C1PlnHrf2g"
          alt="Hero Image"
          width={443}
          height={407}
          className="-mt-7"
          priority
        />
      </div>
    </section>
  )
}
