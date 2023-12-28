import {
  useTheme,
  ResourceIcon,
  SpinnerLoader,
} from "@wingconsole/design-system";
import { MapNode } from "@wingconsole/server";
import classNames from "classnames";
import { memo, useState } from "react";

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

const Node = memo(
  ({
    node,
    depth,
    selected,
  }: {
    node: MapNode;
    depth: number;
    selected: boolean;
  }) => {
    return (
      <div className="h-full flex flex-col relative">
        <ContainerNode
          nodeId={node.id}
          display={node.data?.display}
          name={node.data?.label}
          open={node.children && node.children?.length > 0}
          selected={selected}
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
    );
  },
);

export const MapView = memo(
  ({
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
          <div className="grow relative cursor-grab bg-slate-50 dark:bg-slate-500">
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

            {!mapData && (
              <div
                className={classNames(
                  "absolute h-full w-full bg-white/70 dark:bg-slate-600/70",
                  "transition-all",
                  "z-10",
                )}
              >
                <div className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <SpinnerLoader data-testid="main-view-loader" />
                </div>
              </div>
            )}

            <div className="absolute inset-0">
              <ElkMap
                nodes={mapData?.nodes ?? []}
                edges={mapData?.edges ?? []}
                selectedNodeId={selectedNodeId}
                onSelectedNodeIdChange={onSelectedNodeIdChange}
                selectedEdgeId={selectedEdgeId}
                onSelectedEdgeIdChange={onSelectedEdgeIdChange}
                // @ts-ignore-next-line
                node={Node}
              />
            </div>
          </div>
        </div>
      </ZoomPaneProvider>
    );
  },
);
