import { KeyValueList, ResponseInput } from "@wingconsole/design-system";

import { ApiResponseHeader } from "../shared/api.js";

export interface ApiHeadersPanelProps {
  headers: ApiResponseHeader[];
  isLoading: boolean;
}
export const ApiResponseHeadersPanel = ({
  headers,
  isLoading,
}: ApiHeadersPanelProps) => {
  return (
    <div className="pt-2">
      <ResponseInput empty={headers.length === 0} loading={isLoading}>
        <KeyValueList items={headers || []} readonly />
      </ResponseInput>
    </div>
  );
};
