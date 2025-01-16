/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        twitterBlue: '#1C9BF0',
        twitterBorder: '#4C5159', 
      },
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide'),
    
  ],
}

