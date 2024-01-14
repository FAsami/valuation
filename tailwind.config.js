/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    display: ['Noto Sans Bengali', 'sans-serif'],
    body: ['Noto Sans Bengali', 'sans - serif'],
    extend: {
      fontFamily: {
        sans: ["'Noto Sans Bengali'", 'sans-serif'],
      },
      colors: {
        primary: 'rgb(128, 91, 230)',
        'primary-mid': 'rgba(128, 91, 230, 0.7)',
        'primary-light': 'rgba(128, 91, 230,0.1)',
      },
    },
  },
  plugins: [],
}
