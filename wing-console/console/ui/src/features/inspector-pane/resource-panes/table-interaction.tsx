import type { Column } from "@wingconsole/design-system";
import { SpinnerLoader, useTheme, TableRow } from "@wingconsole/design-system";
import classNames from "classnames";
import { memo, useMemo } from "react";

export type Row = Record<string, any>;

export interface TableInteractionProps {
  rows?: Row[];
  loading?: boolean;
}

export const TableInteraction = memo(
  ({ rows, loading = false }: TableInteractionProps) => {
    const { theme } = useTheme();

    const columns: Column[] = useMemo(() => {
      const columns = rows?.flatMap((row) => Object.keys(row));
      return [...new Set(columns).values()]
        .sort()
        .map((name) => ({ name, type: "text" }));
    }, [rows]);

    const hasRows = rows && rows.length > 0;

    return (
      <div className="inline-block align-middle w-full mt-1">
        <div
          className={classNames(
            "relative min-h-[2rem] max-h-[30rem]",
            "overflow-auto rounded border px-1",
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
              {hasRows && (
                <tr
                  className={classNames(
                    theme.bgInput,
                    "px-1 sticky top-[4px] z-10 border-spacing-x-0",
                  )}
                >
                  {columns.map(({ name }) => (
                    <th
                      key={name}
                      className={classNames(
                        "text-sm px-1.5",
                        "border-b border-slate-300 dark:border-slate-700",
                        "text-left",
                      )}
                    >
                      {name}
                    </th>
                  ))}
                  <th
                    className={classNames(
                      "w-0",
                      "border-b border-slate-300 dark:border-slate-700",
                    )}
                  ></th>
                </tr>
              )}
            </thead>
            <tbody className="spacing-y-1">
              {!hasRows && (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className={classNames(
                      "text-center text-xs py-4",
                      theme.text2,
                    )}
                  >
                    No rows
                  </td>
                </tr>
              )}
              {rows?.map((row, index) => (
                <TableRow key={index} row={row} columns={columns} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  },
);
