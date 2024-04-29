import uniqby from "lodash.uniqby";

export type Connection = {
  source: string;
  target: string;
};

const filterUniqueConnections = (connections: Connection[]) =>
  uniqby(connections, (connection) => {
    return `${connection.source}#${connection.target}`;
  });

const resolveConnections = (
  path: string,
  type: "source" | "target",
  allConnections: Connection[],
  isNodeHidden: (path: string) => boolean,
): string[] => {
  if (!isNodeHidden(path)) {
    return [path];
  }

  const connections = allConnections.filter((c) => c[type] === path);
  const invertedType = type === "source" ? "target" : "source";
  const paths = uniqby(
    connections.map((connection) => connection[invertedType]),
    (path) => path,
  );

  return uniqby(
    paths.flatMap((path) => {
      if (isNodeHidden(path)) {
        return resolveConnections(path, type, allConnections, isNodeHidden);
      }
      return path;
    }),
    (path) => path,
  );
};

export interface BridgeConnectionsOptions {
  connections: Connection[];
  isNodeHidden: (path: string) => boolean;
}

export const bridgeConnections = (options: BridgeConnectionsOptions) => {
  return filterUniqueConnections(
    options.connections.flatMap((connection) => {
      const sources = resolveConnections(
        connection.source,
        "target",
        options.connections,
        options.isNodeHidden,
      );
      const targets = resolveConnections(
        connection.target,
        "source",
        options.connections,
        options.isNodeHidden,
      );
      return filterUniqueConnections(
        sources.flatMap((source) => {
          return targets.map((target) => {
            return {
              source,
              target,
            };
          });
        }),
      );
    }),
  );
};
