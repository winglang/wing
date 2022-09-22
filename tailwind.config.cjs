/* eslint-disable @typescript-eslint/no-require-imports, import/no-extraneous-dependencies */
const { default: plugin } = require("tailwindcss");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // We can specify the tone for the gray color.
        // gray: colors.neutral,
        // gray: colors.slate,
        gray: colors.gray,
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    // require("tailwind-scrollbar"),
    // plugin(
    //   function ({ matchUtilities, theme }) {
    //     matchUtilities(
    //       {
    //         tab: (value) => ({
    //           tabSize: value,
    //         }),
    //       },
    //       { values: theme("tabSize") },
    //     );
    //   },
    //   {
    //     theme: {
    //       tabSize: {
    //         1: "1",
    //         2: "2",
    //         4: "4",
    //         8: "8",
    //       },
    //     },
    //   },
    // ),
  ],
};
