import type { ConstructTreeNode } from "@winglang/sdk/lib/core/tree.js";
import type { ConnectionData } from "@winglang/sdk/lib/simulator/index.js";
import type { ElkExtendedEdge } from "elkjs";
import uniqBy from "lodash.uniqby";
import { useCallback, useEffect, useMemo } from "react";

import { trpc } from "./trpc.js";
import { bridgeConnections } from "./use-map-v2.bridge-connections.js";

export type ConnectionDataV2 = {
  /** The path of the source construct. */
  readonly source: string;
  /** The path of the target construct. */
  readonly target: string;

  readonly sourceOp?: string;
  readonly targetOp?: string;

  /** A name for the connection. */
  readonly name: string;
};

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
      type: "scheduler";
    }
  | {
      type: "endpoint";
    }
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
  if (node.constructInfo?.fqn === "@winglang/sdk.cloud.Schedule") {
    return "scheduler";
  }
  if (node.constructInfo?.fqn === "@winglang/sdk.cloud.Endpoint") {
    return "endpoint";
  }
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
  connections: ConnectionDataV2[],
): NodeInflight[] => {
  const inflights = new Array<string>();
  for (const connection of connections.filter(
    (connection) => connection.target === node.path,
  )) {
    const targetOp = connection.targetOp;
    if (targetOp) {
      inflights.push(targetOp);
    }
  }
  for (const connection of connections.filter(
    (connection) => connection.source === node.path,
  )) {
    const sourceOp = connection.sourceOp;
    if (sourceOp) {
      inflights.push(sourceOp);
    }
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
  const { tree: rawTree, connections: incorrectlyTypedConnections } =
    query.data ?? {};
  const rawConnections = incorrectlyTypedConnections as
    | ConnectionDataV2[]
    | undefined;
  const nodeInfo = useMemo(() => {
    if (!rawTree || !rawConnections) {
      return;
    }

    const nodeMap = new Map<string, NodeV2>();
    const processNode = (node: ConstructTreeNode) => {
      const nodeType = getNodeType(node, rawConnections);
      const inflights = getNodeInflights(node, rawConnections);
      // console.log(node.path, nodeType, inflights);
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
        // case "endpoint": {
        //   nodeMap.set(node.path, {
        //     type: nodeType,
        //   });
        //   break;
        // }
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
    processNode(rawTree);
    return nodeMap;
  }, [rawTree, rawConnections]);

  const hiddenMap = useMemo(() => {
    const hiddenMap = new Map<string, boolean>();
    const traverse = (node: ConstructTreeNode, forceHidden?: boolean) => {
      const hidden = forceHidden || node.display?.hidden || false;
      hiddenMap.set(node.path, hidden);
      for (const child of Object.values(node.children ?? {})) {
        traverse(child, hidden);
      }
    };
    const pseudoRoot = rawTree?.children?.["Default"];
    for (const child of Object.values(pseudoRoot?.children ?? {})) {
      traverse(child!);
    }
    return hiddenMap;
  }, [rawTree]);

  const isNodeHidden = useCallback(
    (path: string) => {
      const nodePath = path.match(/^(.+?)#/)?.[1] ?? path;
      return hiddenMap.get(nodePath) === true;
    },
    [hiddenMap],
  );

  const rootNodes = useMemo(() => {
    const children = rawTree?.children?.["Default"]?.children;
    return children
      ? (Object.values(children) as ConstructTreeNode[])
      : undefined;
  }, [rawTree]);

  const connections = useMemo(() => {
    if (!rawConnections || !nodeInfo) {
      return;
    }

    return bridgeConnections({
      connections: (
        rawConnections.map((connection) => {
          return {
            source: {
              id: connection.source,
              nodeType: nodeInfo.get(connection.source)?.type,
              operation: connection.sourceOp,
            },
            target: {
              id: connection.target,
              nodeType: nodeInfo.get(connection.target)?.type,
              operation: connection.targetOp,
            },
          };
        }) ?? []
      ).filter((connection) => {
        return !(
          connection.source.nodeType === "function" &&
          connection.source.operation === "invokeAsync"
        );
      }),
      isNodeHidden: (node) => isNodeHidden(node.id),
      getNodeId: (node) => node.id,
      getConnectionId: (connection) =>
        `${connection.source.id}#${connection.source.operation}##${connection.target.id}#${connection.target.operation}`,
    });
  }, [rawConnections, nodeInfo, isNodeHidden]);

  const getConnectionId = useCallback(
    (
      nodePath: string,
      nodeType: string | undefined,
      operation: string | undefined,
      type: "source" | "target",
    ) => {
      if (isNodeHidden(nodePath)) {
        return nodePath;
      }

      if (nodeType === "function") {
        // Ignore `invokeAsync`.
        return `${nodePath}#invoke#${type}`;
      }

      if (nodeType === "autoId") {
        // return nodePath;
        return `${nodePath}#${type}`;
      }

      if (operation) {
        return `${nodePath}#${operation}#${type}`;
      }

      return `${nodePath}#${type}`;
      // return `${nodePath}#${(connection as any)[`${type}Op`]}#${type}#${
      //   1 + Math.floor(Math.random() * 3)
      // }`;
    },
    [isNodeHidden],
  );

  const edges = useMemo<ElkExtendedEdge[]>(() => {
    return (
      connections?.map((connection) => {
        const source = getConnectionId(
          connection.source.id,
          connection.source.nodeType,
          connection.source.operation,
          "source",
        );
        const target = getConnectionId(
          connection.target.id,
          connection.target.nodeType,
          connection.target.operation,
          "target",
        );
        return {
          id: `${source}##${target}`,
          sources: [source],
          targets: [target],
        };
      }) ?? []
    );
  }, [connections, getConnectionId]);

  return {
    rawTree,
    rawConnections,
    nodeInfo,
    rootNodes,
    connections,
    isNodeHidden,
    edges,
  };
};
