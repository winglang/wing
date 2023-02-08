import { useEffect, useMemo, useRef, useState } from "react";

import { LogEntry, LogLevel } from "../../electron/main/consoleLogger.js";
import { ExplorerItem } from "../../electron/main/router/app.js";
import { State } from "../../electron/main/types.js";
import { BlueScreenOfDeath } from "../design-system/BlueScreenOfDeath.js";
import { Breadcrumbs } from "../design-system/Breadcrumbs.js";
import { Button } from "../design-system/Button.js";
import { LeftResizableWidget } from "../design-system/LeftResizableWidget.js";
import { RightResizableWidget } from "../design-system/RightResizableWidget.js";
import { ScrollableArea } from "../design-system/ScrollableArea.js";
import { SpinnerLoader } from "../design-system/SpinnerLoader.js";
import { TopResizableWidget } from "../design-system/TopResizableWidget.js";
import {
  SELECTED_TREE_ITEM_CSS_ID,
  TreeMenu,
  TreeMenuItem,
} from "../design-system/TreeMenu.js";
import { ResourceIcon } from "../stories/utils.js";
import { trpc } from "../utils/trpc.js";
import { useTreeMenuItems } from "../utils/useTreeMenuItems.js";

import { ConsoleLogs } from "./ConsoleLogs.js";
import { DetailedNode } from "./DetailedNode.js";
import { HeaderBanner } from "./HeaderBanner.js";
import LogsFilters from "./LogsFilters.js";
import { MetadataPanel } from "./MetadataPanel.js";
import { EmptyConstructView } from "./resource-views/EmptyConstructView.jsx";
import { ResourceView } from "./resource-views/ResourceView.js";
import { StatusBar } from "./StatusBar.js";

export interface VscodeLayoutProps {
  cloudAppState: State;
  wingVersion: string | undefined;
}

const NewIssueUrl = "https://github.com/winglang/wing/issues/new/choose";

