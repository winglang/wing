import { memo } from "react";

import { QueueInteraction } from "./queue-interaction.js";
import { useQueue } from "./use-queue.js";

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
