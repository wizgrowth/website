import { notFound } from 'next/navigation';

// Any URL no other route claims lands here, so the 404 renders inside the
// site's root layout (html lang, analytics, metadata) instead of Next's bare
// default document. See ../not-found.tsx.
export default function Missing() {
  notFound();
}
