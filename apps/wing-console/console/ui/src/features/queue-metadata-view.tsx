import { useNotifications } from "@wingconsole/design-system";
import { memo, useCallback } from "react";

import { useQueue } from "../services/use-queue.js";
import { QueueMetadata } from "../ui/queue-metadata.js";
import type { MetadataNode } from "../ui/resource-metadata.js";

export interface QueueMetadataProps {
  node: MetadataNode;
}

export const QueueMetadataView = memo(({ node }: QueueMetadataProps) => {
  const { showNotification } = useNotifications();
  const { approxSize, purgeQueue } = useQueue({ resourcePath: node.path });

  const handlePurgeClick = useCallback(() => {
    purgeQueue(() => {
      showNotification("Queue was purged", { type: "success" });
    });
  }, [purgeQueue, showNotification]);

  return (
    <QueueMetadata
      approxSize={approxSize}
      timeout={node.props?.timeout ?? 0}
      onPurgeClick={handlePurgeClick}
    />
  );
});
