import { BeakerIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import { LogEntry, LogLevel, State } from "@wingconsole/server";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { BlueScreenOfDeath } from "../design-system/BlueScreenOfDeath.js";
import { LeftResizableWidget } from "../design-system/LeftResizableWidget.js";
import { RightResizableWidget } from "../design-system/RightResizableWidget.js";
import { ScrollableArea } from "../design-system/ScrollableArea.js";
import { SpinnerLoader } from "../design-system/SpinnerLoader.js";
import { Tabs } from "../design-system/Tabs.js";
import { TopResizableWidget } from "../design-system/TopResizableWidget.js";
import { trpc } from "../utils/trpc.js";
import { useExplorer } from "../utils/use-explorer.js";
import { ResourceIcon } from "../utils/utils.js";

import { ConsoleFilters } from "./ConsoleFilters.js";
import { ConsoleLogs } from "./ConsoleLogs.js";
import { ElkMap } from "./elk-map/ElkMap.js";
import { ContainerNode } from "./ElkMapNodes.js";
import { Explorer } from "./explorer.js";
import { MetadataPanel } from "./MetadataPanel.js";
import { StatusBar } from "./StatusBar.js";
import { TestsTab } from "./TestsTab.js";
import { TestsTree } from "./TestsTree.js";

export interface VscodeLayoutProps {
  cloudAppState: State;
  wingVersion: string | undefined;
}

export const VscodeLayout = ({
  cloudAppState,
  wingVersion,
}: VscodeLayoutProps) => {
  const {
    items,
    selectedItems,
    setSelectedItems,
    expandedItems,
    setExpandedItems,
    expand,
    expandAll,
    collapseAll,
  } = useExplorer();

  const errorMessage = trpc["app.error"].useQuery();
  const [currentTabId, setCurrentTabId] = useState("logs");
  const [tabsWithNotifications, setTabsWithNotifications] = useState<string[]>(
    [],
  );

  const openTab = useCallback((tabId: string) => {
    setCurrentTabId(tabId);
    setTabsWithNotifications((tabsWithNotifications) =>
      tabsWithNotifications.filter((id) => id !== tabId),
    );
  }, []);

  const setHasNotifications = useCallback(
    (tabId: string) => {
      if (tabId !== currentTabId) {
        setTabsWithNotifications((tabsWithNotifications) => [
          ...tabsWithNotifications,
          tabId,
        ]);
      }
    },
    [currentTabId],
  );

  const [selectedLogTypeFilters, setSelectedLogTypeFilters] = useState<
    LogLevel[]
  >(["info", "warn", "error"]);
  const [searchText, setSearchText] = useState("");

  const [logsTimeFilter, setLogsTimeFilter] = useState(0);

  const logs = trpc["app.logs"].useQuery(
    {
      filters: {
        level: {
          verbose: selectedLogTypeFilters.includes("verbose"),
          info: selectedLogTypeFilters.includes("info"),
          warn: selectedLogTypeFilters.includes("warn"),
          error: selectedLogTypeFilters.includes("error"),
        },
        text: searchText,
        timestamp: logsTimeFilter,
      },
    },
    {
      keepPreviousData: true,
    },
  );

  const logsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const div = logsRef.current;
    if (div) {
      div.scrollTo({ top: div.scrollHeight });
    }

    if (!logs.data) {
      return;
    }
    setHasNotifications("logs");
    // TODO: Fix the whole notifications thing. If setHasNotifications is added as a dependency, it stops working.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logs.data]);

  const onResourceClick = (log: LogEntry) => {
    const path = log.ctx?.sourcePath;
    if (path) {
      setSelectedItems([path]);
    }
  };

  const metadata = trpc["app.nodeMetadata"].useQuery(
    {
      path: selectedItems[0],
    },
    {
      enabled: selectedItems.length > 0,
    },
  );

  const loading = useMemo(() => {
    return cloudAppState === "loading";
  }, [cloudAppState]);

  const map = trpc["app.map"].useQuery();
  const mapRefs = useRef<{ [key: string]: HTMLElement | undefined }>({});
  useEffect(() => {
    const [selectedItem] = selectedItems;
    if (!selectedItem) {
      return;
    }

    const element = mapRefs.current[selectedItem];
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, [selectedItems]);

  return (
    <div
      data-testid="vscode-layout"
      className="h-full flex flex-col bg-slate-50 select-none"
    >
      <div className="flex-1 flex relative">
        {loading && (
          <div className="absolute bg-white bg-opacity-70 h-full w-full z-50">
            <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <SpinnerLoader />
            </div>
          </div>
        )}

        <BlueScreenOfDeath
          hidden={cloudAppState !== "error"}
          title={"An error has occurred:"}
          error={errorMessage.data ?? ""}
        />

        <RightResizableWidget className="h-full flex flex-col w-80 min-w-[10rem] min-h-[15rem] border-r border-slate-300">
          <div className="flex grow">
            <Explorer
              loading={loading}
              items={items}
              selectedItems={selectedItems}
              onSelectedItemsChange={setSelectedItems}
              expandedItems={expandedItems}
              onExpandedItemsChange={setExpandedItems}
              onExpandAll={expandAll}
              onCollapseAll={collapseAll}
              data-testid="explorer-tree-menu"
            />
          </div>
          <TopResizableWidget className="h-1/3 border-t border-slate-300">
            <TestsTree
              onRunAll={() => {
                setHasNotifications("tests");
              }}
              onRunTest={() => {
                setHasNotifications("tests");
              }}
            />
          </TopResizableWidget>
        </RightResizableWidget>

        <div className="flex-1 flex flex-col">
          <div className="flex-1 flex">
            <div className="flex-1 flex flex-col">
              <div className="flex-shrink-0 h-9 bg-gray-50"></div>
              <div className="h-full relative">
                <ScrollableArea overflowX overflowY className="bg-white">
                  <div
                    data-testid="map-view"
                    className="min-h-full flex justify-around items-center"
                  >
                    {map.data && (
                      <ElkMap
                        nodes={map.data.nodes}
                        edges={map.data.edges}
                        selectedNodeId={selectedItems[0]}
                        onSelectedNodeIdChange={(nodeId) =>
                          setSelectedItems([nodeId])
                        }
                        node={({ node, depth }) => (
                          <div
                            ref={(element) =>
                              (mapRefs.current[node.id] = element || undefined)
                            }
                            className="h-full flex flex-col relative"
                          >
                            <ContainerNode
                              name={node.data?.label}
                              open={node.children && node.children?.length > 0}
                              selected={node.id === selectedItems[0]}
                              resourceType={node.data?.type}
                              icon={(props) => (
                                <ResourceIcon
                                  resourceType={node.data?.type}
                                  solid
                                  {...props}
                                />
                              )}
                              depth={depth}
                            />
                          </div>
                        )}
                      />
                    )}
                  </div>
                </ScrollableArea>
              </div>
            </div>

            <LeftResizableWidget className="bg-white flex-shrink w-80 min-w-[10rem] border-l border-slate-300 z-10">
              {metadata.data && (
                <MetadataPanel
                  node={metadata.data.node}
                  inbound={metadata.data.inbound}
                  outbound={metadata.data.outbound}
                  onConnectionNodeClick={(path) => {
                    expand(path);
                    setSelectedItems([path]);
                  }}
                />
              )}
            </LeftResizableWidget>
          </div>
        </div>
      </div>
      {cloudAppState !== "error" && (
        <TopResizableWidget className="border-t border-slate-300 bg-slate-50 min-h-[5rem] h-[15rem]">
          <Tabs
            tabs={[
              {
                id: "logs",
                name: "Logs",
                icon: (
                  <DocumentTextIcon className="w-4 h-4 text-slate-600 -ml-0.5" />
                ),
                panel: (
                  <div className="relative h-full flex flex-col gap-2">
                    {loading && (
                      <div className="absolute bg-white bg-opacity-70 h-full w-full z-50" />
                    )}
                    <ConsoleFilters
                      selectedLogTypeFilters={selectedLogTypeFilters}
                      setSelectedLogTypeFilters={setSelectedLogTypeFilters}
                      clearLogs={() => setLogsTimeFilter(Date.now())}
                      isLoading={loading}
                      onSearch={setSearchText}
                    />
                    <div className="relative h-full">
                      <ScrollableArea
                        ref={logsRef}
                        overflowY
                        className="pb-1.5"
                      >
                        <ConsoleLogs
                          logs={logs.data ?? []}
                          onResourceClick={onResourceClick}
                        />
                      </ScrollableArea>
                    </div>
                  </div>
                ),
              },
              {
                id: "tests",
                name: "Tests",
                icon: <BeakerIcon className="w-4 h-4 text-slate-600 -ml-0.5" />,
                panel: <TestsTab />,
              },
            ]}
            tabsWithNotifications={tabsWithNotifications}
            currentTabId={currentTabId}
            onTabChange={openTab}
          />
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
