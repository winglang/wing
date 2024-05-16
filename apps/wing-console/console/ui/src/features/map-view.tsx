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
import { memo, useCallback, useEffect, useId, useMemo } from "react";
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

const Z_INDICES = {
  EDGE: "z-[1]",
  EDGE_HIGHLIGHTED: "z-[2]",
  EDGE_SELECTED: "z-[3]",
  EDGE_HOVERED: "hover:z-[3]",
  CONSTRUCT: "z-[0]",
};

interface InflightPortProps {
  occupied?: boolean;
  highlight?: boolean;
}

const InflightPort: FunctionComponent<InflightPortProps> = (props) => (
  <>
    <div
      className={clsx(
        "size-2.5 rounded-full bg-white border border-slate-200",
        // "opacity-0",
        // props.occupied && "opacity-100",
        "group-hover/construct:opacity-100 group-hover/construct:border-sky-300",
        "outline outline-0 group-hover/construct:outline-4 outline-sky-200",
        props.highlight && "outline-4 border-sky-300",
        "transition-all",
        "invisible",
        "pointer-events-none",
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
  "elk.alignment": "CENTER",
  "elk.hierarchyHandling": "INCLUDE_CHILDREN",
  "elk.algorithm": "org.eclipse.elk.layered",
  // "elk.layered.layering.strategy": "MIN_WIDTH",
  // "elk.layered.layering.strategy": "NETWORK_SIMPLEX",
  // "elk.layered.layering.strategy": "STRETCH_WIDTH",
  // "elk.layered.nodePlacement.strategy": "NETWORK_SIMPLEX",
  // "elk.layered.crossingMinimization.strategy": "LAYER_SWEEP",
  "elk.layered.spacing.baseValue": `${SPACING_BASE_VALUE}`, // See https://eclipse.dev/elk/reference/options/org-eclipse-elk-layered-spacing-baseValue.html.
};

interface WrapperProps {
  name: string;
  fqn: string;
  highlight?: boolean;
  onClick?: () => void;
}

const Wrapper: FunctionComponent<PropsWithChildren<WrapperProps>> = memo(
  ({ name, fqn, highlight, onClick, children }) => {
    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
      <div
        className={clsx(
          "w-full h-full",
          "rounded-lg",
          "bg-white dark:bg-slate-700",
          highlight && "bg-sky-50 dark:bg-sky-900",
          "border",
          "outline outline-0 outline-sky-200/50 dark:outline-sky-500/50",
          !highlight && "border-slate-200 dark:border-slate-800",
          highlight && "outline-4 border-sky-400 dark:border-sky-500",
          "shadow",
          "transition-all",
          "cursor-pointer",
        )}
        onClick={(event) => {
          event.stopPropagation();
          onClick?.();
        }}
      >
        <div
          className={clsx(
            "px-2.5 py-1 flex items-center gap-1.5",
            // inflights.length > 0 &&
            "border-b border-slate-200 dark:border-slate-800",
          )}
        >
          <ResourceIcon className="size-4 -ml-0.5" resourceType={fqn} />

          <span
            className={clsx(
              "text-xs font-medium leading-relaxed tracking-wide whitespace-nowrap",
              !highlight && " text-slate-600 dark:text-slate-300",
              highlight && "text-sky-600 dark:text-sky-300",
            )}
          >
            {name}
          </span>
        </div>

        {children}
      </div>
    );
  },
);

interface ContainerNodeProps {
  id: string;
  name: string;
  pseudoContainer?: boolean;
  resourceType?: string;
  highlight?: boolean;
  onClick?: () => void;
}

const ContainerNode: FunctionComponent<PropsWithChildren<ContainerNodeProps>> =
  memo((props) => {
    return (
      <Node
        elk={{
          id: props.id,
          layoutOptions: {
            ...baseLayoutOptions,
            // "elk.layered.layering.strategy": "MIN_WIDTH",
            // "elk.layered.spacing.baseValue": "1",
          },
        }}
        className={clsx(
          "inline-block",
          "group",
          // "p-2",
          // "z-0",
          Z_INDICES.CONSTRUCT,
        )}
        data-elk-id={props.id}
      >
        <div className={clsx("w-full h-full relative")}>
          <Wrapper
            name={props.name}
            fqn={props.resourceType!}
            highlight={props.highlight}
            onClick={props.onClick}
          >
            <NodeChildren>
              <div className="absolute">{props.children}</div>
            </NodeChildren>
          </Wrapper>
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
  hasChildNodes?: boolean;
  onSelectedNodeIdChange: (id: string | undefined) => void;
}

const ConstructNode: FunctionComponent<PropsWithChildren<ConstructNodeProps>> =
  memo(
    ({
      id,
      name,
      onSelectedNodeIdChange,
      highlight,
      fqn,
      inflights,
      children,
      hasChildNodes,
    }) => {
      const select = useCallback(
        () => onSelectedNodeIdChange(id),
        [onSelectedNodeIdChange, id],
      );

      const renderedNode = (
        <Node
          elk={{
            id,
            layoutOptions: {
              "elk.algorithm": "org.eclipse.elk.layered",
              "elk.aspectRatio": "0.1",
              // "elk.direction": "DOWN",
              "elk.layered.spacing.baseValue": "1",
              // "elk.layered.layering.strategy": "MIN_WIDTH",
              // "elk.layered.layering.strategy": "NETWORK_SIMPLEX",
              // "elk.layered.layering.strategy": "STRETCH_WIDTH",
              "elk.portConstraints": "FIXED_SIDE",
            },
          }}
          className={clsx(
            "inline-block group/construct cursor-pointer",
            // "z-20",
            Z_INDICES.CONSTRUCT,
            hasChildNodes && "pointer-events-none",
          )}
          data-elk-id={id}
        >
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <div
            className={clsx(
              "w-full h-full",
              !hasChildNodes && [
                "rounded-lg",
                "bg-white dark:bg-slate-700",
                highlight && "bg-sky-50 dark:bg-sky-900",
                "border",
                "outline outline-0 outline-sky-200/50 dark:outline-sky-500/50",
                !highlight && "border-slate-200 dark:border-slate-800",
                highlight && "outline-4 border-sky-400 dark:border-sky-500",
                "shadow",
                "transition-all",
              ],
            )}
            onClick={(event) => {
              event.stopPropagation();
              select();
            }}
          >
            {!hasChildNodes && (
              <div
                className={clsx(
                  "px-2.5 py-1 flex items-center gap-1.5",
                  inflights.length > 0 &&
                    "border-b border-slate-200 dark:border-slate-800",
                )}
              >
                <ResourceIcon className="size-4 -ml-0.5" resourceType={fqn} />

                <span
                  className={clsx(
                    "text-xs font-medium leading-relaxed tracking-wide whitespace-nowrap",
                    !highlight && " text-slate-600 dark:text-slate-300",
                    highlight && "text-sky-600 dark:text-sky-300",
                  )}
                >
                  {name}
                </span>
              </div>
            )}

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

            <div className="pl-2">
              <NodeChildren className="text-xs">
                <div className="absolute">
                  {inflights.map((inflight) => (
                    <Node
                      key={inflight.id}
                      elk={{
                        id: inflight.id,
                        layoutOptions: {
                          "elk.portConstraints": "FIXED_SIDE",
                        },
                      }}
                      className={clsx(
                        "inline-block pointer-events-none",
                        // "z-20",
                        Z_INDICES.CONSTRUCT,
                      )}
                    >
                      <div
                      // className="border-t border-slate-200 dark:border-slate-800"
                      >
                        <div
                          className={clsx(
                            "px-2.5 py-1.5 text-xs whitespace-nowrap",
                            "text-slate-600 dark:text-slate-300",
                            "font-mono",
                          )}
                        >
                          {/* <span className="italic text-indigo-500 dark:text-indigo-400">
                        inflight{" "}
                      </span> */}
                          <span>{inflight.name}()</span>
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
                          highlight={highlight}
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
                          highlight={highlight}
                        />
                      </Port>
                    </Node>
                  ))}
                </div>
              </NodeChildren>
            </div>
          </div>
        </Node>
      );

      if (hasChildNodes) {
        return (
          <ContainerNode
            id={`${id}#container`}
            name={name}
            pseudoContainer
            resourceType={fqn}
            highlight={highlight}
            onClick={select}
          >
            <NodeChildren>
              {inflights.length > 0 && renderedNode}

              <Node elk={{ id: `${id}#children` }}>
                <Port
                  elk={{
                    id: `${id}#children-target`,
                    layoutOptions: {
                      "elk.port.side": "WEST",
                      "elk.port.anchor": `[-${PORT_ANCHOR},0]`,
                    },
                  }}
                />
                {children}
              </Node>
            </NodeChildren>
          </ContainerNode>
        );
      }

      // if (hasChildNodes) {
      //   return (
      //     <ContainerNode
      //       id={`${id}#container`}
      //       name={`${name}`}
      //       pseudoContainer
      //       resourceType={fqn}
      //       highlight={highlight}
      //       onClick={select}
      //     >
      //       {renderedNode}
      //       <ContainerNode
      //         id={`${id}#children`}
      //         // name={`${name} Children`}
      //         name="Children"
      //         pseudoContainer
      //         resourceType={fqn}
      //         highlight={highlight}
      //         // onClick={select}
      //       >
      //         {children}
      //       </ContainerNode>
      //     </ContainerNode>
      //   );
      // }

      return renderedNode;
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

    const arrowHeadId = useId();
    const arrowHeadMarker = useMemo(() => {
      return `url(#${arrowHeadId})`;
    }, [arrowHeadId]);

    return (
      <svg
        width={graphWidth}
        height={graphHeight}
        className={clsx(
          "absolute inset-0 pointer-events-none",
          // !highlighted && "z-[1]",
          // highlighted && !selected && "z-[2]",
          // selected && "z-[3]",
          // "hover:z-[3]",
          !highlighted && Z_INDICES.EDGE,
          highlighted && !selected && Z_INDICES.EDGE_HIGHLIGHTED,
          selected && Z_INDICES.EDGE_SELECTED,
          Z_INDICES.EDGE_HOVERED,
          "cursor-pointer",
        )}
      >
        <defs>
          <marker
            className="stroke-none fill-slate-500 dark:fill-slate-800"
            markerWidth="6"
            markerHeight="4"
            orient="auto"
            id={arrowHeadId}
            refX="4"
            refY="2"
          >
            <path d="M0 0 v4 l5 -2 z" />
          </marker>
        </defs>
        <g
          className={clsx(
            "fill-none stroke-1 group pointer-events-auto",
            "transition-colors",
            !selected &&
              !highlighted &&
              "stroke-slate-300 dark:stroke-slate-700",
            (selected || highlighted) && "stroke-sky-500 dark:stroke-sky-400",
            "hover:stroke-sky-500",
            "dark:hover:stroke-sky-900",
          )}
          transform={`translate(${offsetX} ${offsetY})`}
          onClick={onClick}
        >
          <path
            className="stroke-[8] opacity-0"
            d={d}
            markerEnd={arrowHeadMarker}
          >
            <title>
              {edge.id} (from {edge.sources.join(",")} to{" "}
              {edge.targets.join(",")})
            </title>
          </path>
          <path
            className={clsx(
              "stroke-[6] stroke-sky-100 dark:stroke-sky-500/50",
              !selected && "opacity-0",
              selected && "opacity-100",
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
          <path d={d} markerEnd={arrowHeadMarker} />
        </g>
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
}

export const MapView = memo(
  ({
    selectedNodeId,
    onSelectedNodeIdChange,
    selectedEdgeId,
    onSelectedEdgeIdChange,
  }: MapViewV2Props) => {
    const { nodeInfo, isNodeHidden, rootNodes, edges } = useMap({});

    const RenderEdge = useCallback<EdgeComponent>(
      (props) => {
        return (
          <RoundedEdge
            {...props}
            selected={selectedEdgeId === props.edge.id}
            highlighted={
              props.edge.sources.some(
                (path) => getNodePathFromEdge(path) === selectedNodeId,
              ) ||
              props.edge.targets.some(
                (path) => getNodePathFromEdge(path) === selectedNodeId,
              )
            }
            onClick={() => onSelectedEdgeIdChange?.(props.edge.id)}
          />
        );
      },
      [selectedEdgeId, selectedNodeId, onSelectedEdgeIdChange],
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

        const childNodes = Object.values(
          props.constructTreeNode.children ?? {},
        ).filter((node) => !isNodeHidden(node.path));

        return (
          <ConstructNode
            id={props.constructTreeNode.path}
            name={props.constructTreeNode.id}
            fqn={props.constructTreeNode.constructInfo?.fqn ?? ""}
            inflights={info.type === "construct" ? info.inflights : []}
            onSelectedNodeIdChange={props.onSelectedNodeIdChange}
            highlight={props.selectedNodeId === props.constructTreeNode.path}
            hasChildNodes={childNodes.length > 0}
          >
            {childNodes.map((child) => (
              <RenderNode
                key={child.id}
                constructTreeNode={child}
                selectedNodeId={props.selectedNodeId}
                onSelectedNodeIdChange={props.onSelectedNodeIdChange}
              />
            ))}
          </ConstructNode>
        );
      },
      [isNodeHidden, nodeInfo],
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
