import {
  LeftResizableWidget,
  RightResizableWidget,
  TopResizableWidget,
  USE_EXTERNAL_THEME_COLOR,
  useTheme,
} from "@wingconsole/design-system";
import type { State, LayoutConfig, LayoutComponent } from "@wingconsole/server";
import { useLoading } from "@wingconsole/use-loading";
import classNames from "classnames";
import { useCallback, useEffect, useMemo } from "react";

import { BlueScreenOfDeath } from "../blue-screen-of-death/blue-screen-of-death.js";
import { EndpointTree } from "../endpoints-pane/endpoint-tree.js";
import { Explorer } from "../explorer-pane/explorer.js";
import { Hierarchy } from "../hierarchy-pane/hierarchy.js";
import { Inspector } from "../inspector-pane/inspector.js";
import { LogsWidget } from "../logs-pane/logs.js";
import { useSelectionContext } from "../selection-context/selection-context.js";
import { SignInModal } from "../sign-in/sign-in.js";
import { StatusBar } from "../status-bar/status-bar.js";
import { TestTree } from "../tests-pane/test-tree.js";
import { WebSocketState } from "../websocket-state/websocket-state.js";

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
  const { theme } = useTheme();

  const { loading, showTests, onResourceClick, title } = useLayout({
    cloudAppState,
  });

  const { selectedItems, setSelectedItems } = useSelectionContext();

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
              <Hierarchy loading={loading} data-testid="explorer-tree-menu" />
            </div>
          );
        }
        case "tests": {
          return (
            <TestTree
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
          return <EndpointTree key={component.type} />;
        }
      }
    },
    [
      loading,
      selectedItemId,
      onTestsSelectedItemsChange,
      showTests,
      theme.bg3,
      onResourceClick,
    ],
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
            layout?.panels?.rounded && "pt-1",
          )}
        >
          <div
            className={classNames(
              "w-full h-full flex flex-col select-none",
              "gap-0.5",
            )}
          >
            {/* Middle panels */}
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
                                  className="h-1/5"
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
                        <Explorer />
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
                            <Inspector />
                          </div>
                        </LeftResizableWidget>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}

            {cloudAppState === "error" &&
              layout.errorScreen?.position === "default" && (
                <div className="flex-1 flex relative">
                  <BlueScreenOfDeath />
                </div>
              )}

            {/* Bottom panel */}
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
                          "flex grow w-full",
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
          </div>

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
                      displayLinks={layout.errorScreen?.displayLinks}
                    />
                  </TopResizableWidget>
                </div>
              </>
            )}

          {/* Footer */}
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
      </div>
    </>
  );
};
