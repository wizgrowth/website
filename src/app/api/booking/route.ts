import { getPayload } from 'payload';
import config from '@payload-config';

// The contact page's booking form posts here. The record is written with the
// local API (server side, so the collection stays closed to the public), and
// the response says honestly whether it was saved: the form shows an error
// otherwise instead of a confirmation.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ message: 'Invalid request' }, { status: 400 });
  }
  const field = (key: string) => (typeof body[key] === 'string' ? (body[key] as string).trim().slice(0, 200) : '');
  const name = field('name'), email = field('email'), date = field('date'), time = field('time');
  if (!name || !EMAIL.test(email) || !date || !time) {
    return Response.json({ message: 'Name, a valid email, date and time are required' }, { status: 400 });
  }
  try {
    const payload = await getPayload({ config });
    const doc = await payload.create({
      collection: 'demobooking',
      data: { Name: name, Email: email, Date: date, Time: time },
    });
    return Response.json({ message: 'Booking confirmed', id: doc.id }, { status: 200 });
  } catch (error) {
    console.error('[booking] could not save the booking:', error);
    return Response.json({ message: 'The booking could not be saved' }, { status: 500 });
  }
}
