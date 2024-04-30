import uniqby from "lodash.uniqby";

export type Connection<T> = {
  source: T;
  target: T;
};

export type GetConnectionId<T> = (connection: Connection<T>) => string;
export type IsNodeHidden<T> = (node: T) => boolean;
export type GetNodeId<T> = (node: T) => string;

const resolveConnections = <T>(
  node: T,
  type: "source" | "target",
  allConnections: Connection<T>[],
  isNodeHidden: IsNodeHidden<T>,
  getNodeId: GetNodeId<T>,
): T[] => {
  if (!isNodeHidden(node)) {
    return [node];
  }

  const connections = allConnections.filter(
    (c) => getNodeId(c[type]) === getNodeId(node),
  );
  const invertedType = type === "source" ? "target" : "source";
  const nodes = uniqby(
    connections.map((connection) => connection[invertedType]),
    (node) => getNodeId(node),
  );

  return uniqby(
    nodes.flatMap((node) => {
      if (isNodeHidden(node)) {
        return resolveConnections(
          node,
          type,
          allConnections,
          isNodeHidden,
          getNodeId,
        );
      }
      return node;
    }),
    (node) => getNodeId(node),
  );
};

export interface BridgeConnectionsOptions<T> {
  connections: Connection<T>[];
  isNodeHidden: IsNodeHidden<T>;
  getNodeId: GetNodeId<T>;
  getConnectionId: GetConnectionId<T>;
}

export const bridgeConnections = <T>(options: BridgeConnectionsOptions<T>) => {
  return uniqby(
    options.connections.flatMap((connection) => {
      const sources = resolveConnections(
        connection.source,
        "target",
        options.connections,
        options.isNodeHidden,
        options.getNodeId,
      );
      const targets = resolveConnections(
        connection.target,
        "source",
        options.connections,
        options.isNodeHidden,
        options.getNodeId,
      );
      return uniqby(
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
