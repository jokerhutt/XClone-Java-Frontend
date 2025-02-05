/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        twitterBlue: '#1C9BF0',
        twitterBorder: '#4C5159', 
        twitterHover: '#16181c',
        dimBackGround: '#15202c',
        twitterBlack: '#000000',
        twitterRed: '#ff2c84',
        twitterYellow: '#ffd404',
        twitterPurple: '#8054fc',
      },
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [
    
    require('tailwind-scrollbar-hide'),
    function ({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-thin': {
          scrollbarWidth: 'thin', 
          scrollbarColor: '#1C9BF0 transparent', 
        },

        '.scrollbar-thin::-webkit-scrollbar': {
          width: '2px', 
          height: '2px', 
        },
        '.scrollbar-thin::-webkit-scrollbar-thumb': {
          backgroundColor: '#1C9BF0', 
          borderRadius: '1px', 
        },
        '.scrollbar-thin::-webkit-scrollbar-track': {
          background: 'transparent', 
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    }


    
  ],
}

