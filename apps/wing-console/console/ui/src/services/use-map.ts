import type { ConstructTreeNode } from "@winglang/sdk/lib/core/tree.js";
import type { ConnectionData } from "@winglang/sdk/lib/simulator/index.js";
import type { ElkExtendedEdge } from "elkjs";
import uniqBy from "lodash.uniqby";
import { useCallback, useEffect, useMemo } from "react";

import { trpc } from "./trpc.js";
import { bridgeConnections } from "./use-map.bridge-connections.js";

export type NodeInflight = {
  id: string;
  name: string;
  sourceOccupied?: boolean;
  targetOccupied?: boolean;
};

export type NodeV2 =
  | {
      type: "container";
      children: string[];
    }
  | {
      type: "autoId";
    }
  | {
      type: "function";
    }
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
  hasInflightConnections: boolean,
): NodeV2["type"] => {
  if (node.constructInfo?.fqn === "@winglang/sdk.cloud.Function") {
    return "function";
  }
  if (node.constructInfo?.fqn === "@winglang/sdk.std.AutoIdResource") {
    return "autoId";
  }
  if (node.constructInfo?.fqn === "@winglang/sdk.cloud.Schedule") {
    return "scheduler";
  }
  if (node.constructInfo?.fqn === "@winglang/sdk.cloud.Endpoint") {
    return "endpoint";
  }

  const hasVisibleChildren = Object.values(node.children ?? {}).some(
    (child) => !child.display?.hidden,
  );

  if (
    node.constructInfo?.fqn === "@winglang/sdk.cloud.Api" ||
    hasInflightConnections ||
    !hasVisibleChildren
  ) {
    return "construct";
  }

  return "container";
};

const getNodeInflights = (
  node: ConstructTreeNode,
  connections: {
    source: { id: string; operation: string | undefined };
    target: { id: string; operation: string | undefined };
  }[],
): NodeInflight[] => {
  const inflights = new Array<string>();
  for (const connection of connections.filter(
    (connection) => connection.target.id === node.path,
  )) {
    const targetOp = connection.target.operation;
    if (targetOp) {
      inflights.push(targetOp);
    }
  }
  for (const connection of connections.filter(
    (connection) => connection.source.id === node.path,
  )) {
    const sourceOp = connection.source.operation;
    if (sourceOp) {
      inflights.push(sourceOp);
    }
  }
  return uniqBy(inflights, (inflight) => inflight).map((connection) => ({
    id: `${node.path}#${connection}`,
    name: connection,
    sourceOccupied: connections.some(
      (otherConnection) =>
        otherConnection.source.id === node.path &&
        otherConnection.source.operation === connection,
    ),
    targetOccupied: connections.some(
      (otherConnection) =>
        otherConnection.target.id === node.path &&
        otherConnection.target.operation === connection,
    ),
  }));
};

export interface UseMapOptions {
  expandedItems: string[];
}

