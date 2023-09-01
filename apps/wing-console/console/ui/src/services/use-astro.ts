import { useEffect, useState } from "react";

import { trpc } from "./trpc.js";

export interface UseAstroOptions {
  resourcePath: string;
}
export const useAstro = ({ resourcePath }: UseAstroOptions) => {
  const astroUrl = trpc["astro.url"].useQuery({ resourcePath });
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(astroUrl.data ?? "");
  }, [astroUrl.data]);

  return {
    url,
  };
};
