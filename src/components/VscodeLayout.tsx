import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import { PropsWithChildren, useEffect, useMemo, useState } from "react";

import { WingSimulatorSchema } from "../../electron/main/wingsdk.js";
import { Breadcrumb, Breadcrumbs } from "../design-system/Breadcrumbs.js";
import { LeftResizableWidget } from "../design-system/LeftResizableWidget.js";
import { RightResizableWidget } from "../design-system/RightResizableWidget.js";
import { ScrollableArea } from "../design-system/ScrollableArea.js";
import { TopResizableWidget } from "../design-system/TopResizableWidget.js";
import {
  SELECTED_TREE_ITEM_CSS_ID,
  TreeMenu,
} from "../design-system/TreeMenu.js";
import { ResourceIcon, SchemaToTreeMenuItems } from "../stories/utils.js";
import { Node, useNodeMap } from "../utils/nodeMap.js";
import { useTreeMenuItems } from "../utils/useTreeMenuItems.js";

import { NodeInteractionView } from "./NodeInteractionView.js";
import {
  NodeRelationshipsView,
  Relationships,
} from "./NodeRelationshipsView.js";

interface InspectorSectionHeadingProps {
  open?: boolean;
  text: string;
  onClick?: () => void;
}

const InspectorSectionHeading = ({
  open,
  text,
  onClick,
}: InspectorSectionHeadingProps) => {
  const Icon = open ? ChevronDownIcon : ChevronRightIcon;
  return (
    <button
      className={classNames(
        "w-full px-4 py-1 flex items-center gap-1 hover:bg-slate-50 group relative",
        // "outline-none focus:ring ring-sky-300",
      )}
      onClick={onClick}
    >
      <Icon
        className="-ml-1 w-4 h-4 text-slate-500 group-hover:text-slate-600"
        aria-hidden="true"
      />
      <div className="text-slate-500 font-medium group-hover:text-slate-600">
        {text}
      </div>
    </button>
  );
};

interface InspectorSectionProps {
  open?: boolean;
  text: string;
  onClick?: () => void;
}

const InspectorSection = ({
  open,
  text,
  onClick,
  children,
}: PropsWithChildren<InspectorSectionProps>) => {
  return (
    <>
      <InspectorSectionHeading text={text} open={open} onClick={onClick} />
      {open && children}
    </>
  );
};

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

interface LinkProps
  extends React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {}

const Link = ({ className, ...props }: LinkProps) => {
  return (
    <a
      className={classNames(
        "underline font-medium text-sky-500 hover:text-sky-600",
        "rounded",
        "outline-none focus:ring ring-sky-600",
        className,
      )}
      {...props}
    />
  );
};

function AttributeView({ attribute }: { attribute: Attribute }) {
  return (
    <>
      <div className="text-slate-500">{attribute.key}</div>
      <div className="col-span-4">
        {attribute.type === "url" ? (
          <Link href={attribute.url}>{attribute.value}</Link>
        ) : (
          <div className="max-w-full truncate text-slate-700">
            {attribute.value}
          </div>
        )}
      </div>
    </>
  );
}

export interface VscodeLayoutProps {
  schema: WingSimulatorSchema | undefined;
}

