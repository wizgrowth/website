import { getPayload } from 'payload'
import config from '@payload-config'

const MAX_LEN = 200
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function clean(value: unknown): string {
  return typeof value === 'string' ? value.trim().slice(0, MAX_LEN) : ''
}

export async function POST(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return Response.json({ message: 'Invalid JSON body' }, { status: 400 })
  }

  const { name, email, date, time } = (body ?? {}) as Record<string, unknown>

  const bookingData = {
    Name: clean(name),
    Email: clean(email),
    Date: clean(date),
    Time: clean(time),
  }

  const missing = Object.entries(bookingData)
    .filter(([, value]) => !value)
    .map(([field]) => field)

  if (missing.length > 0) {
    return Response.json(
      { message: `Missing required fields: ${missing.join(', ')}` },
      { status: 400 },
    )
  }

  if (!EMAIL.test(bookingData.Email)) {
    return Response.json({ message: 'Please enter a valid email address' }, { status: 400 })
  }

  try {
    // Local API call rather than an HTTP round-trip back to our own REST
    // endpoint. overrideAccess lets this run while the collection itself
    // stays closed to public writes.
    const payload = await getPayload({ config })

    await payload.create({
      collection: 'demobooking',
      data: bookingData,
      overrideAccess: true,
    })
  } catch (error) {
    console.error('Failed to save booking:', error)
    return Response.json(
      { message: 'We could not save your booking. Please try again or message us on WhatsApp.' },
      { status: 500 },
    )
  }

  return Response.json({ message: 'Booking confirmed', data: bookingData }, { status: 201 })
}
