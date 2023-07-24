import {
  SpinnerLoader,
  LeftResizableWidget,
  RightResizableWidget,
  ScrollableArea,
  TopResizableWidget,
} from "@wingconsole/design-system";
import { State } from "@wingconsole/server";
import { LayoutConfig } from "@wingconsole/server";
import classNames from "classnames";
import { useEffect, useMemo } from "react";

import { ConsoleLogsFilters } from "../features/console-logs-filters.js";
import { ConsoleLogs } from "../features/console-logs.js";
import { MapView } from "../features/map-view.js";
import { TestsTreeView } from "../features/tests-tree-view.js";
import { BlueScreenOfDeath } from "../ui/blue-screen-of-death.js";
import { Explorer } from "../ui/explorer.js";
import { ResourceMetadata } from "../ui/resource-metadata.js";

import { Header } from "./header.js";
import { StatusBar } from "./status-bar.js";
import { TermsAndConditionsModal } from "./terms-and-conditions-modal.js";
import { useLayout } from "./use-layout.js";

export interface LayoutProps {
  cloudAppState: State;
  wingVersion: string | undefined;
  layoutConfig?: LayoutConfig;
}

const defaultLayoutConfig: LayoutConfig = {
  header: {
    hide: false,
    showThemeToggle: true,
  },
  explorer: {
    hide: false,
  },
  testsTree: {
    hide: false,
  },
  logs: {
    hide: false,
    size: "default",
  },
  statusBar: {
    hide: false,
    showThemeToggle: false,
  },
  errorScreen: {
    position: "default",
    displayTitle: true,
    displayLinks: true,
  },
};

