import {
  Button,
  JsonResponseInput,
  TextArea,
  useTheme,
} from "@wingconsole/design-system";
import classNames from "classnames";
import { useId, useState } from "react";

import { useFunction } from "../services/use-function.js";

export interface FunctionInteractionProps {
  onInvokeClick: (payload: string) => void;
  isLoading: boolean;
  response: string;
}
export const FunctionInteraction = ({
  onInvokeClick,
  isLoading,
  response,
}: FunctionInteractionProps) => {
  const { theme } = useTheme();

  const [payload, setPayload] = useState("");
  const payloadElementId = useId();
  const responseElementId = useId();

  return (
    <>
      <div className="h-full flex-1 flex flex-col text-sm">
        <div className="flex flex-col gap-2">
          <TextArea
            id={payloadElementId}
            placeholder="Payload"
            className="text-xs"
            value={payload}
            onInput={(event) => setPayload(event.currentTarget.value)}
            disabled={isLoading}
          />
          <div className="flex gap-2 justify-end">
            <Button
              label="Invoke"
              onClick={() => onInvokeClick(payload)}
              disabled={isLoading}
            />
          </div>
          <div>
            <label
              htmlFor={responseElementId}
              className={classNames("text-sm", theme.text2)}
            >
              Response
            </label>
            <JsonResponseInput
              value={response}
              loading={isLoading}
              placeholder="No response"
              className="max-h-[20rem]"
            />
          </div>
        </div>
      </div>
    </>
  );
};
