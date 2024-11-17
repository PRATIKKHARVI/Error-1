/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        gold: '#FFD700',
        burgundy: '#B22222',
        'burgundy-dark': '#8B0000',
      }
    },
  },
  plugins: [],
}

