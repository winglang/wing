import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/20/solid";
import {
  ArrowPathRoundedSquareIcon,
  CubeTransparentIcon,
  CursorArrowRaysIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames";
import { ForwardRefExoticComponent, SVGProps, useMemo, useState } from "react";

import { InspectorSection } from "../design-system/InspectorSection.js";
import { Pill } from "../design-system/Pill.js";
import { ScrollableArea } from "../design-system/ScrollableArea.js";
import { getResourceIconComponent, ResourceIcon } from "../utils/utils.js";

import { AttributeView } from "./AttributeView.js";
import { ApiMetadata } from "./resource-metadata/ApiMetadata.js";
import { BucketMetadata } from "./resource-metadata/BucketMetadata.js";
import { CounterMetadata } from "./resource-metadata/CounterMetadata.js";
import { FunctionMetadata } from "./resource-metadata/FunctionMetadata.js";
import { QueueMetadata } from "./resource-metadata/QueueMetadata.js";
import { ApiView } from "./resource-views/ApiView.js";
import { ResourceView } from "./resource-views/ResourceView.js";

interface AttributeGroup {
  groupName: string;
  actionName?: string;
  icon?: ForwardRefExoticComponent<SVGProps<SVGSVGElement>>;
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

export const MetadataPanel = ({
  node,
  inbound,
  outbound,
  onConnectionNodeClick,
}: MetadataProps) => {
  const [openInspectorSections, setOpenInspectorSections] = useState(() => [
    "interact",
    "interact-actions",
  ]);
  const { resourceGroup, connectionsGroups } = useMemo(() => {
    const connectionsGroupsArray: ConnectionsGroup[] = [];
    let resourceGroup: AttributeGroup | undefined;
    if (node.type.startsWith("wingsdk.cloud") && node.props) {
      const icon = getResourceIconComponent(node.type, {}, node.id);
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
            actionName: "Send Message",
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
            icon: getResourceIconComponent(node.type),
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
    <ScrollableArea overflowY className="h-full text-sm bg-slate-50">
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
            <div className="border-t">
              <div className="px-2 py-1.5 flex flex-col gap-y-1 gap-x-4 bg-slate-50">
                <AttributeView name="ID" value={node.id} />
                <AttributeView name="Path" value={node.path} />
                <AttributeView name="Type" value={node.type} />
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
              <div className="border-t">
                {connectionsGroups.map((connectionGroup) => (
                  <div key={connectionGroup.groupName}>
                    <div className="relative bg-slate-50">
                      {connectionGroup.connections.map((connection, index) => (
                        <button
                          key={`${connection.path}_${index}`}
                          className={classNames(
                            "w-full flex-shrink-0 max-w-full truncate bg-slate-50 hover:bg-slate-200/50 shadow-sm text-sm pl-4 pr-2 py-1 flex items-center gap-1 min-w-0 text-slate-700",
                          )}
                          title={connection.path}
                          onClick={() =>
                            onConnectionNodeClick?.(connection.path)
                          }
                        >
                          <div className="flex-0 flex-shrink-0 flex items-center gap-2 text-slate-500 min-w-[100px]">
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
                            <span className="text-slate-500 uppercase text-xs">
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

          {node.type.startsWith("wingsdk.cloud") && (
            <>
              <InspectorSection
                text={resourceGroup?.groupName || "Interact"}
                icon={resourceGroup?.icon || CursorArrowRaysIcon}
                open={openInspectorSections.includes("interact")}
                onClick={() => toggleInspectorSection("interact")}
                headingClassName="pl-2"
              >
                <div className="bg-slate-50 border-t border-slate-200">
                  {resourceGroup?.groupName && (
                    <>
                      <div className="px-2 pt-1.5 flex flex-col gap-y-1 gap-x-4 bg-slate-50">
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
                      </div>
                      {resourceGroup?.actionName && (
                        <InspectorSection
                          text={resourceGroup?.actionName}
                          open={openInspectorSections.includes(
                            "interact-actions",
                          )}
                          onClick={() =>
                            toggleInspectorSection("interact-actions")
                          }
                          subection
                          headingClassName="pl-2"
                        >
                          <div className="pl-6 pr-2 pb-2 h-full">
                            <ResourceView
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
                    <div className="pl-6 pr-2 py-1">
                      <ResourceView
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

          <div className="border-t border-slate-300"></div>
        </>
      )}
    </ScrollableArea>
  );
};
