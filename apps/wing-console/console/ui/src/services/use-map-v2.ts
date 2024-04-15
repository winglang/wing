import type { ConstructTreeNode } from "@winglang/sdk/lib/core/tree.js";
import type { ConnectionData } from "@winglang/sdk/lib/simulator/index.js";
import uniqBy from "lodash.uniqby";
import { useMemo } from "react";

import { trpc } from "./trpc.js";

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
      inflights: {
        id: string;
        name: string;
      }[];
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
            inflights: uniqBy(
              connections.filter(
                (connection) => connection.target === node.path,
              ),
              (connection) => connection.name,
            ).map((connection) => ({
              id: `${connection.target}#${connection.name}`,
              name: connection.name,
            })),
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
