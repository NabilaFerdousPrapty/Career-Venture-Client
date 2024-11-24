/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    fontFamily: {
      play: ['Playwrite NZ', 'cursive'],
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1600px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        synthwave: {
          primary: "#ffffff",
          secondary: "#bfbfbf",
          background: "#1a103d",
          card_background: "#1e293b",
          accent: '#1f2937',


        },
        winter: {
          primary: "#000000",
          secondary: "#36454F",
          background: "#f8f9fa",
          card_background: "#e0f2fe",
          accent: '#4c4a52',


        },
      },
    ],

  },
}

