import type { OpenApiSpec } from "@wingconsole/server/src/wingsdk";
import { createPersistentState } from "@wingconsole/use-persistent-state";
import { memo, useCallback, useContext, useState } from "react";

import { AppContext } from "../../../AppContext.js";
import { trpc } from "../../../trpc.js";
import { useConsoleEnvironment } from "../../console-environment-context/console-environment-context.js";

import { ApiInteraction } from "./api-interaction.js";
import type { ApiResponse } from "./api.js";
import { useApi } from "./use-api.js";

export interface ApiViewProps {
  resourcePath: string;
}

export const ApiInteractionView = memo(({ resourcePath }: ApiViewProps) => {
  const { appMode } = useContext(AppContext);
  const { usePersistentState } = createPersistentState(resourcePath);

  const [apiResponse, setApiResponse] = usePersistentState<
    ApiResponse | undefined
  >();
  const onFetchDataUpdate = useCallback(
    (data: ApiResponse) => {
      if (!data) {
        return;
      }
      setApiResponse(data);
    },
    [setApiResponse],
  );

  const { consoleEnvironment: environmentId } = useConsoleEnvironment();
  const schema = trpc["api.schema"].useQuery({ environmentId, resourcePath });

  const { isLoading, callFetch } = useApi({
    onFetchDataUpdate,
  });

  return (
    <ApiInteraction
      resourceId={resourcePath}
      appMode={appMode}
      url={schema.data?.url}
      openApiSpec={schema.data?.openApiSpec as OpenApiSpec}
      callFetch={callFetch}
      isLoading={isLoading}
      apiResponse={apiResponse}
      resetApiResponse={() => setApiResponse(undefined)}
    />
  );
});
