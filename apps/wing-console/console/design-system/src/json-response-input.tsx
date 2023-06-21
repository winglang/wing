import classNames from "classnames";

import { ResponseInput } from "./response-input.js";
import { TextHighlight } from "./text-highlight.js";
import { useTheme } from "./theme-provider.js";

export interface JsonResponseInputProps {
  loading: boolean;
  value: string;
  json?: boolean;
  placeholder?: string;
  className?: string;
}

export const JsonResponseInput = ({
  loading,
  value,
  json = true,
  placeholder = "No value",
  className,
}: JsonResponseInputProps) => {
  const { theme } = useTheme();
  return (
    <ResponseInput empty={!value} loading={loading} placeholder={placeholder}>
      <TextHighlight
        className={classNames(
          theme.bgInput,
          theme.textInput,
          theme.borderInput,
          "flex-1 font-mono w-full",
          "p-2 rounded border",
          "select-text text-xs",
          "break-words whitespace-pre-wrap",
          "resize-y overflow-y-auto",
          className,
        )}
        text={value}
        json={json}
      />
    </ResponseInput>
  );
};
