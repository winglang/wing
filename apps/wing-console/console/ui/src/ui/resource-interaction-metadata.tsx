import { CursorArrowRaysIcon } from "@heroicons/react/24/outline";
import {
  IconComponent,
  InspectorSection,
  useTheme,
} from "@wingconsole/design-system";
import classNames from "classnames";

import { QueueMetadataView } from "../features/queue-metadata-view.js";
import { ResourceInteractionView } from "../features/resource-interaction-view.js";

import { BucketMetadata } from "./bucket-metadata.js";
import { CounterMetadata } from "./counter-metadata.js";
import { FunctionMetadata } from "./function-metadata.js";
import { MetadataNode } from "./resource-metadata-panel.js";
import { ScheduleMetadata } from "./schedule-metadata.js";

export interface ResourceInteractionMetadataProps {
  node: MetadataNode;
  name?: string;
  actionName?: string;
  icon?: IconComponent;
  isInspectorOpen: boolean;
  isActionInspectorOpen: boolean;
  onInspectorSectionToggle: (section: string) => void;
}
export const ResourceInteractionMetadata = ({
  node,
  name,
  actionName,
  icon,
  isInspectorOpen,
  isActionInspectorOpen,
  onInspectorSectionToggle,
}: ResourceInteractionMetadataProps) => {
  const { theme } = useTheme();

  return (
    <InspectorSection
      text={name || "Interact"}
      icon={icon || CursorArrowRaysIcon}
      open={isInspectorOpen}
      onClick={() => onInspectorSectionToggle("interact")}
      headingClassName="pl-2"
    >
      <div
        className={classNames(
          "border-t",
          theme.border4,
          theme.bg3,
          theme.text1,
        )}
      >
        {name && (
          <>
            {node.type === "wingsdk.cloud.Function" && (
              <FunctionMetadata node={node} />
            )}
            {node.type === "wingsdk.cloud.Queue" && (
              <QueueMetadataView node={node} />
            )}
            {node.type === "wingsdk.cloud.Bucket" && (
              <BucketMetadata node={node} />
            )}
            {node.type === "wingsdk.cloud.Counter" && (
              <CounterMetadata node={node} />
            )}
            {node.type === "wingsdk.cloud.Schedule" && (
              <ScheduleMetadata node={node} />
            )}
            {actionName && (
              <InspectorSection
                text={actionName}
                open={isActionInspectorOpen}
                onClick={() => onInspectorSectionToggle("interact-actions")}
                subection
                headingClassName="pl-2"
              >
                <div className="pl-6 pr-2 pb-2 h-full relative">
                  <ResourceInteractionView
                    key={node.path}
                    resourceType={node.type}
                    resourcePath={node.path}
                  />
                </div>
              </InspectorSection>
            )}
          </>
        )}
        {(!name || !actionName) && (
          <div className="pl-6 pr-2 py-1 relative">
            <ResourceInteractionView
              key={node.path}
              resourceType={node.type}
              resourcePath={node.path}
            />
          </div>
        )}
      </div>
    </InspectorSection>
  );
};
