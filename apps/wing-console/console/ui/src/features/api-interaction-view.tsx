import { OpenApiSpec } from "@wingconsole/server/src/wingsdk";
import { useContext, useState } from "react";

import { AppContext } from "../AppContext.js";
import { useApi } from "../services/use-api.js";
import { ApiResponse } from "../shared/api.js";
import { ApiInteraction } from "../ui/api-interaction.js";

export interface ApiViewProps {
  resourcePath: string;
}

export const ApiInteractionView = ({ resourcePath }: ApiViewProps) => {
  const { appMode } = useContext(AppContext);
  const [schemaData, setSchemaData] = useState<OpenApiSpec>();
  const [apiResponse, setApiResponse] = useState<ApiResponse>();
  const onFetchDataUpdate = (data: ApiResponse) => setApiResponse(data);
  const onSchemaDataUpdate = (data: OpenApiSpec) => setSchemaData(data);
  const { isLoading, callFetch } = useApi({
    resourcePath,
    onSchemaDataUpdate,
    onFetchDataUpdate,
  });

  return (
    <ApiInteraction
      appMode={appMode}
      schemaData={schemaData}
      callFetch={callFetch}
      isLoading={isLoading}
      apiResponse={apiResponse}
    />
  );
};
