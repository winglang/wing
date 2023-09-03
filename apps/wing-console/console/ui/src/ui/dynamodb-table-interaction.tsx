import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  SpinnerLoader,
  useTheme,
  Column,
  TextArea,
  JsonResponseInput,
} from "@wingconsole/design-system";
import classNames from "classnames";
import { useCallback, useEffect, useRef, useState } from "react";

export type RowData = Record<string, any>;

export type Row = {
  data: RowData;
  error?: string;
};

export interface TableInteractionProps {
  primaryKey?: string;
  columns?: Column[];
  rows?: Row[];
  onAddRow?: (row: RowData) => void;
  onRemoveRow?: (index: number) => void;
  disabled?: boolean;
  readonly?: boolean;
  loading?: boolean;
}

export const DynamodbTableInteraction = ({
  primaryKey = "",
  rows = [],
  onAddRow = (row: RowData) => {},
  onRemoveRow = (index: number) => {},
  disabled = false,
  readonly = false,
  loading = false,
}: TableInteractionProps) => {
  const { theme } = useTheme();

  const [newRow, setNewRow] = useState({ data: "", error: "" });
  const [internalRows, setInternalRows] = useState<Row[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const addRow = useCallback(async () => {
    try {
      const row = JSON.parse(newRow.data);
      if (row[primaryKey] === undefined) {
        return;
      }
      onAddRow(row);
    } catch {
      setNewRow({
        data: newRow.data,
        error: "Not a valid JSON",
      });
    }
  }, [newRow, onAddRow, primaryKey]);

  const updateNewRow = useCallback(
    (newValue: any) => {
      setNewRow({
        data: newValue,
        error: "",
      });
    },
    [newRow],
  );

  useEffect(() => {
    setNewRow({ data: "", error: "" });
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
          "overflow-auto rounded px-1",
          theme.textInput,
          theme.focusWithin,
          theme.bg3,
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
        <div
          className="w-full border-separate"
          style={{
            borderSpacing: "0px 4px",
          }}
        >
          <div className="spacing-y-1">
            {internalRows.map(({ data: row, error }, index) => (
              <div key={index}>
                <JsonResponseInput
                  value={JSON.stringify(row) || ""}
                  loading={false}
                  json={true}
                  dataTestid={`ex.DynamodbTable:row-${index}`}
                />
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
              </div>
            ))}
            {!readonly && (
              <div className="flex flex-col">
                <div>
                  <div
                    className={classNames(
                      "inline-block whitespace-nowrap",
                      theme.bg1,
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
                  className="text-sm min-h-[2rem]"
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
