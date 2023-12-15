import { useEffect, useState } from "react";

import { trpc } from "./trpc.js";

export interface UseReactAppOptions {
  resourcePath: string;
}

export const useReactApp = ({ resourcePath }: UseReactAppOptions) => {
  const websiteUrl = trpc["reactApp.url"].useQuery({ resourcePath });
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(websiteUrl.data ?? "");
  }, [websiteUrl.data]);

  return {
    url,
  };
};
