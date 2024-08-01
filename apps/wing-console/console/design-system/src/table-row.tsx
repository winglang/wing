import classNames from "classnames";
import type { ChangeEvent, RefObject } from "react";

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
  row: Record<string, any>;
  columns: Column[];
  actions?: (() => React.ReactNode) | JSX.Element;
  rowClassName?: string;
  columnClassName?: string;
  actionsClassName?: string;
  dataTestid?: string;
};

export const TableRow = ({
  row,
  columns,
  actions,
  rowClassName,
  columnClassName,
  actionsClassName,
  dataTestid,
}: TableRowProps) => {
  return (
    <tr className={classNames(rowClassName)}>
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
              type={inputType}
              placeholder={type}
              value={row[column]}
              disabled
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
        {actions instanceof Function ? actions() : actions}
      </td>
    </tr>
  );
};
