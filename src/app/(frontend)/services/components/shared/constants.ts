export const SITE_URL = process.env.NEXT_PUBLIC_SITE_DOMAIN ?? 'https://www.wizgrowth.com';

export const CONTACT = {
  phoneDisplay: '+91 79075 51261',
  phoneHref: 'tel:+917907551261',
  email: 'marketing@wizgrowth.com',
  emailHref: 'mailto:marketing@wizgrowth.com',
  whatsappHref:
    'https://wa.me/917907551261?text=Hi%20WizGrowth%20%E2%80%94%20I%E2%80%99d%20like%20to%20talk%20about%20growing%20my%20business.',
  hours: 'Mon–Fri 9am–8pm · Sat–Sun 10am–5pm IST',
  location: 'Kochi, Kerala, India',
};

// The promises every engagement makes, used on the hub hero and the
// "at a glance" panel of each service page.
export const ENGAGEMENT_RULES = [
  { k: 'Starts with', v: 'A free 30-minute growth call' },
  { k: 'Before you pay', v: 'Scope, targets and timelines in writing' },
  { k: 'Reporting', v: 'Monthly, with the misses named too' },
  { k: 'Ownership', v: 'Your accounts and your data, always' },
  { k: 'Lock-in', v: 'None. Engagements continue on results' },
];
