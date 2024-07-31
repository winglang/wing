import { useNotifications, Attribute } from "@wingconsole/design-system";
import { memo, useCallback, useEffect, useMemo, useState } from "react";

import { trpc } from "../../../trpc.js";

import { TableInteraction, type Row } from "./table-interaction.js";

export interface CustomResourceTableProps {
  label: string;
  putHandler: string;
  deleteHandler: string;
  scanHandler: string;
  primaryKeyHandler: string;
}

export const CustomResourceTable = memo(
  ({ label, scanHandler }: CustomResourceTableProps) => {
    const tableScan = trpc["table.scan"].useQuery({
      resourcePath: scanHandler,
    });

    const loading = useMemo(() => {
      return tableScan.isFetching;
    }, [tableScan.isFetching]);

    return (
      <div className="h-full flex-1 flex flex-col text-sm pl-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col space-y-1">
            {/* <div className="w-full">
              <Attribute name="Name" value={label} noLeftPadding />
            </div> */}
            <div className="flex items-center gap-2 justify-end">
              {tableScan.data && (
                <TableInteraction rows={tableScan.data} loading={loading} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
);
