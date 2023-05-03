import { useTheme } from "@wingconsole/design-system";
import classNames from "classnames";

import { JsonResponseInput } from "../JsonResponseInput.js";

import { ApiResponse } from "./api-helper.js";

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
      {response && (
        <div
          className={classNames(
            "gap-x-1 truncate items-center absolute -top-[12px] right-[2px] max-w-full z-10",
          )}
        >
          <span
            className={classNames(
              getResponseColor(response.status),
              "text-xs ml-1 truncate",
            )}
          >
            {response.status} {response.statusText}
          </span>
          {response.duration >= 0 && (
            <span className={classNames(theme.text2, "text-xs ml-1 truncate")}>
              {response.duration}ms
            </span>
          )}
        </div>
      )}
      <JsonResponseInput
        value={response?.textResponse || ""}
        loading={isLoading}
        placeholder="No response"
        json={true}
      />
    </div>
  );
};