export const VscodeLayout = ({
  cloudAppState,
  wingVersion,
}: VscodeLayoutProps) => {
  const [showBanner, setShowBanner] = useState(true);
  const treeMenu = useTreeMenuItems();

  const explorerTree = trpc["app.explorerTree"].useQuery();
  useEffect(() => {
    if (explorerTree.data) {
      treeMenu.setItems([
        createTreeMenuItemFromExplorerTreeItem(explorerTree.data),
      ]);
      treeMenu.setCurrent("root");
    }
  }, [explorerTree.data]);

  useEffect(() => {
    treeMenu.expandAll();
  }, [treeMenu.items]);

  const openExternalUrl = (url: string) => {
    // TODO: Use TRPC directly.
    if (window.electronTRPC) {
      window.electronTRPC.ipcRenderer.send("open-external-url", url);
    }
  };

  const childRelationships = trpc["app.childRelationships"].useQuery(
    {
      path: treeMenu.currentItemId,
    },
    {
      enabled: !!treeMenu.currentItemId,
    },
  );

  useEffect(() => {
    document.querySelector(`.${SELECTED_TREE_ITEM_CSS_ID}`)?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });
  }, [treeMenu.currentItemId]);

  const breadcrumbs = trpc["app.nodeBreadcrumbs"].useQuery(
    {
      path: treeMenu.currentItemId,
    },
    {
      enabled: !!treeMenu.currentItemId,
    },
  );

  const currentNode = trpc["app.node"].useQuery(
    {
      path: treeMenu.currentItemId,
    },
    {
      enabled: !!treeMenu.currentItemId,
    },
  );

  const [selectedLogTypeFilters, setSelectedLogTypeFilters] = useState<
    LogLevel[]
  >(["info", "warn", "error"]);

  const [logsTimeFilter, setLogsTimeFilter] = useState(0);
  const clearLogs = () => {
    setLogsTimeFilter(Date.now());
  };

  const logs = trpc["app.logs"].useQuery({
    filters: {
      level: {
        verbose: selectedLogTypeFilters.includes("verbose"),
        info: selectedLogTypeFilters.includes("info"),
        warn: selectedLogTypeFilters.includes("warn"),
        error: selectedLogTypeFilters.includes("error"),
      },
      source: {
        compiler: true,
        console: true,
        simulator: true,
      },
      timestamp: logsTimeFilter,
    },
  });
  const logsRef = useRef<HTMLDivElement>(null);
  const [lastErrorMessage, setLastErrorMessage] = useState<string>("");
  useEffect(() => {
    const div = logsRef.current;
    if (div) {
      div.scrollTo({ top: div.scrollHeight });
    }
    const lastError = logs.data
      ?.reverse()
      .find((log: LogEntry) => log.level === "error");
    if (lastError) {
      setLastErrorMessage(lastError.message);
    }
  }, [logs.data]);

  const metadata = trpc["app.nodeMetadata"].useQuery(
    {
      path: treeMenu.currentItemId,
    },
    {
      enabled: !!treeMenu.currentItemId,
    },
  );

  const isLoading = useMemo(() => {
    return cloudAppState === "loading" || explorerTree.isLoading;
  }, [explorerTree, cloudAppState]);

  return (
    <div className="h-full flex flex-col bg-slate-50 select-none">
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
      <div className="flex-1 flex relative">
        {isLoading && (
          <div className="absolute bg-white bg-opacity-70 h-full w-full z-50">
            <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <SpinnerLoader />
            </div>
          </div>
        )}

        <BlueScreenOfDeath
          hidden={cloudAppState !== "error"}
          title={"An error has occurred:"}
          error={lastErrorMessage}
        />

        <RightResizableWidget className="h-full flex flex-col w-80 min-w-[10rem] min-h-[15rem] border-r border-slate-200">
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
            disabled={isLoading}
          />
        </RightResizableWidget>

        <div className="flex-1 flex flex-col">
          <div className="flex-0 flex-shrink-0 w-full h-9 relative bg-white border-b">
            {breadcrumbs.data && (
              <ScrollableArea
                overflowX
                scrollbarSize="xs"
                className="flex flex-col justify-around overflow-y-hidden"
              >
                <Breadcrumbs
                  breadcrumbs={breadcrumbs.data.map((node) => ({
                    id: node.path,
                    name: node.id,
                    icon: (
                      <ResourceIcon
                        resourceType={node.type}
                        className="w-4 h-4"
                      />
                    ),
                  }))}
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
              <ScrollableArea overflowX className="flex flex-col">
                {currentNode.data &&
                  !currentNode.data?.type?.startsWith("wingsdk.") &&
                  childRelationships.data &&
                  childRelationships.data.length === 0 && (
                    <EmptyConstructView
                      resourceType={currentNode.data.type}
                      resourcePath={currentNode.data.path}
                    />
                  )}
                {!currentNode.data?.type?.startsWith("wingsdk.") &&
                  childRelationships.data && (
                    <div className="flex-1 bg-slate-50 min-w-[40rem] p-4 mx-auto flex flex-col gap-y-2">
                      {childRelationships.data.map((child, index) => (
                        <DetailedNode
                          key={`${child.node.path}_${index}`}
                          node={{
                            id: child.node.id,
                            path: child.node.path,
                            type: child.node.type,
                            title: "",
                            icon: (
                              <ResourceIcon
                                resourceType={child.node.type}
                                className="w-4 h-4"
                              />
                            ),
                          }}
                          inbound={child.inbound.map((relationship) => ({
                            id: relationship.node.id,
                            path: relationship.node.path,
                            icon: (
                              <ResourceIcon
                                resourceType={relationship.node.type}
                                className="w-4 h-4"
                              />
                            ),
                            relationshipName: relationship.relationshipType,
                          }))}
                          outbound={child.outbound.map((relationship) => ({
                            id: relationship.node.id,
                            path: relationship.node.path,
                            icon: (
                              <ResourceIcon
                                resourceType={relationship.node.type}
                                className="w-4 h-4"
                              />
                            ),
                            relationshipName: relationship.relationshipType,
                          }))}
                          onClick={(path) => {
                            treeMenu.expand(path);
                            treeMenu.setCurrent(path);
                          }}
                        />
                      ))}
                    </div>
                  )}

                {currentNode.data?.type?.startsWith("wingsdk.cloud") && (
                  <ResourceView
                    resourceType={currentNode.data.type}
                    resourcePath={currentNode.data.path}
                  />
                )}
              </ScrollableArea>
            </div>

            <LeftResizableWidget className="bg-white flex-shrink w-80 min-w-[10rem] border-l z-10">
              {metadata.data && (
                <MetadataPanel
                  node={metadata.data.node}
                  inbound={metadata.data.inbound}
                  outbound={metadata.data.outbound}
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
      {cloudAppState !== "error" && (
        <TopResizableWidget className="border-t bg-white min-h-[5rem] h-[12rem] pt-1.5">
          <div className="relative h-full flex flex-col gap-2">
            {isLoading && (
              <div className="absolute bg-white bg-opacity-70 h-full w-full z-50" />
            )}
            <div className="flex px-4 space-x-2">
              <LogsFilters
                selected={selectedLogTypeFilters}
                onChange={(types) => setSelectedLogTypeFilters(types)}
                disabled={isLoading}
              />
              <Button
                className="mt-1"
                label="Clear"
                onClick={() => clearLogs()}
              />
            </div>

            <div className="relative h-full">
              <ScrollableArea ref={logsRef} overflowY className="px-4 pb-1.5">
                <ConsoleLogs logs={logs.data ?? []} />
              </ScrollableArea>
            </div>
          </div>
        </TopResizableWidget>
      )}

      <StatusBar
        wingVersion={wingVersion}
        cloudAppState={cloudAppState}
        isError={cloudAppState === "error"}
      />
    </div>
  );
};

function createTreeMenuItemFromExplorerTreeItem(
  item: ExplorerItem,
): TreeMenuItem {
  return {
    id: item.id,
    label: item.label,
    icon: item.type ? (
      <ResourceIcon
        resourceType={item.type}
        className="w-4 h-4"
        darkenOnGroupHover
      />
    ) : undefined,
    children: item.childItems?.map((item) =>
      createTreeMenuItemFromExplorerTreeItem(item),
    ),
  };
}
