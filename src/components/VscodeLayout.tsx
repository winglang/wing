import { useEffect, useMemo, useState } from "react";

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

import { MetadataPanel } from "./MetadataPanel.js";
import {
  NodeRelationshipsView,
  Relationships,
} from "./NodeRelationshipsView.js";
import { ResourceExploreView } from "./ResourceExploreView.js";

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
  const [currentInbound, setCorrectInbound] = useState<Node[]>([]);
  const [currentOutbound, setCurrentOutbound] = useState<Node[]>([]);

  useEffect(() => {
    const node = nodeMap?.find(treeMenu.currentItemId);
    setCurrentNode(node);
  }, [nodeMap, treeMenu.currentItemId]);

  useEffect(() => {
    if (!currentNode) {
      return;
    }
    const outbound: Node[] = [];
    const inbound: Node[] = [];
    for (const path of currentNode.outbound) {
      const node = nodeMap?.find(path);
      if (node) {
        outbound.push(node);
      }
    }
    for (const path of currentNode.inbound) {
      const node = nodeMap?.find(path);
      if (node) {
        inbound.push(node);
      }
    }
    setCorrectInbound(inbound);
    setCurrentOutbound(outbound);
  }, [currentNode]);

  const relationships = useMemo(() => {
    if (!currentNode) {
      return;
    }

    const parentNode = nodeMap?.find(currentNode.parent);

    // todo remove for new UI
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

  return (
    <div className="h-full flex flex-col bg-slate-100 select-none">
      <div className="flex-1 flex">
        <RightResizableWidget className="h-full flex flex-col w-60 min-w-[10rem] min-h-[15rem] border-r border-slate-200">
          <TreeMenu
            title="Explorer"
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
                className="flex-1 min-w-[20rem] flex bg-slate-50 justify-around p-2"
              >
                <div className="w-full max-w-xl">
                  {relationships &&
                    !currentNode?.type.startsWith("wingsdk.cloud") && (
                      <NodeRelationshipsView
                        key={currentNode?.path}
                        relationships={relationships}
                        onNodeClick={(path) => {
                          treeMenu.expand(path);
                          treeMenu.setCurrent(path);
                        }}
                      />
                    )}
                  {currentNode?.type.startsWith("wingsdk.cloud") && (
                    <ResourceExploreView node={currentNode} />
                  )}
                </div>
              </ScrollableArea>
            </div>

            <LeftResizableWidget className="bg-white flex-shrink min-w-[20rem] border-l z-10">
              {currentNode && (
                <MetadataPanel
                  node={currentNode}
                  inbound={currentInbound}
                  outbound={currentOutbound}
                  onConnectionNodeClick={(path) => {
                    treeMenu.expand(path);
                    treeMenu.setCurrent(path);
                  }}
                />
              )}
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
