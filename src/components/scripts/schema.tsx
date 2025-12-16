import Script from 'next/script';

/*
As of NextJs v13.5.1, This Schema component has to be added in every page inside Page component of every page where we needs Schema customization. Consume data from the 'structuredData' that is returned from generateMetadata function's strapi API call.
*/
export function Schema({
  structuredData = JSON.parse(`[
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Wizgrowth",
      "url": "https://www.wizgrowth.com",
      "logo": "https://ibffbzwoucksfljolszp.supabase.co/storage/v1/object/public/wizgrowth-assets/header/wizgrowth-header-logo.png"
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Wizgrowth",
      "url": "https://www.wizgrowth.com"
    }
  ]`),
}) {
  // if (!structuredData) {
  //   return null
  // }
  return (
    <Script
      id="schema-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
      strategy="lazyOnload"
    />
  );
}

//  "sameAs": [
//       "https://www.facebook.com/wizgrowth/",
//       "https://twitter.com/wizgrowth/",
//       "https://instagram.com/wizgrowth/",
//       "https://www.youtube.com/@wizgrowth",
//       "https://www.linkedin.com/company/wizgrowth/"
//     ]