export const useMap = ({ expandedItems }: UseMapOptions) => {
  const query = trpc["app.map"].useQuery();
  const { tree: rawTree, connections: rawConnections } = query.data ?? {};

  const nodeFqns = useMemo(() => {
    if (!rawTree) {
      return;
    }

    const nodeTypes = new Map<string, string | undefined>();
    const processNode = (node: ConstructTreeNode) => {
      nodeTypes.set(node.path, node.constructInfo?.fqn);
      for (const child of Object.values(node.children ?? {})) {
        processNode(child);
      }
    };
    processNode(rawTree);
    return nodeTypes;
  }, [rawTree]);

  const nodeTypes = useMemo(() => {
    if (!rawTree) {
      return;
    }

    const nodeTypes = new Map<string, NodeV2["type"]>();
    const processNode = (node: ConstructTreeNode) => {
      nodeTypes.set(
        node.path,
        getNodeType(
          node,
          rawConnections?.some(
            (connection) =>
              connection.source === node.path ||
              connection.target === node.path,
          ) ?? false,
        ),
      );
      for (const child of Object.values(node.children ?? {})) {
        processNode(child);
      }
    };
    processNode(rawTree);
    return nodeTypes;
  }, [rawTree, rawConnections]);

  const hiddenMap = useMemo(() => {
    const hiddenMap = new Map<string, boolean>();
    const traverse = (node: ConstructTreeNode, forceHidden?: boolean) => {
      const hidden = forceHidden || node.display?.hidden || false;

      hiddenMap.set(node.path, hidden);

      const children = Object.values(node.children ?? {});
      const canBeExpanded =
        node.display?.collapsible !== false &&
        !!node.children &&
        children.some((child) => !child.display?.hidden);
      const collapsed = canBeExpanded && !expandedItems.includes(node.path);

      for (const child of children) {
        traverse(child, hidden || collapsed);
      }
    };
    const pseudoRoot = rawTree?.children?.["Default"];
    for (const child of Object.values(pseudoRoot?.children ?? {})) {
      traverse(child!);
    }
    return hiddenMap;
  }, [rawTree, expandedItems]);

  const isNodeHidden = useCallback(
    (path: string) => {
      const nodePath = path.match(/^(.+?)#/)?.[1] ?? path;
      return hiddenMap.get(nodePath) === true;
    },
    [hiddenMap],
  );

  const resolveNodePath = useCallback(
    (path: string) => {
      const parts = path.split("/");
      for (const [index, part] of Object.entries(parts)) {
        const path = parts.slice(0, Number(index) + 1).join("/");
        if (isNodeHidden(path)) {
          return parts.slice(0, Number(index)).join("/");
        }
      }
      return path;
    },
    [isNodeHidden],
  );

  const resolveNode = useCallback(
    (path: string) => {
      const nodePath = path.match(/^(.+?)#/)?.[1] ?? path;
      return resolveNodePath(nodePath);
    },
    [resolveNodePath],
  );

  const rootNodes = useMemo(() => {
    if (!rawTree) {
      return;
    }

    const children = rawTree?.children?.["Default"]?.children;
    return children ? (Object.values(children) as ConstructTreeNode[]) : [];
  }, [rawTree]);

  const connections = useMemo(() => {
    if (!rawConnections || !nodeFqns) {
      return;
    }

    return bridgeConnections({
      connections:
        rawConnections
          .map((connection) => {
            // Convert invokeAsync to invoke, since they
            // are the same to the map view.
            return {
              ...connection,
              sourceOp:
                connection.sourceOp === "invokeAsync"
                  ? "invoke"
                  : connection.sourceOp,
              targetOp:
                connection.targetOp === "invokeAsync"
                  ? "invoke"
                  : connection.targetOp,
            };
          })
          .filter((connection) => {
            return connection.source !== connection.target;
          })
          .map((connection) => {
            return {
              source: {
                id: connection.source,
                nodeFqn: nodeFqns.get(connection.source),
                operation: connection.sourceOp,
              },
              target: {
                id: connection.target,
                nodeFqn: nodeFqns.get(connection.target),
                operation: connection.targetOp,
              },
            };
          }) ?? [],
      isNodeHidden: (node) => isNodeHidden(node.id),
      getNodeId: (node) => node.id,
      getConnectionId: (connection) =>
        `${connection.source.id}#${connection.source.operation}##${connection.target.id}#${connection.target.operation}`,
      resolveNode: (node) => {
        const path = resolveNode(node.id);
        return {
          id: path,
          nodeFqn: nodeFqns.get(path),
          // Make the operation anonymous if the node is hidden.
          operation: path === node.id ? node.operation : undefined,
        };
      },
    })
      .filter((connection) => {
        // Filter connections that go to parents.
        return !connection.source.id.startsWith(`${connection.target.id}/`);
      })
      .filter((connection) => {
        // Filter connections that go to themselves.
        return connection.source.id !== connection.target.id;
      });
  }, [rawConnections, nodeFqns, isNodeHidden, resolveNode]);

  const getConnectionId = useCallback(
    (
      nodePath: string,
      nodeFqn: string | undefined,
      operation: string | undefined,
      type: "source" | "target",
    ) => {
      if (isNodeHidden(nodePath)) {
        return nodePath;
      }

      if (nodeFqn === "@winglang/sdk.cloud.Function") {
        return `${nodePath}##${type}`;
      }

      if (operation) {
        return `${nodePath}#${operation}#${type}`;
      }

      return `${nodePath}##${type}`;
    },
    [isNodeHidden],
  );

  const edges = useMemo<ElkExtendedEdge[]>(() => {
    return (
      connections?.map((connection) => {
        const source = getConnectionId(
          connection.source.id,
          connection.source.nodeFqn,
          connection.source.operation,
          "source",
        );
        const target = getConnectionId(
          connection.target.id,
          connection.target.nodeFqn,
          connection.target.operation,
          "target",
        );
        return {
          id: `${source}#${target}`,
          sources: [source],
          targets: [target],
        };
      }) ?? []
    );
  }, [connections, getConnectionId]);

  const nodeInfo = useMemo(() => {
    if (!rawTree || !rawConnections) {
      return;
    }

    const nodeMap = new Map<string, NodeV2>();
    const processNode = (node: ConstructTreeNode) => {
      const nodeType = getNodeType(
        node,
        connections?.some(
          (connection) =>
            connection.source.id === node.path ||
            connection.target.id === node.path,
        ) ?? false,
      );
      const inflights = getNodeInflights(node, connections ?? []);
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
  }, [rawTree, rawConnections, connections]);

  return {
    rawTree,
    rawConnections,
    nodeInfo,
    nodeTypes,
    rootNodes,
    connections,
    isNodeHidden,
    edges,
  };
};
