import { Button } from '@/components/buttons/button'
import Image from 'next/image'

export function FreeConsultation() {
  return (
    <section className="pb-24">
      <div className="container mt-40 bg-primary-200 rounded-3xl flex items-center justify-around">
        <div>
          <p className="text-4xl font-extrabold leading-tight text-black">
            Together We Can Do More
          </p>
          <p className="text-base font-normal leading-tight text-primary-400 mt-5">
            Call me today at +91 7907551261
          </p>
          <Button
            href="tel:123456789"
            className="px-8 py-3 bg-primary-400 text-white rounded-lg hover:opacity-90 transition duration-300 ease-in-out mt-8 block w-fit font-medium text-lg"
            Btntext="Free Consultation"
          />
        </div>

        <Image
          src="https://vdskmkiggnujcnwluksm.supabase.co/storage/v1/object/sign/wizgrowth-assets/services/call-to-action-section-image.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzMzOWM5YzU5LTM3MmEtNGQ3NC1hOWU0LWVlMDY5ZTdhYjRlYSJ9.eyJ1cmwiOiJ3aXpncm93dGgtYXNzZXRzL3NlcnZpY2VzL2NhbGwtdG8tYWN0aW9uLXNlY3Rpb24taW1hZ2UucG5nIiwiaWF0IjoxNzQ2NjQ3NTY2LCJleHAiOjE3NDc1MTE1NjZ9.o192v-a4tcXh4ICKEIKzNBeTPgSHvpXOMlnY1IvZnew"
          alt="call to action image"
          width={541}
          height={424}
          className="-mt-12"
        />
      </div>
    </section>
  )
}
