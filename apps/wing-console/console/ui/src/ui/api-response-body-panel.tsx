import { useTheme, JsonResponseInput } from "@wingconsole/design-system";
import classNames from "classnames";

import { ApiResponse } from "../shared/api.js";

const getResponseColor: (status: number) => string = (status) => {
  if (status >= 200 && status < 300) {
    return "text-green-500";
  }
  if (status >= 300 && status < 400) {
    return "text-blue-500";
  }
  if (status >= 400 && status < 500) {
    return "text-orange-500";
  }
  if (status >= 500 && status < 600) {
    return "text-red-500";
  }
  return "gray";
};
interface ApiBodyPanelProps {
  response: ApiResponse | undefined;
  isLoading: boolean;
}

export const ApiResponseBodyPanel = ({
  response,
  isLoading,
}: ApiBodyPanelProps) => {
  const { theme } = useTheme();
  return (
    <div className="pt-2 relative">
      <JsonResponseInput
        value={response?.textResponse || ""}
        loading={isLoading}
        placeholder="No body"
        json={true}
      />
      {response && (
        <div
          className={classNames(
            "flex justify-end",
            "gap-x-1.5 truncate items-center mt-0.5",
          )}
        >
          <span
            className={classNames(
              getResponseColor(response.status),
              "text-xs truncate",
            )}
          >
            {response.status} {response.statusText}
          </span>
          {response.duration >= 0 && (
            <span className={classNames(theme.text2, "text-xs truncate")}>
              {response.duration}ms
            </span>
          )}
        </div>
      )}
    </div>
  );
};
