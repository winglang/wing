import { KeyValueList } from "../../design-system/KeyValueList.js";
import { ResponseInput } from "../ResponseInput.js";

import { ApiResponseHeader } from "./api-helper.js";

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
