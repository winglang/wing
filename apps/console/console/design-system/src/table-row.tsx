import classNames from "classnames";
import { ChangeEvent, RefObject } from "react";

import { RowInput } from "./row-input.js";

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
