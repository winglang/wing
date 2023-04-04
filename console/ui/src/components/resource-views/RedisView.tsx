import { useState } from "react";

import { trpc } from "../../utils/trpc.js";
import { AttributeView } from "../AttributeView.js";

export interface RedisViewProps {
  resourcePath: string;
}

export const RedisView = ({ resourcePath }: RedisViewProps) => {
  const info = trpc["redis.info"].useQuery({ resourcePath });

  return (
    <div className="h-full flex-1 flex flex-col text-sm">
      <div className="flex flex-col gap-2">
        <AttributeView name="URL" value={info.data?.url} noLeftPadding />
      </div>
    </div>
  );
};
