import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/20/solid";
import classNames from "classnames";
import { PropsWithChildren, useEffect, useMemo, useState } from "react";

import { InspectorSection } from "../design-system/InspectorSection.js";
import { Pill } from "../design-system/Pill.js";
import { ScrollableArea } from "../design-system/ScrollableArea.js";
import { ResourceIcon } from "../stories/utils.js";

import { AttributeView } from "./AttributeView.js";
import { ResourceView } from "./resource-views/ResourceView.js";

interface Attribute {
  key: string;
  value: string;
  type?: "url";
  url?: string;
}

interface AttributeGroup {
  groupName: string;
  attributes: Attribute[];
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

export interface MetadataProps {
  node: {
    id: string;
    path: string;
    type: string;
    props?:
      | {
          [key: string]: any;
        }
      | undefined;
  };
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
  const [closedInspectorSections, setClosedInspectorSections] = useState<
    string[]
  >(() => []);

  const { attributeGroups, connectionsGroups } = useMemo(() => {
    const connectionsGroupsArray: ConnectionsGroup[] = [];
    let attrGroups: AttributeGroup[] = [
      {
        groupName: "Node",
        attributes: [
          { key: "ID", value: node.id },
          {
            key: "Path",
            value: node.path,
          },
          { key: "Type", value: node.type },
        ],
      },
    ];
    if (node.type.startsWith("wingsdk.cloud") && node.props) {
      switch (node.type) {
        case "wingsdk.cloud.Function": {
          attrGroups.push({
            groupName: "Function",
            attributes: [
              { key: "Entry", value: node.props.sourceCodeFile },
              { key: "Language", value: node.props.sourceCodeLanguage },
              {
                key: "Environment",
                value: JSON.stringify(node.props.environmentVariables),
              },
            ],
          });

          break;
        }
        case "wingsdk.cloud.Queue": {
          attrGroups.push({
            groupName: "Queue",
            attributes: [{ key: "Timeout", value: `${node.props.timeout}s` }],
          });

          break;
        }
        case "wingsdk.cloud.Bucket": {
          attrGroups.push({
            groupName: "Bucket",
            attributes: [
              {
                key: "Public",
                value: node.props.public ? "True" : "False",
              },
            ],
          });

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
              className="w-4 h-4"
            />
          ),
        })),
      });
    }
    return {
      attributeGroups: attrGroups,
      connectionsGroups: connectionsGroupsArray,
    };
  }, [node, inbound, outbound]);

  const toggleInspectorSection = (section: string) => {
    setClosedInspectorSections(([...sections]) => {
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
    <ScrollableArea overflowY className="h-full text-sm bg-white">
      <div className="flex items-center gap-2 px-2 py-1.5">
        <div className="flex-shrink-0">
          <ResourceIcon className="w-6 h-6" resourceType={node.type} />
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
          {attributeGroups?.map((attributeGroup) => {
            return (
              <div key={attributeGroup.groupName}>
                <InspectorSection
                  text={attributeGroup.groupName}
                  open={
                    !closedInspectorSections.includes(attributeGroup.groupName)
                  }
                  onClick={() =>
                    toggleInspectorSection(attributeGroup.groupName)
                  }
                >
                  <div className="border-t">
                    <div className="px-4 py-1.5 flex flex-col gap-y-1 gap-x-4 bg-slate-100">
                      {attributeGroup.attributes.map((attribute) => {
                        return (
                          <AttributeView
                            key={attribute.key}
                            attribute={attribute}
                          />
                        );
                      })}
                    </div>
                  </div>
                </InspectorSection>
              </div>
            );
          })}

          {connectionsGroups && connectionsGroups.length > 0 && (
            <InspectorSection
              text="Relationships"
              open={!closedInspectorSections.includes("relationships")}
              onClick={() => toggleInspectorSection("relationships")}
            >
              <div className="border-t">
                {connectionsGroups.map((connectionGroup) => (
                  <div key={connectionGroup.groupName}>
                    <div className="relative bg-slate-100">
                      {connectionGroup.connections.map((connection, index) => (
                        <button
                          key={`${connection.path}_${index}`}
                          className={classNames(
                            "w-full flex-shrink-0 max-w-full truncate bg-slate-100 hover:bg-slate-200/50 shadow-sm text-sm px-4 py-1 flex items-center gap-1 min-w-0 text-slate-700",
                          )}
                          title={connection.path}
                          onClick={() =>
                            onConnectionNodeClick?.(connection.path)
                          }
                        >
                          <div className="flex-0 flex-shrink-0 flex items-center gap-2 text-slate-500 min-w-[100px]">
                            <div className="flex-0 flex-shrink-0">
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
                                ? "in"
                                : "out"}
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
            <InspectorSection
              text="Interact"
              open={!closedInspectorSections.includes("interact")}
              onClick={() => toggleInspectorSection("interact")}
            >
              <div className="bg-slate-100 border-t border-slate-200">
                <ResourceView
                  resourceType={node.type}
                  resourcePath={node.path}
                />
              </div>
            </InspectorSection>
          )}

          <div className="border-t border-slate-200"></div>
        </>
      )}
    </ScrollableArea>
  );
};
