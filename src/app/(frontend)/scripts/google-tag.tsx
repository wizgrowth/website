import Script from 'next/script';

const GTM_ID = 'GTM-5VR52CQZ';

// Google Tag Manager, loaded once the page has finished loading rather than
// as a high-priority preload during the first paint. The container pulls in
// gtag, the Meta Pixel and two more tags (about 600 KB and three seconds of
// phone CPU), and it was being fetched ahead of the page's own stylesheet.
// Events still reach the container: the dataLayer exists from the start and
// the page-view fires when GTM arrives, a second or two later on a phone.
export function GoogleTag() {
  return (
    <>
      <Script id="gtm-datalayer" strategy="beforeInteractive">
        {`window.dataLayer=window.dataLayer||[];window.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});`}
      </Script>
      <Script id="gtm" strategy="lazyOnload" src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`} />
    </>
  );
}
