import { useTheme } from "@wingconsole/design-system";
import classNames from "classnames";
import { useContext, useId, useState } from "react";

import { AppContext } from "../../AppContext.js";
import { Button } from "../../design-system/Button.js";
import { TextArea } from "../../design-system/TextArea.js";
import { trpc } from "../../utils/trpc.js";
import { JsonResponseInput } from "../JsonResponseInput.js";

export interface FunctionViewProps {
  resourcePath: string;
}

export const FunctionView = ({ resourcePath }: FunctionViewProps) => {
  const { theme } = useTheme();

  const { appMode } = useContext(AppContext);

  const [payload, setPayload] = useState("");
  const [response, setResponse] = useState("");
  const payloadId = useId();
  const responseId = useId();

  const invoke = trpc["function.invoke"].useMutation({
    onSuccess: (data) => {
      setResponse(JSON.stringify(data, undefined, 2));
    },
  });

  return (
    <>
      <div className="h-full flex-1 flex flex-col text-sm">
        <div className="flex flex-col gap-2">
          <TextArea
            id={payloadId}
            placeholder="Payload"
            className="text-xs"
            value={payload}
            onInput={(event) => setPayload(event.currentTarget.value)}
            disabled={invoke.isLoading}
          />
          <div className="flex gap-2 justify-end">
            <Button
              label="Send"
              onClick={() => invoke.mutate({ resourcePath, message: payload })}
              disabled={invoke.isLoading}
            />
          </div>
          <div>
            <label
              htmlFor={responseId}
              className={classNames("text-sm", theme.text2)}
            >
              Response
            </label>
            <JsonResponseInput
              value={response}
              loading={invoke.isLoading}
              placeholder="No response"
              className="max-h-[20rem]"
            />
          </div>
        </div>
      </div>
    </>
  );
};
