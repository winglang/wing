import {
  SpinnerLoader,
  LeftResizableWidget,
  RightResizableWidget,
  TopResizableWidget,
  USE_EXTERNAL_THEME_COLOR,
} from "@wingconsole/design-system";
import type { State, LayoutConfig, LayoutComponent } from "@wingconsole/server";
import { useLoading } from "@wingconsole/use-loading";
import { PersistentStateProvider } from "@wingconsole/use-persistent-state";
import classNames from "classnames";
import { useCallback, useEffect, useMemo } from "react";

import { EndpointsTreeView } from "../features/endpoints-tree-view.js";
import { MapView } from "../features/map-view.js";
import { TestsTreeView } from "../features/tests-tree-view.js";
import { BlueScreenOfDeath } from "../ui/blue-screen-of-death.js";
import { EdgeMetadata } from "../ui/edge-metadata.js";
import { Explorer } from "../ui/explorer.js";
import { ResourceMetadata } from "../ui/resource-metadata.js";
import { LogsWidget } from "../widgets/logs.js";

import { SignInModal } from "./sign-in.js";
import { StatusBar } from "./status-bar.js";
import { useLayout } from "./use-layout.js";
import { WebSocketState } from "./websocket-state.js";

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
        type: "endpoints",
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
    showTests,
    onResourceClick,
    title,
  } = useLayout({
    cloudAppState,
  });

  useEffect(() => {
    document.title = title;
  }, [title]);

  const { loading: deferredLoading, setLoading: setDeferredLoading } =
    useLoading({
      delay: 800,
      duration: 100,
    });
  useEffect(() => {
    setDeferredLoading(loading);
  }, [loading, setDeferredLoading]);

  const layout: LayoutConfig = useMemo(() => {
    return {
      ...defaultLayoutConfig,
      ...layoutConfig,
    };
  }, [layoutConfig]);

  const selectedItemId = useMemo(() => selectedItems.at(0), [selectedItems]);

  const onTestsSelectedItemsChange = useCallback(
    (items: string[]) => {
      if (!showTests) {
        return;
      }
      setSelectedItems(items);
    },
    [showTests, setSelectedItems],
  );

  const renderLayoutComponent = useCallback(
    (component: LayoutComponent) => {
      switch (component.type) {
        case "explorer": {
          return (
            <div key={component.type} className="flex grow">
              <Explorer
                loading={loading}
                items={items}
                selectedItemId={selectedItemId}
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
              onSelectedItemsChange={onTestsSelectedItemsChange}
              selectedItemId={showTests ? selectedItemId : undefined}
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
              <LogsWidget onResourceClick={onResourceClick} />
            </div>
          );
        }
        case "endpoints": {
          return <EndpointsTreeView key={component.type} />;
        }
      }
    },
    [
      loading,
      items,
      selectedItemId,
      setSelectedItems,
      expandedItems,
      setExpandedItems,
      expandAll,
      collapseAll,
      onTestsSelectedItemsChange,
      showTests,
      theme.bg3,
      onResourceClick,
    ],
  );

  const onConnectionNodeClick = useCallback(
    (path: string) => {
      expand(path);
      setSelectedItems([path]);
    },
    [expand, setSelectedItems],
  );

  const setSelectedItemSingle = useCallback(
    (nodeId: string | undefined) => setSelectedItems(nodeId ? [nodeId] : []),
    [setSelectedItems],
  );

  return (
    <>
      <SignInModal />
      <WebSocketState />

      <div className={classNames("w-full h-full", theme.bg1)}>
        <div
          data-testid="default-layout"
          className={classNames(
            "w-full h-full flex flex-col select-none",
            theme.text2,
            "gap-0.5",
            layout?.panels?.rounded && "pt-1",
          )}
        >
          <PersistentStateProvider>
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

            {cloudAppState !== "error" && (
              <>
                {loading && (
                  <div
                    data-testid="loading-overlay"
                    className="fixed inset-0"
                  />
                )}

                <div className="flex-1 flex relative gap-0.5">
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
                          layout.panels?.rounded &&
                            "rounded-lg overflow-hidden",
                        )}
                        data-testid="map-view"
                      >
                        <MapView
                          selectedNodeId={selectedItems[0]}
                          onSelectedNodeIdChange={setSelectedItemSingle}
                          selectedEdgeId={selectedEdgeId}
                          onSelectedEdgeIdChange={setSelectedEdgeId}
                        />
                      </div>
                      {!layout.rightPanel?.hide && (
                        <LeftResizableWidget
                          className={classNames(
                            theme.border4,
                            "flex-shrink w-80 min-w-[10rem] z-10",
                            USE_EXTERNAL_THEME_COLOR,
                          )}
                        >
                          <div
                            className={classNames(
                              "w-full h-full relative",
                              theme.bg3,
                              layout.panels?.rounded &&
                                "rounded-lg overflow-hidden",
                            )}
                          >
                            <div
                              className={classNames(
                                "absolute h-full w-full bg-white/70 dark:bg-slate-600/70",
                                "transition-all",
                                deferredLoading && "opacity-100 z-50",
                                !deferredLoading && "opacity-100 -z-10",
                              )}
                            >
                              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <SpinnerLoader data-testid="main-view-loader" />
                              </div>
                            </div>

                            {metadata.data && (
                              <ResourceMetadata
                                node={metadata.data?.node}
                                inbound={metadata.data?.inbound}
                                outbound={metadata.data?.outbound}
                                onConnectionNodeClick={onConnectionNodeClick}
                              />
                            )}

                            {selectedEdgeId && edgeMetadata.data && (
                              <EdgeMetadata
                                source={edgeMetadata.data.source}
                                target={edgeMetadata.data.target}
                                inflights={edgeMetadata.data.inflights}
                                onConnectionNodeClick={onConnectionNodeClick}
                              />
                            )}
                          </div>
                        </LeftResizableWidget>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
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
                        key={index}
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
          </PersistentStateProvider>
        </div>
      </div>
    </>
  );
};
