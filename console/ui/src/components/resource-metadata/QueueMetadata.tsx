import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useTheme } from "@wingconsole/design-system";
import classNames from "classnames";

import { Button } from "../../design-system/Button.js";
import { useNotifications } from "../../design-system/Notification.js";
import { trpc } from "../../utils/trpc.js";
import { AttributeView } from "../AttributeView.js";
import { MetadataNode } from "../MetadataPanel.js";

export interface QueueMetadataProps {
  node: MetadataNode;
}

export const QueueMetadata = ({ node }: QueueMetadataProps) => {
  const { theme } = useTheme();

  const { showNotification } = useNotifications();

  const approxSize = trpc["queue.approxSize"].useQuery({
    resourcePath: node.path,
  });
  const purge = trpc["queue.purge"].useMutation({
    onSuccess: () => {
      showNotification("Queue was purged", { type: "success" });
    },
  });

  return (
    <div
      className={classNames(
        "px-2 pt-1.5 flex flex-col gap-y-1 gap-x-4",
        theme.bg3,
        theme.text2,
      )}
    >
      <AttributeView name="Timeout" value={`${node.props?.timeout}s`} />
      <AttributeView name="Approx size">
        <div className="flex gap-2">
          <label>{approxSize.data}</label>
          <Button
            small
            label="Purge"
            onClick={() => purge.mutateAsync({ resourcePath: node.path })}
            disabled={approxSize.data === 0}
          />
        </div>
      </AttributeView>
    </div>
  );
};
