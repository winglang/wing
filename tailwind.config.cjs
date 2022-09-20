/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable import/no-extraneous-dependencies */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
