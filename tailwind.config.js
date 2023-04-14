/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      backgroundImage: {
        auth: "url('/assets/img/auth.avif')",
      },
      colors: {
        'auth-hover': 'rgb(253 182 98)',
      },
    },
    screens: {
      //E.g. => @media (min-width: 640px) { ... }
      sm: '640px',
      md: '768px',
      lg: '1024px',
    },
  },
  plugins: [],
};
