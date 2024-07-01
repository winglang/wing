import {
  Button,
  JsonResponseInput,
  TextArea,
  useTheme,
} from "@wingconsole/design-system";
import { createPersistentState } from "@wingconsole/use-persistent-state";
import classNames from "classnames";
import { useId } from "react";

export interface FunctionInteractionProps {
  resourceId: string;
  onInvokeClick: (payload: string) => void;
  isLoading: boolean;
  response: string;
}
export const FunctionInteraction = ({
  resourceId,
  onInvokeClick,
  isLoading,
  response,
}: FunctionInteractionProps) => {
  const { theme } = useTheme();

  const { usePersistentState } = createPersistentState(resourceId);

  const [payload, setPayload] = usePersistentState("");
  const payloadElementId = useId();
  const responseElementId = useId();

  // TODO: useCallback

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
              dataTestid="cloud.function:invoke"
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
              dataTestid="cloud.function:response"
            />
          </div>
        </div>
      </div>
    </>
  );
};
