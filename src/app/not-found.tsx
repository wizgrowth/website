// Fallback for URLs outside every route group (Next's bare document, so no
// lang or analytics). Site URLs reach src/app/(frontend)/not-found.tsx instead
// through the (frontend)/[...missing] catch-all.
export { default, metadata } from './(frontend)/not-found';
