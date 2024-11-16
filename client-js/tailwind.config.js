const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...defaultTheme.colors,
        primary: {
          DEFAULT: '#f3faf9',
          '50': '#f3faf9',
        '100': '#d7f0ed',
        '200': '#afe0db',
        '300': '#80c8c4',
        '400': '#6ab6b4',
        '500': '#3b9190',
        '600': '#2d7474',
        '700': '#285c5d',
        '800': '#24494b',
        '900': '#213f40',
        '950': '#0e2425',
        },
        secondary: {
          DEFAULT: '#fefae8',
          '50': '#fefae8',
        '100': '#fff4bd',
        '200': '#ffe788',
        '300': '#ffd344',
        '400': '#febb11',
        '500': '#fefae8',
        '600': '#cd7a01',
        '700': '#a45504',
        '800': '#87430c',
        '900': '#733710',
        '950': '#431b05',
        },
        gray: {
          200: '#EAECEE', // disabled, gray button
          300: '#E3E3E3', // hover gray button
          400: '#CACACA', // placeholder
          500: '#B7B7B7', // font disabled button
          600: '#505050', // font white button
          900: '#2A2A2E', // main font
        },
        error: {
          DEFAULT: '#EA4335',
          50: '#FBDEDB',
          100: '#F9CDC9',
          200: '#F6AAA4',
          300: '#E35561', // notification
          400: '#EE655A',
          500: '#EA4335', //error message
          600: '#D12416',
          700: '#9E1B10',
          800: '#6C130B',
          900: '#390A06',
          950: '#1F0503',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Prompt', ...defaultTheme.fontFamily.sans],
      },
      minWidth: {
        253: '253px',
        80: '80vw',
      },
      keyframes: {
        fade: {
          '0%': { filter: 'brightness(100%)' },
          '50%': { filter: 'brightness(150%)' },
          '100%': { filter: 'brightness(100%)' },
        },
      },
      animation: {
        'fade-color': 'fade 2s infinite',
      },
    },
  },
  plugins: [],
}