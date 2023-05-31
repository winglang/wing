import { useTheme, ResourceIcon } from "@wingconsole/design-system";
import classNames from "classnames";

import { trpc } from "../../utils/trpc.js";
import { ContainerNode } from "../ElkMapNodes.js";

import { ElkMap } from "./elk-map/ElkMap.js";
import { MapControls } from "./map-controls.js";
import { ZoomPaneProvider } from "./zoom-pane.js";

export interface MapViewProps {
  selectedNodeId?: string;
  showTests?: boolean;
  showMapControls?: boolean;
  onSelectedNodeIdChange?: (id: string | undefined) => void;
}

export const MapView = ({ showMapControls = true, ...props }: MapViewProps) => {
  const map = trpc["app.map"].useQuery({
    showTests: props.showTests,
  });
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
              nodes={map.data?.nodes ?? []}
              edges={map.data?.edges ?? []}
              selectedNodeId={props.selectedNodeId}
              onSelectedNodeIdChange={props.onSelectedNodeIdChange}
              node={({ node, depth }) => (
                <div className="h-full flex flex-col relative">
                  <ContainerNode
                    name={node.data?.label}
                    open={node.children && node.children?.length > 0}
                    selected={node.id === props.selectedNodeId}
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
