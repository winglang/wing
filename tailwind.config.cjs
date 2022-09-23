/* eslint-disable @typescript-eslint/no-require-imports, import/no-extraneous-dependencies */
const colors = require("tailwindcss/colors");
const flattenColorPalette = require("tailwindcss/lib/util/flattenColorPalette");
const toColorValue = require("tailwindcss/lib/util/toColorValue");
const plugin = require("tailwindcss/plugin");

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
    // Scrollbar plugin.
    plugin(function ({ addUtilities, matchUtilities, addBase, theme }) {
      addBase({
        ".scrollbar": {
          "&": {
            "border-color": "rgba(0, 0, 0, 0)",
          },
          "&::-webkit-scrollbar, &::-webkit-scrollbar-thumb, &::-webkit-scrollbar-corner":
            {
              // add border to act as background-color
              "border-right-style": "inset",
              // sum viewport dimensions to guarantee border will fill scrollbar
              "border-right-width": "calc(100vw + 100vh)",
              // inherit border-color to inherit transitions
              "border-color": "inherit",
            },
        },
      });

      const themeColors = flattenColorPalette.default(theme("colors"));
      const colors = Object.fromEntries(
        Object.entries(themeColors).map(([k, v]) => [
          k,
          toColorValue.default(v),
        ]),
      );
      matchUtilities(
        {
          "scrollbar-bg": (value) => ({
            "border-color": value,
          }),
          "scrollbar-thumb": (value) => ({
            "&::-webkit-scrollbar-thumb": {
              "border-color": value,
            },
          }),
          "scrollbar-thumb-hover": (value) => ({
            "&::-webkit-scrollbar-thumb:hover, &:hover::-webkit-scrollbar-thumb:hover":
              {
                "border-color": value,
              },
          }),
          "scrollbar-thumb-active": (value) => ({
            "&::-webkit-scrollbar-thumb:active, &:hover::-webkit-scrollbar-thumb:active":
              {
                "border-color": value,
              },
          }),
        },
        { values: colors, type: "color" },
      );

      const themeWidths = flattenColorPalette.default(theme("width"));
      const widths = Object.entries(themeWidths).filter(
        ([, size]) => size.endsWith("px") || size.endsWith("rem"),
      );
      matchUtilities(
        {
          "scrollbar-w": (value) => ({
            "&::-webkit-scrollbar": {
              width: Array.isArray(value) ? value[1] : value,
            },
          }),
        },
        {
          values: widths,
          type: ["absolute-size", "length"],
        },
      );

      const themeHeights = flattenColorPalette.default(theme("height"));
      const heights = Object.entries(themeHeights).filter(
        ([, size]) => size.endsWith("px") || size.endsWith("rem"),
      );
      matchUtilities(
        {
          "scrollbar-h": (value) => ({
            "&::-webkit-scrollbar": {
              height: Array.isArray(value) ? value[1] : value,
            },
          }),
        },
        {
          values: heights,
          type: ["absolute-size", "length"],
        },
      );

      addUtilities({
        ".overflow-overlay": {
          overflow: ["scroll", "overlay"],
        },
        ".overflow-x-overlay": {
          "overflow-x": ["scroll", "overlay"],
        },
        ".overflow-y-overlay": {
          "overflow-y": ["scroll", "overlay"],
        },
      });
    }),
  ],
};
