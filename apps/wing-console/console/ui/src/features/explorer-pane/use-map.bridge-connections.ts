import { uniqBy } from "@wingconsole/uniq-by";

export type Connection<T> = {
  source: T;
  target: T;
};

export type GetConnectionId<T> = (connection: Connection<T>) => string;
export type IsNodeHidden<T> = (node: T) => boolean;
export type GetNodeId<T> = (node: T) => string;
export type ResolveNode<T> = (node: T) => T | undefined;

const resolveConnections = <T>(
  node: T,
  type: "source" | "target",
  allConnections: Connection<T>[],
  isNodeHidden: IsNodeHidden<T>,
  getNodeId: GetNodeId<T>,
  resolveNode: ResolveNode<T>,
): T[] => {
  const resolvedNode = resolveNode(node);
  if (resolvedNode) {
    return [resolvedNode];
  }

  const connections = allConnections.filter(
    (c) => getNodeId(c[type]) === getNodeId(node),
  );
  const invertedType = type === "source" ? "target" : "source";
  const nodes = uniqBy(
    connections.map((connection) => connection[invertedType]),
    (node) => getNodeId(node),
  );

  return uniqBy(
    nodes.flatMap((node) => {
      return resolveConnections(
        node,
        type,
        allConnections,
        isNodeHidden,
        getNodeId,
        resolveNode,
      );
    }),
    (node) => getNodeId(node),
  );
};

export interface BridgeConnectionsOptions<T> {
  /**
   * A list of connections to bridge.
   */
  connections: Connection<T>[];

  /**
   * Returns whether a node is hidden.
   */
  isNodeHidden: IsNodeHidden<T>;

  /**
   * Returns a unique identifier for a node.
   */
  getNodeId: GetNodeId<T>;

  /**
   * Returns a unique identifier for a connection.
   */
  getConnectionId: GetConnectionId<T>;

  /**
   * Allows resolving a node to a different one.
   *
   * This is useful when a node is hidden and should be replaced by another one (e.g. a parent node).
   */
  resolveNode: ResolveNode<T>;
}

export const bridgeConnections = <T>(options: BridgeConnectionsOptions<T>) => {
  return uniqBy(
    options.connections.flatMap((connection) => {
      const sources = resolveConnections(
        connection.source,
        "target",
        options.connections,
        options.isNodeHidden,
        options.getNodeId,
        options.resolveNode,
      );
      const targets = resolveConnections(
        connection.target,
        "source",
        options.connections,
        options.isNodeHidden,
        options.getNodeId,
        options.resolveNode,
      );
      return uniqBy(
        sources.flatMap((source) => {
          return targets.map((target) => {
            return {
              source,
              target,
            };
          });
        }),
        options.getConnectionId,
      );
    }),
    options.getConnectionId,
  );
};
