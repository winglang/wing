import { useCallback, useMemo } from "react";

import { trpc } from "./trpc.js";

export interface UseTableOptions {
  resourcePath: string;
}

export const useDynamodbTable = ({ resourcePath }: UseTableOptions) => {
  const table = trpc["dynamodb-table.info"].useQuery({ resourcePath });
  const tableInsert = trpc["dynamodb-table.insert"].useMutation();
  const tableDelete = trpc["dynamodb-table.delete"].useMutation();

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
      const row = table.data?.rows.items[index];
      if (!row) {
        return;
      }
      await tableDelete.mutateAsync({
        resourcePath,
        data: row,
      });
    },
    [tableDelete, resourcePath, table.data?.rows],
  );

  const loading = useMemo(() => {
    return table.isFetching || tableInsert.isLoading || tableDelete.isLoading;
  }, [tableInsert.isLoading, tableDelete.isLoading, table.isFetching]);

  return {
    table,
    addRow,
    removeRow,
    loading,
  };
};
