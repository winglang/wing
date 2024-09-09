const htmlEscapes = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

const regExp = /["&'<>]/g;

const escaper = (match: string) => {
  return htmlEscapes[match as CHARACTERS_TO_ESCAPE];
};

type CHARACTERS_TO_ESCAPE = keyof typeof htmlEscapes;

/**
 * Converts the characters "&", "<", ">", '"', "'" to their corresponding HTML entities.
 */
export function escapeHtml(html: string) {
  return html.replaceAll(regExp, escaper);
}
