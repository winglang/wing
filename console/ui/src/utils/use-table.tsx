import { useCallback, useEffect, useMemo, useState } from "react";

import { trpc } from "./trpc.js";

export interface UseTableOptions {
  resourcePath: string;
}

export const useTable = ({ resourcePath }: UseTableOptions) => {
  const table = trpc["table.info"].useQuery({ resourcePath });
  const tableInsert = trpc["table.insert"].useMutation();
  const tableUpdate = trpc["table.update"].useMutation();
  const tableDelete = trpc["table.delete"].useMutation();

  const addRow = useCallback(
    async (row: any) => {
      await tableInsert.mutateAsync({
        resourcePath,
        data: row,
      });
    },
    [tableInsert, resourcePath],
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
      table.isFetching ||
      tableInsert.isLoading ||
      tableUpdate.isLoading ||
      tableDelete.isLoading
    );
  }, [
    tableInsert.isLoading,
    tableUpdate.isLoading,
    tableDelete.isLoading,
    table.isFetching,
  ]);

  return {
    table,
    addRow,
    removeRow,
    editRow,
    loading,
  };
};
