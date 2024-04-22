import { Attribute } from "@wingconsole/design-system";
import { createPersistentState } from "@wingconsole/use-persistent-state";
import { useContext } from "react";

import { AppContext } from "../AppContext.js";
import { trpc } from "../services/trpc.js";
import { useApi } from "../services/use-api.js";
import type { ApiResponse } from "../shared/api.js";

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
  const { usePersistentState } = createPersistentState(getApiSpecHandler);

  const [openApiSpec, setOpenApiSpec] = usePersistentState<ApiResponse>();

  const urlData = trpc["httpClient.getUrl"].useQuery(
    {
      resourcePath: getUrlHandler,
    },
    { enabled: !!getUrlHandler },
  );

  trpc["httpClient.getOpenApiSpec"].useQuery(
    {
      resourcePath: getApiSpecHandler,
    },
    {
      enabled: !!getApiSpecHandler,
      onSuccess: (data) => setOpenApiSpec(data.openApiSpec),
    },
  );

  const [apiResponse, setApiResponse] = usePersistentState<ApiResponse>();

  const { callFetch, isLoading } = useApi({
    onFetchDataUpdate: (data: ApiResponse) => {
      if (!data) {
        return;
      }
      setApiResponse(data);
    },
  });

  return (
    <div className="pl-4">
      <div className="mb-1">
        <Attribute name="Name" value={label} noLeftPadding />
      </div>
      {urlData.data?.url && openApiSpec && (
        <ApiInteraction
          resourceId={getUrlHandler}
          url={urlData.data.url}
          appMode={appMode}
          openApiSpec={openApiSpec}
          callFetch={callFetch}
          isLoading={isLoading}
          apiResponse={apiResponse}
          setApiResponse={setApiResponse}
        />
      )}
    </div>
  );
};
