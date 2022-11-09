import { ReactNode, useEffect, useState } from "react";

import { InspectorSection } from "../design-system/InspectorSection.js";
import { ScrollableArea } from "../design-system/ScrollableArea.js";
import { ResourceIcon } from "../stories/utils.js";
import { Node } from "../utils/nodeMap.js";

import { AttributeView } from "./AttributeView.js";
import { NodeListItem } from "./NodeListItem.js";

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
  connections: {
    id: string;
    path: string;
    icon: React.ReactNode;
  }[];
}

export interface MetadataProps {
  node: Node;
  inbound?: Node[];
  outbound?: Node[];
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
  const [openInspectorSections, setOpenInspectorSections] = useState<string[]>(
    [],
  );

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
    if (node.type.startsWith("wingsdk.cloud") && node.attributes) {
      attrGroups.push({
        groupName: node.type.split(".").at(-1) || "Custom",
        attributes: Object.keys(node.attributes).map((attrKey) => {
          const attrValue = node.attributes![attrKey];
          return {
            key: attrKey,
            value:
              typeof attrValue === "string"
                ? attrValue
                : // eslint-disable-next-line unicorn/no-null
                  JSON.stringify(attrValue, null, 2),
          };
        }),
      });
      if (inbound && inbound.length > 0) {
        connectionsGroupsArray.push({
          groupName: "inbound",
          connections: inbound.map((node) => ({
            id: node.id,
            path: node.path,
            icon: <ResourceIcon resourceType={node.type} className="w-4 h-4" />,
          })),
        });
      }
      if (outbound && outbound.length > 0) {
        connectionsGroupsArray.push({
          groupName: "outbound",
          connections: outbound.map((node) => ({
            id: node.id,
            path: node.path,
            icon: <ResourceIcon resourceType={node.type} className="w-4 h-4" />,
          })),
        });
      }
    }
    setAttributeGroups(attrGroups);
    setConnectionsGroups(connectionsGroupsArray);
    setOpenInspectorSections([
      ...attrGroups.map((group) => group.groupName),
      ...connectionsGroupsArray.map((connection) => connection.groupName),
    ]);
  }, [node, inbound, outbound]);

  const toggleInspectorSection = (section: string) => {
    setOpenInspectorSections(([...sections]) => {
      const index = sections.indexOf(section);
      if (index !== -1) {
        sections.splice(index, 1);
        return sections;
      } else {
        sections.push(section);
        return sections;
      }
    });
  };

  return (
    <ScrollableArea overflowY className="h-full text-sm">
      {node && (
        <>
          {attributeGroups?.map((attributeGroup) => {
            return (
              <div key={attributeGroup.groupName}>
                <InspectorSection
                  text={attributeGroup.groupName}
                  open={openInspectorSections.includes(
                    attributeGroup.groupName,
                  )}
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
          {connectionsGroups?.map((connectionGroup) => (
            <div key={connectionGroup.groupName}>
              <InspectorSection
                text={connectionGroup.groupName}
                open={openInspectorSections.includes(connectionGroup.groupName)}
                onClick={() =>
                  toggleInspectorSection(connectionGroup.groupName)
                }
              >
                <div className="border-t">
                  <div className={"relative"}>
                    {connectionGroup.connections.map((connection) => (
                      <NodeListItem
                        className={"w-full text-base border-0"}
                        key={connection.path}
                        title={connection.path}
                        onClick={() => onConnectionNodeClick?.(connection.path)}
                      >
                        <div className="flex-shrink-0 -ml-0.5">
                          {connection.icon}
                        </div>
                        <div className="truncate">{connection.id}</div>
                      </NodeListItem>
                    ))}
                  </div>
                </div>
              </InspectorSection>
            </div>
          ))}
        </>
      )}
    </ScrollableArea>
  );
};
