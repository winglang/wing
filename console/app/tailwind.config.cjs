const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");
const flattenColorPalette = require("tailwindcss/lib/util/flattenColorPalette");
const toColorValue = require("tailwindcss/lib/util/toColorValue");
const plugin = require("tailwindcss/plugin");

/**
 * Extracts the value of the RGB components an hexadecimal color.
 * @param {string} color
 * @returns {[number, number, number]} The decimal value of the RGB components
 */
const rgbFromColor = (color) => [
  Number.parseInt(color.slice(1, 3), 16),
  Number.parseInt(color.slice(3, 5), 16),
  Number.parseInt(color.slice(5, 7), 16),
];

/**
 * Returns the value between two numbers.
 * @param {number} value1
 * @param {number} value2
 * @returns
 */
const mixColorComponent = (value1, value2) => {
  const max = Math.max(value1, value2);
  const min = Math.min(value1, value2);
  return Math.round(min + (max - min) / 2);
};

/**
 * Mix two hexadecimal colors.
 * @param {string} color1
 * @param {string} color2
 * @returns The mixed hexadecimal color.
 * @example ```ts
 * const color = mixColor("#666666", "#888888"); // "#777777"
 * ```
 */
const mixColor = (color1, color2) => {
  const rgb1 = rgbFromColor(color1);
  const rgb2 = rgbFromColor(color2);
  const r = mixColorComponent(rgb1[0], rgb2[0]);
  const g = mixColorComponent(rgb1[1], rgb2[1]);
  const b = mixColorComponent(rgb1[2], rgb2[2]);
  return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
};

const expandColor = (color) => {
  return {
    ...color,
    150: mixColor(color[100], color[200]),
    250: mixColor(color[200], color[300]),
    350: mixColor(color[300], color[400]),
    450: mixColor(color[400], color[500]),
    550: mixColor(color[500], color[600]),
    650: mixColor(color[600], color[700]),
    750: mixColor(color[700], color[800]),
    850: mixColor(color[800], color[900]),
  };
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "../ui/src/**/*.{vue,js,ts,jsx,tsx}",
    "../design-system/src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      ...defaultTheme.fontFamily,
      sans: ["IBM Plex Sans", ...defaultTheme.fontFamily.sans],
      mono: ["IBM Plex Mono", ...defaultTheme.fontFamily.mono],
      "share-tech": ["Share Tech Mono", ...defaultTheme.fontFamily.mono],
    },

    extend: {
      colors: {
        gray: expandColor(colors.gray),
        slate: expandColor(colors.slate),
        "monada-light": "#AEF8EC",
        "monada-dark": "#2ad5c1",
        "monada-black": "#03120E",
      },
      fontSize: {
        "2xs": "0.7rem",
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
