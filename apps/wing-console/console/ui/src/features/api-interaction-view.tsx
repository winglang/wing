import { OpenApiSpec } from "@wingconsole/server/src/wingsdk";
import { memo, useCallback, useContext, useState } from "react";

import { AppContext } from "../AppContext.js";
import { useApi } from "../services/use-api.js";
import { ApiResponse } from "../shared/api.js";
import { ApiInteraction } from "../ui/api-interaction.js";

export interface ApiViewProps {
  resourcePath: string;
}

export const ApiInteractionView = memo(({ resourcePath }: ApiViewProps) => {
  const { appMode } = useContext(AppContext);
  const [schemaData, setSchemaData] = useState<OpenApiSpec>();
  const [apiResponse, setApiResponse] = useState<ApiResponse>();
  const onFetchDataUpdate = useCallback(
    (data: ApiResponse) => setApiResponse(data),
    [],
  );
  const onSchemaDataUpdate = useCallback(
    (data: OpenApiSpec) => setSchemaData(data),
    [],
  );
  const { isLoading, callFetch } = useApi({
    resourcePath,
    onSchemaDataUpdate,
    onFetchDataUpdate,
  });

  return (
    <ApiInteraction
      resourceId={resourcePath}
      appMode={appMode}
      schemaData={schemaData}
      callFetch={callFetch}
      isLoading={isLoading}
      apiResponse={apiResponse}
    />
  );
});
