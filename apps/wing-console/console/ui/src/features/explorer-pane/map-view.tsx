import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  ResourceIcon,
  SpinnerLoader,
  useTheme,
} from "@wingconsole/design-system";
import type { MapItem } from "@wingconsole/server";
import type { ResourceRunningState } from "@winglang/sdk/lib/simulator/index.js";
import clsx from "classnames";
import type { ElkExtendedEdge } from "elkjs";
import { type ElkPoint, type LayoutOptions } from "elkjs";
import { motion } from "framer-motion";
import type { FunctionComponent, PropsWithChildren } from "react";
import {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useKeyPressEvent } from "react-use";

import { RunningStateIndicator } from "../running-state-indicator/running-state-indicator.js";

import { assert } from "./elk-flow/assert.js";
import { Graph } from "./elk-flow/graph.js";
import { NodeChildren } from "./elk-flow/node-children.js";
import { Node } from "./elk-flow/node.js";
import { Port } from "./elk-flow/port.js";
import type { EdgeComponent, EdgeComponentProps } from "./elk-flow/types.js";
import type { NodeV2 } from "./use-map.js";
import { useMap } from "./use-map.js";

const Z_INDICES = {
  EDGE: "z-[1000]",
  EDGE_HIGHLIGHTED: "z-[1001]",
  EDGE_SELECTED: "z-[1002]",
  EDGE_HOVERED: "hover:z-[1003]",
};

const SPACING_BASE_VALUE = 32;
const PORT_ANCHOR = 0;
const EDGE_ROUNDED_RADIUS = 10;
// For more configuration options, refer to: https://eclipse.dev/elk/reference/options.html
const baseLayoutOptions: LayoutOptions = {
  "elk.alignment": "CENTER",
  "elk.hierarchyHandling": "INCLUDE_CHILDREN",
  "elk.algorithm": "org.eclipse.elk.layered",
  "elk.layered.spacing.baseValue": `${SPACING_BASE_VALUE}`, // See https://eclipse.dev/elk/reference/options/org-eclipse-elk-layered-spacing-baseValue.html.
};

const MaxDepthContext = createContext(Number.POSITIVE_INFINITY);

interface ConstructNodeProps {
  id: string;
  parentsName?: string;
  name: string;
  fqn: string;
  inflights: {
    id: string;
    name: string;
    sourceOccupied?: boolean;
    targetOccupied?: boolean;
  }[];
  highlight?: boolean;
  hasChildNodes?: boolean;
  onSelectedNodeIdChange: (id: string | undefined) => void;
  color?: string;
  collapsable?: boolean;
  onCollapse: (value: boolean) => void;
  collapsed: boolean;
  icon?: string;
  hierarchichalRunningState: ResourceRunningState;
  depth: number;
}

