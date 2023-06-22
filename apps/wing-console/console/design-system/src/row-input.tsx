import classNames from "classnames";
import { RefObject, useMemo, useState } from "react";

import { useTheme } from "./theme-provider.js";

export const RowInput = ({
  inputRef,
  type,
  placeholder,
  inactivePlaceholder,
  value,
  onChange,
  onKeyUp,
  onBlur,
  disabled,
  error,
}: {
  inputRef?: RefObject<HTMLInputElement>;
  type: string;
  placeholder: string;
  inactivePlaceholder?: string;
  value: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyUp: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: boolean;
}) => {
  const { theme } = useTheme();

  const [active, setActive] = useState(false);

  const showPlaceholderAsText = useMemo(() => {
    return (
      !active &&
      ["text", "date", "number"].includes(type) &&
      !value &&
      inactivePlaceholder
    );
  }, [active, type, value, inactivePlaceholder]);

  return (
    <input
      ref={inputRef}
      placeholder={
        !active && inactivePlaceholder ? inactivePlaceholder : placeholder
      }
      type={showPlaceholderAsText ? "text" : type}
      value={value}
      checked={type === "checkbox" && value === true}
      className={classNames(
        theme.borderInput,
        "rounded text-sm relative",
        "text-sm ring-0 focus:ring-0 bg-transparent",
        "border-0 p-0 m-0 appearance-none rounded",
        showPlaceholderAsText && "placeholder:italic",
        error && "bg-red-300/50 dark:bg-red-500/50",
        type !== "checkbox" && [
          "w-full",
          theme.textInput,
          theme.focusInput,
          "px-1",
        ],
        type === "checkbox" && [
          theme.focusInput,
          theme.bg4,
          "w-4 h-4 dark:ring-offset-gray-800",
        ],
        type === "date" &&
          !value &&
          "text-slate-500 dark:text-slate-450 focus:text-slate-900 dark:focus:text-slate-300",
      )}
      disabled={disabled}
      onFocus={() => {
        setActive(true);
      }}
      onChange={onChange}
      onKeyUp={onKeyUp}
      onBlur={(event) => {
        setActive(false);
        onBlur?.(event);
      }}
    />
  );
};
