import { useNotifications, Attribute } from "@wingconsole/design-system";
import { memo, useCallback, useEffect, useMemo, useState } from "react";

import { trpc } from "../../../trpc.js";

import {
  TableInteraction,
  type Row,
  type RowData,
} from "./table-interaction.js";
import { useTable } from "./use-table.js";

export interface CustomResourceTableProps {
  label: string;
  putHandler: string;
  deleteHandler: string;
  getHandler: string;
  scanHandler: string;
  resourcePath: string;
}

export const CustomResourceTable = memo(
  ({
    label,
    putHandler,
    deleteHandler,
    getHandler,
    scanHandler,
    resourcePath,
  }: CustomResourceTableProps) => {
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

    const tablePut = trpc["table.put"].useMutation({
      resourcePath: putHandler,
    });

    const tableUpdate = trpc["table.update"].useMutation({
      resourcePath: putHandler,
    });

    const tableDelete = trpc["table.delete"].useMutation({
      resourcePath: deleteHandler,
    });

    const tableScan = trpc["table.scan"].useQuery({
      resourcePath: scanHandler,
    });

    const addRow = useCallback(
      async (row: any) => {
        await tablePut.mutateAsync({
          resourcePath,
          data: row,
        });
      },
      [tablePut, resourcePath],
    );

    const removeRow = useCallback(
      async (index: number) => {
        if (!table.data?.rows[index]) {
          return;
        }
        await tableDelete.mutateAsync({
          resourcePath,
          data: table.data.rows[index] || {},
        });
      },
      [tableDelete, resourcePath, table.data?.rows],
    );

    const editRow = useCallback(
      async (row: any) => {
        await tableUpdate.mutateAsync({
          resourcePath,
          data: row,
        });
      },
      [tableUpdate, resourcePath],
    );

    const loading = useMemo(() => {
      return (
        tableScan.isFetching ||
        tablePut.isLoading ||
        tableUpdate.isLoading ||
        tableDelete.isLoading
      );
    }, [
      tablePut.isLoading,
      tableUpdate.isLoading,
      tableDelete.isLoading,
      tableScan.isFetching,
    ]);

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
      if (tableScan.data?.rows) {
        const rows = tableScan.data.rows.map((row: RowData) => {
          return {
            data: row,
            error: "",
          };
        });
        setRows(rows);
      }
    }, [tableScan.data?.rows]);

    return (
      <div className="h-full flex-1 flex flex-col text-sm">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col space-y-1">
            <div className="w-full">
              <Attribute name="Name" value={table.data?.name} noLeftPadding />
            </div>

            <div className="flex items-center gap-2 justify-end">
              <TableInteraction
                resourceId={resourcePath}
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
  },
);
