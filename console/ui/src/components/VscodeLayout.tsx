import { BeakerIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import type { inferRouterOutputs } from "@trpc/server";
import {
  LogEntry,
  LogLevel,
  ExplorerItem,
  State,
  Router,
} from "@wingconsole/server";
import { useEffect, useMemo, useRef, useState } from "react";

import { BlueScreenOfDeath } from "../design-system/BlueScreenOfDeath.js";
import { LeftResizableWidget } from "../design-system/LeftResizableWidget.js";
import { RightResizableWidget } from "../design-system/RightResizableWidget.js";
import { ScrollableArea } from "../design-system/ScrollableArea.js";
import { SpinnerLoader } from "../design-system/SpinnerLoader.js";
import { Tabs } from "../design-system/Tabs.js";
import { TopResizableWidget } from "../design-system/TopResizableWidget.js";
import { TreeMenu, TreeMenuItem } from "../design-system/TreeMenu.js";
import { trpc } from "../utils/trpc.js";
import { useTreeMenuItems } from "../utils/useTreeMenuItems.js";
import { ResourceIcon } from "../utils/utils.js";

import { ConsoleFilters } from "./ConsoleFilters.js";
import { ConsoleLogs } from "./ConsoleLogs.js";
import { ElkMap } from "./elk-map/ElkMap.js";
import { ContainerNode } from "./ElkMapNodes.js";
import { MetadataPanel } from "./MetadataPanel.js";
import { StatusBar } from "./StatusBar.js";
import { TestsTab } from "./TestsTab.js";
import { TestItem, TestStatus, TestsTree } from "./TestsTree.js";

type RouterOutput = inferRouterOutputs<Router>;

export interface VscodeLayoutProps {
  cloudAppState: State;
  wingVersion: string | undefined;
}

const getTestName = (testPath: string) => {
  const test = testPath.split("/").pop() ?? testPath;
  return test.replace(/test: /g, "");
};

export const VscodeLayout = ({
  cloudAppState,
  wingVersion,
}: VscodeLayoutProps) => {
  const {
    items,
    expandAll,
    setItems,
    setCurrent,
    currentItemId,
    toggle,
    openItemIds,
    collapseAll,
    expand,
  } = useTreeMenuItems();

  const errorMessage = trpc["app.error"].useQuery();
  const explorerTree = trpc["app.explorerTree"].useQuery();
  const [currentTabId, setCurrentTabId] = useState("logs");
  const [tabsWithNotifications, setTabsWithNotifications] = useState<string[]>(
    [],
  );

  const openTab = (tabId: string) => {
    setCurrentTabId(tabId);
    setTabsWithNotifications(
      tabsWithNotifications.filter((id) => id !== tabId),
    );
  };

  const setHasNotifications = (tabId: string) => {
    if (tabId !== currentTabId) {
      setTabsWithNotifications([...tabsWithNotifications, tabId]);
    }
  };

  const [testTree, setTestTree] = useState<TestItem[]>([]);

  const testListQuery = trpc["test.list"].useQuery();
  useEffect(() => {
    if (!testListQuery.data) {
      return;
    }
    setTestTree(
      testListQuery.data.map((resourcePath) => {
        return {
          id: resourcePath,
          label: getTestName(resourcePath),
          status: "pending",
        };
      }),
    );
  }, [testListQuery.data]);

  const setTestStatus = (
    resourcePath: string,
    status: TestStatus,
    time?: number,
  ) => {
    setTestTree((testTree) => {
      return testTree.map((testItem) => {
        if (testItem.id === resourcePath) {
          return {
            ...testItem,
            status,
            time: time || testItem.time,
          };
        }
        return testItem;
      });
    });
  };

  const setAllTestStatus = (status: TestStatus, time?: number) => {
    setTestTree((testTree) => {
      return testTree.map((testItem) => {
        return {
          ...testItem,
          status,
          time: time || testItem.time,
        };
      });
    });
  };

  const onRunTestsSuccess = (runOutput: RouterOutput["test.run"][]) => {
    setHasNotifications("tests");
    for (const output of runOutput) {
      setTestStatus(
        output.path,
        output.error ? "error" : "success",
        output.time,
      );
    }
  };

  const runAllTests = trpc["test.runAll"].useMutation({
    onMutate: () => {
      setAllTestStatus("running");
    },
    onSuccess: (data) => onRunTestsSuccess(data),
  });

  const runTest = trpc["test.run"].useMutation({
    onMutate: (data) => {
      setTestStatus(data.resourcePath, "running");
    },
    onSuccess: (data) => onRunTestsSuccess([data]),
  });

  useEffect(() => {
    if (explorerTree.data) {
      setItems([createTreeMenuItemFromExplorerTreeItem(explorerTree.data)]);
      setCurrent("root");
    }
  }, [explorerTree.data, setItems, setCurrent]);

  useEffect(() => {
    expandAll();
  }, [items, expandAll]);

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
  }, [logs.data]);

  const onResourceClick = (log: LogEntry) => {
    const path = log.ctx?.sourcePath;
    if (path) {
      setCurrent(path);
    }
  };

  const metadata = trpc["app.nodeMetadata"].useQuery(
    {
      path: currentItemId,
    },
    {
      enabled: !!currentItemId,
    },
  );

  const isLoading = useMemo(() => {
    return cloudAppState === "loading" || explorerTree.isLoading;
  }, [explorerTree, cloudAppState]);

  const map = trpc["app.map"].useQuery();
  const mapRefs = useRef<{ [key: string]: HTMLElement | undefined }>({});
  useEffect(() => {
    if (!currentItemId) {
      return;
    }

    const element = mapRefs.current[currentItemId];
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, [currentItemId]);

  return (
    <div
      data-testid="vscode-layout"
      className="h-full flex flex-col bg-slate-50 select-none"
    >
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
          error={errorMessage.data ?? ""}
        />

        <RightResizableWidget className="h-full flex flex-col w-80 min-w-[10rem] min-h-[15rem] border-r border-slate-300">
          <div className="flex grow">
            <TreeMenu
              title="Explorer"
              items={items}
              selectedItemId={currentItemId}
              openMenuItemIds={openItemIds}
              onItemClick={(item) => {
                setCurrent(item.id);
              }}
              onItemToggle={(item) => {
                toggle(item.id);
              }}
              onExpandAll={() => expandAll()}
              onCollapseAll={() => collapseAll()}
              disabled={isLoading}
              dataTestId={"explorer-tree-menu"}
            />
          </div>
          <TopResizableWidget className="h-1/3 border-t border-slate-300">
            {testTree.length === 0 && (
              <div className="text-slate-400 text-2xs px-3 py-2 font-mono">
                No Tests
              </div>
            )}
            <TestsTree
              items={testTree}
              onItemClick={(item) =>
                runTest.mutateAsync({
                  resourcePath: item,
                })
              }
              onRunAll={() => runAllTests.mutateAsync()}
              runAllDisabled={testTree.length === 0}
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
                        selectedNodeId={currentItemId}
                        onSelectedNodeIdChange={setCurrent}
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
                              selected={node.id === currentItemId}
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
                    setCurrent(path);
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
                    {isLoading && (
                      <div className="absolute bg-white bg-opacity-70 h-full w-full z-50" />
                    )}
                    <ConsoleFilters
                      selectedLogTypeFilters={selectedLogTypeFilters}
                      setSelectedLogTypeFilters={setSelectedLogTypeFilters}
                      clearLogs={() => setLogsTimeFilter(Date.now())}
                      isLoading={isLoading}
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
