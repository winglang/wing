import { useTheme, ResourceIcon } from "@wingconsole/design-system";
import classNames from "classnames";

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
}

export const MapView = ({
  showMapControls = true,
  showTests,
  selectedNodeId,
  onSelectedNodeIdChange,
}: MapViewProps) => {
  const { mapData } = useMap({ showTests: showTests ?? false });

  const { theme } = useTheme();
  return (
    <ZoomPaneProvider>
      <div className="h-full flex flex-col">
        {showMapControls && <MapControls />}
        <div
          className={classNames(
            "grow relative border-t",
            theme.bg4,
            theme.border3,
            "cursor-grab",
          )}
        >
          <div className="absolute inset-0">
            <ElkMap
              nodes={mapData?.nodes ?? []}
              edges={mapData?.edges ?? []}
              selectedNodeId={selectedNodeId}
              onSelectedNodeIdChange={onSelectedNodeIdChange}
              node={({ node, depth }) => (
                <div className="h-full flex flex-col relative">
                  <ContainerNode
                    name={node.data?.label}
                    open={node.children && node.children?.length > 0}
                    selected={node.id === selectedNodeId}
                    resourceType={node.data?.type}
                    icon={(props) => (
                      <ResourceIcon
                        resourceType={node.data?.type}
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
