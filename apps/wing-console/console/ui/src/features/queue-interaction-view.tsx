import { memo } from "react";

import { useQueue } from "../services/use-queue.js";
import { QueueInteraction } from "../ui/queue-interaction.js";

export interface QueueViewProps {
  resourcePath: string;
}

export const QueueInteractionView = memo(({ resourcePath }: QueueViewProps) => {
  const { isLoading, pushMessage } = useQueue({ resourcePath });
  return (
    <QueueInteraction
      resourceId={resourcePath}
      isLoading={isLoading}
      onPushMessageClick={pushMessage}
    />
  );
});
