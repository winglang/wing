import { CubeTransparentIcon } from "@heroicons/react/20/solid";
import { CubeIcon } from "@heroicons/react/24/outline";
import { BoltIcon } from "@heroicons/react/24/solid";
import {
  ResourceIcon,
  SpinnerLoader,
  getResourceIconComponent,
  useTheme,
} from "@wingconsole/design-system";
import type { ConstructTreeNode } from "@winglang/sdk/lib/core/index.js";
import clsx from "classnames";
import { type ElkPoint, type LayoutOptions } from "elkjs";
import type { FunctionComponent, PropsWithChildren } from "react";
import { memo, useCallback, useEffect, useMemo } from "react";
import { useKeyPressEvent } from "react-use";

import { useMap } from "../services/use-map.js";
import { assert } from "../ui/elk-flow/assert.js";
import { Graph } from "../ui/elk-flow/graph.js";
import { NodeChildren } from "../ui/elk-flow/node-children.js";
import { Node } from "../ui/elk-flow/node.js";
import { Port } from "../ui/elk-flow/port.js";
import type {
  EdgeComponent,
  EdgeComponentProps,
} from "../ui/elk-flow/types.js";
import { useZoomPane } from "../ui/zoom-pane.js";

interface InflightPortProps {
  occupied?: boolean;
  highlight?: boolean;
}

const InflightPort: FunctionComponent<InflightPortProps> = (props) => (
  <>
    <div
      className={clsx(
        "size-2.5 rounded-full bg-white border border-slate-300",
        // "opacity-0",
        // props.occupied && "opacity-100",
        "group-hover/construct:opacity-100 group-hover/construct:border-sky-300",
        "outline outline-0 group-hover/construct:outline-2 outline-sky-200",
        props.highlight && "outline-2 border-sky-300",
        "transition-all",
        "invisible",
      )}
    >
      <div className="w-full h-full relative group/inflight-port">
        <div className="absolute inset-0 flex items-center justify-around pointer-events-none">
          {/* <div
            className={clsx(
              !props.occupied && "size-0",
              props.occupied && "size-1.5",
              // "group-hover/inflight-port:size-1.5",
              // "rounded-full bg-sky-400 transition-all",
              "rounded-full transition-all",
              "bg-slate-400",
              "group-hover/construct:bg-sky-400",
              props.highlight && "bg-sky-400",
            )}
          ></div> */}
        </div>
      </div>
    </div>
  </>
);

const SPACING_BASE_VALUE = 32;
const PORT_ANCHOR = 0;
const EDGE_ROUNDED_RADIUS = 10;
// For more configuration options, refer to: https://eclipse.dev/elk/reference/options.html
const baseLayoutOptions: LayoutOptions = {
  "elk.hierarchyHandling": "INCLUDE_CHILDREN",
  "elk.algorithm": "org.eclipse.elk.layered",
  "elk.layered.layering.strategy": "MIN_WIDTH",
  "elk.layered.nodePlacement.strategy": "NETWORK_SIMPLEX",
  "elk.layered.crossingMinimization.strategy": "LAYER_SWEEP",
  "elk.layered.spacing.baseValue": `${SPACING_BASE_VALUE}`, // See https://eclipse.dev/elk/reference/options/org-eclipse-elk-layered-spacing-baseValue.html.
};

interface ContainerNodeProps {
  id: string;
  name: string;
  pseudoContainer?: boolean;
  resourceType?: string;
}

const ContainerNode: FunctionComponent<PropsWithChildren<ContainerNodeProps>> =
  memo((props) => {
    const IconComponent = getResourceIconComponent(props.resourceType, {
      solid: true,
      resourceId: props.id,
    });

    return (
      <Node
        elk={{
          id: props.id,
          layoutOptions: {
            ...baseLayoutOptions,
          },
        }}
        className={clsx("inline-block", "group", "p-2", "z-0")}
      >
        <div className="w-full h-full relative">
          <div className="absolute inset-x-0 top-0">
            <div className="relative">
              <div className="absolute bottom-0">
                <div
                  className={clsx(
                    "whitespace-nowrap",
                    "text-xs font-medium leading-relaxed tracking-wide",
                    "text-slate-400 dark:text-slate-800",
                    "font-normal",
                    "transition-opacity",
                    "backdrop-blur",
                  )}
                >
                  <div className="flex items-center gap-1">
                    <IconComponent className="size-4" />
                    {props.name}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={clsx(
              "w-full h-full rounded-lg",
              "transition-all",
              "flex flex-col",
              "overflow-hidden",
              "border",
              props.pseudoContainer && "border-dashed",
              "border-slate-200 dark:border-slate-600",
            )}
          >
            <div className={clsx("grow shadow-inner", "px-6 py-6")}>
              <NodeChildren>
                <div className="absolute">{props.children}</div>
              </NodeChildren>
            </div>
          </div>
        </div>
      </Node>
    );
  });

