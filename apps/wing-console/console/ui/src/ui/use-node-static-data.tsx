import { useEffect, useState } from "react";

import { Node } from "../shared/Node.js";

export interface NodeStaticDataOptions<T> {
  /**
   * The list of nodes.
   */
  nodes: Node<T>[];
}

/**
 * Generate data such as sizes, port positions and more for each node.
 */
export const useNodeStaticData = <T,>({ nodes }: NodeStaticDataOptions<T>) => {
  const [nodeRecord, setNodeRecord] = useState<Record<string, Node<T>>>();
  useEffect(() => {
    setNodeRecord(() => {
      const nodeRecord: Record<string, any> = {};
      const visit = (node: Node<T>) => {
        nodeRecord[node.id] = node;
        for (const child of node.children ?? []) {
          visit(child);
        }
      };
      for (const node of nodes) {
        visit(node);
      }
      return nodeRecord;
    });
  }, [nodes]);

  return {
    nodeRecord,
  };
};
