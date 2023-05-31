import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/20/solid";
import {
  ArrowPathRoundedSquareIcon,
  CubeTransparentIcon,
  CursorArrowRaysIcon,
} from "@heroicons/react/24/outline";
import {
  useTheme,
  InspectorSection,
  Pill,
  IconComponent,
  ResourceIcon,
  getResourceIconComponent,
  Attribute,
  ScrollableArea,
} from "@wingconsole/design-system";
import classNames from "classnames";
import { useMemo, useState } from "react";

import { BucketMetadata } from "../components/resource-metadata/BucketMetadata.js";
import { FunctionMetadata } from "../components/resource-metadata/FunctionMetadata.js";
import { QueueMetadata } from "../components/resource-metadata/QueueMetadata.js";
import { ResourceInteractionView } from "../features/resource-interaction-view.js";

import { CounterMetadata } from "./counter-metadata.js";
import { ScheduleMetadata } from "./schedule-metadata.js";

interface AttributeGroup {
  groupName: string;
  actionName?: string;
  icon?: IconComponent;
}

interface ConnectionsGroup {
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

export interface MetadataProps {
  node: MetadataNode;
  inbound?: Relationship[];
  outbound?: Relationship[];
  onConnectionNodeClick?: (path: string) => void;
}

export const ResourceMetadata = ({
  node,
  inbound,
  outbound,
  onConnectionNodeClick,
}: MetadataProps) => {
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
          <InspectorSection
            text="Node"
            icon={CubeTransparentIcon}
            open={openInspectorSections.includes("node")}
            onClick={() => toggleInspectorSection("node")}
            headingClassName="pl-2"
          >
            <div className={classNames("border-t", theme.border4)}>
              <div
                className={classNames(
                  "px-2 py-1.5 flex flex-col gap-y-1 gap-x-4",
                  theme.bg3,
                  theme.text1,
                )}
              >
                <Attribute name="ID" value={node.id} />
                <Attribute name="Path" value={node.path} />
                <Attribute name="Type" value={node.type} />
              </div>
            </div>
          </InspectorSection>

          {connectionsGroups && connectionsGroups.length > 0 && (
            <InspectorSection
              text="Relationships"
              open={openInspectorSections.includes("relationships")}
              icon={ArrowPathRoundedSquareIcon}
              onClick={() => toggleInspectorSection("relationships")}
              headingClassName="pl-2"
            >
              <div className={classNames("border-t", theme.border4)}>
                {connectionsGroups.map((connectionGroup) => (
                  <div key={connectionGroup.groupName}>
                    <div
                      className={classNames("relative", theme.bg3, theme.text1)}
                    >
                      {connectionGroup.connections.map((connection, index) => (
                        <button
                          key={`${connection.path}_${index}`}
                          className={classNames(
                            theme.bg3,
                            theme.bg3Hover,
                            theme.text1,
                            "w-full flex-shrink-0 max-w-full truncate shadow-sm text-sm pl-4 pr-2 py-1 flex items-center gap-1 min-w-0",
                          )}
                          title={connection.path}
                          onClick={() =>
                            onConnectionNodeClick?.(connection.path)
                          }
                        >
                          <div
                            className={classNames(
                              "flex-0 flex-shrink-0 flex items-center gap-2 min-w-[100px]",
                              theme.text1,
                            )}
                          >
                            <div className="pl-2 flex-0 flex-shrink-0">
                              {connectionGroup.type === "inbound" ? (
                                <ArrowLeftOnRectangleIcon
                                  className="w-4 h-4 rotate-180 text-green-500"
                                  aria-hidden="true"
                                />
                              ) : (
                                <ArrowRightOnRectangleIcon
                                  className="w-4 h-4 text-red-500"
                                  aria-hidden="true"
                                />
                              )}
                            </div>
                            <span
                              className={classNames(
                                "uppercase text-xs",
                                theme.text1,
                              )}
                            >
                              {connectionGroup.type === "inbound"
                                ? "In"
                                : "Out"}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 ml-2 5 min-w-0">
                            <div className="flex-shrink-0 -ml-1">
                              {connection.icon}
                            </div>
                            <div className="truncate">{connection.id}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </InspectorSection>
          )}

          {(node.type.startsWith("wingsdk.cloud") ||
            node.type.startsWith("wingsdk.redis")) && (
            <>
              <InspectorSection
                text={resourceGroup?.groupName || "Interact"}
                icon={resourceGroup?.icon || CursorArrowRaysIcon}
                open={openInspectorSections.includes("interact")}
                onClick={() => toggleInspectorSection("interact")}
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
                  {resourceGroup?.groupName && (
                    <>
                      {node.type === "wingsdk.cloud.Function" && (
                        <FunctionMetadata node={node} />
                      )}
                      {node.type === "wingsdk.cloud.Queue" && (
                        <QueueMetadata node={node} />
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
                      {resourceGroup?.actionName && (
                        <InspectorSection
                          text={resourceGroup.actionName}
                          open={openInspectorSections.includes(
                            "interact-actions",
                          )}
                          onClick={() =>
                            toggleInspectorSection("interact-actions")
                          }
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
                  {(!resourceGroup?.groupName ||
                    !resourceGroup?.actionName) && (
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
            </>
          )}

          <div className={classNames(theme.border3, "border-t")}></div>
        </>
      )}
    </ScrollableArea>
  );
};
