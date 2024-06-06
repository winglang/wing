import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import {
  ResourceIcon,
  SpinnerLoader,
  useTheme,
} from "@wingconsole/design-system";
import type { ConstructTreeNode } from "@winglang/sdk/lib/core/index.js";
import clsx from "classnames";
import { type ElkPoint, type LayoutOptions } from "elkjs";
import type { FunctionComponent, PropsWithChildren } from "react";
import { memo, useCallback, useMemo } from "react";
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
interface WrapperProps {
  name: string;
  fqn: string;
  highlight?: boolean;
  onClick?: () => void;
  color?: string;
  icon?: string;
  collapsed?: boolean;
  onCollapse?: (value: boolean) => void;
}

const Wrapper: FunctionComponent<PropsWithChildren<WrapperProps>> = memo(
  ({
    name,
    fqn,
    highlight,
    onClick,
    children,
    color,
    icon,
    collapsed = false,
    onCollapse = (value: boolean) => {},
  }) => {
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    /* eslint-disable jsx-a11y/click-events-have-key-events */
    return (
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
            "border-b border-slate-200 dark:border-slate-800",
            "cursor-pointer",
          )}
        >
          <ResourceIcon
            className="size-4 -ml-0.5"
            resourceType={fqn}
            icon={icon}
            color={color}
          />

          <span
            className={clsx(
              "text-xs font-medium leading-relaxed tracking-wide whitespace-nowrap",
              !highlight && " text-slate-600 dark:text-slate-300",
              highlight && "text-sky-600 dark:text-sky-300",
            )}
          >
            {name}
          </span>
          <div className="flex grow justify-end">
            <div
              className="pl-1"
              onClick={() => {
                onCollapse(!collapsed);
              }}
            >
              {collapsed && (
                <ChevronRightIcon
                  className={clsx(
                    "size-4",
                    "hover:text-sky-600 dark:hover:text-sky-300 transition-colors",
                  )}
                />
              )}
              {!collapsed && (
                <ChevronDownIcon
                  className={clsx(
                    "size-4",
                    "hover:text-sky-600 dark:hover:text-sky-300 transition-colors",
                  )}
                />
              )}
            </div>
          </div>
        </div>
        {!collapsed && children}
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
  collapsed?: boolean;
  onCollapse?: (value: boolean) => void;
  color?: string;
  icon?: string;
}

