import classNames from "classnames";
import type {
  ElkExtendedEdge,
  ElkNode,
  LayoutOptions,
} from "elkjs/lib/elk.bundled.js";
import ELK from "elkjs/lib/elk.bundled.js";
import { AnimatePresence } from "framer-motion";
import type { FC } from "react";
import {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useKeyPressEvent } from "react-use";

import type { Edge } from "../shared/Edge.js";
import type { Node } from "../shared/Node.js";

import { EdgeItem } from "./edge-item.js";
import { useNodeStaticData } from "./use-node-static-data.js";
import type { ZoomPaneRef } from "./zoom-pane.js";
import { ZoomPane, useZoomPane } from "./zoom-pane.js";

const durationClass = "duration-500";

// For more configuration options, refer to: https://eclipse.dev/elk/reference/options.html
const layoutOptions: LayoutOptions = {
  "elk.hierarchyHandling": "INCLUDE_CHILDREN",
  "elk.direction": "RIGHT",
  "elk.alignment": "CENTER",
  "elk.algorithm": "org.eclipse.elk.layered",
  "elk.layered.layering.strategy": "MIN_WIDTH",
  "elk.layered.nodePlacement.strategy": "NETWORK_SIMPLEX",
  "elk.layered.crossingMinimization.strategy": "LAYER_SWEEP",
  "elk.layered.spacing.baseValue": "0",
  "elk.spacing.edgeEdge": "128",
  "elk.spacing.edgeNode": "32",
  "elk.spacing.nodeNode": "48",
  "elk.layered.spacing.edgeEdgeBetweenLayers": "16",
  "elk.layered.spacing.nodeNodeBetweenLayers": "64",
  "elk.layered.spacing.edgeNodeBetweenLayers": "16",
  "elk.padding": "[top=68,left=20,bottom=20,right=20]",
};

export type NodeItemProps<T> = {
  node: Node<T>;
  depth: number;
  selected: boolean;
  fade: boolean;
};

type Sizes = Record<string, { width: number; height: number }>;

interface InvisibleNodeSizeCalculatorProps<T> {
  nodes: Node<T>[];
  node: FC<NodeItemProps<T>>;
  onSizesChange(sizes: Sizes): void;
}

const InvisibleNodeSizeCalculator = memo(
  ({
    nodes,
    node: NodeItem,
    onSizesChange,
  }: InvisibleNodeSizeCalculatorProps<any>) => {
    const refs = useRef<Record<string, HTMLDivElement | null>>({});

    const [sizes, setSizes] = useState<Sizes>();
    useEffect(() => {
      setSizes(() => {
        const sizes: Sizes = {};
        for (const [nodeId, element] of Object.entries(refs.current)) {
          if (!element) {
            continue;
          }
          const rect = element.getBoundingClientRect();
          sizes[nodeId] = {
            width: rect.width,
            height: rect.height,
          };
        }
        return sizes;
      });
    }, [nodes]);
    useEffect(() => {
      if (sizes) {
        onSizesChange(sizes);
      }
    }, [sizes, onSizesChange]);

    const renderElkPre = useCallback(
      (node: ElkNode, depth = 0) => {
        return (
          <Fragment key={node.id}>
            <div className="inline-block">
              <div
                className={classNames("h-full relative")}
                ref={(element) => (refs.current[node.id] = element)}
              >
                <NodeItem
                  node={node}
                  depth={depth}
                  selected={false}
                  fade={false}
                />
              </div>
            </div>

            {node.children?.map((node) => renderElkPre(node, depth + 1))}
          </Fragment>
        );
      },
      [NodeItem],
    );

    return (
      <div className="absolute w-1 h-1 overflow-hidden invisible">
        {nodes.map((node) => renderElkPre(node))}
      </div>
    );
  },
);

export interface ElkMapProps<T> {
  nodes: Node<T>[];
  edges?: Edge[];
  node: FC<NodeItemProps<T>>;
  selectedNodeId?: string | undefined;
  onSelectedNodeIdChange?: (id: string | undefined) => void;
  selectedEdgeId?: string;
  onSelectedEdgeIdChange?: (id: string) => void;
}

interface EdgesContainerProps {
  width: number;
  height: number;
  edges: ElkExtendedEdge[];
  offsets: Map<
    string,
    {
      x: number;
      y: number;
    }
  >;
  selectedEdgeId?: string;
  onClick?: (id: string) => void;
  isHighlighted(nodeId: string): boolean;
  selectedNodeId?: string;
  highlighted?: string;
}

