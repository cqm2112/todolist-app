/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "mainBackgroundColor": '#325790',
        "secondaryBackgroundColor": '#DADD45',
        "columnBackgroundColor": '#ffffff',
        "CurtainColor": '#325790eb'
      },
      backgroundImage: {
        'tmk-back': "url('tmk-back.png')",

      }
    },
  },
  plugins: [],
}

