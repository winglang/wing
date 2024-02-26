import {
  useTheme,
  ResourceIcon,
  SpinnerLoader,
} from "@wingconsole/design-system";
import { MapNode } from "@wingconsole/server";
import classNames from "classnames";
import { memo } from "react";

import { useMap } from "../services/use-map.js";
import { ContainerNode } from "../ui/elk-map-nodes.js";
import { ElkMap } from "../ui/elk-map.js";

export interface MapViewProps {
  selectedNodeId?: string;
  showTests?: boolean;
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
    showTests,
    selectedNodeId,
    onSelectedNodeIdChange,
    selectedEdgeId,
    onSelectedEdgeIdChange,
  }: MapViewProps) => {
    const { mapData } = useMap({ showTests: showTests ?? false });
    const { theme } = useTheme();

    return (
      <div className={classNames("h-full flex flex-col", theme.bg4)}>
        <div className="grow relative bg-slate-50 dark:bg-slate-500">
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
    );
  },
);
