import classNames from "classnames";
import ELK, { ElkNode, LayoutOptions } from "elkjs/lib/elk.bundled.js";
import { AnimatePresence, motion } from "framer-motion";
import { FC, Fragment, useCallback, useEffect, useState } from "react";

import { Edge } from "./Edge.js";
import { EdgeItem } from "./EdgeItem.js";
import { Node } from "./Node.js";
import { useNodeStaticData } from "./useNodeStaticData.js";

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

export interface ElkMapProps<T> {
  nodes: Node<T>[];
  edges?: Edge[];
  node: FC<NodeItemProps<T>>;
  selectedNodeId?: string;
  onSelectedNodeIdChange?: (id: string) => void;
}

export const ElkMap = <T extends unknown = undefined>(
  props: ElkMapProps<T>,
) => {
  const NodeItem = props.node;

  const nodeStaticData = useNodeStaticData({
    nodes: props.nodes,
    node: NodeItem,
  });

  const [offsets, setOffsets] =
    useState<Map<string, { x: number; y: number }>>();
  const [graph, setGraph] = useState<ElkNode>();
  useEffect(() => {
    if (!nodeStaticData.sizes || Object.keys(nodeStaticData.sizes).length === 0)
      return;

    const elk = new ELK();
    const toElkNode = (node: Node<T>): ElkNode => {
      const size = nodeStaticData.sizes?.[node.id];
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
        children: props.nodes.map((node) => toElkNode(node)),
        edges: props.edges?.map((edge) => ({
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
  }, [props.nodes, props.edges, nodeStaticData.sizes]);

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

  const renderElk = useCallback(
    (node: ElkNode, depth = 0) => {
      if (!nodeStaticData.nodeRecord) return;
      const offset = offsets?.get(node.id) ?? { x: 0, y: 0 };
      const data = nodeStaticData.nodeRecord[node.id];
      if (!data) return;
      const hasEdge = props.edges?.some(
        (edge) =>
          (edge.source === node.id && edge.target === highlighted) ||
          (edge.source === highlighted && edge.target === node.id),
      );
      return (
        <Fragment key={node.id}>
          <motion.div
            className={classNames(
              "absolute origin-top transition-all",
              durationClass,
            )}
            style={{
              translateX: offset.x,
              translateY: offset.y,
              width: `${node.width}px`,
              height: `${node.height}px`,
            }}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: isHighlighted(node.id) || hasEdge ? 1 : 0.35,
            }}
            transition={{ duration: 0.2 }}
            exit={{
              opacity: 0,
            }}
            onClick={() => props.onSelectedNodeIdChange?.(node.id)}
            onMouseEnter={() => setHighlighted(node.id)}
            onMouseLeave={() => setHighlighted(undefined)}
          >
            <NodeItem node={data} depth={depth} />
          </motion.div>

          {node.children?.map((node) => renderElk(node, depth + 1))}
        </Fragment>
      );
    },
    [nodeStaticData.nodeRecord, offsets, NodeItem, highlighted, setHighlighted],
  );

  return (
    <div
      className={classNames("relative transition-all", durationClass)}
      style={{
        width: graph?.width,
        height: graph?.height,
      }}
    >
      <AnimatePresence>
        {graph?.children?.map((node) => renderElk(node))}
      </AnimatePresence>

      <AnimatePresence>
        <svg
          className="absolute inset-0 pointer-events-none"
          width={graph?.width}
          height={graph?.height}
        >
          <defs>
            <marker
              className="stroke-none fill-slate-500"
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
              className="stroke-slate-500 fill-slate-500"
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
            const isEdgeHighlighted =
              edge.sources[0] === highlighted ||
              edge.targets[0] === highlighted;
            const isNodeHighlighted =
              isHighlighted(edge.sources[0]!) ||
              isHighlighted(edge.targets[0]!);
            const isSelected =
              edge.sources[0] === props.selectedNodeId ||
              edge.targets[0] === props.selectedNodeId;
            const visible =
              (highlighted && (isEdgeHighlighted || isNodeHighlighted)) ||
              (!highlighted && isSelected);
            return (
              <EdgeItem
                key={edge.id}
                edge={edge}
                offset={offsets?.get((edge as any).container)}
                highlighted={isEdgeHighlighted || isSelected}
                fade={!visible}
                markerStart={
                  isEdgeHighlighted || isSelected ? "tee-selected" : "tee"
                }
                markerEnd={
                  isEdgeHighlighted || isSelected
                    ? "arrow-head-selected"
                    : "arrow-head"
                }
              />
            );
          })}
        </svg>
      </AnimatePresence>
    </div>
  );
};
