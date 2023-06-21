import { useEffect, useState } from "react";

import { Theme, useTheme } from "./theme-provider.js";

export interface TextHighlightProps {
  id?: string;
  text: string;
  className?: string;
  json?: boolean;
}

const palette = {
  string: "text-orange-600 dark:text-orange-400",
  number: "text-lime-600 dark:text-lime-400",
  boolean: "text-sky-600 dark:text-sky-400",
  null: "text-red-600 dark:text-red-400",
};

const CHAR_LIMIT = 100_000;

const highlightJson = (value: string, theme: Theme) => {
  let formatted;
  try {
    formatted = JSON.stringify(JSON.parse(value), undefined, 2);
  } catch {
    return;
  }

  return `${formatted
    .slice(0, CHAR_LIMIT)
    .replaceAll(
      /("(\\u[\dA-Za-z]{4}|\\[^u]|[^"\\])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[Ee][+\-]?\d+)?)/g,
      (match) => {
        let className = palette.number;
        if (match.startsWith('"')) {
          className = match.endsWith(":") ? theme.text1 : palette.string;
        } else if (/true|false/.test(match)) {
          className = palette.boolean;
        } else if (/null/.test(match)) {
          className = palette.null;
        }
        return `<span class="${className}">${match}</span>`;
      },
    )}${formatted.slice(CHAR_LIMIT)}`;
};

export const TextHighlight = ({
  id,
  text,
  className = "",
  json = true,
}: TextHighlightProps) => {
  const { theme } = useTheme();

  const [highlightedText, setHighlightedText] = useState<string | undefined>(
    text,
  );

  useEffect(() => {
    if (!json) {
      setHighlightedText(undefined);
      return;
    }
    setHighlightedText(highlightJson(text, theme));
  }, [text, json, theme]);

  return (
    <div className={className}>
      {json && highlightedText ? (
        <div
          id={id}
          dangerouslySetInnerHTML={{ __html: highlightedText }}
        ></div>
      ) : (
        <div>{text}</div>
      )}
    </div>
  );
};