const EdgesContainer = memo(
  ({
    width,
    height,
    edges,
    offsets,
    selectedEdgeId,
    onClick,
    isHighlighted,
    selectedNodeId,
    highlighted,
  }: EdgesContainerProps) => {
    // const higlight = useCallback(() => {
    //   setHighlighted(edge.sources[0] ?? edge.targets[0]);
    // });
    return (
      <svg
        className="absolute inset-0 pointer-events-none"
        width={width}
        height={height}
      >
        <defs>
          <marker
            className="stroke-none fill-slate-500 dark:fill-slate-800"
            markerWidth="6"
            markerHeight="4"
            orient="auto"
            id="arrow-head"
            refX="4"
            refY="2"
          >
            <path d="M0 0 v4 l5 -2 z" />
          </marker>

          <marker
            className="stroke-none fill-sky-500"
            markerHeight="6"
            markerWidth="4"
            orient="auto"
            id="arrow-head-selected"
            refX="4"
            refY="2"
          >
            <path d="M0 0 v4 l5 -2 z" />
          </marker>

          <marker
            className="stroke-slate-500 dark:stroke-slate-800 fill-slate-500 dark:fill-slate-800"
            markerHeight="6"
            markerWidth="6"
            orient="auto"
            id="tee"
            refX="5"
            refY="3"
          >
            <path d="M5 0V6H6V0z" />
          </marker>

          <marker
            className="stroke-sky-500 fill-sky-500"
            markerHeight="6"
            markerWidth="6"
            orient="auto"
            id="tee-selected"
            refX="5"
            refY="3"
          >
            <path d="M5 0V6H6V0z" />
          </marker>
        </defs>

        {edges.map((edge) => {
          const isNodeHighlighted =
            isHighlighted(edge.sources[0]!) || isHighlighted(edge.targets[0]!);
          const isEdgeHighlighted =
            edge.sources[0] === selectedNodeId ||
            edge.targets[0] === selectedNodeId;
          const visible = highlighted || isNodeHighlighted;
          const selected = edge.id === selectedEdgeId;

          return (
            <EdgeItem
              key={edge.id}
              edge={edge}
              offset={offsets.get((edge as any).container)}
              highlighted={isEdgeHighlighted}
              selected={selected}
              fade={!visible}
              markerStart={
                isEdgeHighlighted || selected ? "tee-selected" : "tee"
              }
              markerEnd={
                isEdgeHighlighted || selected
                  ? "arrow-head-selected"
                  : "arrow-head"
              }
              onClick={onClick}
            />
          );
        })}
      </svg>
    );
  },
);

interface GraphProps {
  graph: ElkNode;
  node: FC<NodeItemProps<any>>;
  nodeList: NodeData[];
  offsets: Map<string, { x: number; y: number }>;
  selectedNodeId?: string;
  onSelectedNodeIdChange?(id: string): void;
  isHighlighted(nodeId: string): boolean;
  hasHighlightedEdge(node: NodeData): boolean;
  onSelectedEdgeIdChange?(id: string): void;
}

const Graph = memo(
  ({
    graph,
    node,
    nodeList,
    offsets,
    selectedNodeId,
    onSelectedNodeIdChange,
    isHighlighted,
    hasHighlightedEdge,
    onSelectedEdgeIdChange,
  }: GraphProps) => {
    return (
      <div
        className={classNames(
          "relative",
          "transition-transform",
          "rounded-lg",
          durationClass,
        )}
        style={{
          width: graph.width,
          height: graph.height,
        }}
      >
        <AnimatePresence>
          <NodesContainer
            nodeList={nodeList}
            node={node}
            selectedNodeId={selectedNodeId}
            onSelectedNodeIdChange={onSelectedNodeIdChange}
            isHighlighted={isHighlighted}
            hasHighlightedEdge={hasHighlightedEdge}
          />
        </AnimatePresence>

        <AnimatePresence>
          {offsets && graph.edges && (
            <EdgesContainer
              width={graph.width ?? 0}
              height={graph.height ?? 0}
              edges={graph.edges}
              offsets={offsets}
              selectedNodeId={selectedNodeId}
              onClick={onSelectedEdgeIdChange}
              isHighlighted={isHighlighted}
            />
          )}
        </AnimatePresence>
      </div>
    );
  },
);