export const DefaultLayout = ({
  cloudAppState,
  wingVersion,
  layoutConfig,
}: LayoutProps) => {
  const {
    items,
    selectedItems,
    setSelectedItems,
    expandedItems,
    setExpandedItems,
    expand,
    expandAll,
    collapseAll,
    theme,
    errorMessage,
    loading,
    metadata,
    setSearchText,
    selectedLogTypeFilters,
    setSelectedLogTypeFilters,
    setLogsTimeFilter,
    showTests,
    logsRef,
    logs,
    onResourceClick,
    title,
    wingfile,
    termsConfig,
    acceptTerms,
  } = useLayout({
    cloudAppState,
    defaultLogLevels: ["info", "warn", "error"],
  });

  useEffect(() => {
    document.title = title;
  }, [title]);

  const showTerms = useMemo(() => {
    if (!termsConfig.data) {
      return false;
    }
    return termsConfig.data.requireAcceptTerms && !termsConfig.data.accepted;
  }, [termsConfig.data]);

  const layout = useMemo(() => {
    return {
      ...defaultLayoutConfig,
      ...layoutConfig,
    };
  }, [layoutConfig]);

  return (
    <>
      {showTerms && (
        <TermsAndConditionsModal
          visible={true}
          onAccept={() => acceptTerms()}
          license={termsConfig.data?.license ?? ""}
        />
      )}
      <div
        data-testid="default-layout"
        className={classNames(
          "h-full flex flex-col select-none",
          theme.bg3,
          theme.text2,
          showTerms && "blur-sm",
        )}
      >
        {!layout.header?.hide && (
          <Header
            title={wingfile.data ?? ""}
            showThemeToggle={layout.header?.showThemeToggle}
          />
        )}

        {(cloudAppState === "error" &&
          layout.errorScreen?.position === "default" && (
            <div className="flex-1 flex relative">
              <BlueScreenOfDeath
                title={"An error has occurred:"}
                error={errorMessage.data ?? ""}
                displayLinks={layout.errorScreen?.displayLinks}
                displayWingTitle={layout.errorScreen?.displayTitle}
              />
            </div>
          )) || (
          <>
            <div className="flex-1 flex relative">
              {loading && (
                <div
                  className={classNames(
                    "absolute h-full w-full z-50 bg-white/70 dark:bg-slate-600/70",
                  )}
                  data-testid="loading-overlay"
                >
                  <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <SpinnerLoader />
                  </div>
                </div>
              )}

              {(!layout.explorer?.hide ||
                (!layout.testsTree?.hide &&
                  layout.testsTree?.position === "default")) && (
                <RightResizableWidget
                  className={classNames(
                    theme.border3,
                    "h-full flex flex-col w-80 min-w-[10rem] min-h-[10rem] border-r",
                  )}
                >
                  <div className="flex grow">
                    {!layout.explorer?.hide && (
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
                    )}
                  </div>
                  {!layout.testsTree?.hide &&
                    layout.testsTree?.position === "default" && (
                      <TopResizableWidget
                        className={classNames(theme.border3, "h-1/3 border-t")}
                      >
                        <TestsTreeView />
                      </TopResizableWidget>
                    )}
                </RightResizableWidget>
              )}

              <div className="flex-1 flex flex-col">
                <div className="flex-1 flex">
                  <div className="flex-1 flex flex-col" data-testid="map-view">
                    <MapView
                      showTests={showTests}
                      selectedNodeId={selectedItems[0]}
                      onSelectedNodeIdChange={(nodeId) =>
                        setSelectedItems(nodeId ? [nodeId] : [])
                      }
                    />
                  </div>

                  <LeftResizableWidget
                    className={classNames(
                      theme.border3,
                      "flex-shrink w-80 min-w-[10rem] border-l z-10",
                      theme.bg4,
                    )}
                  >
                    {metadata.data && (
                      <ResourceMetadata
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

            {!layout.logs?.hide && (
              <TopResizableWidget
                className={classNames(
                  theme.border3,
                  "border-t relative flex",
                  theme.bg3,
                  theme.text2,
                  "min-h-[5rem]",
                  layout.logs?.size === "small" && {
                    "h-[30rem]": cloudAppState === "error",
                    "h-[8rem]": cloudAppState !== "error",
                  },
                  layout.logs?.size === "default" && "h-[15rem]",
                )}
              >
                {cloudAppState === "error" &&
                  layout.errorScreen?.position === "bottom" && (
                    <div className="flex-1 flex relative">
                      <BlueScreenOfDeath
                        title={"An error has occurred:"}
                        error={errorMessage.data ?? ""}
                        displayLinks={layout.errorScreen?.displayLinks}
                        displayWingTitle={layout.errorScreen?.displayTitle}
                      />
                    </div>
                  )}

                {!layout.testsTree?.hide &&
                  layout.testsTree?.position === "bottom" && (
                    <RightResizableWidget
                      className={classNames(
                        theme.border3,
                        "h-full w-1/4 flex flex-col min-w-[10rem] min-h-[10rem] border-r",
                      )}
                    >
                      <TestsTreeView />
                    </RightResizableWidget>
                  )}

                <div
                  className={classNames(
                    "flex-1 flex flex-col min-w-[10rem] min-h-[15rem] border-b border-slate-300",
                  )}
                >
                  <div className="relative h-full flex flex-col gap-2">
                    {loading && (
                      <div
                        className={classNames(
                          "absolute h-full w-full z-50 bg-white/70 dark:bg-slate-600/70",
                          theme.text2,
                        )}
                      />
                    )}
                    <ConsoleLogsFilters
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
                        className={classNames("pb-1.5", theme.bg3, theme.text2)}
                      >
                        <ConsoleLogs
                          logs={logs.data ?? []}
                          onResourceClick={onResourceClick}
                        />
                      </ScrollableArea>
                    </div>
                  </div>
                </div>
              </TopResizableWidget>
            )}
          </>
        )}

        {!layout.statusBar?.hide && (
          <StatusBar
            wingVersion={wingVersion}
            cloudAppState={cloudAppState}
            isError={cloudAppState === "error"}
            showThemeToggle={layout.statusBar?.showThemeToggle}
          />
        )}
      </div>
    </>
  );
};
