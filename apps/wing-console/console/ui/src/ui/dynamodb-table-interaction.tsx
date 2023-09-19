import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  SpinnerLoader,
  useTheme,
  Column,
  getInputType,
  TableRow,
  TextArea,
} from "@wingconsole/design-system";
import classNames from "classnames";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type RowData = Record<string, any>;

export type Row = {
  data: RowData;
  error?: string;
};

export type RawRow = {
  data: string;
  error?: string;
};

export interface TableInteractionProps {
  hashKey: string;
  rangeKey?: string;
  rows?: Row[];
  onAddRow?: (row: RawRow) => void;
  onRemoveRow?: (index: number) => void;
  disabled?: boolean;
  readonly?: boolean;
  loading?: boolean;
}

export const DynamodbTableInteraction = ({
  hashKey,
  rangeKey,
  rows = [],
  onAddRow = (row: RawRow) => {},
  onRemoveRow = (index: number) => {},
  disabled = false,
  readonly = false,
  loading = false,
}: TableInteractionProps) => {
  const { theme } = useTheme();

  const [newRow, setNewRow] = useState<RawRow>({ data: "", error: "" });
  const [internalRows, setInternalRows] = useState<Row[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const columns = useMemo(() => {
    let keys = new Set<string>();
    for (let row of rows) {
      for (let key of Object.keys(row.data)) {
        if (key !== hashKey && key !== rangeKey) {
          keys.add(key);
        }
      }
    }

    const result: Column[] = [{
      name: hashKey,
      type: "string"
    }, 
    ...(rangeKey ? [{
      name: rangeKey,
      type: "string"
    }] : [])];

    for (let key of Array.from(keys.values()).sort()) {
      result.push({ name: key, type: "string" })
    }

    return result;
  }, [rows]);

  const addRow = useCallback(async () => {
    onAddRow(newRow);
  }, [newRow, onAddRow]);

  const updateNewRow = useCallback(
    (newValue: any) => {
      let error = "";
      try {
        const row = JSON.parse(newValue);
        if (row[hashKey] === undefined) {
          error = `missing hash key ${hashKey}`;
        } else if (rangeKey && row[rangeKey] === undefined) {
          error = `missing range key ${rangeKey}`;
        }
      } catch {
        error = "not a valid JSON";
      }

      setNewRow({
        data: newValue,
        error,
      });
    },
    [newRow, hashKey, rangeKey],
  );

  useEffect(() => {
    setNewRow({ data: "", error: "" });
    setInternalRows(rows);
  }, [rows]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [internalRows.length]);

  const headerSuffix = (name: string) => {
    switch (name) {
      case hashKey:
        return "(pk)";
      case rangeKey:
        return "(sk)";
      default:
        return "";
    }
  };

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
              {columns.map(({ name, type }, index) => (
                <th
                  key={index}
                  className={classNames(
                    "text-sm p-1.5",
                    "border-b border-slate-300 dark:border-slate-700",
                    getInputType(type) === "checkbox"
                      ? "text-center"
                      : "text-left",
                  )}
                >
                  {`${name}${headerSuffix(name)}`}
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
                primaryKey={hashKey}
                disabled={disabled}
                readonly={true}
                saveRow={() => {}}
                updateRow={(key, value) => {}}
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
                          data-testid={`ex.DynamodbTable:remove-row-${index}`}
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      )}
                    </>
                  );
                }}
                dataTestid={`ex.DynamodbTable:row-${index}`}
              />
            ))}
          </tbody>
        </table>
        <div
          className="w-full border-separate"
          style={{
            borderSpacing: "0px 4px",
          }}
        >
          <div className="spacing-y-1">
            {!readonly && (
              <div className="flex flex-col">
                <div>
                  <div
                    className={classNames(
                      "inline-block whitespace-nowrap",
                      theme.bg2,
                      theme.borderInput,
                      theme.textInput,
                      theme.focusInput,
                      "text-[0.60rem] font-medium tracking-wide text-slate-400 dark:text-slate-350",
                      "leading-none m-0.5 p-1",
                      "rounded",
                    )}
                  >
                    NEW ITEM
                  </div>
                </div>
                <TextArea
                  containerClassName="w-full"
                  className={classNames("text-sm min-h-[2rem]", newRow.error && [
                    "rounded ring-2 ring-red-800/50",
                    "dark:ring-red-500/50 dark:border-red-500/50",
                  ])}
                  placeholder="Item..."
                  value={newRow.data}
                  onInput={(event) => updateNewRow(event.currentTarget.value)}
                  dataTestid="ex.DynamodbTable:new-row"
                />
                <button
                  className={classNames(
                    "inline-flex gap-2 items-center text-xs font-medium outline-none rounded-md",
                    "p-1.5 w-fit",
                    theme.bg4Hover,
                    theme.textInput,
                    theme.borderInput,
                    theme.focusInput,
                  )}
                  onClick={addRow}
                  disabled={disabled}
                  data-testid="ex.DynamodbTable:add-row"
                >
                  <PlusIcon className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
