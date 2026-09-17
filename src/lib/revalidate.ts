// Asks the running site to re-render the given paths right away, so a save in
// the admin panel shows up without waiting for the hourly refresh. Every page
// also refreshes on its own timer, so a failure here only delays the change.
export async function revalidatePaths(paths: string[]) {
  const base = process.env.NEXT_PUBLIC_SITE_DOMAIN;
  const secret = process.env.REVALIDATION_SECRET;
  if (!base || !secret) {
    console.warn('[revalidate] NEXT_PUBLIC_SITE_DOMAIN or REVALIDATION_SECRET missing; skipped');
    return;
  }
  await Promise.all(
    paths.map(async (path) => {
      try {
        await fetch(`${base}/api/revalidate?secret=${secret}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ path }),
        });
      } catch (err) {
        console.error(`[revalidate] ${path} failed:`, err);
      }
    }),
  );
}

/** A Payload afterChange hook that refreshes fixed paths (for globals). */
export function revalidateHook(paths: string[]) {
  return async () => {
    await revalidatePaths(paths);
  };
}
