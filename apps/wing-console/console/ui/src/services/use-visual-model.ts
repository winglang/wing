import { VisualModel } from "@wingconsole/server";
import { useEffect, useState } from "react";

import { trpc } from "./trpc.js";
export interface UseCustomResourceProps {
  resourcePath: string;
}
export const useVisualModel = ({ resourcePath }: UseCustomResourceProps) => {
  const visualModel = trpc["resource.visualModel"].useQuery({
    resourcePath,
  });

  const [visualModelData, setVisualModelData] = useState<VisualModel>();

  useEffect(() => {
    if (!visualModel.data) {
      return;
    }
    setVisualModelData(visualModel.data);
  }, [visualModel.data]);

  return {
    visualModelData,
  };
};