interface ConstructNodeProps {
  id: string;
  name: string;
  fqn: string;
  inflights: {
    id: string;
    name: string;
    sourceOccupied?: boolean;
    targetOccupied?: boolean;
  }[];
  highlight?: boolean;
  onSelectedNodeIdChange: (id: string | undefined) => void;
}

const ConstructNode: FunctionComponent<PropsWithChildren<ConstructNodeProps>> =
  memo((props) => {
    const hasChildren = Array.isArray(props.children)
      ? props.children.length > 1
      : false;

    const renderedNode = (
      <Node
        elk={{
          id: props.id,
          layoutOptions: {
            "elk.direction": "DOWN",
            "elk.layered.spacing.baseValue": "1",
          },
        }}
        className="inline-block group/construct z-20 cursor-pointer"
        onClick={() => props.onSelectedNodeIdChange(props.id)}
      >
        <div
          className={clsx(
            "w-full h-full rounded-lg",
            "bg-white dark:bg-slate-700",
            "border",
            "outline outline-0 outline-sky-200/50 dark:outline-sky-500/50",
            !props.highlight && "border-slate-300 dark:border-slate-800",
            props.highlight && "outline-2 border-sky-300 dark:border-sky-500",
            "shadow",
            "transition-all",
          )}
        >
          <div className="px-2.5 py-1 flex items-center gap-1.5">
            <ResourceIcon className="size-4 -ml-0.5" resourceType={props.fqn} />

            <span className="text-xs font-medium leading-relaxed tracking-wide whitespace-nowrap text-slate-600 dark:text-slate-300">
              {props.name}
            </span>
          </div>

          <Port
            elk={{
              id: `${props.id}#source`,
              layoutOptions: {
                "elk.port.side": "EAST",
                "elk.port.anchor": `[${PORT_ANCHOR},0]`,
              },
            }}
          />

          <Port
            elk={{
              id: `${props.id}#target`,
              layoutOptions: {
                "elk.port.side": "WEST",
                "elk.port.anchor": `[-${PORT_ANCHOR},0]`,
              },
            }}
          />

          <NodeChildren className="text-xs">
            {props.inflights.map((inflight) => (
              <Node
                key={inflight.id}
                elk={{
                  id: inflight.id,
                  layoutOptions: {
                    "elk.portConstraints": "FIXED_SIDE",
                  },
                }}
                className="pointer-events-none z-20"
              >
                <div className="border-t border-slate-300 dark:border-slate-800">
                  <div
                    className={clsx(
                      "px-2.5 py-1.5 text-xs whitespace-nowrap",
                      "text-slate-600 dark:text-slate-300",
                    )}
                  >
                    {inflight.name}()
                  </div>
                </div>

                <Port
                  elk={{
                    id: `${inflight.id}#source`,
                    layoutOptions: {
                      "elk.port.side": "EAST",
                      "elk.port.anchor": `[${PORT_ANCHOR},0]`,
                    },
                  }}
                >
                  <InflightPort
                    occupied={inflight.sourceOccupied}
                    highlight={props.highlight}
                  />
                </Port>

                <Port
                  elk={{
                    id: `${inflight.id}#target`,
                    layoutOptions: {
                      "elk.port.side": "WEST",
                      "elk.port.anchor": `[-${PORT_ANCHOR},0]`,
                    },
                  }}
                >
                  <InflightPort
                    occupied={inflight.targetOccupied}
                    highlight={props.highlight}
                  />
                </Port>
              </Node>
            ))}
          </NodeChildren>
        </div>
      </Node>
    );

    if (hasChildren) {
      return (
        <ContainerNode
          id={`${props.id}#container`}
          name={props.name}
          pseudoContainer
          resourceType={props.fqn}
        >
          {renderedNode}

          {props.children}
        </ContainerNode>
      );
    }

    return renderedNode;
  });

interface FunctionNodeProps {
  id: string;
  sourceOccupied?: boolean;
  targetOccupied?: boolean;
  highlight?: boolean;
  onSelectedNodeIdChange: (id: string | undefined) => void;
}

