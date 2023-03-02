import { SpinnerLoader } from "./SpinnerLoader.js";

export interface TextHighlightProps {
  value: string;
  className?: string;
  format?: boolean;
  children?: React.ReactNode;
}

export const TextHighlight = ({
  value,
  className = "",
  format = true,
  children,
}: TextHighlightProps) => {
  const palette = {
    key: "text-slate-900",
    string: "text-slate-600",
    number: "text-lime-600",
    boolean: "text-sky-600",
    null: "text-red-600",
  };

  const highlight = (value: string) => {
    return value.replace(
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
    );
  };

  return (
    <div className={className}>
      {format ? (
        <div dangerouslySetInnerHTML={{ __html: highlight(value) }}></div>
      ) : (
        <div>{value}</div>
      )}
      {children}
    </div>
  );
};
