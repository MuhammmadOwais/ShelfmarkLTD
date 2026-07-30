/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4f8',
          100: '#dbe3ec',
          200: '#bdcbde',
          300: '#92aad2',
          400: '#5f82bb',
          500: '#0b2545',
          600: '#091e37',
          700: '#07172a',
          800: '#05101d',
          900: '#030a12',
          950: '#01050a',
        },
        brand: {
          50: '#faf8f2',
          100: '#f3eccb',
          200: '#e7d89b',
          300: '#d7be63',
          400: '#c8a335',
          500: '#c29a4a',
          600: '#a57f35',
          700: '#7d5f27',
          800: '#5a441e',
          900: '#3f2f16',
        }
      },
    },
  },
  plugins: [],
}
