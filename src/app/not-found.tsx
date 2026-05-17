import './(frontend)/styles.css';
import { Header } from '@components/header';
import { Footer } from '@/components/footer';
import { Poppins } from 'next/font/google';
import FrontendNotFound from './(frontend)/not-found';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  preload: true,
  variable: '--font-poppins',
});

export const metadata = {
  title: 'Page not found',
  description: 'Page not found',
  openGraph: {
    title: 'Page not found',
    description: 'Page not found',
    type: 'website',
  },
};

export default function RootNotFound() {
  return (
    <main>
      <Header />
      <FrontendNotFound />
      <Footer />
    </main>
  );
}
