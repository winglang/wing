import { Button, TextArea } from "@wingconsole/design-system";
import { createPersistentState } from "@wingconsole/use-persistent-state";
import { useId } from "react";

export interface TopicInteractionProps {
  resourceId: string;
  onPublishClick: (message: string) => void;
}

export const TopicInteraction = ({
  resourceId,
  onPublishClick,
}: TopicInteractionProps) => {
  const { usePersistentState } = createPersistentState(resourceId);

  const [message, setMessage] = usePersistentState("");
  const elementId = useId();

  return (
    <div className="h-full flex-1 flex flex-col text-sm">
      <div className="flex flex-col gap-2">
        <TextArea
          id={elementId}
          className="text-xs"
          value={message}
          dataTestid="cloud.topic:message"
          onInput={(event) => setMessage(event.currentTarget.value)}
        />
        <div className="flex gap-2 justify-end">
          <Button
            label="Publish"
            onClick={() => onPublishClick(message)}
            dataTestid="cloud.topic:send-message"
          />
        </div>
      </div>
    </div>
  );
};
