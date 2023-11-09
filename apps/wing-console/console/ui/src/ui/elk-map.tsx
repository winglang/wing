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

// For more configuration options, refer to: https://eclipse.dev/elk/reference/options.html
const layoutOptions: LayoutOptions = {
  "elk.hierarchyHandling": "INCLUDE_CHILDREN",
  "elk.direction": "RIGHT",
  "elk.alignment": "CENTER",
  "elk.algorithm": "org.eclipse.elk.layered",
  "elk.layered.layering.strategy": "MIN_WIDTH",
  "elk.layered.layering.nodePromotion.strategy": "DUMMYNODE_PERCENTAGE",
  "elk.layered.nodePlacement.strategy": "INTERACTIVE",
  "elk.layered.crossingMinimization.strategy": "LAYER_SWEEP",
  "elk.nodeSize.constraints": "USE_MINIMUM_SIZE",
  "elk.layered.spacing.baseValue": "32",
  "elk.edgeRouting": "ORTHOGONAL",
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
  selectedEdgeId?: string;
  onSelectedEdgeIdChange?: (id: string) => void;
}

export const ElkMap = <T extends unknown = undefined>({
  nodes,
  edges,
  node: NodeItem,
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

  const { zoomToFit } = useZoomPaneContext() ?? {};
  const zoomToNode = useCallback(
    (nodeId: string | undefined, skipAnimation?: boolean) => {
      const node = nodeList.find((node) => node.id === nodeId ?? "root");
      if (!node) {
        return;
      }

      zoomToFit(
        {
          x: node.offset.x,
          y: node.offset.y,
          width: node.width,
          height: node.height,
        },
        skipAnimation,
      );
    },
    [nodeList, zoomToFit],
  );

  // Zoom to fit when map changes
  const previousNodeList = useRef<NodeData[] | undefined>();
  useEffect(() => {
    // Skip animation if there was no previous node list (eg, first render)
    const skipAnimation =
      !previousNodeList.current || previousNodeList.current.length === 0;

    zoomToNode("root", skipAnimation);

    previousNodeList.current = nodeList;
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

  const zoomPane = useRef<HTMLDivElement>(null);
  const rootElement = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!zoomPane.current || !rootElement.current) {
      console.error("No zoom pane or root element");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            zoomToNode("root");
            return;
          }
        }
      },
      {
        root: zoomPane.current,
        rootMargin: "-20px",
      },
    );
    observer.observe(rootElement.current);
    return () => {
      observer.disconnect();
    };
  }, [zoomToNode]);

  return (
    <>
      <InvisibleNodeSizeCalculator
        nodes={nodes}
        node={NodeItem}
        onSizesChange={setMinimumSizes}
      />

      <ZoomPane
        ref={zoomPane}
        className="w-full h-full bg-slate-100 dark:bg-slate-550"
        data-testid="map-pane"
      >
        <div ref={rootElement}>
          {graph && (
            <div
              className={classNames(
                "relative",
                "transition-all",
                "rounded-lg",
                "bg-slate-50 dark:bg-slate-500",
                durationClass,
              )}
              style={{
                width: graph.width,
                height: graph.height,
              }}
            >
              <AnimatePresence>
                {nodeList.map((node, nodeIndex) => (
                  <motion.div
                    key={node.id}
                    // ref={nodeIndex === 0 ? rootElement : undefined}
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
                    const isEdgeHighlighted =
                      edge.sources[0] === selectedNodeId ||
                      edge.targets[0] === selectedNodeId;
                    const visible = !highlighted || isNodeHighlighted;
                    const selected = edge.id === selectedEdgeId;

                    return (
                      <EdgeItem
                        key={edge.id}
                        edge={edge}
                        offset={offsets?.get((edge as any).container)}
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
                        onMouseEnter={() => {
                          setHighlighted(edge.sources[0] ?? edge.targets[0]);
                        }}
                        onMouseLeave={() => setHighlighted(undefined)}
                        onClick={onSelectedEdgeIdChange}
                      />
                    );
                  })}
                </svg>
              </AnimatePresence>
            </div>
          )}
        </div>
      </ZoomPane>
    </>
  );
};
