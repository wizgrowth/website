import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  const body = await request.json();
  const { path } = body;

  if (path) {
    // Revalidate a specific blog post
    revalidatePath(path);
  }

  return NextResponse.json({ revalidated: true, at: Date.now() });
}
