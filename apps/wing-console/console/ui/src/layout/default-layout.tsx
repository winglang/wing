import {
  SpinnerLoader,
  LeftResizableWidget,
  RightResizableWidget,
  ScrollableArea,
  TopResizableWidget,
  USE_EXTERNAL_THEME_COLOR,
} from "@wingconsole/design-system";
import type { State, LayoutConfig, LayoutComponent } from "@wingconsole/server";
import { useLoading } from "@wingconsole/use-loading";
import classNames from "classnames";
import { useCallback, useEffect, useMemo, useState } from "react";

import { ConsoleLogsFilters } from "../features/console-logs-filters.js";
import { ConsoleLogs } from "../features/console-logs.js";
import { MapView } from "../features/map-view.js";
import { TestsTreeView } from "../features/tests-tree-view.js";
import { BlueScreenOfDeath } from "../ui/blue-screen-of-death.js";
import { EdgeMetadata } from "../ui/edge-metadata.js";
import { Explorer } from "../ui/explorer.js";
import { ResourceMetadata } from "../ui/resource-metadata.js";

import { StatusBar } from "./status-bar.js";
import { TermsAndConditionsModal } from "./terms-and-conditions-modal.js";
import { useLayout } from "./use-layout.js";

export interface LayoutProps {
  cloudAppState: State;
  wingVersion: string | undefined;
  layoutConfig?: LayoutConfig;
}

const defaultLayoutConfig: LayoutConfig = {
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
    showThemeToggle: true,
  },
  errorScreen: {
    position: "default",
    displayTitle: true,
    displayLinks: true,
  },
  panels: {
    rounded: false,
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

  const { loading: deferredLoading, setLoading: setDeferredLoading } =
    useLoading({
      delay: 500,
      duration: 100,
    });
  useEffect(() => {
    setDeferredLoading(loading);
  }, [loading, setDeferredLoading]);

  const showTerms = useMemo(() => {
    if (!termsConfig.data) {
      return false;
    }
    return termsConfig.data.requireAcceptTerms && !termsConfig.data.accepted;
  }, [termsConfig.data]);

  const layout: LayoutConfig = useMemo(() => {
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
                <div
                  className={classNames(
                    "absolute h-full w-full bg-white/70 dark:bg-slate-600/70",
                    "transition-all",
                    deferredLoading && "opacity-100 z-50",
                    !deferredLoading && "opacity-0 -z-10",
                    theme.text2,
                  )}
                />

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
                      USE_EXTERNAL_THEME_COLOR,
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
      deferredLoading,
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

      <div className={classNames(USE_EXTERNAL_THEME_COLOR, "fixed inset-0")}>
        <div className={classNames("w-full h-full", theme.bg1)} />
      </div>

      <div
        data-testid="default-layout"
        className={classNames(
          "h-full flex flex-col select-none",
          theme.text2,
          showTerms && "blur-sm",
          "gap-0.5",
          layout?.panels?.rounded && "pt-1",
        )}
      >
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
            <div className="flex-1 flex relative gap-0.5">
              <div
                className={classNames(
                  "absolute h-full w-full bg-white/70 dark:bg-slate-600/70",
                  "transition-all",
                  deferredLoading && "opacity-100 z-50",
                  !deferredLoading && "opacity-100 -z-10",
                )}
                data-testid="loading-overlay"
              >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <SpinnerLoader data-testid="main-view-loader" />
                </div>
              </div>

              {!layout.leftPanel?.hide &&
                layout.leftPanel?.components?.length && (
                  <RightResizableWidget
                    className={classNames(
                      USE_EXTERNAL_THEME_COLOR,
                      "h-full flex flex-col w-80 min-w-[10rem] min-h-[10rem] gap-0.5",
                    )}
                  >
                    {layout.leftPanel?.components.map(
                      (component: LayoutComponent, index: number) => {
                        const panelComponent = (
                          <div
                            className={classNames(
                              layout.panels?.rounded &&
                                "rounded-lg overflow-hidden",
                              index === 0 && "flex grow",
                              index > 0 && "h-full",
                            )}
                          >
                            {renderLayoutComponent(component)}
                          </div>
                        );

                        if (index > 0) {
                          return (
                            <TopResizableWidget
                              key={component.type}
                              className="h-1/3"
                            >
                              {panelComponent}
                            </TopResizableWidget>
                          );
                        }
                        return (
                          <div
                            key={index}
                            className={classNames(
                              "flex grow",
                              layout.panels?.rounded &&
                                "rounded-lg overflow-hidden",
                            )}
                          >
                            {panelComponent}
                          </div>
                        );
                      },
                    )}
                  </RightResizableWidget>
                )}

              <div className="flex-1 flex flex-col">
                <div className="flex-1 flex gap-0.5">
                  <div
                    className={classNames(
                      "flex-1 flex flex-col",
                      USE_EXTERNAL_THEME_COLOR,
                      layout.panels?.rounded && "rounded-lg overflow-hidden",
                    )}
                    data-testid="map-view"
                  >
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
                      theme.border4,
                      "flex-shrink w-80 min-w-[10rem] z-10",
                    )}
                  >
                    <div
                      className={classNames(
                        "w-full h-full relative",
                        USE_EXTERNAL_THEME_COLOR,
                        theme.bg4,
                        layout.panels?.rounded && "rounded-lg overflow-hidden",
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
                    </div>
                  </LeftResizableWidget>
                </div>
              </div>
            </div>

            {!layout.bottomPanel?.hide && (
              <TopResizableWidget
                className={classNames(
                  USE_EXTERNAL_THEME_COLOR,
                  "relative flex",
                  theme.text2,
                  "min-h-[5rem]",
                  "gap-0.5",
                  (layout.bottomPanel?.size === "small" && "h-[8rem]") ||
                    "h-[15rem]",
                )}
              >
                {layout.bottomPanel?.components?.map(
                  (component: LayoutComponent, index: number) => {
                    const panelComponent = (
                      <div
                        className={classNames(
                          layout.panels?.rounded &&
                            "rounded-lg overflow-hidden",
                          "flex grow",
                        )}
                      >
                        {renderLayoutComponent(component)}
                      </div>
                    );

                    if (
                      layout.bottomPanel?.components?.length &&
                      layout.bottomPanel.components.length > 1 &&
                      index !== layout.bottomPanel.components.length - 1
                    ) {
                      return (
                        <RightResizableWidget
                          key={component.type}
                          className={classNames(
                            "h-full w-1/4 flex flex-col min-w-[10rem] min-h-[10rem]",
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
                        theme.border4,
                        "absolute flex",
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
          <div className={classNames(USE_EXTERNAL_THEME_COLOR)}>
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
