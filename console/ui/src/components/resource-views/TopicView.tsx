import { TextArea, Button, useNotifications } from "@wingconsole/design-system";
import { useCallback, useContext, useId, useState } from "react";

import { AppContext } from "../../AppContext.js";
import { trpc } from "../../utils/trpc.js";

export interface TopicViewProps {
  resourcePath: string;
}

export const TopicView = ({ resourcePath }: TopicViewProps) => {
  const { appMode } = useContext(AppContext);
  const publish = trpc["topic.publish"].useMutation();

  const [message, setMessage] = useState("");
  const { showNotification } = useNotifications();

  const publishMessage = useCallback(async () => {
    if (!message) {
      return;
    }
    publish.mutate({
      resourcePath,
      message: message,
    });
    showNotification("Message published", { body: message, type: "success" });
  }, [message, publish, appMode, resourcePath, showNotification]);

  const id = useId();

  return (
    <div className="h-full flex-1 flex flex-col text-sm">
      <div className="flex flex-col gap-2">
        <TextArea
          id={id}
          className="text-xs"
          value={message}
          onInput={(event) => setMessage(event.currentTarget.value)}
        />
        <div className="flex gap-2 justify-end">
          <Button label="Publish" onClick={() => publishMessage()} />
        </div>
      </div>
    </div>
  );
};
