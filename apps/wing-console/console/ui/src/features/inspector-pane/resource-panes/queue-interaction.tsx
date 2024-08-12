import { Button, TextArea } from "@wingconsole/design-system";
import { createPersistentState } from "@wingconsole/use-persistent-state";
import { useCallback, useId } from "react";

export interface QueueInteractionProps {
  resourceId: string;
  isLoading: boolean;
  onPushMessageClick: (message: string) => void;
}

export const QueueInteraction = ({
  resourceId,
  isLoading,
  onPushMessageClick,
}: QueueInteractionProps) => {
  const { usePersistentState } = createPersistentState(resourceId);

  const [message, setMessage] = usePersistentState("");

  const pushMessage = useCallback(async () => {
    if (!message || message === "") {
      return;
    }
    setMessage("");
    onPushMessageClick(message);
  }, [message, onPushMessageClick, setMessage]);

  const elementId = useId();

  return (
    <div className="h-full flex-1 flex flex-col text-sm">
      <div className="flex flex-col gap-2">
        <TextArea
          id={elementId}
          className="text-xs"
          value={message}
          dataTestid="cloud.queue:message"
          onInput={(event) => setMessage(event.currentTarget.value)}
          disabled={isLoading}
        />
        <div className="flex gap-2 justify-end">
          <Button
            label="Push"
            dataTestid="cloud.queue:push"
            onClick={pushMessage}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
};
