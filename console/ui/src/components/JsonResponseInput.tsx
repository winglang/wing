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
  return (
    <ResponseInput empty={!value} loading={loading} placeholder={placeholder}>
      <TextHighlight
        className={classNames(
          "flex-1 font-mono w-full",
          "p-2 border rounded border-slate-200 bg-white",
          "select-text text-slate-600 text-xs",
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
