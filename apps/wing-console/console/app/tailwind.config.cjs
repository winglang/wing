const ui = require("@wingconsole/ui/tailwind-plugin.cjs");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [...ui.content, "./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  plugins: [...ui.plugins],
  theme: { ...ui.theme },
};
