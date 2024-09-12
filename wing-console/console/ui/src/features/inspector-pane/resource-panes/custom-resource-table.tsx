import { memo } from "react";

import { trpc } from "../../../trpc.js";
import { useConsoleEnvironment } from "../../console-environment-context/console-environment-context.js";

import { TableInteraction } from "./table-interaction.js";

export interface CustomResourceTableProps {
  scanHandler: string;
}

export const CustomResourceTable = memo(
  ({ scanHandler }: CustomResourceTableProps) => {
    const { consoleEnvironment: environmentId } = useConsoleEnvironment();
    const tableScan = trpc["table.scan"].useQuery({
      environmentId,
      resourcePath: scanHandler,
    });

    return (
      <div className="h-full flex-1 flex flex-col text-sm pl-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col space-y-1">
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
