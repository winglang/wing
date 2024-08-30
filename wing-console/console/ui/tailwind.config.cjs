const { content, plugins, theme } = require("./tailwind-plugin.cjs");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [...content, "./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [...plugins],
  theme: { ...theme },
};
