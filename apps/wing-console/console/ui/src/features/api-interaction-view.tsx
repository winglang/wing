import type { OpenApiSpec } from "@wingconsole/server/src/wingsdk";
import { memo, useCallback, useContext, useState } from "react";

import { AppContext } from "../AppContext.js";
import { trpc } from "../services/trpc.js";
import { useApi } from "../services/use-api.js";
import type { ApiResponse } from "../shared/api.js";
import { ApiInteraction } from "../ui/api-interaction.js";

export interface ApiViewProps {
  resourcePath: string;
}

export const ApiInteractionView = memo(({ resourcePath }: ApiViewProps) => {
  const { appMode } = useContext(AppContext);

  const [apiResponse, setApiResponse] = useState<ApiResponse>();
  const onFetchDataUpdate = useCallback(
    (data: ApiResponse) => setApiResponse(data),
    [],
  );

  const schema = trpc["api.schema"].useQuery({ resourcePath });

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
    />
  );
});
