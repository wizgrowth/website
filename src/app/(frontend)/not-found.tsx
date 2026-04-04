import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 pt-36 pb-24 max-sm:pb-5">
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-primary-400 font-semibold text-sm tracking-widest uppercase mb-4">
          Page not found
        </p>

        <h1 className="text-[7rem] sm:text-[10rem] font-extrabold leading-none text-primary-500 select-none">
          404
        </h1>

        <div className="w-16 h-1 bg-primary-400 mx-auto my-6 rounded-full" />

        <p className="text-lg sm:text-xl text-gray-600 mb-4 font-medium">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <p className="text-sm sm:text-base text-gray-400 mb-10 max-w-md mx-auto">
          It might have been moved or deleted. Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col xs:flex-row items-center justify-center gap-4 max-sm:hidden">
          <Link
            href="/"
            className="inline-flex items-center border border-solid border-primary-400 gap-2 bg-primary-400 text-white font-medium px-8 py-3 rounded-lg hover:bg-primary-500 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Go Home
          </Link>
          <a
            href="/contact/"
            className="inline-flex items-center gap-2 border-2 border-primary-400 text-primary-400 font-medium px-8 py-3 rounded-lg hover:bg-primary-100 transition-colors duration-200"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
