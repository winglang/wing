import { Attribute } from "@wingconsole/design-system";
import { useContext, useState } from "react";

import { AppContext } from "../AppContext.js";
import { trpc } from "../services/trpc.js";
import { useApi } from "../services/use-api.js";

import { ApiInteraction } from "./api-interaction.js";

export interface CustomResourceHttpClientItemProps {
  label: string;
  getUrlHandler: string;
  getApiSpecHandler: string;
}

export const CustomResourceHttpClientItem = ({
  label,
  getUrlHandler,
  getApiSpecHandler,
}: CustomResourceHttpClientItemProps) => {
  const { appMode } = useContext(AppContext);

  const urlData = trpc["httpClient.getUrl"].useQuery(
    {
      resourcePath: getUrlHandler,
    },
    { enabled: !!getUrlHandler },
  );

  const openApiSpecData = trpc["httpClient.getOpenApiSpec"].useQuery(
    {
      resourcePath: getApiSpecHandler,
    },
    { enabled: !!getApiSpecHandler },
  );

  const [response, setResponse] = useState();
  const { callFetch, isLoading } = useApi({
    onFetchDataUpdate: (data) => {
      setResponse(data);
    },
  });

  return (
    <div className="pl-4">
      <div className="mb-1">
        <Attribute name="Name" value={label} noLeftPadding />
      </div>
      {urlData.data?.url && openApiSpecData.data?.openApiSpec && (
        <ApiInteraction
          resourceId={getUrlHandler}
          url={urlData.data.url}
          appMode={appMode}
          openApiSpec={openApiSpecData.data.openApiSpec}
          callFetch={callFetch}
          isLoading={isLoading}
          apiResponse={response}
        />
      )}
    </div>
  );
};