const ContainerNode: FunctionComponent<PropsWithChildren<ContainerNodeProps>> =
  memo((props) => {
    return (
      <Node
        elk={{
          id: props.id,
          layoutOptions: {
            ...baseLayoutOptions,
          },
        }}
        className={clsx("inline-block", "group")}
        data-elk-id={props.id}
      >
        <div className={clsx("w-full h-full relative")}>
          <Wrapper
            name={props.name}
            fqn={props.resourceType!}
            highlight={props.highlight}
            onClick={props.onClick}
            onCollapse={props.onCollapse}
            collapsed={props.collapsed}
            color={props.color}
            icon={props.icon}
          >
            <div className="p-4">
              <NodeChildren>
                <div className="absolute">{props.children}</div>
              </NodeChildren>
            </div>
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
  color?: string;
  onCollapse: (value: boolean) => void;
  expanded: boolean;
  icon?: string;
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
      color,
      onCollapse,
      expanded,
      icon,
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
              "elk.layered.spacing.baseValue": "1",
              "elk.portConstraints": "FIXED_SIDE",
            },
          }}
          className={clsx(
            "inline-block group/construct cursor-pointer",
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

            {!hasChildNodes && (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
              <div
                className={clsx(
                  "px-2.5 py-1 flex items-center gap-1.5",
                  inflights.length > 0 &&
                    "border-b border-slate-200 dark:border-slate-800",
                )}
              >
                <ResourceIcon
                  className="size-4 -ml-0.5"
                  resourceType={fqn}
                  color={color}
                  icon={icon}
                />

                <span
                  className={clsx(
                    "text-xs font-medium leading-relaxed tracking-wide whitespace-nowrap",
                    !highlight && " text-slate-600 dark:text-slate-300",
                    highlight && "text-sky-600 dark:text-sky-300",
                  )}
                >
                  {name}
                </span>
                {collapsed && (
                  <div
                    className="flex grow justify-end pl-1"
                    onClick={() => {
                      if (collapsed) {
                        onCollapse(false);
                      }
                    }}
                  >
                    <ChevronRightIcon
                      className={clsx(
                        "size-4",
                        "hover:text-sky-600 dark:hover:text-sky-300 transition-colors",
                      )}
                    />
                  </div>
                )}
              </div>
            )}

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
                      className={clsx("inline-block pointer-events-none")}
                    >
                      <div>
                        <div
                          className={clsx(
                            "px-2.5 py-1.5 text-xs whitespace-nowrap",
                            "text-slate-600 dark:text-slate-300",
                            "font-mono",
                          )}
                        >
                          <span>{inflight.name}</span>
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
            onCollapse={onCollapse}
            collapsed={collapsed}
            color={color}
            icon={icon}
          >
            <NodeChildren>
              {inflights.length > 0 && renderedNode}

              {children}
            </NodeChildren>

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
          </ContainerNode>
        );
      }

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
        <g
          className={clsx(
            "fill-none stroke-1 group pointer-events-auto",
            "transition-colors",
            !selected &&
              !highlighted && ["stroke-slate-300 dark:stroke-slate-500"],
            (selected || highlighted) && "stroke-sky-500 dark:stroke-sky-400",
            "hover:stroke-sky-500",
            "dark:hover:stroke-sky-300",
          )}
          transform={`translate(${offsetX} ${offsetY})`}
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
          <path
            className={clsx(
              "stroke-[6] stroke-sky-100 dark:stroke-sky-700",
              !selected && "opacity-0",
              selected && "opacity-100",
              "group-hover:opacity-100",
              "transition-opacity",
            )}
            d={d}
          />
          <path d={d} />
          <path
            className={clsx(
              "transition-colors",
              "stroke-none",
              !selected &&
                !highlighted && ["fill-slate-300 dark:fill-slate-500"],
              (selected || highlighted) && "fill-sky-500 dark:fill-sky-400",
              "group-hover:fill-sky-500",
              "dark:group-hover:fill-sky-300",
            )}
            d={`M${(lastPoint?.x ?? 0) - 4} ${
              (lastPoint?.y ?? 0) - 2
            } v4 l5 -2 z`}
          />
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
  onExpand: (path: string) => void;
  onCollapse: (path: string) => void;
  expandedItems: string[];
}

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
        const node = props.constructTreeNode;
        if (isNodeHidden(node.path)) {
          return <></>;
        }

        const info = nodeInfo?.get(node.path);
        if (!info) {
          return <></>;
        }

        const childNodes = Object.values(node.children ?? {}).filter(
          (node) => !isNodeHidden(node.path),
        );

        const fqn = node.constructInfo?.fqn;

        const cloudResourceType = fqn?.split(".").at(-1);

        const name =
          node.display?.title === cloudResourceType
            ? node.id
            : node.display?.title ?? node.id;

        const children = Object.values(node.children ?? {});
        const canBeExpanded =
          !!node.children && children.some((child) => !child.display?.hidden);
        const collapsed = canBeExpanded && !expandedItems.includes(node.path);

        return (
          <ConstructNode
            id={node.path}
            name={name ?? ""}
            fqn={fqn ?? ""}
            color={node.display?.color}
            icon={node.display?.icon}
            inflights={info.type === "construct" ? info.inflights : []}
            onSelectedNodeIdChange={props.onSelectedNodeIdChange}
            highlight={props.selectedNodeId === node.path}
            hasChildNodes={childNodes.length > 0}
            collapsed={collapsed}
            onCollapse={(collapse) => {
              if (collapse) {
                onCollapse(node.path);
              } else {
                onExpand(node.path);
              }
            }}
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
      [isNodeHidden, nodeInfo, onCollapse, onExpand, expandedItems],
    );

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
