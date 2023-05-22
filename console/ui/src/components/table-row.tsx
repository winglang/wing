import { useTheme } from "@wingconsole/design-system";
import classNames from "classnames";
import { ChangeEvent, RefObject, useMemo, useState } from "react";

export const getInputType = (type: string) => {
  switch (type) {
    case "string": {
      return "text";
    }
    case "number": {
      return "text";
    }
    case "boolean": {
      return "checkbox";
    }
    case "date": {
      return "date";
    }
    default: {
      return "text";
    }
  }
};

const getValue = (type: string, event: ChangeEvent<HTMLInputElement>) => {
  switch (type) {
    case "checkbox": {
      return event.target.checked;
    }
    default: {
      return event.target.value;
    }
  }
};

const hasError = (value: any, type: string) => {
  if (value && type === "number" && Number.isNaN(Number(value))) {
    return true;
  }
  return false;
};

export type Column = { name: string; type: string };

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

export type TableRowProps = {
  inputRef?: RefObject<HTMLInputElement>;
  row: Record<string, any>;
  newRow?: boolean;
  placeholder?: string;
  columns: Column[];
  primaryKey: string;
  disabled?: boolean;
  readonly?: boolean;
  error?: string;
  updateRow: (column: string, value: any) => void;
  saveRow: (row: Record<string, any>) => void;
  actions?: () => React.ReactNode;
  rowClassName?: string;
  columnClassName?: string;
  actionsClassName?: string;
};

export const TableRow = ({
  inputRef,
  row,
  newRow,
  placeholder,
  columns,
  primaryKey,
  disabled,
  readonly,
  error,
  updateRow,
  saveRow,
  actions,
  rowClassName,
  columnClassName,
  actionsClassName,
}: TableRowProps) => {
  return (
    <tr
      className={classNames(
        rowClassName,
        error && [
          "rounded ring-2 ring-red-800/50",
          "dark:ring-red-500/50 dark:border-red-500/50",
        ],
      )}
    >
      {columns.map(({ name: column, type }, index) => {
        const inputType = getInputType(type);
        return (
          <td
            key={column}
            className={classNames(
              "leading-tight px-1 py-0",
              inputType === "checkbox" ? "text-center" : "text-left",
              columnClassName,
            )}
          >
            <RowInput
              inputRef={index === 0 ? inputRef : undefined}
              type={inputType}
              placeholder={type}
              inactivePlaceholder={placeholder}
              value={row[column]}
              onChange={(event) => {
                updateRow(column, getValue(inputType, event));
              }}
              onKeyUp={(event) => {
                if (event.key === "Enter") {
                  saveRow(row);
                }
              }}
              onBlur={() => {
                !newRow && saveRow(row);
              }}
              disabled={
                (!newRow && column === primaryKey) || disabled || readonly
              }
              error={!readonly && hasError(row[column], type)}
            />
          </td>
        );
      })}
      <td
        className={classNames(
          "align-middle",
          columnClassName,
          actionsClassName,
        )}
      >
        {actions?.()}
      </td>
    </tr>
  );
};
