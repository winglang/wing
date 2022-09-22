import { ResourceSchema, WingLocalSchema } from "@monadahq/wing-local-schema";
import classNames from "classnames";
import { useEffect, useMemo, useState } from "react";

import { breadcrumbs } from "@/stories/mockData";
import { ResourceIcon, WingSchemaToTreeMenuItems } from "@/stories/utils";
import { Node, useNodeMap } from "@/utils/nodeMap";

import { Breadcrumb, Breadcrumbs } from "./Breadcrumbs";
import { NodeAttributes } from "./NodeAttributes";
import { NodeInteractionView } from "./NodeInteractionView";
import { NodeRelationshipsView, Relationships } from "./NodeRelationshipsView";
import { RightResizableWidget } from "./RightResizableWidget";
import { Tabs } from "./Tabs";
import { TopResizableWidget } from "./TopResizableWidget";
import { TreeMenu } from "./TreeMenu";
import { useTabs } from "./useTabs";
import { useTreeMenuItems } from "./useTreeMenuItems";

const buttons = [
  { current: false, text: "Problems" },
  { current: false, text: "Logs" },
  { current: true, text: "Schema" },
];

export interface VscodeLayoutProps {
  schema: WingLocalSchema | undefined;
}

export const VscodeLayout = ({ schema }: VscodeLayoutProps) => {
  const treeMenu = useTreeMenuItems();
  const tabs = useTabs();
  const nodeMap = useNodeMap(schema?.root);

  function openTab(path: string) {
    const node = nodeMap?.find(path);
    if (node) {
      tabs.openTab({
        id: node.path,
        name: node.id,
        icon: <ResourceIcon resourceType={node.type} className="w-4 h-4" />,
      });
    }
  }

  useEffect(() => {
    treeMenu.setItems(schema ? WingSchemaToTreeMenuItems(schema) : []);
    tabs.closeAll();
  }, [schema]);

  useEffect(() => {
    treeMenu.expand("");
    treeMenu.expandAll();
    treeMenu.setCurrent("");
    openTab("");
  }, [nodeMap]);

  const breadcrumbs = useMemo(() => {
    let breadcrumbs: Breadcrumb[] = [];
    nodeMap?.visitParents(tabs.currentTabId, (node) => {
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
  }, [nodeMap, tabs.currentTabId]);

  const [currentNode, setCurrentNode] = useState<Node>();
  useEffect(() => {
    const node = nodeMap?.find(tabs.currentTabId);
    setCurrentNode(node);
  }, [nodeMap, tabs.currentTabId]);

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
      children: currentNode.children.map((childPath) => {
        const childNode = nodeMap?.find(childPath);
        if (!childNode) {
          throw new Error(`Node [${childPath}] doesn't exist`);
        }
        return {
          id: childNode.id,
          path: childNode.path,
          icon: (
            <ResourceIcon resourceType={childNode.type} className="w-4 h-4" />
          ),
        };
      }),
      callees: [],
      callers: [],
    };
    return relationships;
  }, [currentNode]);

  return (
    <div className="h-full flex flex-col bg-slate-100 select-none">
      <div className="flex-1 flex">
        <RightResizableWidget className="h-full flex flex-col w-60 min-w-[15rem] min-h-[15rem] border-r border-slate-200">
          <TreeMenu
            title="Wing Demo App"
            items={treeMenu.items}
            selectedItemId={treeMenu.currentItemId}
            openMenuItemIds={treeMenu.openItemIds}
            onItemClick={(item) => {
              treeMenu.toggle(item.id);
              treeMenu.setCurrent(item.id);
              tabs.openTab({
                id: item.id,
                name: item.label,
                icon: item.icon,
              });
            }}
            onExpandAll={() => treeMenu.expandAll()}
            onCollapseAll={() => treeMenu.collapseAll()}
          />
        </RightResizableWidget>

        <div className="flex-1 flex flex-col bg-white">
          <div className="flex-0">
            <Tabs
              tabs={tabs.tabs}
              currentTabId={tabs.currentTabId}
              onTabClicked={(tab) => {
                tabs.setCurrentTabId(tab.id);
                treeMenu.setCurrent(tab.id);
              }}
              onTabClosed={(tab) => {
                tabs.closeTab(tab.id);
                if (tabs.currentTabId === tab.id) {
                  tabs.setCurrentTabId(undefined);
                  treeMenu.setCurrent(undefined);
                }
              }}
            />
          </div>

          <div className=" flex-1 bg-white">
            <div className="h-full flex flex-col">
              <div className="flex-0 w-full h-9 relative">
                {tabs.currentTabId !== undefined && (
                  <div className="absolute inset-0 overflow-x-overlay overflow-y-hidden scroller transition-colors ease-in-out duration-700 border-transparent scrollbar-h-[3px] hover:border-slate-500/10 hover:duration-700">
                    <Breadcrumbs
                      breadcrumbs={breadcrumbs}
                      onBreadcrumbClicked={(breadcrumb) => {
                        treeMenu.expand(breadcrumb.id);
                        treeMenu.setCurrent(breadcrumb.id);
                        tabs.openTab({
                          id: breadcrumb.id,
                          name: breadcrumb.name,
                          icon: breadcrumb.icon,
                        });
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="flex-1 h-full w-full relative min-w-[32rem]">
                <div className="absolute inset-0 overflow-y-overlay overflow-x-overlay scroller transition-colors ease-in-out duration-700 border-transparent scrollbar-w-2.5 scrollbar-h-2.5 hover:border-slate-500/10 hover:duration-700">
                  <div className="p-2 space-y-8 divide-y divide-slate-200">
                    <div className="flex gap-2">
                      <div className="flex-grow-0 flex-shrink-0 max-w-lg w-full">
                        {relationships && (
                          <NodeRelationshipsView
                            relationships={relationships}
                            onNodeClick={(path) => {
                              treeMenu.expand(path);
                              treeMenu.setCurrent(path);
                              openTab(path);
                            }}
                          />
                        )}
                      </div>
                      <div className="flex-1 flex-shrink-0 min-w-[24rem]">
                        {currentNode && (
                          <NodeAttributes node={currentNode?.schema} />
                        )}
                      </div>
                    </div>

                    {currentNode && (
                      <NodeInteractionView node={currentNode?.schema} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <TopResizableWidget className="flex flex-col h-60 min-h-[62px]">
            <div className="flex-1 flex flex-col bg-white border-t border-slate-200">
              <div className="px-2 flex items-center text-xs text-slate-600">
                {buttons.map((button) => {
                  return (
                    <button className="px-2.5 py-1 uppercase group">
                      <div
                        className={classNames("px-0.5 py-1 border-slate-600", {
                          "border-b": button.current,
                          "group-hover:text-slate-800": !button.current,
                        })}
                      >
                        {button.text}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex-1 relative">
                <div className="absolute inset-0 overflow-y-overlay overflow-x-overlay scroller transition-colors ease-in-out duration-700 border-transparent scrollbar-w-2.5 scrollbar-h-2.5 hover:border-slate-500/10 hover:duration-700">
                  <pre className="p-4 text-xs">
                    {JSON.stringify(schema, undefined, 2)}
                  </pre>
                </div>
              </div>
            </div>
          </TopResizableWidget>
        </div>
      </div>
    </div>
  );
};
