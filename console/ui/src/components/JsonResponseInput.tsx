import { useTheme } from "@wingconsole/design-system";
import classNames from "classnames";

import { TextHighlight } from "../design-system/TextHighlight.js";

import { ResponseInput } from "./ResponseInput.js";

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
