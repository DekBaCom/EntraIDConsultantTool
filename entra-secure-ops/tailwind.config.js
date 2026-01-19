/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#0078D4',
          dark: '#0f172a', // slate-900
          light: '#f8fafc', // slate-50
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // I should probably confirm if I'm adding Inter font link or assuming system
      }
    },
  },
  plugins: [],
}
