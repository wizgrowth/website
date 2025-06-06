import { Button } from '@/components/buttons/button'
import Image from 'next/image'

export function Hero() {
  return (
    <section>
      <div className="container mt-40 bg-primary-200 rounded-3xl flex items-center justify-evenly">
        <Image
          src="https://vdskmkiggnujcnwluksm.supabase.co/storage/v1/object/sign/wizgrowth-assets/services/services-page-hero-image.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzMzOWM5YzU5LTM3MmEtNGQ3NC1hOWU0LWVlMDY5ZTdhYjRlYSJ9.eyJ1cmwiOiJ3aXpncm93dGgtYXNzZXRzL3NlcnZpY2VzL3NlcnZpY2VzLXBhZ2UtaGVyby1pbWFnZS5wbmciLCJpYXQiOjE3NDY2NDU0MzIsImV4cCI6MjA2MjAwNTQzMn0.jvoMcwIb6bkiL-hIYn-LlFSXu7RQppS8Xq8W3MNZfzY"
          width={402}
          height={480}
          alt="Hero Image"
          className="-mt-7"
          priority
        />
        <div>
          <h1 className="font-extrabold text-5xl leading-tight text-black">
            Digital Marketing Services <br aria-hidden /> That Drive Results
          </h1>
          <Button
            href="tel:123456789"
            className="px-8 py-3 bg-primary-400 text-white rounded-lg hover:opacity-90 transition duration-300 ease-in-out mt-8 block w-fit font-medium text-lg"
            Btntext="Get Started Now"
          />
        </div>
      </div>
    </section>
  )
}
