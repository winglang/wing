import { State } from "@wingconsole/server";
import classNames from "classnames";
import { useContext } from "react";

import { AppContext } from "../AppContext.js";
import { BlueScreenOfDeath } from "../design-system/BlueScreenOfDeath.js";
import { LeftResizableWidget } from "../design-system/LeftResizableWidget.js";
import { RightResizableWidget } from "../design-system/RightResizableWidget.js";
import { ScrollableArea } from "../design-system/ScrollableArea.js";
import { SpinnerLoader } from "../design-system/SpinnerLoader.js";
import { TopResizableWidget } from "../design-system/TopResizableWidget.js";
import { useLayout } from "../utils/use-layout.js";

import { ConsoleFilters } from "./ConsoleFilters.js";
import { ConsoleLogs } from "./ConsoleLogs.js";
import { Explorer } from "./explorer.js";
import { MapView } from "./map-view/map-view.js";
import { MetadataPanel } from "./MetadataPanel.js";
import { StatusBar } from "./StatusBar.js";
import { TestsTree } from "./TestsTree.js";

export interface LayoutProps {
  cloudAppState: State;
  wingVersion: string | undefined;
}

export const VscodeLayout = ({ cloudAppState, wingVersion }: LayoutProps) => {
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
  } = useLayout({
    cloudAppState,
    defaultLogLevels: ["info", "warn", "error"],
  });

  const { title } = useContext(AppContext);

  return (
    <div
      data-testid="vscode-layout"
      className={classNames(
        "h-full flex flex-col select-none",
        theme.bg3,
        theme.text2,
      )}
    >
      <div
        className={classNames(
          "w-full h-8 draggable-frame border-b flex items-center justify-center",
          theme.bg3,
          theme.border3,
          theme.text2,
        )}
      >
        <div>{title}</div>
      </div>
      <div className="flex-1 flex relative">
        {loading && (
          <div
            className={classNames(
              "absolute bg-opacity-70 h-full w-full z-50",
              theme.bg4,
            )}
          >
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

        <RightResizableWidget
          className={classNames(
            theme.border3,
            "h-full flex flex-col w-80 min-w-[10rem] min-h-[15rem] border-r",
          )}
        >
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
          <TopResizableWidget
            className={classNames(theme.border3, "h-1/3 border-t")}
          >
            <TestsTree />
          </TopResizableWidget>
        </RightResizableWidget>

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
        <TopResizableWidget
          className={classNames(
            theme.border3,
            "border-t min-h-[5rem] h-[15rem]",
            theme.bg3,
            theme.text2,
          )}
        >
          <div className="relative h-full flex flex-col gap-2">
            {loading && (
              <div
                className={classNames(
                  "absolute bg-opacity-70 h-full w-full z-50",
                  theme.bg3,
                  theme.text2,
                )}
              />
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
                className={classNames("pb-1.5", theme.bg3, theme.text2)}
              >
                <ConsoleLogs
                  logs={logs.data ?? []}
                  onResourceClick={onResourceClick}
                />
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
