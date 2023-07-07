import {
  SpinnerLoader,
  LeftResizableWidget,
  ScrollableArea,
  TopResizableWidget,
} from "@wingconsole/design-system";
import classNames from "classnames";

import { ConsoleLogsFilters } from "../features/console-logs-filters.js";
import { ConsoleLogs } from "../features/console-logs.js";
import { MapView } from "../features/map-view.js";
import { BlueScreenOfDeath } from "../ui/blue-screen-of-death.js";
import { ResourceMetadata } from "../ui/resource-metadata.js";

import { useLayout } from "./use-layout.js";
import { LayoutProps } from "./vscode-layout.js";

export const TutorialLayout = ({ cloudAppState }: LayoutProps) => {
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
    defaultLogLevels: ["info", "warn", "error"],
  });

  return (
    <div className="h-full flex flex-col bg-slate-50 select-none relative">
      <div className="flex-1 flex relative">
        {loading && (
          <div
            className={classNames(
              "absolute h-full w-full z-50 bg-white/70 dark:bg-slate-600/70",
            )}
          >
            <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <SpinnerLoader />
            </div>
          </div>
        )}

        <div className="flex-1 flex flex-col relative">
          {cloudAppState === "error" && (
            <div className="bg-opacity-40 bg-black absolute inset-0 z-50" />
          )}

          <div className="flex-1 flex">
            <div className="flex-1 flex flex-col">
              <MapView
                showMapControls={false}
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
                "h-full w-1/4 flex flex-col min-w-[10rem] min-h-[10rem] border-l z-10",
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
      <TopResizableWidget
        className={classNames(
          theme.border3,
          "flex relative border-t border-slate-300 bg-slate-50",
          {
            "min-h-[5rem] h-[30rem]": cloudAppState === "error",
            "min-h-[5rem] h-[8rem]": cloudAppState !== "error",
          },
        )}
      >
        <BlueScreenOfDeath
          hidden={cloudAppState !== "error"}
          title={"An error has occurred:"}
          error={errorMessage.data ?? ""}
          displayLinks={false}
          displayWingTitle={false}
        />
        <div
          className={classNames(
            theme.border3,
            "flex-1 flex flex-col min-w-[10rem] border-r border-b border-slate-300",
            theme.bg3,
            theme.text2,
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
    </div>
  );
};
