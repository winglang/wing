import { useNotifications, Attribute } from "@wingconsole/design-system";
import { memo, useCallback, useEffect, useMemo, useState } from "react";

import { trpc } from "../../../trpc.js";

import {
  TableInteraction,
  type Row,
  type RowData,
} from "./table-interaction.js";

export interface CustomResourceTableProps {
  label: string;
  putHandler: string;
  deleteHandler: string;
  scanHandler: string;
  primaryKeyHandler: string;
}

export const CustomResourceTable = memo(
  ({
    label,
    putHandler,
    deleteHandler,
    scanHandler,
    primaryKeyHandler,
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

    const primaryKeyQuery = trpc["table.primaryKey"].useQuery({
      resourcePath: primaryKeyHandler,
    });

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
        console.log(row);
        await tablePut.mutateAsync({
          data: row,
        });
      },
      [tablePut],
    );

    const removeRow = useCallback(
      async (index: number) => {
        await tableDelete.mutateAsync({
          data: tableScan?.data?.rows[index] || {},
        });
      },
      [tableDelete, tableScan?.data?.rows],
    );

    const editRow = useCallback(
      async (row: any) => {
        await tableUpdate.mutateAsync({
          data: row,
        });
      },
      [tableUpdate],
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
        const primaryKey = primaryKeyQuery?.data;
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
      [setRows, showError, rows, primaryKeyQuery.data],
    );

    const onAddRow = useCallback(
      async (row: RowData) => {
        try {
          await addRow(row);
        } catch (error: any) {
          const primaryKey = primaryKeyQuery?.data;
          if (!primaryKey) {
            return;
          }
          showError(error.message);
        }
      },
      [addRow, showError, primaryKeyQuery.data],
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
              <Attribute name="Name" value={label} noLeftPadding />
            </div>
            <div className="flex items-center gap-2 justify-end">
              <TableInteraction
                id={putHandler}
                rows={rows}
                primaryKey={primaryKeyQuery?.data || ""}
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
