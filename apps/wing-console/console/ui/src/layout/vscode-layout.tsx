import { SpinnerLoader, LeftResizableWidget } from "@wingconsole/design-system";
import classNames from "classnames";
import { useEffect, useMemo } from "react";

import { MapView } from "../features/map-view.js";
import { BlueScreenOfDeath } from "../ui/blue-screen-of-death.js";
import { ResourceMetadata } from "../ui/resource-metadata.js";

import { LayoutProps } from "./default-layout.js";
import { StatusBar } from "./status-bar.js";
import { TermsAndConditionsModal } from "./terms-and-conditions-modal.js";
import { useLayout } from "./use-layout.js";

export const VscodeLayout = ({ cloudAppState, wingVersion }: LayoutProps) => {
  const {
    selectedItems,
    setSelectedItems,
    expand,
    theme,
    errorMessage,
    loading,
    metadata,
    showTests,
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
        {cloudAppState === "error" && (
          <div className="flex-1 flex relative">
            <BlueScreenOfDeath
              title={"An error has occurred:"}
              error={errorMessage.data ?? ""}
            />
          </div>
        )}

        {cloudAppState !== "error" && (
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
          </>
        )}

        <StatusBar
          wingVersion={wingVersion}
          cloudAppState={cloudAppState}
          isError={cloudAppState === "error"}
          showThemeToggle={true}
        />
      </div>
    </>
  );
};
