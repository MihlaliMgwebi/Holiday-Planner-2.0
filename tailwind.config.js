/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['index.html', './src/**/*.{html,ts}'],
  theme: {
    extend: {
      backgroundImage: {
        auth: "url('/assets/img/auth.avif')"
      },
      colors: {
        footer: 'rgb(240 242 245)',
        nav: 'rgb(0 21 41)',
        'auth-hover': 'rgb(253 182 98)',
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a'
        }
      }
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px'
    }
  },
  plugins: []
}