export const VscodeLayout = ({ schema }: VscodeLayoutProps) => {
  const treeMenu = useTreeMenuItems();
  const nodeMap = useNodeMap(schema?.root);

  useEffect(() => {
    treeMenu.setItems(schema ? SchemaToTreeMenuItems(schema) : []);
    treeMenu.setCurrent(schema?.root.path);
  }, [schema]);

  useEffect(() => {
    treeMenu.expandAll();
  }, [nodeMap]);

  useEffect(() => {
    document.querySelector(`.${SELECTED_TREE_ITEM_CSS_ID}`)?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });
  }, [treeMenu.currentItemId]);

  const breadcrumbs = useMemo(() => {
    let breadcrumbs: Breadcrumb[] = [];
    nodeMap?.visitParents(treeMenu.currentItemId, (node) => {
      breadcrumbs = [
        {
          id: node.path,
          name: node.id,
          icon: (
            <ResourceIcon
              resourceType={node.type}
              className="w-4 h-4"
              darkenOnGroupHover
            />
          ),
        },
        ...breadcrumbs,
      ];
    });
    return breadcrumbs;
  }, [nodeMap, treeMenu.currentItemId]);

  const [currentNode, setCurrentNode] = useState<Node>();
  useEffect(() => {
    const node = nodeMap?.find(treeMenu.currentItemId);
    setCurrentNode(node);
  }, [nodeMap, treeMenu.currentItemId]);

  const relationships = useMemo(() => {
    if (!currentNode) {
      return;
    }

    const parentNode = nodeMap?.find(currentNode.parent);

    const relationships: Relationships = {
      parent: parentNode
        ? {
            id: parentNode.id,
            path: parentNode.path,
            icon: (
              <ResourceIcon
                resourceType={parentNode.type}
                className="w-4 h-4"
              />
            ),
          }
        : undefined,
      self: {
        id: currentNode.id,
        path: currentNode.path,
        icon: (
          <ResourceIcon resourceType={currentNode.type} className="w-4 h-4" />
        ),
      },
      children: currentNode.children.map((path) => {
        const node = nodeMap?.find(path);
        // todo [sa] handle gracefully
        if (!node) {
          throw new Error(`Node [${path}] doesn't exist`);
        }
        return {
          id: node.id,
          path: node.path,
          icon: <ResourceIcon resourceType={node.type} className="w-4 h-4" />,
        };
      }),
      outbound: currentNode.outbound.map((path) => {
        const node = nodeMap?.find(path);
        if (!node) {
          // todo [sa] need to handle gracefully
          throw new Error(`Node [${path}] doesn't exist`);
        }
        return {
          id: node.id,
          path: node.path,
          icon: <ResourceIcon resourceType={node.type} className="w-4 h-4" />,
        };
      }),
      inbound: currentNode.inbound.map((path) => {
        const node = nodeMap?.find(path);
        if (!node) {
          throw new Error(`Node [${path}] doesn't exist`);
        }
        return {
          id: node.id,
          path: node.path,
          icon: <ResourceIcon resourceType={node.type} className="w-4 h-4" />,
        };
      }),
    };
    return relationships;
  }, [currentNode]);

  const [attributeGroups, setAttributeGroups] = useState<AttributeGroup[]>();
  useEffect(() => {
    const node = nodeMap?.find(treeMenu.currentItemId);
    setCurrentNode(node);
    if (!node) {
      setAttributeGroups(undefined);
    } else {
      let attributeGroups: AttributeGroup[] = [
        {
          groupName: "Node",
          attributes: [
            { key: "ID", value: node.id },
            {
              key: "Path",
              value: node.path,
            },
            { key: "Type", value: node.type },
            {
              key: "Source",
              value: "src/demo.w (20:2)",
              type: "url",
              url: "http://",
            },
          ],
        },
      ];

      if (node.type === "wingsdk.cloud.Bucket") {
        attributeGroups = [
          ...attributeGroups,
          {
            groupName: "Bucket Attributes",
            attributes: [
              {
                key: "URL",
                value: "http://localhost:3012",
                type: "url",
                url: "http://localhost:3012",
              },
              { key: "Secure", value: "true" },
            ] as Attribute[],
          },
        ];
      }

      if (node.type === "wingsdk.cloud.Endpoint") {
        attributeGroups = [
          ...attributeGroups,
          {
            groupName: "Endpoint Attributes",
            attributes: [
              {
                key: "URL",
                value: "http://localhost:3012",
                type: "url",
                url: "http://localhost:3012",
              },
              { key: "Secure", value: "true" },
            ] as Attribute[],
          },
        ];
      }

      setAttributeGroups(attributeGroups);
    }
    // }, [nodeMap, treeMenu.currentItemId]);
  }, [treeMenu.currentItemId]);

  const [openInspectorSections, setOpenInspectorSections] = useState([
    "Node",
    "interact",
  ]);
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
    <div className="h-full flex flex-col bg-slate-100 select-none">
      <div className="flex-1 flex">
        <RightResizableWidget className="h-full flex flex-col w-60 min-w-[10rem] min-h-[15rem] border-r border-slate-200">
          <TreeMenu
            title="Wing Application"
            items={treeMenu.items}
            selectedItemId={treeMenu.currentItemId}
            openMenuItemIds={treeMenu.openItemIds}
            onItemClick={(item) => {
              treeMenu.setCurrent(item.id);
            }}
            onItemToggle={(item) => {
              treeMenu.toggle(item.id);
            }}
            onExpandAll={() => treeMenu.expandAll()}
            onCollapseAll={() => treeMenu.collapseAll()}
          />
        </RightResizableWidget>

        <div className="flex-1 flex flex-col">
          <div className="flex-0 flex-shrink-0 w-full h-9 relative bg-white border-b">
            {treeMenu.currentItemId !== undefined && (
              <ScrollableArea
                overflowX
                scrollbarSize="xs"
                className="flex flex-col justify-around"
              >
                <Breadcrumbs
                  breadcrumbs={breadcrumbs}
                  onBreadcrumbClicked={(breadcrumb) => {
                    treeMenu.expand(breadcrumb.id);
                    treeMenu.setCurrent(breadcrumb.id);
                  }}
                />
              </ScrollableArea>
            )}
          </div>

          <div className="flex-1 flex">
            <div className="flex-1 relative">
              <ScrollableArea
                overflowX
                className="flex-1 flex bg-slate-50 justify-around p-2"
              >
                <div className="min-w-[10rem] max-w-xl">
                  {relationships && (
                    <NodeRelationshipsView
                      key={currentNode?.path}
                      relationships={relationships}
                      onNodeClick={(path) => {
                        treeMenu.expand(path);
                        treeMenu.setCurrent(path);
                      }}
                    />
                  )}
                </div>
              </ScrollableArea>
            </div>

            <LeftResizableWidget className="bg-white flex-shrink min-w-[20rem] border-l">
              <ScrollableArea overflowY className="h-full text-sm">
                {currentNode && (
                  <>
                    {/* <NodeAttributes node={currentNode.schema} />
                <div className="border-t px-4 py-2">
                  <NodeInteractionView node={currentNode.schema} />
                </div> */}
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
                              <div className="px-4 py-1.5 grid grid-cols-5 gap-y-1 gap-x-4 bg-slate-100">
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

                    {/* {currentNode.type !== "constructs.Construct" && ( */}
                    {currentNode.type.startsWith("wingsdk.cloud.") &&
                      currentNode.type !== "wingsdk.cloud.Custom" && (
                        <InspectorSection
                          text="Interact"
                          open={openInspectorSections.includes("interact")}
                          onClick={() => toggleInspectorSection("interact")}
                        >
                          <div className="border-t px-4 py-2 bg-slate-100">
                            <NodeInteractionView node={currentNode.schema} />
                          </div>
                        </InspectorSection>
                      )}
                  </>
                )}
              </ScrollableArea>
            </LeftResizableWidget>
          </div>
        </div>
      </div>

      <TopResizableWidget className="border-t bg-white min-h-[5rem] flex flex-col gap-2 px-4 py-2">
        <div className="flex gap-2">
          <div className="uppercase text-sm border-b border-slate-600">
            Logs
          </div>
        </div>
        <div className="flex-1 relative">
          <ScrollableArea overflowY></ScrollableArea>
        </div>
      </TopResizableWidget>
    </div>
  );
};
