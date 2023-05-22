import { useCallback, useEffect, useState } from "react";

import { useNotifications } from "../../design-system/Notification.js";
import { useTable } from "../../utils/use-table.js";
import { AttributeView } from "../AttributeView.js";
import { Row, RowData, Table } from "../table.js";

export interface TableViewProps {
  resourcePath: string;
}

export const TableView = ({ resourcePath }: TableViewProps) => {
  const notifications = useNotifications();

  const showError = useCallback(
    (error: string) => {
      notifications.showNotification("Error", {
        body: error,
        type: "error",
      });
    },
    [notifications],
  );

  const { table, editRow, removeRow, addRow, loading } = useTable({
    resourcePath,
  });

  const [rows, setRows] = useState<Row[]>([]);

  const handleError = useCallback(
    (row: RowData, error: string) => {
      const primaryKey = table.data?.primaryKey;
      if (!primaryKey) {
        return;
      }

      const index = rows.findIndex(
        (r) => r.data[primaryKey] === row[primaryKey],
      );

      if (index >= 0) {
        setRows((rows) => {
          const newRows = [...rows];
          newRows[index] = {
            data: row,
            error,
          };
          return newRows;
        });
      }

      showError(`Row "${row[primaryKey]}": ${error}`);
    },
    [setRows, showError, rows, table.data?.primaryKey],
  );

  const onAddRow = useCallback(
    async (row: RowData) => {
      try {
        await addRow(row);
      } catch (error: any) {
        const primaryKey = table.data?.primaryKey;
        if (!primaryKey) {
          return;
        }
        showError(error.message);
      }
    },
    [addRow, showError, table.data?.primaryKey],
  );

  const onRemoveRow = useCallback(
    async (index: number) => {
      await removeRow(index);
    },
    [removeRow],
  );

  const onEditRow = useCallback(
    async (row: any) => {
      try {
        await editRow(row);
      } catch (error: any) {
        handleError(row, error.message);
      }
    },
    [editRow, handleError],
  );

  useEffect(() => {
    if (table.data?.rows) {
      const rows = table.data.rows.map((row) => {
        return {
          data: row,
          error: "",
        };
      });
      setRows(rows);
    }
  }, [table.data?.rows]);

  return (
    <div className="h-full flex-1 flex flex-col text-sm">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col space-y-1">
          <div className="w-full">
            <AttributeView name="Name" value={table.data?.name} noLeftPadding />
          </div>

          <div className="flex items-center gap-2 justify-end">
            <Table
              columns={table.data?.columns || []}
              rows={rows}
              primaryKey={table.data?.primaryKey || ""}
              onAddRow={onAddRow}
              onEditRow={onEditRow}
              onRemoveRow={onRemoveRow}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
