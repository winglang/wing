import classNames from "classnames";

import { BlueScreenOfDeath } from "../design-system/BlueScreenOfDeath.js";
import { LeftResizableWidget } from "../design-system/LeftResizableWidget.js";
import { RightResizableWidget } from "../design-system/RightResizableWidget.js";
import { ScrollableArea } from "../design-system/ScrollableArea.js";
import { SpinnerLoader } from "../design-system/SpinnerLoader.js";
import { TopResizableWidget } from "../design-system/TopResizableWidget.js";
import { useLayout } from "../utils/use-layout.js";

import { ConsoleFilters } from "./ConsoleFilters.js";
import { ConsoleLogs } from "./ConsoleLogs.js";
import { MapView } from "./map-view/map-view.js";
import { MetadataPanel } from "./MetadataPanel.js";
import { StatusBar } from "./StatusBar.js";
import { TestsTree } from "./TestsTree.js";
import { LayoutProps } from "./VscodeLayout.js";

export const PlaygroundLayout = ({
  cloudAppState,
  wingVersion,
}: LayoutProps) => {
  const {
    selectedItems,
    setSelectedItems,
    expand,

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
    defaultLogLevels: ["verbose", "info", "warn", "error"],
  });

  return (
    <div className="h-full flex flex-col bg-slate-50 select-none">
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

        <div className="flex-1 flex flex-col">
          <div className="flex-1 flex">
            <div className="flex-1 flex flex-col">
              <MapView
                showTests={showTests}
                selectedNodeId={selectedItems[0]}
                onSelectedNodeIdChange={(nodeId) =>
                  setSelectedItems(nodeId ? [nodeId] : [])
                }
              />
            </div>
          </div>
        </div>
      </div>
      {cloudAppState !== "error" && (
        <TopResizableWidget
          className={classNames(
            theme.border3,
            "flex relative border-t border-slate-300 bg-slate-50 min-h-[5rem] h-[21rem]",
          )}
        >
          <RightResizableWidget
            className={classNames(
              theme.border3,
              "h-full w-1/4 flex flex-col min-w-[10rem] min-h-[15rem] border-r border-b",
            )}
          >
            <TestsTree />
          </RightResizableWidget>
          <div
            className={classNames(
              theme.border3,
              "flex-1 flex flex-col min-w-[10rem] min-h-[15rem] border-r border-b border-slate-300",
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
          </div>
          <LeftResizableWidget
            className={classNames(
              theme.border3,
              "h-full w-1/4 flex flex-col min-w-[10rem] min-h-[15rem] border-r border-b z-10",
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
