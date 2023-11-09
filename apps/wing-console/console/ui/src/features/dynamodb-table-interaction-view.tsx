import { useNotifications, Attribute } from "@wingconsole/design-system";
import { memo, useCallback, useEffect, useState } from "react";

import { useDynamodbTable } from "../services/use-dynamodb-table.js";
import {
  DynamodbTableInteraction,
  RawRow,
} from "../ui/dynamodb-table-interaction.js";

export interface DynamodbTableInteractionViewProps {
  resourcePath: string;
}

export const DynamodbTableInteractionView = memo(
  ({ resourcePath }: DynamodbTableInteractionViewProps) => {
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
      async (data: RawRow) => {
        try {
          if (data.error) {
            showError(`Row error: ${data.error}`);
            return;
          }

          const row = JSON.parse(data.data);
          await addRow(row);
        } catch (error: any) {
          showError(`Failed to add row: ${error.message}`);
        }
      },
      [addRow, showError],
    );

    const onRemoveRow = useCallback(
      async (index: number) => {
        await removeRow(index);
      },
      [removeRow],
    );

    useEffect(() => {
      if (table.data?.rows) {
        const rows = table.data.rows.items.map((row) => {
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

            {table.data && (
              <div className="flex items-center gap-2 justify-end">
                <DynamodbTableInteraction
                  rows={rows}
                  hashKey={table.data.hashKey}
                  rangeKey={table.data.rangeKey}
                  onAddRow={onAddRow}
                  onRemoveRow={onRemoveRow}
                  loading={loading}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
);
