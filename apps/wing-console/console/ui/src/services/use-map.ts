import { useEffect, useState } from "react";

import { trpc } from "./trpc.js";

export interface UseMapOptions {
  showTests: boolean;
}
export const useMap = ({ showTests }: UseMapOptions) => {
  const map = trpc["app.map"].useQuery({
    showTests: showTests,
  });

  const [mapData, setMapData] = useState(map.data);

  useEffect(() => {
    setMapData(map.data);
  }, [map.data]);

  return {
    mapData,
  };
};
