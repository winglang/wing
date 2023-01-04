import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/20/solid";
import classNames from "classnames";
import { useEffect, useState } from "react";

import { InspectorSection } from "../design-system/InspectorSection.js";
import { ScrollableArea } from "../design-system/ScrollableArea.js";
import { ResourceIcon } from "../stories/utils.js";

import { AttributeView } from "./AttributeView.js";

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
  const [attributeGroups, setAttributeGroups] = useState<AttributeGroup[]>();
  const [connectionsGroups, setConnectionsGroups] =
    useState<ConnectionsGroup[]>();
  const [closedInspectorSections, setClosedInspectorSections] = useState<
    string[]
  >([]);

  useEffect(() => {
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
        connections: inbound.map((node) => ({
          id: node.id,
          path: node.path,
          icon: <ResourceIcon resourceType={node.type} className="w-4 h-4" />,
        })),
      });
    }
    if (outbound && outbound.length > 0) {
      connectionsGroupsArray.push({
        groupName: "Outbound",
        type: "outbound",
        connections: outbound.map((node) => ({
          id: node.id,
          path: node.path,
          icon: <ResourceIcon resourceType={node.type} className="w-4 h-4" />,
        })),
      });
    }
    setAttributeGroups(attrGroups);
    setConnectionsGroups(connectionsGroupsArray);
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
                      {connectionGroup.connections.map((connection) => (
                        <button
                          className={classNames(
                            "w-full flex-shrink-0 max-w-full truncate bg-slate-100 hover:bg-slate-200/50 shadow-sm text-sm px-4 py-1 flex items-center gap-1 min-w-0 text-slate-700",
                          )}
                          title={connection.path}
                          onClick={() =>
                            onConnectionNodeClick?.(connection.path)
                          }
                        >
                          <div className="flex-0 flex-shrink-0 flex items-center gap-2 text-slate-500 min-w-[140px]">
                            <div className="flex-0 flex-shrink-0">
                              {connectionGroup.type === "inbound" ? (
                                <ArrowLeftOnRectangleIcon
                                  className="w-4 h-4 rotate-180"
                                  aria-hidden="true"
                                />
                              ) : (
                                <ArrowRightOnRectangleIcon
                                  className="w-4 h-4"
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
        </>
      )}
    </ScrollableArea>
  );
};
