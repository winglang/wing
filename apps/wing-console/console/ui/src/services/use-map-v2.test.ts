/* eslint-disable unicorn/consistent-function-scoping */
import uniqby from "lodash.uniqby";
import { expect, test } from "vitest";

type Connection = {
  source: string;
  target: string;
};

interface BridgeConnectionsOptions {
  connections: Connection[];
  isNodeHidden: (path: string) => boolean;
}

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

const bridgeConnections = (options: BridgeConnectionsOptions) => {
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

test("happy path", () => {
  const connections: Connection[] = [
    {
      source: "1",
      target: "2",
    },
  ];
  const isNodeHidden = (path: string) => false;

  expect(
    bridgeConnections({
      connections,
      isNodeHidden,
    }),
  ).toEqual([
    {
      source: "1",
      target: "2",
    },
  ]);
});

test("creates one-level bridges", () => {
  const connections: Connection[] = [
    {
      source: "1",
      target: "h2",
    },
    {
      source: "h2",
      target: "3",
    },
  ];
  const isNodeHidden = (path: string) => path.startsWith("h");

  expect(
    bridgeConnections({
      connections,
      isNodeHidden,
    }),
  ).toEqual([
    {
      source: "1",
      target: "3",
    },
  ]);
});

test("creates multi-level bridges", () => {
  const connections: Connection[] = [
    {
      source: "1",
      target: "h2",
    },
    {
      source: "h2",
      target: "h3",
    },
    {
      source: "h3",
      target: "4",
    },
  ];
  const isNodeHidden = (path: string) => path.startsWith("h");

  expect(
    bridgeConnections({
      connections,
      isNodeHidden,
    }),
  ).toEqual([
    {
      source: "1",
      target: "4",
    },
  ]);
});

test("creates graph bridges", () => {
  const connections: Connection[] = [
    {
      source: "1",
      target: "h1",
    },
    {
      source: "2",
      target: "h1",
    },
    {
      source: "h1",
      target: "h2",
    },
    {
      source: "3",
      target: "h2",
    },
    {
      source: "h2",
      target: "h3",
    },
    {
      source: "h3",
      target: "4",
    },
    {
      source: "h3",
      target: "5",
    },
    {
      source: "h2",
      target: "6",
    },
  ];
  const isNodeHidden = (path: string) => path.startsWith("h");

  expect(
    bridgeConnections({
      connections,
      isNodeHidden,
    }),
  ).toEqual([
    {
      source: "1",
      target: "4",
    },
    {
      source: "1",
      target: "5",
    },
    {
      source: "1",
      target: "6",
    },
    {
      source: "2",
      target: "4",
    },
    {
      source: "2",
      target: "5",
    },
    {
      source: "2",
      target: "6",
    },
    {
      source: "3",
      target: "4",
    },
    {
      source: "3",
      target: "5",
    },
    {
      source: "3",
      target: "6",
    },
  ]);
});

test("handles cyclic graph correctly", () => {
  const connections: Connection[] = [
    {
      source: "1",
      target: "2",
    },
    {
      source: "2",
      target: "3",
    },
    {
      source: "3",
      target: "1",
    },
  ];
  const isNodeHidden = (path: string) => path.startsWith("h");

  expect(
    bridgeConnections({
      connections,
      isNodeHidden,
    }),
  ).toEqual([
    {
      source: "1",
      target: "2",
    },
    {
      source: "2",
      target: "3",
    },
    {
      source: "3",
      target: "1",
    },
  ]);
});

test("handles cyclic graph with hidden nodes correctly", () => {
  const connections: Connection[] = [
    {
      source: "1",
      target: "h2",
    },
    {
      source: "h2",
      target: "3",
    },
    {
      source: "3",
      target: "1",
    },
  ];
  const isNodeHidden = (path: string) => path.startsWith("h");

  expect(
    bridgeConnections({
      connections,
      isNodeHidden,
    }),
  ).toEqual([
    {
      source: "1",
      target: "3",
    },
    {
      source: "3",
      target: "1",
    },
  ]);
});
