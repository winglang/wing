import escape from "lodash.escape";

export type AsciiColor =
  | "black"
  | "red"
  | "green"
  | "yellow"
  | "blue"
  | "magenta"
  | "cyan"
  | "white";

// Define a mapping of ASCII color codes to HTML color codes
const colorMap: { [key: string]: AsciiColor | "reset" } = {
  "\u001B[30m": "black",
  "\u001B[31m": "red",
  "\u001B[32m": "green",
  "\u001B[33m": "yellow",
  "\u001B[34m": "blue",
  "\u001B[35m": "magenta",
  "\u001B[36m": "cyan",
  "\u001B[37m": "white",
  "\u001B[39m": "reset",
  //  "\u001B[0m": "",
} as const;

const defaultColorsTransform = (color: AsciiColor) => `style="color: ${color}"`;

export interface TurnAsciiColorsIntoHtmlOptions {
  /**
   * If `true`, the HTML will be escaped.
   *
   * @default true
   */
  escapeHtml?: boolean;

  /**
   * A function that transforms the color into an HTML attributes string.
   *
   * @default
   * ```ts
   * colorsTransform: (color) => `style="color: ${color}"`
   * ```
   */
  colorsTransform?: (color: AsciiColor) => string;
}

export const turnAsciiColorsIntoHtml = (
  asciiString: string,
  options?: TurnAsciiColorsIntoHtmlOptions,
): string => {
  const colorsTransform = options?.colorsTransform ?? defaultColorsTransform;

  return asciiString.replaceAll(/\u001B\[\d+m/g, (match) => {
    const color = colorMap[match];
    if (color === "reset") {
      return "</span>";
    } else if (color) {
      return `<span ${colorsTransform(color)}>`;
    }
    return options?.escapeHtml === false ? match : escape(match);
  });
};
