import { useEffect, useState } from "react";

export interface TextHighlightProps {
  text: string;
  className?: string;
  json?: boolean;
}

const palette = {
  key: "text-slate-900",
  string: "text-orange-600",
  number: "text-lime-600",
  boolean: "text-sky-600",
  null: "text-red-600",
};

const CHAR_LIMIT = 100_000;

const highlightJson = (value: string) => {
  return `${value
    .slice(0, CHAR_LIMIT)
    .replace(
      /("(\\u[\dA-Za-z]{4}|\\[^u]|[^"\\])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[Ee][+\-]?\d+)?)/g,
      (match) => {
        let className = palette.number;
        if (match.startsWith('"')) {
          className = match.endsWith(":") ? palette.key : palette.string;
        } else if (/true|false/.test(match)) {
          className = palette.boolean;
        } else if (/null/.test(match)) {
          className = palette.null;
        }
        return `<span class="${className}">${match}</span>`;
      },
    )}${value.slice(CHAR_LIMIT)}`;
};

export const TextHighlight = ({
  text,
  className = "",
  json = true,
}: TextHighlightProps) => {
  const [highlightedText, setHighlightedText] = useState(text);
  useEffect(() => {
    setHighlightedText(json ? highlightJson(text) : text);
  }, [text, json]);

  return (
    <div className={className}>
      {json ? (
        <div dangerouslySetInnerHTML={{ __html: highlightedText }}></div>
      ) : (
        <div>{text}</div>
      )}
    </div>
  );
};
