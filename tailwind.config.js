/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1536px',
        },
      },
      colors: {
        'primary-100': '#f2f7f6',
        'primary-200': '#E9F4F1',
        'primary-300': '#365951',
        'primary-400': '#0A6951',
        'primary-500': '#182D27',
      },
    },
  },
  plugins: [],
}
