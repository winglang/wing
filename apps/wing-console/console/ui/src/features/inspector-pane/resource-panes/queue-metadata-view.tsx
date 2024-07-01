import { useNotifications } from "@wingconsole/design-system";
import { memo, useCallback } from "react";

import { QueueMetadata } from "./queue-metadata.js";
import type { MetadataNode } from "./resource-metadata.js";
import { useQueue } from "./use-queue.js";

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
