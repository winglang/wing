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

const uniq = (connections: Connection[]) =>
  uniqby(connections, (connection) => {
    return `${connection.source}#${connection.target}`;
  });

const bridgeConnections = (options: BridgeConnectionsOptions) => {
  return uniq(
    options.connections.flatMap((connection) => {
      if (options.isNodeHidden(connection.source)) {
        return options.connections
          .filter((c) => c.target === connection.source)
          .map((c) => ({
            source: c.source,
            target: connection.target,
          }));
      }
      if (options.isNodeHidden(connection.target)) {
        return options.connections
          .filter((c) => c.source === connection.target)
          .map((c) => ({
            source: connection.source,
            target: c.target,
          }));
      }
      return connection;
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
