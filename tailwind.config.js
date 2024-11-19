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
          primary: "#d926a9",
          secondary: "#1e40af",
          "base-100": "#1a103d",
        },
        winter: {
          primary: "#ffffff",
          secondary: "#3b82f6",
          "base-100": "#f8f9fa",
        },
      },
    ],

  },
}

