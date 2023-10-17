import { useEffect, useState } from "react";

import { trpc } from "./trpc.js";

export interface UseWebsiteOptions {
  resourcePath: string;
}
export const useWebsite = ({ resourcePath }: UseWebsiteOptions) => {
  const websiteUrl = trpc["website.url"].useQuery({ resourcePath });
  const websiteVisualModel = trpc["website.visualModel"].useQuery({
    resourcePath,
  });
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(websiteUrl.data ?? "");
  }, [websiteUrl.data]);

  useEffect(() => {
    console.log(websiteVisualModel.data);
  }, [websiteVisualModel.data]);

  return {
    url,
  };
};
