import {
  SpinnerLoader,
  LeftResizableWidget,
  RightResizableWidget,
  ScrollableArea,
  TopResizableWidget,
  CUSTOMIZABLE_COLOR,
} from "@wingconsole/design-system";
import type { State, LayoutConfig, LayoutComponent } from "@wingconsole/server";
import classNames from "classnames";
import { useCallback, useEffect, useMemo } from "react";

import { ConsoleLogsFilters } from "../features/console-logs-filters.js";
import { ConsoleLogs } from "../features/console-logs.js";
import { MapView } from "../features/map-view.js";
import { TestsTreeView } from "../features/tests-tree-view.js";
import { BlueScreenOfDeath } from "../ui/blue-screen-of-death.js";
import { EdgeMetadata } from "../ui/edge-metadata.js";
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
  leftPanel: {
    components: [
      {
        type: "explorer",
      },
      {
        type: "tests",
      },
    ],
  },
  bottomPanel: {
    components: [
      {
        type: "logs",
      },
    ],
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
    selectedEdgeId,
    setSelectedEdgeId,
    edgeMetadata,
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

  const renderApp = useMemo(() => {
    return !(
      layout.errorScreen?.position === "default" && cloudAppState === "error"
    );
  }, [layout.errorScreen?.position, cloudAppState]);

  const renderLayoutComponent = useCallback(
    (component: LayoutComponent) => {
      switch (component.type) {
        case "explorer": {
          return (
            <div key={component.type} className="flex grow">
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
          );
        }
        case "tests": {
          return (
            <TestsTreeView
              key={component.type}
              onSelectedItemsChange={(items) => {
                if (!showTests) {
                  return;
                }
                setSelectedItems(items);
              }}
              selectedItems={showTests ? selectedItems : []}
            />
          );
        }
        case "logs": {
          return (
            <div
              key={component.type}
              className={classNames(
                "flex-1 flex flex-col min-w-[10rem]",
                theme.bg3,
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
                    className={classNames(
                      "pb-1.5",
                      theme.bg3,
                      theme.text2,
                      CUSTOMIZABLE_COLOR,
                    )}
                  >
                    <ConsoleLogs
                      logs={logs.data ?? []}
                      onResourceClick={onResourceClick}
                    />
                  </ScrollableArea>
                </div>
              </div>
            </div>
          );
        }
      }
    },
    [
      loading,
      items,
      selectedItems,
      expandedItems,
      logs.data,
      theme,
      logsRef,
      onResourceClick,
      selectedLogTypeFilters,
      setSelectedLogTypeFilters,
      setLogsTimeFilter,
      setSearchText,
      expandAll,
      collapseAll,
      setSelectedItems,
      setExpandedItems,
      showTests,
    ],
  );

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
          <div className={classNames(CUSTOMIZABLE_COLOR)}>
            <Header
              title={wingfile.data ?? ""}
              showThemeToggle={layout.header?.showThemeToggle}
            />
          </div>
        )}

        {cloudAppState === "error" &&
          layout.errorScreen?.position === "default" && (
            <div className="flex-1 flex relative">
              <BlueScreenOfDeath
                title={"An error has occurred:"}
                error={errorMessage.data ?? ""}
                displayLinks={layout.errorScreen?.displayLinks}
                displayWingTitle={layout.errorScreen?.displayTitle}
              />
            </div>
          )}

        {renderApp && (
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
                    <SpinnerLoader data-testid="main-view-loader" />
                  </div>
                </div>
              )}

              {!layout.leftPanel?.hide &&
                layout.leftPanel?.components?.length && (
                  <RightResizableWidget
                    className={classNames(
                      CUSTOMIZABLE_COLOR,
                      theme.border3,
                      "h-full flex flex-col w-80 min-w-[10rem] min-h-[10rem] border-r",
                    )}
                  >
                    {layout.leftPanel?.components.map(
                      (component: LayoutComponent, index: number) => {
                        const panelComponent = renderLayoutComponent(component);

                        if (index > 0) {
                          return (
                            <TopResizableWidget
                              key={component.type}
                              className={classNames(
                                theme.border3,
                                "h-1/3 border-t",
                              )}
                            >
                              {panelComponent}
                            </TopResizableWidget>
                          );
                        }
                        return panelComponent;
                      },
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
                      selectedEdgeId={selectedEdgeId}
                      onSelectedEdgeIdChange={setSelectedEdgeId}
                    />
                  </div>

                  <LeftResizableWidget
                    className={classNames(
                      CUSTOMIZABLE_COLOR,
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
                    {selectedEdgeId && edgeMetadata.data && (
                      <EdgeMetadata
                        source={edgeMetadata.data.source}
                        target={edgeMetadata.data.target}
                        inflights={edgeMetadata.data.inflights}
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

            {!layout.bottomPanel?.hide && (
              <TopResizableWidget
                className={classNames(
                  CUSTOMIZABLE_COLOR,
                  theme.border3,
                  "border-t relative flex",
                  theme.bg3,
                  theme.text2,
                  "min-h-[5rem]",
                  (layout.bottomPanel?.size === "small" && "h-[8rem]") ||
                    "h-[15rem]",
                )}
              >
                {layout.bottomPanel?.components?.map(
                  (component: LayoutComponent, index: number) => {
                    const panelComponent = renderLayoutComponent(component);
                    if (
                      layout.bottomPanel?.components?.length &&
                      layout.bottomPanel.components.length > 1 &&
                      index !== layout.bottomPanel.components.length - 1
                    ) {
                      return (
                        <RightResizableWidget
                          key={component.type}
                          className={classNames(
                            theme.border3,
                            "h-full w-1/4 flex flex-col min-w-[10rem] min-h-[10rem] border-r",
                          )}
                        >
                          {panelComponent}
                        </RightResizableWidget>
                      );
                    }
                    return panelComponent;
                  },
                )}
              </TopResizableWidget>
            )}

            {cloudAppState === "error" &&
              layout.errorScreen?.position === "bottom" && (
                <>
                  <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-40" />

                  <div className="fixed bottom-0 max-h-[80vh] w-full z-50">
                    <TopResizableWidget
                      className={classNames(
                        theme.border3,
                        "border-t absolute flex",
                        theme.bg3,
                        theme.text2,
                        "min-h-[5rem] h-[30rem]",
                      )}
                    >
                      <BlueScreenOfDeath
                        title={"An error has occurred:"}
                        error={errorMessage.data ?? ""}
                        displayLinks={layout.errorScreen?.displayLinks}
                        displayWingTitle={layout.errorScreen?.displayTitle}
                      />
                    </TopResizableWidget>
                  </div>
                </>
              )}
          </>
        )}

        {!layout.statusBar?.hide && (
          <div className={classNames(CUSTOMIZABLE_COLOR)}>
            <StatusBar
              wingVersion={wingVersion}
              cloudAppState={cloudAppState}
              isError={cloudAppState === "error"}
              showThemeToggle={layout.statusBar?.showThemeToggle}
            />
          </div>
        )}
      </div>
    </>
  );
};
