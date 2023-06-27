import { useNotifications } from "@wingconsole/design-system";

import { useTopic } from "../services/use-topic.js";
import { TopicInteraction } from "../ui/topic-interaction.js";

export interface TopicViewProps {
  resourcePath: string;
}

export const TopicInteractionView = ({ resourcePath }: TopicViewProps) => {
  const { publishMessage } = useTopic({ resourcePath });

  const { showNotification } = useNotifications();

  const handlePublish = (message: string) => {
    if (!message) {
      return;
    }
    publishMessage(message);
    showNotification("Message published", { body: message, type: "success" });
  };

  return <TopicInteraction onPublishClick={handlePublish} />;
};
