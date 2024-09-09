import { useNotifications } from "@wingconsole/design-system";
import { memo, useCallback } from "react";

import { TopicInteraction } from "./topic-interaction.js";
import { useTopic } from "./use-topic.js";

export interface TopicViewProps {
  resourcePath: string;
}

export const TopicInteractionView = memo(({ resourcePath }: TopicViewProps) => {
  const { publishMessage } = useTopic({ resourcePath });

  const { showNotification } = useNotifications();

  const handlePublish = useCallback(
    (message: string) => {
      if (!message) {
        return;
      }
      publishMessage(message);
      showNotification("Message published", { body: message, type: "success" });
    },
    [publishMessage, showNotification],
  );

  return (
    <TopicInteraction
      resourceId={resourcePath}
      onPublishClick={handlePublish}
    />
  );
});