type NodeData<T = any> = {
  id: string;
  width: number;
  height: number;
  offset: { x: number; y: number };
  depth: number;
  edges: Edge[];
  data: Node<T>;
};

interface NodesContainerProps {
  nodeList: NodeData[];
  node: FC<NodeItemProps<any>>;
  selectedNodeId: string | undefined;
  onSelectedNodeIdChange?(id: string): void;
  isHighlighted(nodeId: string): boolean;
  hasHighlightedEdge(node: NodeData): boolean;
}

const NodesContainer = memo(
  ({
    nodeList,
    node: NodeItem,
    selectedNodeId,
    onSelectedNodeIdChange,
    isHighlighted,
    hasHighlightedEdge,
  }: NodesContainerProps) => {
    return (
      <>
        {nodeList.map((node) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          <div
            key={node.id}
            className={classNames(
              "absolute origin-top",
              "transition-all",
              durationClass,
            )}
            style={{
              transform: `translate(${node.offset.x}px, ${node.offset.y}px)`,
              width: `${node.width}px`,
              height: `${node.height}px`,
            }}
            onClick={(event) => {
              // Stop the event from propagating to the background node.
              event.stopPropagation();
              onSelectedNodeIdChange?.(node.id);
            }}
          >
            <NodeItem
              node={node.data}
              depth={node.depth}
              selected={node.id === selectedNodeId}
              fade={!isHighlighted(node.id) && !hasHighlightedEdge(node)}
            />
          </div>
        ))}
      </>
    );
  },
);

const MapBackground = (props: {}) => {
  const { viewTransform } = useZoomPane();
  const patternSize = 12 * viewTransform.z;
  const dotSize = 1 * viewTransform.z;
  const id = useId();
  return (
    // Reference: https://github.com/xyflow/xyflow/blob/13897512d3c57e72c2e27b14ffa129412289d948/packages/react/src/additional-components/Background/Background.tsx#L52-L86.
    <svg className="absolute w-full h-full top-0 left-0 bg-white dark:bg-slate-500 text-slate-200 dark:text-slate-550">
      <pattern
        id={id}
        x={(-viewTransform.x * viewTransform.z) % patternSize}
        y={(-viewTransform.y * viewTransform.z) % patternSize}
        width={patternSize}
        height={patternSize}
        patternUnits="userSpaceOnUse"
        patternTransform={`translate(-${viewTransform.z},-${viewTransform.z})`}
      >
        <circle
          cx={dotSize}
          cy={dotSize}
          r={dotSize}
          fill="currentColor"
        ></circle>
      </pattern>
      <rect x="0" y="0" width="100%" height="100%" fill={`url(#${id})`}></rect>
    </svg>
  );
};

const nodeExists = (nodes: Node<any>[], id: string): boolean => {
  let current = nodes;

  let node: Node<any> | undefined;
  do {
    node = current.find(
      (node) => node.id === id || id.startsWith(`${node.id}/`),
    );
    if (node?.id === id) {
      return true;
    }
    current = node?.children ?? [];
  } while (node);

  return false;
};

