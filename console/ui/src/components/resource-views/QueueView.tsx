import { TextArea, Button } from "@wingconsole/design-system";
import { useCallback, useContext, useId, useState } from "react";

import { AppContext } from "../../AppContext.js";
import { trpc } from "../../utils/trpc.js";

export interface QueueViewProps {
  resourcePath: string;
}

export const QueueView = ({ resourcePath }: QueueViewProps) => {
  const { appMode } = useContext(AppContext);
  const pushMessage = trpc["queue.push"].useMutation();

  const [message, setMessage] = useState("");

  const sendMessage = useCallback(async () => {
    if (!message || message === "") {
      return;
    }
    pushMessage.mutate({
      resourcePath,
      message: message,
    });
  }, [message, pushMessage, appMode, resourcePath]);

  const id = useId();

  return (
    <div className="h-full flex-1 flex flex-col text-sm">
      <div className="flex flex-col gap-2">
        <TextArea
          id={id}
          className="text-xs"
          value={message}
          onInput={(event) => setMessage(event.currentTarget.value)}
          disabled={pushMessage.isLoading}
        />
        <div className="flex gap-2 justify-end">
          <Button
            label="Send"
            onClick={() => sendMessage()}
            disabled={pushMessage.isLoading}
          />
        </div>
      </div>
    </div>
  );
};
