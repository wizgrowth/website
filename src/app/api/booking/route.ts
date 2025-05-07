export async function POST(request: Request) {
  const body = await request.json()
  const { name, email, date, time } = body
  const bookingData = {
    Name: name,
    Email: email,
    Date: date,
    Time: time,
  }
  try {
    const response = await fetch('http://localhost:3003/api/demobooking/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    })
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
