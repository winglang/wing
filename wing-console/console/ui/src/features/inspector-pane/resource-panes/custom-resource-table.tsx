import { memo } from "react";

import { trpc } from "../../../trpc.js";

import { TableInteraction } from "./table-interaction.js";
import { Button } from "@wingconsole/design-system";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

export interface CustomResourceTableProps {
  scanHandler: string;
}

export const CustomResourceTable = memo(
  ({ scanHandler }: CustomResourceTableProps) => {
    const tableScan = trpc["table.scan"].useQuery({
      resourcePath: scanHandler,
    });

    return (
      <div className="h-full flex-1 flex flex-col text-sm pl-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center gap-1 justify-end">
              <Button
                label="Refresh"
                icon={ArrowPathIcon}
                onClick={() => {
                  tableScan.refetch();
                }}
              />
            </div>
            <div className="flex items-center gap-2 justify-end">
              {tableScan.data && (
                <TableInteraction
                  rows={tableScan.data}
                  loading={tableScan.isLoading}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
);
