import { Button, TextArea } from "@wingconsole/design-system";
import { useCallback, useId, useState } from "react";

export interface QueueInteractionProps {
  isLoading: boolean;
  onPushMessageClick: (message: string) => void;
}
export const QueueInteraction = ({
  isLoading,
  onPushMessageClick,
}: QueueInteractionProps) => {
  const [message, setMessage] = useState("");

  const pushMessage = useCallback(async () => {
    if (!message || message === "") {
      return;
    }
    onPushMessageClick(message);
  }, [message, onPushMessageClick]);

  const elementId = useId();

  return (
    <div className="h-full flex-1 flex flex-col text-sm">
      <div className="flex flex-col gap-2">
        <TextArea
          id={elementId}
          className="text-xs"
          value={message}
          onInput={(event) => setMessage(event.currentTarget.value)}
          disabled={isLoading}
        />
        <div className="flex gap-2 justify-end">
          <Button label="Push" onClick={pushMessage} disabled={isLoading} />
        </div>
      </div>
    </div>
  );
};
