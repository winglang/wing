import { escapeHtml } from "@wingconsole/utilities";
import { memo, useEffect, useState } from "react";

import type { Theme } from "./theme-provider.js";
import { useTheme } from "./theme-provider.js";

export interface TextHighlightProps {
  id?: string;
  text: string;
  className?: string;
  json?: boolean;
  dataTestid?: string;
}

const palette = {
  string: "text-orange-600 dark:text-orange-400",
  number: "text-lime-600 dark:text-lime-400",
  boolean: "text-sky-600 dark:text-sky-400",
  null: "text-red-600 dark:text-red-400",
};

const CHAR_LIMIT = 100_000;

const highlightJson = (value: string, theme: Theme) => {
  return `${value
    .slice(0, CHAR_LIMIT)
    .replaceAll(
      /{(?:[^"\\{}]|"(?:\\.|[^"\\])*"|{(?:[^"\\{}]|"(?:\\.|[^"\\])*")*})*}/g,
      (match) => {
        return `<span class="italic">${match.replaceAll(
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
            return `<span class="${className}">${escapeHtml(match)}</span>`;
          },
        )}</span>`;
      },
    )}${value.slice(CHAR_LIMIT)}`;
};

export const TextHighlight = memo(
  ({
    id,
    text,
    className = "",
    json = true,
    dataTestid,
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

    if (json && highlightedText) {
      return (
        <div
          id={id}
          className={className}
          data-testid={dataTestid}
          dangerouslySetInnerHTML={{ __html: highlightedText }}
        />
      );
    }

    return (
      <div className={className} data-testid={dataTestid}>
        {text}
      </div>
    );
  },
);
