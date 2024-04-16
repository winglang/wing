import type { ConstructTreeNode } from "@winglang/sdk/lib/core/tree.js";
import type { ConnectionData } from "@winglang/sdk/lib/simulator/index.js";
import uniqBy from "lodash.uniqby";
import { useMemo } from "react";

import { trpc } from "./trpc.js";

export type NodeInflight = {
  id: string;
  name: string;
  sourceOccupied?: boolean;
  targetOccupied?: boolean;
};

export type NodeV2 =
  | {
      type: "container";
      // children: ConsoleNode[];
      children: string[];
    }
  | {
      type: "autoId";
    }
  | {
      type: "function";
    }
  // | {
  //     type: "queue";
  //     inflights: {
  //       id: string;
  //       name: string;
  //     }[];
  //   }
  // | {
  //     type: "topic";
  //     inflights: {
  //       id: string;
  //       name: string;
  //     }[];
  //   }
  | {
      type: "construct";
      inflights: NodeInflight[];
    };

const getNodeType = (
  node: ConstructTreeNode,
  connections: ConnectionData[],
): NodeV2["type"] => {
  if (node.constructInfo?.fqn === "@winglang/sdk.cloud.Function") {
    return "function";
  }
  if (node.constructInfo?.fqn === "@winglang/sdk.std.AutoIdResource") {
    return "autoId";
  }
  // if (node.constructInfo?.fqn === "@winglang/sdk.cloud.Queue") {
  //   return "queue";
  // }
  // if (node.constructInfo?.fqn === "@winglang/sdk.cloud.Topic") {
  //   return "topic";
  // }
  if (
    (node.children ?? []).length === 0 ||
    connections.some(
      (connection) =>
        connection.source === node.path || connection.target === node.path,
    )
  ) {
    return "construct";
  }
  return "container";
};

const getNodeInflights = (
  node: ConstructTreeNode,
  connections: ConnectionData[],
): NodeInflight[] => {
  const inflights = new Array<string>();
  for (const connection of connections.filter(
    (connection) => connection.target === node.path,
  )) {
    inflights.push((connection as any).targetOp);
  }
  for (const connection of connections.filter(
    (connection) => connection.source === node.path,
  )) {
    inflights.push((connection as any).sourceOp);
  }
  return uniqBy(inflights, (inflight) => inflight).map((connection) => ({
    id: `${node.path}#${connection}`,
    name: connection,
    sourceOccupied: connections.some(
      (otherConnection) =>
        otherConnection.source === node.path &&
        otherConnection.name === connection,
    ),
    targetOccupied: connections.some(
      (otherConnection) =>
        otherConnection.target === node.path &&
        otherConnection.name === connection,
    ),
  }));
};

export interface UseMapOptionsV2 {
  // showTests: boolean;
}

export const useMapV2 = ({}: UseMapOptionsV2 = {}) => {
  const query = trpc["app.map.v2"].useQuery();
  const { tree, connections } = query.data ?? {};
  const nodeInfo = useMemo(() => {
    if (!tree || !connections) {
      return;
    }

    const nodeMap = new Map<string, NodeV2>();
    const processNode = (node: ConstructTreeNode) => {
      const nodeType = getNodeType(node, connections);
      const inflights = getNodeInflights(node, connections);
      console.log(node.path, nodeType, inflights);
      switch (nodeType) {
        case "container": {
          nodeMap.set(node.path, {
            type: nodeType,
            children: Object.values(node.children ?? {}).map((child) => {
              return child.path;
            }),
          });
          break;
        }
        case "autoId": {
          nodeMap.set(node.path, {
            type: nodeType,
          });
          break;
        }
        case "function": {
          nodeMap.set(node.path, {
            type: nodeType,
          });
          break;
        }
        // case "queue": {
        //   nodeMap.set(node.path, {
        //     type: nodeType,
        //   });
        //   break;
        // }
        // case "topic": {
        //   nodeMap.set(node.path, {
        //     type: nodeType,
        //   });
        //   break;
        // }
        default: {
          nodeMap.set(node.path, {
            type: "construct",
            inflights,
          });
        }
      }
      for (const child of Object.values(node.children ?? {})) {
        processNode(child);
      }
    };
    processNode(tree);
    return nodeMap;
  }, [tree, connections]);

  return {
    tree,
    connections,
    nodeInfo,
  };
};
