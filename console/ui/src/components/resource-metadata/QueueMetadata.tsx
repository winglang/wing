import {
  useTheme,
  Button,
  useNotifications,
  Attribute,
} from "@wingconsole/design-system";
import classNames from "classnames";

import { MetadataNode } from "../../ui/resource-metadata.js";
import { trpc } from "../../utils/trpc.js";

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
      <Attribute name="Timeout" value={`${node.props?.timeout}s`} />
      <Attribute name="Approx size">
        <div className="flex gap-2">
          <label>{approxSize.data}</label>
          <Button
            small
            label="Purge"
            onClick={() => purge.mutateAsync({ resourcePath: node.path })}
            disabled={approxSize.data === 0}
          />
        </div>
      </Attribute>
    </div>
  );
};
