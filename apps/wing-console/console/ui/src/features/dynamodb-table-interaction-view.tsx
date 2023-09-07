import { useNotifications, Attribute } from "@wingconsole/design-system";
import { useCallback, useEffect, useState } from "react";

import { useDynamodbTable } from "../services/use-dynamodb-table.js";
import {
  RowData,
  DynamodbTableInteraction,
} from "../ui/dynamodb-table-interaction.js";

export interface DynamodbTableInteractionViewProps {
  resourcePath: string;
}

export const DynamodbTableInteractionView = ({
  resourcePath,
}: DynamodbTableInteractionViewProps) => {
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

  const { table, removeRow, addRow, loading } = useDynamodbTable({
    resourcePath,
  });

  const [rows, setRows] = useState<{ data: {}; error: string }[]>([]);

  const onAddRow = useCallback(
    async (row: RowData) => {
      try {
        await addRow(row);
      } catch (error: any) {
        showError(error.message);
      }
    },
    [addRow, showError, table.data?.keySchema],
  );

  const onRemoveRow = useCallback(
    async (index: number) => {
      await removeRow(index);
    },
    [removeRow],
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
            <Attribute name="Name" value={table.data?.name} noLeftPadding />
          </div>

          <div className="flex items-center gap-2 justify-end">
            <DynamodbTableInteraction
              rows={rows}
              keySchema={table.data?.keySchema || {}}
              onAddRow={onAddRow}
              onRemoveRow={onRemoveRow}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
