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
        'https://vdskmkiggnujcnwluksm.supabase.co/storage/v1/object/sign/wizgrowth-assets/front-page/tax-consultation.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ3aXpncm93dGgtYXNzZXRzL2Zyb250LXBhZ2UvdGF4LWNvbnN1bHRhdGlvbi5wbmciLCJpYXQiOjE3NDU0Mzk0OTAsImV4cCI6MjA2MDc5OTQ5MH0.aoqCRLeAzRq3YlyQWJUnuXsMLJypITANZPjH00l9eag',
      title: 'SEO',
      description: 'Get found and get traffic with data driven SEO.',
    },
    {
      id: 2,
      imgSrc:
        'https://vdskmkiggnujcnwluksm.supabase.co/storage/v1/object/sign/wizgrowth-assets/front-page/finance-consultation.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ3aXpncm93dGgtYXNzZXRzL2Zyb250LXBhZ2UvZmluYW5jZS1jb25zdWx0YXRpb24ucG5nIiwiaWF0IjoxNzQ1NDM5NTA5LCJleHAiOjIwNjA3OTk1MDl9._ffnZ3BOylzjTOQAaKs-3hQD3BMXHeUIElD8wi4I8VU',
      title: 'Social Media Marketing',
      description: 'Build your brand and connect with your audience across all platforms.',
    },
    {
      id: 3,
      imgSrc:
        'https://vdskmkiggnujcnwluksm.supabase.co/storage/v1/object/sign/wizgrowth-assets/front-page/business-consultation.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ3aXpncm93dGgtYXNzZXRzL2Zyb250LXBhZ2UvYnVzaW5lc3MtY29uc3VsdGF0aW9uLnBuZyIsImlhdCI6MTc0NTQzOTUyNywiZXhwIjoyMDYwNzk5NTI3fQ.6HwLo0ejvEF6WUMPh3tAeB_NoDhQJNFHPRVo4f-eyIM',
      title: 'Paid Advertising (PPC)',
      description: "Boost your brand's presence on social media platforms.",
    },
  ]
  return (
    <section className="mt-28 pb-24">
      <div className="container">
        <div className="p-20 bg-primary-200 rounded-3xl">
          <p className="text-lg font-bold leading-6 text-primary-400">What we do</p>
          <div className="flex justify-between items-center mt-2">
            <h2 className="text-4xl font-extrabold leading-snug">Digital Marketing Services</h2>
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
                  className="bg-white py-10 px-14 flex items-center gap-12 rounded-3xl"
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
                    <h3 className="text-2xl font-extrabold leading-snug text-primary-300">
                      {item.title}
                    </h3>
                    <p className="text-base font-normal leading-6 text-primary-300 mt-4">
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
