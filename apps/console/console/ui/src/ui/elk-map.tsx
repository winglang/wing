import classNames from "classnames";
import ELK, { ElkNode, LayoutOptions } from "elkjs/lib/elk.bundled.js";
import { AnimatePresence, motion } from "framer-motion";
import { FC, Fragment, useCallback, useEffect, useRef, useState } from "react";

import { Edge } from "../shared/Edge.js";
import { Node } from "../shared/Node.js";

import { EdgeItem } from "./edge-item.js";
import { useNodeStaticData } from "./use-node-static-data.js";
import { ZoomPane, useZoomPaneContext } from "./zoom-pane.js";

const durationClass = "duration-500";

const layoutOptions: LayoutOptions = {
  "elk.hierarchyHandling": "INCLUDE_CHILDREN",
  "elk.algorithm": "org.eclipse.elk.layered",
  "elk.layered.layering.strategy": "INTERACTIVE",
  "elk.layered.cycleBreaking.strategy": "INTERACTIVE",
  "elk.edgeRouting": "ORTHOGONAL",
  // "elk.edgeRouting": "POLYLINE",
  // "elk.edgeRouting": "SPLINES",
  // "elk.layered.edgeRouting.splines.mode": "CONSERVATIVE",
  "elk.layered.nodePlacement.strategy": "INTERACTIVE",
  "elk.layered.layering.nodePromotion.strategy": "DUMMYNODE_PERCENTAGE",
  // "elk.layered.nodePlacement.bk.fixedAlignment": "BALANCED",
  // "elk.layered.unnecessaryBendpoints": "false",
  // "elk.separateConnectedComponents": "true",
  // "elk.spacing.componentComponent": "40",
  "elk.direction": "RIGHT",
  // "elk.direction": "UP",
  // "elk.direction": "LEFT",
  // "elk.layered.spacing.baseValue": "40",
  "elk.layered.spacing.baseValue": "32",
  // "elk.portAlignment.basic": "BEGIN",
  // "elk.spacing.portPort": "40",
  // "elk.spacing.individual": "40",
  // "elk.spacing.edgeNode": "40",
  // "elk.layered.spacing.edgeEdgeBetweenLayers": "40",
  // "elk.spacing.portsSurrounding": "[top=37.5,left=10,bottom=10,right=10]",
  // "elk.layered.considerModelOrder.strategy": "NONE",
  // "elk.layered.considerModelOrder.strategy": "NODES_AND_EDGES",
  // "elk.layered.mergeEdges": "true",
  // "elk.spacing.portsSurrounding": "[top=30,left=30,bottom=30,right=30]",
  // "elk.padding": "[top=50,left=20,bottom=20,right=20]",
  // "elk.padding": "[top=60,left=30,bottom=30,right=30]",
  "elk.padding": "[top=52,left=20,bottom=20,right=20]",
};

export type NodeItemProps<T> = {
  node: Node<T>;
  depth: number;
};

type Sizes = Record<string, { width: number; height: number }>;

interface InvisibleNodeSizeCalculatorProps<T> {
  nodes: Node<T>[];
  node: FC<NodeItemProps<T>>;
  onSizesChange(sizes: Sizes): void;
}

const InvisibleNodeSizeCalculator = <T extends unknown = undefined>({
  nodes,
  node: NodeItem,
  onSizesChange,
}: InvisibleNodeSizeCalculatorProps<T>) => {
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
              <NodeItem node={node} depth={depth} />
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
};

export interface ElkMapProps<T> {
  nodes: Node<T>[];
  edges?: Edge[];
  node: FC<NodeItemProps<T>>;
  selectedNodeId?: string;
  onSelectedNodeIdChange?: (id: string) => void;
}

export const ElkMap = <T extends unknown = undefined>({
  nodes,
  edges,
  node: NodeItem,
  selectedNodeId,
  onSelectedNodeIdChange,
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
        edges: edges?.map((edge) => ({
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

  const [highlighted, setHighlighted] = useState<string>();

  const isHighlighted = useCallback(
    (nodeId: string) => {
      if (!highlighted) return true;
      const highlightedId = `${highlighted}/`;
      const nodeIdWithSlash = `${nodeId}/`;
      return (
        highlightedId.startsWith(nodeIdWithSlash) ||
        nodeIdWithSlash.startsWith(highlightedId)
      );
    },
    [highlighted],
  );

  type NodeData = {
    id: string;
    width: number;
    height: number;
    offset: { x: number; y: number };
    depth: number;
    edges: Edge[];
    data: Node<T>;
  };

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
            edges: edges ?? [],
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

      return nodeList;
    });
  }, [graph, nodeRecord, offsets, edges, setNodeList]);

  const { zoomToFit } = useZoomPaneContext() ?? {};
  const zoomToNode = useCallback(
    (nodeId: string | undefined) => {
      const node = nodeList.find((node) => node.id === nodeId ?? "root");
      if (!node) {
        return;
      }

      zoomToFit({
        x: node.offset.x,
        y: node.offset.y,
        width: node.width,
        height: node.height,
      });
    },
    [nodeList, zoomToFit],
  );

  // Zoom to fit when map changes
  useEffect(() => {
    zoomToNode("root");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeList]);

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

  return (
    <>
      <InvisibleNodeSizeCalculator
        nodes={nodes}
        node={NodeItem}
        onSizesChange={setMinimumSizes}
      />

      <ZoomPane className="w-full h-full">
        {graph && (
          <div
            className={classNames("relative transition-all", durationClass)}
            style={{
              width: graph.width,
              height: graph.height,
            }}
          >
            <AnimatePresence>
              {nodeList.map((node) => (
                <motion.div
                  key={node.id}
                  className={classNames(
                    "absolute origin-top",
                    "transition-all",
                    durationClass,
                  )}
                  style={{
                    translateX: node.offset.x,
                    translateY: node.offset.y,
                    width: `${node.width}px`,
                    height: `${node.height}px`,
                  }}
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity:
                      isHighlighted(node.id) || hasHighlightedEdge(node)
                        ? 1
                        : 0.35,
                  }}
                  transition={{ ease: "easeOut", duration: 0.15 }}
                  exit={{
                    opacity: 0,
                  }}
                  onClick={() => onSelectedNodeIdChange?.(node.id)}
                  onMouseEnter={() => setHighlighted(node.id)}
                  onMouseLeave={() => setHighlighted(undefined)}
                >
                  <NodeItem node={node.data} depth={node.depth} />
                </motion.div>
              ))}
            </AnimatePresence>

            <AnimatePresence>
              <svg
                className="absolute inset-0 pointer-events-none"
                width={graph?.width}
                height={graph?.height}
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

                {graph?.edges?.map((edge) => {
                  const isNodeHighlighted =
                    isHighlighted(edge.sources[0]!) ||
                    isHighlighted(edge.targets[0]!);
                  const isSelected =
                    edge.sources[0] === selectedNodeId ||
                    edge.targets[0] === selectedNodeId;
                  const visible = !highlighted || isNodeHighlighted;
                  return (
                    <EdgeItem
                      key={edge.id}
                      edge={edge}
                      offset={offsets?.get((edge as any).container)}
                      highlighted={isSelected}
                      fade={!visible}
                      markerStart={isSelected ? "tee-selected" : "tee"}
                      markerEnd={
                        isSelected ? "arrow-head-selected" : "arrow-head"
                      }
                    />
                  );
                })}
              </svg>
            </AnimatePresence>
          </div>
        )}
      </ZoomPane>
    </>
  );
};
