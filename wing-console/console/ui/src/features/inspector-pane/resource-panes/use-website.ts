import { useEffect, useState } from "react";

import { trpc } from "../../../trpc.js";
import { useConsoleEnvironment } from "../../console-environment-context/console-environment-context.js";

export interface UseWebsiteOptions {
  resourcePath: string;
}
export const useWebsite = ({ resourcePath }: UseWebsiteOptions) => {
  const { consoleEnvironment: environmentId } = useConsoleEnvironment();
  const websiteUrl = trpc["website.url"].useQuery({
    resourcePath,
    environmentId,
  });
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(websiteUrl.data ?? "");
  }, [websiteUrl.data]);

  return {
    url,
  };
};
