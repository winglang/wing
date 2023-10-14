import {
  useTheme,
  Pill,
  IconComponent,
  ResourceIcon,
  getResourceIconComponent,
  ScrollableArea,
} from "@wingconsole/design-system";
import classNames from "classnames";
import { useMemo, useState } from "react";

import { ResourceInteractionMetadata } from "./resource-interaction-metadata.js";
import { ResourceNodeMetadata } from "./resource-node-metadata.js";
import { ResourceRelationshipsMetadata } from "./resource-relationships-metadata.js";

interface AttributeGroup {
  groupName: string;
  actionName?: string;
  icon?: IconComponent;
}

export interface ConnectionsGroup {
  groupName: string;
  type: "inbound" | "outbound";
  connections: {
    id: string;
    path: string;
    icon: React.ReactNode;
  }[];
}

interface Relationship {
  id: string;
  path: string;
  type: string;
}

export interface MetadataNode {
  id: string;
  path: string;
  type: string;
  props?:
    | {
        [key: string]: any;
      }
    | undefined;
}

export interface ResourceMetadataPanelProps {
  node: MetadataNode;
  inbound?: Relationship[];
  outbound?: Relationship[];
  onConnectionNodeClick?: (path: string) => void;
}

export const ResourceMetadataPanel = ({
  node,
  inbound,
  outbound,
  onConnectionNodeClick,
}: ResourceMetadataPanelProps) => {
  const { theme } = useTheme();
  const [openInspectorSections, setOpenInspectorSections] = useState(() => [
    "interact",
    "interact-actions",
  ]);
  const { resourceGroup, connectionsGroups } = useMemo(() => {
    const connectionsGroupsArray: ConnectionsGroup[] = [];
    let resourceGroup: AttributeGroup | undefined;
    if (node.props) {
      const icon = getResourceIconComponent(node.type, { resourceId: node.id });
      switch (node.type) {
        case "wingsdk.cloud.Function": {
          resourceGroup = {
            groupName: "Function",
            actionName: "Invoke",
            icon,
          };
          break;
        }
        case "wingsdk.cloud.Queue": {
          resourceGroup = {
            groupName: "Queue",
            actionName: "Push Message",
            icon,
          };

          break;
        }
        case "wingsdk.cloud.Bucket": {
          resourceGroup = {
            groupName: "Bucket",
            actionName: "Files",
            icon,
          };

          break;
        }
        case "wingsdk.cloud.Counter": {
          resourceGroup = {
            groupName: "Counter",
            icon,
          };

          break;
        }
        case "wingsdk.cloud.Topic": {
          resourceGroup = {
            groupName: "Topic",
            actionName: "Publish Message",
            icon,
          };

          break;
        }
        case "wingsdk.cloud.Api": {
          resourceGroup = {
            groupName: "Api",
            icon,
          };

          break;
        }
        case "wingsdk.cloud.Table": {
          resourceGroup = {
            groupName: "Table",
            icon,
          };

          break;
        }
        case "wingsdk.cloud.Schedule": {
          resourceGroup = {
            groupName: "Schedule",
            icon,
          };

          break;
        }
        case "wingsdk.redis.Redis": {
          resourceGroup = {
            groupName: "Redis",
            icon,
          };

          break;
        }
        case "wingsdk.cloud.Website": {
          resourceGroup = {
            groupName: "Website",
            icon,
          };

          break;
        }
      }
    }

    if (inbound && inbound.length > 0) {
      connectionsGroupsArray.push({
        groupName: "Inbound",
        type: "inbound",
        connections: inbound.map((relationship) => ({
          id: relationship.id,
          path: relationship.path,
          icon: (
            <ResourceIcon
              resourceType={relationship.type}
              resourcePath={relationship.path}
              className="w-4 h-4"
            />
          ),
        })),
      });
    }
    if (outbound && outbound.length > 0) {
      connectionsGroupsArray.push({
        groupName: "Outbound",
        type: "outbound",
        connections: outbound.map((relationship) => ({
          id: relationship.id,
          path: relationship.path,
          icon: (
            <ResourceIcon
              resourceType={relationship.type}
              resourcePath={relationship.path}
              className="w-4 h-4"
            />
          ),
        })),
      });
    }
    return {
      resourceGroup,
      connectionsGroups: connectionsGroupsArray,
    };
  }, [node, inbound, outbound]);

  const toggleInspectorSection = (section: string) => {
    setOpenInspectorSections(([...sections]) => {
      const index = sections.indexOf(section);
      if (index === -1) {
        sections.push(section);
        return sections;
      } else {
        sections.splice(index, 1);
        return sections;
      }
    });
  };

  return (
    <ScrollableArea
      overflowY
      className={classNames("h-full text-sm", theme.bg3, theme.text1)}
      dataTestid={`resource-metadata:${node.path}`}
    >
      <div className="flex items-center gap-2 px-2 py-2">
        <div className="flex-shrink-0">
          <ResourceIcon
            className="w-6 h-6"
            resourceType={node.type}
            resourcePath={node.path}
          />
        </div>

        <div className="flex flex-col min-w-0">
          <div className="text-sm font-medium truncate">{node.id}</div>
          <div className="flex">
            <Pill>{node.type}</Pill>
          </div>
        </div>
      </div>

      {node && (
        <>
          <ResourceNodeMetadata
            node={node}
            isOpen={openInspectorSections.includes("node")}
            onInspectorSectionToggle={toggleInspectorSection}
          />
          {connectionsGroups && connectionsGroups.length > 0 && (
            <ResourceRelationshipsMetadata
              node={node}
              isOpen={openInspectorSections.includes("relationships")}
              onInspectorSectionToggle={toggleInspectorSection}
              onConnectionNodeClick={onConnectionNodeClick}
              connectionsGroups={connectionsGroups}
            />
          )}
          {(node.type.includes("sdk.std.Resource") ||
            node.type.startsWith("wingsdk.cloud") ||
            node.type.startsWith("wingsdk.redis") ||
            node.type.startsWith("wingsdk.ex")) && (
            <ResourceInteractionMetadata
              node={node}
              isInspectorOpen={openInspectorSections.includes("interact")}
              isActionInspectorOpen={openInspectorSections.includes(
                "interact-actions",
              )}
              onInspectorSectionToggle={toggleInspectorSection}
              icon={resourceGroup?.icon}
              actionName={resourceGroup?.actionName}
              name={resourceGroup?.groupName}
            />
          )}
          <div className={classNames(theme.border3, "border-t")}></div>
        </>
      )}
    </ScrollableArea>
  );
};