const FunctionNode: FunctionComponent<FunctionNodeProps> = memo((props) => {
  return (
    <Node
      elk={{
        id: props.id,
        layoutOptions: {
          "elk.portConstraints": "FIXED_SIDE",
        },
      }}
      className="inline-flex group/construct z-20 cursor-pointer"
      title={props.id}
      onClick={() => props.onSelectedNodeIdChange(props.id)}
    >
      <div className="group relative">
        <div
          className={clsx(
            "p-1.5 rounded-full shadow",
            "bg-white dark:bg-slate-700",
            "transition-all",
            "border",
            "outline outline-sky-200/50 dark:outline-sky-500/50",
            !props.highlight &&
              "outline-0 border-slate-300 dark:border-slate-800",
            props.highlight && "outline-2 border-sky-300 dark:border-sky-500",
          )}
        >
          <BoltIcon className="size-5 text-sky-500" />
        </div>

        <Port
          elk={{
            id: `${props.id}#invoke#target`,
            layoutOptions: {
              "elk.port.side": "WEST",
              "elk.port.anchor": `[-${PORT_ANCHOR},0]`,
            },
          }}
        >
          <InflightPort occupied={props.targetOccupied} />
        </Port>

        <Port
          elk={{
            id: `${props.id}#invoke#source`,
            layoutOptions: {
              "elk.port.side": "EAST",
              "elk.port.anchor": `[${PORT_ANCHOR},0]`,
            },
          }}
        >
          <InflightPort occupied={props.sourceOccupied} />
        </Port>

        <div className={clsx("absolute bottom-0 inset-x-0")}>
          <div className="relative">
            <div className="absolute top-0 inset-x-0">
              <div className="flex justify-around">
                <div className="absolute text-center">
                  <div
                    // className="text-xs font-medium leading-relaxed tracking-wide text-slate-500 dark:text-slate-800 backdrop-blur"
                    className="text-xs font-medium leading-relaxed tracking-wide text-slate-600 dark:text-slate-300 backdrop-blur"
                  >
                    {props.id.split("/").slice(-1).join("")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Node>
  );
});

/**
 * Returns the middle point between two points with a given radius.
 */
const midPoint = (pt1: ElkPoint, pt2: ElkPoint, radius: number) => {
  const distance = Math.sqrt((pt2.x - pt1.x) ** 2 + (pt2.y - pt1.y) ** 2);
  const radiusCapped = Math.min(radius, distance / 2);
  const diffX = (pt2.x - pt1.x) / distance;
  const diffY = (pt2.y - pt1.y) / distance;
  return { x: pt2.x - radiusCapped * diffX, y: pt2.y - radiusCapped * diffY };
};

const RoundedEdge: FunctionComponent<
  EdgeComponentProps & {
    highlighted?: boolean;
    onClick?: () => void;
  }
> = memo(
  ({
    edge,
    offsetX = 0,
    offsetY = 0,
    graphWidth,
    graphHeight,
    highlighted,
    onClick,
  }) => {
    const points = useMemo(
      () =>
        edge.sections?.flatMap((section) => [
          section.startPoint,
          ...(section.bendPoints ?? []),
          section.endPoint,
        ]) ?? [],
      [edge.sections],
    );

    const additionalPoints = useMemo(() => {
      const additionalPoints: ElkPoint[] = [];
      {
        const startPoint = points[0];
        assert(startPoint);
        additionalPoints.push(startPoint);
      }
      for (let index = 0; index < points.length - 2; index++) {
        const [start, middle, end] = points.slice(index, index + 3);
        assert(start && middle && end);
        additionalPoints.push(
          midPoint(start, middle, EDGE_ROUNDED_RADIUS),
          middle,
          midPoint(end, middle, EDGE_ROUNDED_RADIUS),
        );
      }
      {
        const lastPoint = points.at(-1);
        assert(lastPoint);
        additionalPoints.push(lastPoint);
      }
      return additionalPoints;
    }, [points]);

    const d = useMemo(() => {
      if (additionalPoints.length === 0) {
        return "";
      }

      if (additionalPoints.length === 2) {
        const [start, end] = additionalPoints;
        assert(start);
        assert(end);
        return `M${start.x},${start.y} L${end.x},${end.y}`;
      }

      let path = "";
      for (
        let index = 0;
        index < additionalPoints.length - 1;
        index = index + 3
      ) {
        const [start, c1, c2, c3] = additionalPoints.slice(index, index + 4);
        if (!start) {
          return path;
        }
        if (c1 && c2 && c3) {
          path = `${path} M${start.x},${start.y} L${c1.x},${c1.y} Q${c2.x},${c2.y} ${c3.x},${c3.y}`;
        } else if (c1) {
          path = `${path} L${c1.x},${c1.y}`;
        }
      }
      return path;
    }, [additionalPoints]);

    return (
      <svg
        width={graphWidth}
        height={graphHeight}
        className={clsx(
          "absolute inset-0 pointer-events-none",
          !highlighted && "z-[1]",
          highlighted && "z-[2]",
          "hover:z-[2]",
          "cursor-pointer",
        )}
      >
        <g
          className={clsx(
            "fill-none stroke-1 group pointer-events-auto",
            "transition-colors",
            !highlighted && "stroke-slate-300 dark:stroke-slate-700",
            highlighted && "stroke-sky-500 dark:stroke-sky-900",
            "hover:stroke-sky-500",
            "dark:hover:stroke-sky-900",
          )}
          transform={`translate(${offsetX} ${offsetY})`}
          onClick={onClick}
        >
          <path className="stroke-[8] opacity-0" d={d}>
            <title>
              {edge.id} (from {edge.sources.join(",")} to{" "}
              {edge.targets.join(",")})
            </title>
          </path>
          <path
            className={clsx(
              "stroke-[6] stroke-sky-100 dark:stroke-sky-500/50",
              !highlighted && "opacity-0",
              highlighted && "opacity-100",
              "group-hover:opacity-100",
              "transition-opacity",
            )}
            d={d}
          >
            <title>
              {edge.id} (from {edge.sources.join(",")} to{" "}
              {edge.targets.join(",")})
            </title>
          </path>
          <path d={d} />
        </g>
      </svg>
    );
  },
);

export interface MapViewV2Props {
  selectedNodeId: string | undefined;
  onSelectedNodeIdChange: (id: string | undefined) => void;
  selectedEdgeId?: string;
  onSelectedEdgeIdChange?: (id: string | undefined) => void;
}

export const MapView = memo(
  ({
    selectedNodeId,
    onSelectedNodeIdChange,
    selectedEdgeId,
    onSelectedEdgeIdChange,
  }: MapViewV2Props) => {
    const { connections, nodeInfo, isNodeHidden, rootNodes, edges } = useMap(
      {},
    );

    const RenderEdge = useCallback<EdgeComponent>(
      (props) => {
        return (
          <>
            <RoundedEdge
              {...props}
              highlighted={selectedEdgeId === props.edge.id}
              onClick={() => onSelectedEdgeIdChange?.(props.edge.id)}
            />
          </>
        );
      },
      [RoundedEdge, selectedEdgeId, onSelectedEdgeIdChange],
    );

    const RenderNode = useCallback<
      FunctionComponent<{
        constructTreeNode: ConstructTreeNode;
        selectedNodeId: string | undefined;
        onSelectedNodeIdChange: (id: string | undefined) => void;
      }>
    >(
      (props) => {
        if (isNodeHidden(props.constructTreeNode.path)) {
          return <></>;
        }

        const info = nodeInfo?.get(props.constructTreeNode.path);
        if (!info) {
          return <></>;
        }

        if (info.type === "function") {
          return (
            <FunctionNode
              id={props.constructTreeNode.path}
              sourceOccupied={connections?.some(
                (connection) =>
                  connection.source.id === props.constructTreeNode.path,
              )}
              targetOccupied={connections?.some(
                (connection) =>
                  connection.target.id === props.constructTreeNode.path,
              )}
              highlight={props.selectedNodeId === props.constructTreeNode.path}
              onSelectedNodeIdChange={props.onSelectedNodeIdChange}
            />
          );
        }

        return (
          <ConstructNode
            id={props.constructTreeNode.path}
            name={props.constructTreeNode.id}
            fqn={props.constructTreeNode.constructInfo?.fqn ?? ""}
            inflights={info.type === "construct" ? info.inflights : []}
            onSelectedNodeIdChange={props.onSelectedNodeIdChange}
            highlight={props.selectedNodeId === props.constructTreeNode.path}
          >
            {Object.values(props.constructTreeNode.children ?? {}).map(
              (child) => (
                <RenderNode
                  key={child.id}
                  constructTreeNode={child}
                  selectedNodeId={props.selectedNodeId}
                  onSelectedNodeIdChange={props.onSelectedNodeIdChange}
                />
              ),
            )}
          </ConstructNode>
        );
      },
      [nodeInfo, isNodeHidden],
    );

    const { theme } = useTheme();

    useKeyPressEvent(
      "Escape",
      useCallback(() => {
        onSelectedNodeIdChange?.(undefined);
      }, [onSelectedNodeIdChange]),
    );

    return (
      <div className={clsx("h-full flex flex-col", theme.bg4)}>
        <div className="grow relative bg-slate-50 dark:bg-slate-500">
          {!rootNodes && (
            <div
              className={clsx(
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
            {rootNodes && (
              <Graph
                elk={{
                  id: "root",
                  layoutOptions: {
                    ...baseLayoutOptions,
                    "elk.padding": "[top=24,left=20,bottom=20,right=20]",
                  },
                }}
                edges={edges}
                edgeComponent={RenderEdge}
              >
                {rootNodes.map((node) => (
                  <RenderNode
                    key={node.id}
                    constructTreeNode={node}
                    selectedNodeId={selectedNodeId}
                    onSelectedNodeIdChange={onSelectedNodeIdChange}
                  />
                ))}
              </Graph>
            )}
          </div>
        </div>
      </div>
    );
  },
);
