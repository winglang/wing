import { Button, TextArea } from "@wingconsole/design-system";
import { useId, useState } from "react";

export interface TopicInteractionProps {
  onPublishClick: (message: string) => void;
}
export const TopicInteraction = ({ onPublishClick }: TopicInteractionProps) => {
  const [message, setMessage] = useState("");
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