export const ElkMap = <T extends unknown = undefined>({
  nodes,
  edges,
  node,
  selectedNodeId,
  onSelectedNodeIdChange,
  selectedEdgeId,
  onSelectedEdgeIdChange,
}: ElkMapProps<T>) => {
  const { nodeRecord } = useNodeStaticData({
    nodes,
  });

  const [minimumSizes, setMinimumSizes] = useState<Sizes>();

  const [offsets, setOffsets] =
    useState<Map<string, { x: number; y: number }>>();
  const [graph, setGraph] = useState<ElkNode>();
  useEffect(() => {
    if (!minimumSizes || Object.keys(minimumSizes).length === 0) return;

    const elk = new ELK();
    const toElkNode = (node: Node<T>): ElkNode => {
      const size = minimumSizes?.[node.id];
      return {
        id: node.id,
        width: size?.width,
        height: size?.height,
        layoutOptions: {
          ...layoutOptions,
          "elk.nodeSize.constraints": "MINIMUM_SIZE",
          "elk.nodeSize.minimum": `[${size?.width}, ${size?.height}]`,
        },
        children: node.children?.map((node) => toElkNode(node)),
      };
    };

    let abort = false;
    void elk
      .layout({
        id: "root",
        layoutOptions: {
          ...layoutOptions,
          "elk.padding": "[top=10,left=10,bottom=10,right=10]",
        },
        children: nodes.map((node) => toElkNode(node)),
        edges: edges
          ?.filter(
            (edge) =>
              nodeExists(nodes, edge.source) && nodeExists(nodes, edge.target),
          )
          ?.map((edge) => ({
            id: edge.id,
            sources: [edge.source],
            targets: [edge.target],
          })),
      })
      .then((graph) => {
        if (abort) {
          return;
        }

        const offsets = new Map<string, { x: number; y: number }>();
        const visit = (node: ElkNode, offsetX = 0, offsetY = 0) => {
          const x = offsetX + (node.x ?? 0);
          const y = offsetY + (node.y ?? 0);
          offsets.set(node.id, { x, y });
          for (const child of node.children ?? []) {
            visit(child, x, y);
          }
        };
        visit(graph);
        setOffsets(offsets);
        setGraph(graph);
      });

    return () => {
      abort = true;
    };
  }, [nodes, edges, minimumSizes]);

  const highlighted = selectedNodeId;

  const isHighlighted = useCallback(
    (nodeId: string) => {
      if (!highlighted || highlighted === "root") return true;
      return highlighted === nodeId;
    },
    [highlighted],
  );

  const [nodeList, setNodeList] = useState<NodeData[]>([]);
  useEffect(() => {
    setNodeList(() => {
      if (!graph) {
        return [];
      }
      if (!nodeRecord) {
        return [];
      }
      if (!offsets) {
        return [];
      }

      const nodeList: NodeData[] = [];
      const traverse = (node: ElkNode, depth = 0) => {
        const offset = offsets?.get(node.id) ?? { x: 0, y: 0 };
        const data = nodeRecord[node.id];
        if (data) {
          nodeList.push({
            id: node.id,
            width: node.width ?? 0,
            height: node.height ?? 0,
            offset,
            depth,
            edges:
              edges?.filter(
                (edge) => edge.source === node.id || edge.target === node.id,
              ) ?? [],
            data,
          });
        }
        for (const child of node.children ?? []) {
          traverse(child, depth + 1);
        }
      };

      for (const node of graph.children ?? []) {
        traverse(node);
      }

      // Remove root node.
      return nodeList.slice(1);
    });
  }, [graph, nodeRecord, offsets, edges, setNodeList]);

  const hasHighlightedEdge = useCallback(
    (node: NodeData) => {
      return node.edges.some(
        (edge) =>
          (edge.source === node.id && edge.target === highlighted) ||
          (edge.source === highlighted && edge.target === node.id),
      );
    },
    [highlighted],
  );

  const mapSize = useMemo(() => {
    if (!graph) {
      return;
    }

    return {
      width: graph.width!,
      height: graph.height!,
    };
  }, [graph]);
  const zoomPaneRef = useRef<ZoomPaneRef>(null);

  useEffect(() => {
    zoomPaneRef.current?.zoomToFit();
  }, [offsets]);

  const mapBackgroundRef = useRef<HTMLDivElement>(null);

  useKeyPressEvent(
    "Escape",
    useCallback(() => {
      onSelectedNodeIdChange?.(undefined);
    }, [onSelectedNodeIdChange]),
  );

  return (
    <>
      <InvisibleNodeSizeCalculator
        nodes={nodes}
        node={node}
        onSizesChange={setMinimumSizes}
      />

      <div ref={mapBackgroundRef}></div>

      <ZoomPane
        ref={zoomPaneRef}
        boundingBox={mapSize}
        className="w-full h-full"
        data-testid="map-pane"
        onClick={() => onSelectedNodeIdChange?.(undefined)}
      >
        {mapBackgroundRef.current &&
          createPortal(<MapBackground />, mapBackgroundRef.current)}
        {graph && (
          <Graph
            graph={graph}
            node={node}
            nodeList={nodeList}
            offsets={offsets!}
            selectedNodeId={selectedNodeId}
            onSelectedNodeIdChange={onSelectedNodeIdChange}
            onSelectedEdgeIdChange={onSelectedEdgeIdChange}
            isHighlighted={isHighlighted}
            hasHighlightedEdge={hasHighlightedEdge}
          />
        )}
      </ZoomPane>
    </>
  );
};
