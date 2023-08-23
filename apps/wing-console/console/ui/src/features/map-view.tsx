import {
  useTheme,
  ResourceIcon,
  USE_EXTERNAL_THEME_COLOR,
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

  const [hover, setHover] = useState(false);

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
                  (hover && "opacity-90") || "opacity-50",
                )}
              />
              <div
                className="relative group/map-controls"
                onMouseEnter={() => {
                  setHover(true);
                }}
                onMouseLeave={() => {
                  setHover(false);
                }}
              >
                <MapControls />
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
