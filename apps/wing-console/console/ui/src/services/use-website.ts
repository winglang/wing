import { trpc } from "./trpc.js";
import { useEffect, useState } from "react";

export interface UseWebsiteOptions {
  resourcePath: string;
}
export const useWebsite = ({ resourcePath }: UseWebsiteOptions) => {
  const websiteUrl = trpc["website.url"].useQuery({ resourcePath });
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(websiteUrl.data ?? "");
  }, [websiteUrl.data]);

  return {
    url,
  };
};
