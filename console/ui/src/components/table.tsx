import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { SpinnerLoader, useTheme } from "@wingconsole/design-system";
import classNames from "classnames";
import { useCallback, useEffect, ChangeEvent, useRef, useState } from "react";

import { Column, TableRow, getInputType } from "./table-row.js";

export type RowData = Record<string, any>;

export type Row = {
  data: RowData;
  error?: string;
};

export interface TableProps {
  primaryKey?: string;
  columns?: Column[];
  rows?: Row[];
  onAddRow?: (row: RowData) => void;
  onRemoveRow?: (index: number) => void;
  onEditRow?: (row: RowData) => void;
  disabled?: boolean;
  readonly?: boolean;
  loading?: boolean;
}

export const Table = ({
  primaryKey = "",
  columns = [],
  rows = [],
  onAddRow = (row: RowData) => {},
  onRemoveRow = (index: number) => {},
  onEditRow = (row: RowData) => {},
  disabled = false,
  readonly = false,
  loading = false,
}: TableProps) => {
  const { theme } = useTheme();

  const [newRow, setNewRow] = useState<Row>({ data: {}, error: "" });
  const [internalRows, setInternalRows] = useState<Row[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const addRow = useCallback(async () => {
    const row = newRow.data;
    if (row[primaryKey] === undefined) {
      return;
    }
    onAddRow(row);
  }, [newRow, onAddRow, primaryKey]);

  const updateNewRow = useCallback(
    (key: string, newValue: any) => {
      const row = {
        ...newRow.data,
        [key]: newValue,
      };
      setNewRow({
        data: row,
        error: "",
      });
    },
    [newRow],
  );

  const editRow = useCallback(
    async (index: number, row: RowData) => {
      if (rows[index]?.data === row) {
        return;
      }
      onEditRow(row);
    },
    [onEditRow, rows],
  );

  const updateRow = useCallback(
    (index: number, row: RowData, key: string, newValue: any) => {
      const newRow = {
        ...row,
        [key]: newValue,
      };
      const newRows = [...internalRows];
      newRows[index] = {
        data: newRow,
        error: "",
      };
      setInternalRows(newRows);
    },
    [internalRows, setInternalRows],
  );

  useEffect(() => {
    setNewRow({ data: {}, error: "" });
    setInternalRows(rows);
  }, [rows]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [internalRows.length]);

  return (
    <div className="inline-block align-middle w-full mt-1">
      <div
        className={classNames(
          "relative min-h-[2rem] max-h-[30rem]",
          "overflow-auto shadow ring-1 ring-black ring-opacity-5 rounded border px-1",
          theme.textInput,
          theme.borderInput,
          theme.focusWithin,
          theme.bgInput,
        )}
      >
        {loading && (
          <div
            className={classNames(
              "absolute inset-0 z-50 bg-white/70 dark:bg-slate-800/70",
            )}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <SpinnerLoader size="sm" />
            </div>
          </div>
        )}
        <table
          className="w-full border-separate"
          style={{
            borderSpacing: "0px 4px",
          }}
        >
          <thead>
            <tr
              className={classNames(
                theme.bgInput,
                "px-1 sticky top-[4px] z-10 border-spacing-x-0",
                "ring-2 ring-white dark:ring-slate-800",
              )}
            >
              {columns.map(({ name, type }) => (
                <th
                  key={name}
                  className={classNames(
                    "text-sm p-1.5",
                    "border-b border-slate-300 dark:border-slate-700",
                    getInputType(type) === "checkbox"
                      ? "text-center"
                      : "text-left",
                  )}
                >
                  {`${name}${name === primaryKey ? "*" : ""}`}
                </th>
              ))}
              <th
                className={classNames(
                  "w-0",
                  "border-b border-slate-300 dark:border-slate-700",
                )}
              ></th>
            </tr>
          </thead>
          <tbody className="spacing-y-1">
            {internalRows.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className={classNames(
                    "text-center text-xs pt-4",
                    theme.text2,
                  )}
                >
                  No rows
                </td>
              </tr>
            )}
            {internalRows.map(({ data: row, error }, index) => (
              <TableRow
                key={index}
                row={row}
                placeholder="null"
                error={error}
                columns={columns}
                primaryKey={primaryKey}
                disabled={disabled}
                readonly={readonly}
                saveRow={() => editRow(index, row)}
                updateRow={(key, value) => updateRow(index, row, key, value)}
                actions={() => {
                  return (
                    <>
                      {!readonly && (
                        <button
                          className={classNames(
                            "outline-none rounded p-1.5",
                            theme.bg4Hover,
                            theme.textInput,
                            theme.borderInput,
                            theme.focusInput,
                            disabled && "opacity-50 cursor-not-allowed",
                          )}
                          onClick={() => onRemoveRow(index)}
                          disabled={disabled}
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      )}
                    </>
                  );
                }}
              />
            ))}
            {!readonly && columns.length > 0 && (
              <>
                <tr className="sticky bottom-[35px] z-10">
                  <td className="p-0">
                    <div className="-mb-[6px]">
                      <div
                        className={classNames(
                          "inline-block whitespace-nowrap",
                          theme.bg3,
                          "text-[0.60rem] font-semibold tracking-wide text-slate-400 dark:text-slate-350",
                          "leading-none px-2 pt-1.5 pb-1",
                          "rounded-t",
                        )}
                      >
                        NEW ROW
                      </div>
                    </div>
                  </td>
                </tr>
                <TableRow
                  key={internalRows.length}
                  inputRef={inputRef}
                  newRow
                  rowClassName={classNames(
                    "sticky bottom-[4px] z-10",
                    newRow.error && [
                      "dark:ring-red-500/50 dark:border-red-500/50",
                    ],
                  )}
                  columnClassName={classNames(
                    "first:rounded-bl -mb-2.5",
                    theme.bg3,
                  )}
                  actionsClassName={classNames("rounded-r", theme.bg3)}
                  row={newRow.data}
                  error={newRow.error}
                  columns={columns}
                  primaryKey={primaryKey}
                  disabled={disabled}
                  readonly={readonly}
                  saveRow={addRow}
                  updateRow={(key, value) => updateNewRow(key, value)}
                  actions={() => {
                    return (
                      <button
                        className={classNames(
                          "inline-flex gap-2 items-center text-xs font-medium outline-none rounded",
                          "p-1.5",
                          theme.bg4Hover,
                          theme.bgInputHover,
                          theme.textInput,
                          theme.focusInput,
                          (disabled || !newRow.data[primaryKey]) &&
                            "opacity-50 cursor-not-allowed",
                        )}
                        onClick={addRow}
                        disabled={disabled || !newRow.data[primaryKey]}
                      >
                        <PlusIcon className="w-4 h-4" />
                      </button>
                    );
                  }}
                />
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
