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
        "outline outline-0 group-hover/construct:outline-4 outline-sky-200",
        props.highlight && "outline-4 border-sky-300",
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
  // "elk.layered.layering.strategy": "MIN_WIDTH",
  // "elk.layered.layering.strategy": "NETWORK_SIMPLEX",
  // "elk.layered.layering.strategy": "STRETCH_WIDTH",
  // "elk.layered.nodePlacement.strategy": "NETWORK_SIMPLEX",
  // "elk.layered.crossingMinimization.strategy": "LAYER_SWEEP",
  "elk.layered.spacing.baseValue": `${SPACING_BASE_VALUE}`, // See https://eclipse.dev/elk/reference/options/org-eclipse-elk-layered-spacing-baseValue.html.
};

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
    const IconComponent = getResourceIconComponent(props.resourceType, {
      solid: true,
      resourceId: props.id,
    });

    const nameNode = (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
      <div
        className={clsx(
          "whitespace-nowrap",
          "text-xs font-medium leading-relaxed tracking-wide",
          !props.highlight && "text-slate-400 dark:text-slate-800",
          props.highlight && "text-sky-500 dark:text-sky-100",
          "font-normal",
          "transition-opacity",
          "backdrop-blur",
          "cursor-pointer",
        )}
        onClick={() => props.onClick?.()}
      >
        <div className="flex items-center gap-1">
          <IconComponent className="size-4" />
          {props.name}
        </div>
      </div>
    );

    return (
      <Node
        elk={{
          id: props.id,
          layoutOptions: {
            ...baseLayoutOptions,
            "elk.layered.layering.strategy": "MIN_WIDTH",
          },
        }}
        className={clsx(
          "inline-block",
          "group",
          // "p-2",
          "z-0",
        )}
      >
        <div className={clsx("w-full h-full relative")}>
          <div className="absolute inset-x-0 top-0">
            <div className="relative">
              <div className="absolute bottom-0">{nameNode}</div>
            </div>
          </div>

          <div className="h-0 invisible">{nameNode}</div>

          <div
            className={clsx(
              "w-full h-full rounded-lg",
              "transition-all",
              "flex flex-col",
              "overflow-hidden",
              "border",
              props.pseudoContainer && "border-dashed",
              "outline outline-0 outline-sky-200/50 dark:outline-sky-500/50",
              // props.highlight && "outline-4",
              !props.highlight && "border-slate-300 dark:border-slate-700",
              props.highlight && "border-sky-400 dark:border-sky-500",
            )}
          >
            <div className={clsx("grow", "shadow-inner", "px-6 py-6")}>
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
              "elk.direction": "DOWN",
              "elk.layered.spacing.baseValue": "1",
              // "elk.layered.layering.strategy": "MIN_WIDTH",
              // "elk.layered.layering.strategy": "NETWORK_SIMPLEX",
              // "elk.layered.layering.strategy": "STRETCH_WIDTH",
            },
          }}
          className="inline-block group/construct z-20 cursor-pointer"
          onClick={select}
        >
          <div
            className={clsx(
              "w-full h-full rounded-lg",
              "bg-white dark:bg-slate-700",
              // highlight && "bg-sky-50 dark:bg-sky-900",
              "border",
              "outline outline-0 outline-sky-200/50 dark:outline-sky-500/50",
              !highlight && "border-slate-300 dark:border-slate-800",
              highlight && "outline-4 border-sky-400 dark:border-sky-500",
              "shadow",
              "transition-all",
            )}
          >
            <div className="px-2.5 py-1 flex items-center gap-1.5">
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

            <NodeChildren className="text-xs">
              {inflights.map((inflight) => (
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
            </NodeChildren>
          </div>
        </Node>
      );

      // if (hasChildNodes) {
      //   return (
      //     <ContainerNode
      //       id={`${id}#container`}
      //       name={name}
      //       pseudoContainer
      //       resourceType={fqn}
      //       highlight={highlight}
      //       onClick={select}
      //     >
      //       {renderedNode}

      //       {children}
      //     </ContainerNode>
      //   );
      // }

      // if (hasChildNodes) {
      //   return (
      //     <>
      //       {renderedNode}
      //       <ContainerNode
      //         id={`${id}#children`}
      //         name={`${name} Children`}
      //         pseudoContainer
      //         resourceType={fqn}
      //         highlight={highlight}
      //         onClick={select}
      //       >
      //         {children}
      //       </ContainerNode>
      //     </>
      //   );
      // }

      if (hasChildNodes) {
        return (
          <Node
            elk={{
              id: `${id}#container`,
              layoutOptions: {
                // "elk.algorithm": "org.eclipse.elk.fixed",
                "elk.direction": "LEFT",
                // "elk.layered.spacing.baseValue": "1",
                "elk.layered.layering.strategy": "MIN_WIDTH",
                // "elk.layered.layering.strategy": "NETWORK_SIMPLEX",
                // "elk.layered.layering.strategy": "STRETCH_WIDTH",
              },
            }}
          >
            {renderedNode}

            <ContainerNode
              id={`${id}#children`}
              // name={`${name} Children`}
              name={name}
              pseudoContainer
              resourceType={fqn}
              highlight={highlight}
              onClick={select}
            >
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
            </ContainerNode>
          </Node>
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
            highlighted && "stroke-sky-500 dark:stroke-sky-400",
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
            highlighted={
              selectedEdgeId === props.edge.id ||
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
