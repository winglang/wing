import { DisplayMetaComponent } from "@wingconsole/server";
import { useEffect, useState } from "react";

import { trpc } from "./trpc.js";
export interface UseCustomResourceProps {
  resourcePath: string;
}
export const useCustomResource = ({ resourcePath }: UseCustomResourceProps) => {
  const displayMeta = trpc["custom-resource.getDisplayMeta"].useQuery({
    resourcePath,
  });

  const [displayComponents, setDisplayComponents] = useState<
    DisplayMetaComponent[]
  >([]);

  useEffect(() => {
    if (!displayMeta.data) {
      return;
    }
    setDisplayComponents(displayMeta.data);
  }, [displayMeta.data, setDisplayComponents]);

  return {
    displayComponents,
  };
};