const ConstructNode: FunctionComponent<PropsWithChildren<ConstructNodeProps>> =
  memo(
    ({
      id,
      parentsName,
      name,
      onSelectedNodeIdChange,
      highlight,
      fqn,
      inflights,
      children,
      hasChildNodes,
      color,
      collapsable,
      onCollapse,
      collapsed,
      icon,
      hierarchichalRunningState,
      depth,
    }) => {
      const select = useCallback(
        () => onSelectedNodeIdChange(id),
        [onSelectedNodeIdChange, id],
      );

      const hasError = hierarchichalRunningState === "error";

      return (
        <Node
          elk={{
            id,
            layoutOptions: {
              ...baseLayoutOptions,
              "elk.portConstraints": "FIXED_SIDE",
            },
          }}
          className={clsx("inline-flex flex-col cursor-pointer")}
        >
          <Port
            elk={{
              id: `${id}##source`,
              layoutOptions: {
                "elk.port.side": "EAST",
                "elk.port.anchor": `[${PORT_ANCHOR},0]`,
              },
            }}
          />
          <Port
            elk={{
              id: `${id}##target`,
              layoutOptions: {
                "elk.port.side": "WEST",
                "elk.port.anchor": `[-${PORT_ANCHOR},0]`,
              },
            }}
          />
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <div
            className={clsx(
              "w-full h-full",
              "rounded-lg",
              depth % 2 === 0 && "bg-white dark:bg-slate-700",
              depth % 2 === 1 && "bg-slate-50 dark:bg-slate-650",
              highlight && "bg-sky-50 dark:bg-sky-900",
              "border",
              "outline outline-0",
              !highlight &&
                !hasError &&
                "border-slate-200 dark:border-slate-800",
              highlight && !hasError && "border-sky-400 dark:border-sky-500",
              highlight && "outline-4",
              !hasError && "outline-sky-200/50 dark:outline-sky-500/50",
              hasError &&
                "border-red-500 dark:border-red-500 outline-red-200/50 dark:outline-red-500/50",
              "shadow",
              "transition-all",
            )}
            onClick={(event) => {
              event.stopPropagation();
              select();
            }}
          >
            <div className="relative">
              <div className={clsx("px-2.5 py-1", "flex flex-col")}>
                {/* {parentsName && (
                  <span
                    className={clsx("text-2xs leading-normal text-slate-450")}
                  >
                    {parentsName}/
                  </span>
                )} */}
                <div className="flex items-center gap-1.5">
                  {/* {parentsName && (
                    <span
                      className={clsx(
                        "text-2xs leading-normal text-slate-450 font-light",
                      )}
                    >
                      {parentsName}/
                    </span>
                  )} */}
                  <div className="-ml-0.5">
                    <div className="relative">
                      <ResourceIcon
                        className="size-4"
                        resourceType={fqn}
                        color={color}
                        icon={icon}
                      />
                      <div className="absolute -right-0.5 bottom-0">
                        <RunningStateIndicator
                          runningState={hierarchichalRunningState}
                          className={clsx(
                            "size-1.5 outline outline-2",
                            depth % 2 === 0 &&
                              "outline-white dark:outline-slate-700",
                            depth % 2 === 1 &&
                              "outline-slate-50 dark:outline-slate-650",
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    {/* {parentsName && (
                      <span
                        className={clsx(
                          "text-2xs leading-none tracking-tight text-slate-450 font-light",
                        )}
                      >
                        {parentsName}/
                      </span>
                    )} */}
                    <span
                      className={clsx(
                        "text-xs font-medium leading-tight tracking-wide whitespace-nowrap",
                        !highlight &&
                          !hasError &&
                          "text-slate-600 dark:text-slate-300",
                        hasError && "text-red-600 dark:text-red-500",
                        highlight &&
                          !hasError &&
                          "text-sky-600 dark:text-sky-300",
                      )}
                    >
                      {parentsName && (
                        <span
                          className={clsx(
                            "text-2xs leading-normal tracking-tight text-slate-500 dark:text-slate-400 font-light",
                          )}
                        >
                          {parentsName}/
                        </span>
                      )}
                      {name}
                    </span>
                  </div>

                  {(collapsable || collapsed) && (
                    <>
                      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
                      <div
                        className="flex grow justify-end"
                        onClick={() => {
                          if (collapsed) {
                            onCollapse(false);
                          } else {
                            onCollapse(true);
                          }
                        }}
                      >
                        <ChevronDownIcon
                          className={clsx(
                            collapsed && "-rotate-90",
                            "size-4",
                            "transition-all",
                            "hover:text-sky-600 dark:hover:text-sky-300",
                          )}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="flex justify-center">
                <div
                  className={clsx(
                    "border-b border-slate-200 dark:border-slate-800",
                    "transition-all",
                    inflights.length > 0 || hasChildNodes ? "w-full" : "w-0",
                  )}
                />
              </div>
            </div>

            {(hasChildNodes || inflights.length > 0) && (
              <div className={clsx(hasChildNodes && "p-4")}>
                <NodeChildren>
                  <div className="absolute">
                    {inflights.length > 0 && (
                      <Node
                        elk={{
                          id: `${id}#inflights`,
                          layoutOptions: {
                            ...baseLayoutOptions,
                            "elk.algorithm": "org.eclipse.elk.layered",
                            "elk.aspectRatio": "0.1",
                            "elk.layered.spacing.baseValue": "1",
                          },
                        }}
                        className={clsx(
                          "inline-block",
                          "pointer-events-none",
                          "pl-2",
                        )}
                      >
                        <NodeChildren>
                          {inflights.map((inflight) => (
                            <Node
                              key={inflight.id}
                              className={clsx(
                                "inline-flex",
                                "pointer-events-none",
                              )}
                              elk={{
                                id: inflight.id,
                                layoutOptions: {
                                  "elk.portConstraints": "FIXED_SIDE",
                                },
                              }}
                            >
                              <Port
                                elk={{
                                  id: `${inflight.id}#source`,
                                  layoutOptions: {
                                    "elk.port.side": "EAST",
                                    "elk.port.anchor": `[${PORT_ANCHOR},0]`,
                                  },
                                }}
                              />

                              <Port
                                elk={{
                                  id: `${inflight.id}#target`,
                                  layoutOptions: {
                                    "elk.port.side": "WEST",
                                    "elk.port.anchor": `[-${PORT_ANCHOR},0]`,
                                  },
                                }}
                              />
                              <div
                                className={clsx(
                                  "px-2.5 py-1.5 text-xs whitespace-nowrap",
                                  "text-slate-600 dark:text-slate-300",
                                  "font-mono",
                                )}
                              >
                                <span>{inflight.name}</span>
                              </div>
                            </Node>
                          ))}
                        </NodeChildren>
                      </Node>
                    )}
                    {hasChildNodes && (
                      <Node
                        elk={{
                          id: `${id}#children`,
                          layoutOptions: {
                            ...baseLayoutOptions,
                          },
                        }}
                      >
                        <NodeChildren>{children}</NodeChildren>
                      </Node>
                    )}
                  </div>
                </NodeChildren>
              </div>
            )}
          </div>
        </Node>
      );
    },
  );

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
    selected?: boolean;
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
    selected,
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

    const lastPoint = additionalPoints.at(-1);

    return (
      <svg
        width={graphWidth}
        height={graphHeight}
        className={clsx(
          "absolute inset-0 pointer-events-none",
          !highlighted && Z_INDICES.EDGE,
          highlighted && !selected && Z_INDICES.EDGE_HIGHLIGHTED,
          selected && Z_INDICES.EDGE_SELECTED,
          Z_INDICES.EDGE_HOVERED,
          "cursor-pointer",
        )}
      >
        <motion.g
          initial={{
            translateX: offsetX,
            translateY: offsetY,
          }}
          animate={{
            translateX: offsetX,
            translateY: offsetY,
          }}
          className={clsx(
            "fill-none stroke-1 group pointer-events-auto",
            "transition-colors",
            !selected &&
              !highlighted && ["stroke-slate-300 dark:stroke-slate-500"],
            (selected || highlighted) && "stroke-sky-500 dark:stroke-sky-400",
            "hover:stroke-sky-500",
            "dark:hover:stroke-sky-300",
          )}
          onClick={(event) => {
            event.stopPropagation();
            onClick?.();
          }}
        >
          <path className="stroke-[8] opacity-0" d={d}>
            <title>
              {edge.id} (from {edge.sources.join(",")} to{" "}
              {edge.targets.join(",")})
            </title>
          </path>
          <motion.path
            initial={{
              d: d,
            }}
            animate={{
              d: d,
            }}
            className={clsx(
              "stroke-[6] stroke-sky-100 dark:stroke-sky-700",
              !selected && "opacity-0",
              selected && "opacity-100",
              "group-hover:opacity-100",
              "transition-opacity",
            )}
          />
          <motion.path
            initial={{
              d: d,
            }}
            animate={{
              d: d,
            }}
          />
          <motion.path
            className={clsx(
              "transition-colors",
              "stroke-none",
              !selected &&
                !highlighted && ["fill-slate-300 dark:fill-slate-500"],
              (selected || highlighted) && "fill-sky-500 dark:fill-sky-400",
              "group-hover:fill-sky-500",
              "dark:group-hover:fill-sky-300",
            )}
            initial={{
              d: `M${(lastPoint?.x ?? 0) - 4} ${
                (lastPoint?.y ?? 0) - 2
              } v4 l5 -2 z`,
            }}
            animate={{
              d: `M${(lastPoint?.x ?? 0) - 4} ${
                (lastPoint?.y ?? 0) - 2
              } v4 l5 -2 z`,
            }}
          />
        </motion.g>
      </svg>
    );
  },
);

const getNodePathFromEdge = (edge: string) => {
  const [, path] = edge.match(/^(.+?)#/i) ?? [];
  return path;
};

export interface MapViewV2Props {
  selectedNodeId: string | undefined;
  onSelectedNodeIdChange: (id: string | undefined) => void;
  selectedEdgeId?: string;
  onSelectedEdgeIdChange?: (id: string | undefined) => void;
  onExpand: (path: string) => void;
  onCollapse: (path: string) => void;
  expandedItems: string[];
}

const RenderNode = ({
  constructTreeNode,
  selectedNodeId,
  onSelectedNodeIdChange,
  isNodeHidden,
  nodeInfo,
  expandedItems,
  depth = 0,
  onCollapse,
  onExpand,
}: {
  constructTreeNode: MapItem;
  selectedNodeId: string | undefined;
  onSelectedNodeIdChange: (id: string | undefined) => void;
  isNodeHidden: (path: string) => boolean;
  nodeInfo?: Map<string, NodeV2>;
  expandedItems: string[];
  depth?: number;
  onCollapse: (path: string) => void;
  onExpand: (path: string) => void;
}) => {
  const maxDepth = useContext(MaxDepthContext);
  const flatten = depth >= maxDepth;

  const node = constructTreeNode;

  const fqn = node.constructInfo?.fqn;

  const cloudResourceType = useMemo(() => fqn?.split(".").at(-1), [fqn]);

  const parentsName = useMemo(() => {
    const parts = node.path.split("/").slice(2);
    return parts.slice(maxDepth, -1).join("/");
  }, [node.path, maxDepth]);

  const name = useMemo(() => {
    if (flatten) {
      return node.id;
    }

    return node.display?.title === cloudResourceType
      ? node.id
      : node.display?.title ?? node.id;
  }, [flatten, node.display?.title, node.id, cloudResourceType]);

  const info = useMemo(() => nodeInfo?.get(node.path), [nodeInfo, node.path]);

  const childNodes = useMemo(() => {
    return Object.values(node.children ?? {}).filter(
      (node) => !isNodeHidden(node.path),
    );
  }, [isNodeHidden, node.children]);

  const children = useMemo(
    () => Object.values(node.children ?? {}),
    [node.children],
  );
  const canBeExpanded = useMemo(
    () => !!node.children && children.some((child) => !child.display?.hidden),
    [children, node.children],
  );
  const collapsed = useMemo(() => {
    return canBeExpanded && !expandedItems.includes(node.path);
  }, [canBeExpanded, expandedItems, node.path]);

  const toggleCollapse = useCallback(
    (collapse: boolean) => {
      if (collapse) {
        onCollapse(node.path);
      } else {
        onExpand(node.path);
      }
    },
    [node.path, onCollapse, onExpand],
  );

  const hasChildNodes = useMemo(() => childNodes.length > 0, [childNodes]);

  if (isNodeHidden(node.path)) {
    return <></>;
  }

  if (!info) {
    return <></>;
  }

  const renderedChildren = childNodes.map((child) => (
    <RenderNode
      key={child.id}
      constructTreeNode={child}
      selectedNodeId={selectedNodeId}
      onSelectedNodeIdChange={onSelectedNodeIdChange}
      isNodeHidden={isNodeHidden}
      nodeInfo={nodeInfo}
      expandedItems={expandedItems}
      onCollapse={onCollapse}
      onExpand={onExpand}
      depth={flatten ? depth : depth + 1}
    />
  ));

  return (
    <>
      <ConstructNode
        id={node.path}
        parentsName={flatten ? parentsName : undefined}
        name={name ?? ""}
        fqn={fqn ?? ""}
        color={node.display?.color}
        icon={node.display?.icon}
        inflights={info.type === "construct" ? info.inflights : []}
        onSelectedNodeIdChange={onSelectedNodeIdChange}
        highlight={selectedNodeId === node.path}
        hasChildNodes={flatten ? false : hasChildNodes}
        collapsable={hasChildNodes}
        collapsed={collapsed}
        onCollapse={toggleCollapse}
        hierarchichalRunningState={constructTreeNode.hierarchichalRunningState}
        depth={depth}
      >
        {!flatten && renderedChildren}
      </ConstructNode>
      {flatten && renderedChildren}
    </>
  );
};

const RenderEdge = ({
  selectedEdgeId,
  selectedNodeId,
  onSelectedEdgeIdChange,
  ...props
}: {
  selectedEdgeId?: string;
  selectedNodeId: string | undefined;
  onSelectedEdgeIdChange?: (id: string | undefined) => void;
} & EdgeComponentProps) => {
  const isSelected = selectedEdgeId === props.edge.id;
  const isHighlighted =
    props.edge.sources.some(
      (path) => getNodePathFromEdge(path) === selectedNodeId,
    ) ||
    props.edge.targets.some(
      (path) => getNodePathFromEdge(path) === selectedNodeId,
    );

  return (
    <RoundedEdge
      key={props.edge.id}
      {...props}
      edge={props.edge}
      selected={isSelected}
      highlighted={isHighlighted}
      onClick={() => onSelectedEdgeIdChange?.(props.edge.id)}
    />
  );
};

export const MapView = memo(
  ({
    selectedNodeId,
    onSelectedNodeIdChange,
    selectedEdgeId,
    onSelectedEdgeIdChange,
    onExpand,
    onCollapse,
    expandedItems,
  }: MapViewV2Props) => {
    const { nodeInfo, isNodeHidden, rootNodes, edges } = useMap({
      expandedItems,
    });

    const { theme } = useTheme();

    const unselectedNode = useCallback(() => {
      onSelectedNodeIdChange?.("root");
    }, [onSelectedNodeIdChange]);

    useKeyPressEvent("Escape", unselectedNode);

    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
      <div
        className={clsx("h-full flex flex-col", theme.bg4)}
        onClick={unselectedNode}
      >
        <div className="grow relative">
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
                    "elk.padding": "[top=24,left=24,bottom=24,right=24]",
                  },
                }}
                edges={edges}
                edgeComponent={(props) =>
                  RenderEdge({
                    ...props,
                    selectedEdgeId,
                    selectedNodeId,
                    onSelectedEdgeIdChange,
                  })
                }
              >
                <MaxDepthContext.Provider value={0}>
                  {rootNodes.map((node) => (
                    <RenderNode
                      key={node.id}
                      constructTreeNode={node}
                      selectedNodeId={selectedNodeId}
                      onSelectedNodeIdChange={onSelectedNodeIdChange}
                      isNodeHidden={isNodeHidden}
                      expandedItems={expandedItems}
                      nodeInfo={nodeInfo}
                      onCollapse={onCollapse}
                      onExpand={onExpand}
                    />
                  ))}
                </MaxDepthContext.Provider>
              </Graph>
            )}
          </div>
        </div>
      </div>
    );
  },
);
