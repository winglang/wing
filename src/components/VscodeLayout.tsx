import { useEffect, useMemo, useRef, useState } from "react";

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

import { HeaderBanner } from "./HeaderBanner.js";
import { MetadataPanel } from "./MetadataPanel.js";
import { NewNodeRelationshipsView } from "./NewNodeRelationshipsView.js";
import { NodeLogs } from "./NodeLogs.js";
import { Relationships } from "./NodeRelationshipsView.js";
import { ResourceExploreView } from "./ResourceExploreView.js";

function deduceRelationshipName(nodeType: string) {
  if (nodeType === "wingsdk.cloud.Function") {
    return "invoke";
  }

  if (nodeType === "wingsdk.cloud.Bucket") {
    return "put file";
  }
}

export interface VscodeLayoutProps {
  schema: WingSimulatorSchema | undefined;
  logs?:
    | {
        timestamp: number;
        type: "info" | "warn" | "error";
        message: string;
      }[]
    | undefined;
}

const NewIssueUrl = "https://github.com/winglang/wing/issues/new/choose";

export const VscodeLayout = ({ schema, logs }: VscodeLayoutProps) => {
  const [showBanner, setShowBanner] = useState(true);
  const treeMenu = useTreeMenuItems();
  const nodeMap = useNodeMap(schema?.root);

  const openExternalUrl = (url: string) => {
    if (window.electronTRPC) {
      window.electronTRPC.ipcRenderer.send("open-external-url", url);
    }
  };

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
    setCorrectInbound(nodeMap?.findAll(currentNode.inbound) ?? []);
    setCurrentOutbound(nodeMap?.findAll(currentNode.outbound) ?? []);
  }, [currentNode]);

  const logsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const div = logsRef.current;
    if (div) {
      div.scrollTo({ top: div.scrollHeight });
    }
  }, [logs]);

  const childRelationships = useMemo(() => {
    if (!currentNode || !nodeMap) {
      return;
    }

    if (!currentNode.type.endsWith("constructs.Construct")) {
      return;
    }

    return nodeMap.findAll(currentNode.children).map((node) => {
      return {
        node,
        inbound: nodeMap.findAll(node.inbound),
        outbound: nodeMap.findAll(node.outbound),
      };
    });
  }, [currentNode, nodeMap]);

  return (
    <div className="h-full flex flex-col bg-slate-100 select-none">
      {showBanner && (
        <HeaderBanner
          title={
            "Our Console is at an initial stage of development, and we'd love to hear your feedback!"
          }
          buttonLabel={"Open an issue"}
          onClick={() => openExternalUrl(NewIssueUrl)}
          onClose={() => setShowBanner(false)}
        />
      )}
      <div className="flex-1 flex">
        <RightResizableWidget className="h-full flex flex-col w-60 min-w-[20rem] min-h-[15rem] border-r border-slate-200">
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
                className="flex flex-col justify-around overflow-y-hidden"
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
              <ScrollableArea overflowX className="flex flex-col bg-white">
                {childRelationships && (
                  <div className="flex-1 bg-white min-w-[40rem] p-4 mx-auto flex flex-col gap-y-2">
                    {childRelationships.map((relationship) => (
                      <NewNodeRelationshipsView
                        node={{
                          id: relationship.node.id,
                          path: relationship.node.path,
                          icon: (
                            <ResourceIcon
                              resourceType={relationship.node.type}
                              className="w-4 h-4"
                            />
                          ),
                        }}
                        inbound={relationship.inbound.map((node) => ({
                          id: node.id,
                          path: node.path,
                          icon: (
                            <ResourceIcon
                              resourceType={node.type}
                              className="w-4 h-4"
                            />
                          ),
                          relationshipName: deduceRelationshipName(
                            relationship.node.type,
                          ),
                        }))}
                        outbound={relationship.outbound.map((node) => ({
                          id: node.id,
                          path: node.path,
                          icon: (
                            <ResourceIcon
                              resourceType={node.type}
                              className="w-4 h-4"
                            />
                          ),
                          relationshipName: deduceRelationshipName(node.type),
                        }))}
                        onClick={(path) => {
                          treeMenu.expand(path);
                          treeMenu.setCurrent(path);
                        }}
                      />
                    ))}
                  </div>
                )}

                {currentNode?.type.startsWith("wingsdk.cloud") && (
                  <ResourceExploreView node={currentNode} />
                )}
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

      <TopResizableWidget className="border-t bg-white min-h-[5rem] h-[12rem] flex flex-col gap-2 px-4 py-2">
        <div className="flex gap-2">
          <div className="uppercase text-sm border-b border-slate-600">
            Logs
          </div>
        </div>
        <div className="flex-1 relative">
          <ScrollableArea ref={logsRef} overflowY>
            <NodeLogs logs={logs ?? []} />
          </ScrollableArea>
        </div>
      </TopResizableWidget>
    </div>
  );
};
