export async function POST(request: Request) {
  const body = await request.json()
  const { name, email, date, time } = body
  const bookingData = {
    Name: name,
    Email: email,
    Date: date,
    Time: time,
  }
  const isStaging = process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
  try {
    const response = await fetch(
      isStaging
        ? `${process.env.NEXT_PUBLIC_STAGING_DOMAIN}/api/demobooking/`
        : `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/api/demobooking/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      },
    )
    const data = await response.json()
    console.log('Response from external API:', data)
  } catch (error) {
    console.error('Error sending booking data to external API:', error)
  }

  return new Response(JSON.stringify({ message: 'Booking confirmed', data: bookingData }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
