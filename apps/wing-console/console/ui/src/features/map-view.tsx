import {
  useTheme,
  ResourceIcon,
  USE_EXTERNAL_THEME_COLOR,
  SpinnerLoader,
} from "@wingconsole/design-system";
import classNames from "classnames";
import { useState } from "react";

import { useMap } from "../services/use-map.js";
import { ContainerNode } from "../ui/elk-map-nodes.js";
import { ElkMap } from "../ui/elk-map.js";
import { MapControls } from "../ui/map-controls.js";
import { ZoomPaneProvider } from "../ui/zoom-pane.js";

export interface MapViewProps {
  selectedNodeId?: string;
  showTests?: boolean;
  showMapControls?: boolean;
  onSelectedNodeIdChange?: (id: string | undefined) => void;
  selectedEdgeId?: string;
  onSelectedEdgeIdChange?: (id: string | undefined) => void;
}

export const MapView = ({
  showMapControls = true,
  showTests,
  selectedNodeId,
  onSelectedNodeIdChange,
  selectedEdgeId,
  onSelectedEdgeIdChange,
}: MapViewProps) => {
  const { mapData } = useMap({ showTests: showTests ?? false });
  const { theme } = useTheme();
  const [hoverMapControls, setHoverMapControls] = useState(false);

  return (
    <ZoomPaneProvider>
      <div className={classNames("h-full flex flex-col", theme.bg4)}>
        <div className="grow relative cursor-grab">
          {showMapControls && (
            <div className="right-0 absolute z-10">
              <div
                className={classNames(
                  "transition-opacity",
                  "absolute inset-0 rounded-bl",
                  theme.bg4,
                  (hoverMapControls && "opacity-80") || "opacity-60",
                )}
              />
              <div
                className="relative group/map-controls"
                onMouseEnter={() => {
                  setHoverMapControls(true);
                }}
                onMouseLeave={() => {
                  setHoverMapControls(false);
                }}
              >
                <MapControls />
              </div>
            </div>
          )}

          <div
            className={classNames(
              "absolute h-full w-full bg-white/70 dark:bg-slate-600/70",
              "transition-all",
              !mapData && "opacity-100 z-10",
              mapData && "opacity-0 -z-10",
            )}
          >
            <div className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <SpinnerLoader data-testid="main-view-loader" />
            </div>
          </div>

          <div className="absolute inset-0">
            <ElkMap
              nodes={mapData?.nodes ?? []}
              edges={mapData?.edges ?? []}
              selectedNodeId={selectedNodeId}
              onSelectedNodeIdChange={onSelectedNodeIdChange}
              selectedEdgeId={selectedEdgeId}
              onSelectedEdgeIdChange={onSelectedEdgeIdChange}
              node={({ node, depth }) => (
                <div className="h-full flex flex-col relative">
                  <ContainerNode
                    nodeId={node.id}
                    display={node.data?.display}
                    name={node.data?.label}
                    open={node.children && node.children?.length > 0}
                    selected={node.id === selectedNodeId}
                    resourceType={node.data?.type}
                    icon={(props) => (
                      <ResourceIcon
                        resourceType={node.data?.type}
                        resourcePath={node.data?.path}
                        solid
                        {...props}
                      />
                    )}
                    depth={depth}
                  />
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </ZoomPaneProvider>
  );
};
