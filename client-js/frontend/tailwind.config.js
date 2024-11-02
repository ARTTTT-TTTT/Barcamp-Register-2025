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
          DEFAULT: '#FF8C00',
          50: '#FFDFB8',
          100: '#FFD6A3',
          200: '#FFC37A',
          300: '#FFB152',
          400: '#FF9E29',
          500: '#FF8C00',
          600: '#C76D00',
          700: '#8F4E00',
          800: '#573000',
          900: '#1F1100',
          950: '#030100'
        },
        secondary: {
          DEFAULT: '#FDF6EA',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FFFFFF',
          300: '#FFFFFF',
          400: '#FFFFFF',
          500: '#FDF6EA',
          600: '#F8E0B7',
          700: '#F3CA84',
          800: '#EEB450',
          900: '#E99E1D',
          950: '#D68F14'
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