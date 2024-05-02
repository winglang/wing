/* eslint-disable unicorn/consistent-function-scoping */
import { expect, test } from "vitest";

import type {
  Connection,
  GetNodeId,
  IsNodeHidden,
  GetConnectionId,
} from "./use-map.bridge-connections.js";
import { bridgeConnections } from "./use-map.bridge-connections.js";

const isNodeHidden: IsNodeHidden<string> = (path: string) =>
  path.startsWith("h");
const getNodeId: GetNodeId<string> = (path: string) => path;
const serializeConnection: GetConnectionId<string> = (connection) =>
  `${connection.source}#${connection.target}`;

test("happy path", () => {
  const connections: Connection<string>[] = [
    {
      source: "1",
      target: "2",
    },
  ];

  expect(
    bridgeConnections({
      connections,
      isNodeHidden,
      getNodeId,
      getConnectionId: serializeConnection,
    }),
  ).toEqual([
    {
      source: "1",
      target: "2",
    },
  ]);
});

test("creates one-level bridges", () => {
  const connections: Connection<string>[] = [
    {
      source: "1",
      target: "h2",
    },
    {
      source: "h2",
      target: "3",
    },
  ];

  expect(
    bridgeConnections({
      connections,
      isNodeHidden,
      getNodeId,
      getConnectionId: serializeConnection,
    }),
  ).toEqual([
    {
      source: "1",
      target: "3",
    },
  ]);
});

test("creates multi-level bridges", () => {
  const connections: Connection<string>[] = [
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

  expect(
    bridgeConnections({
      connections,
      isNodeHidden,
      getNodeId,
      getConnectionId: serializeConnection,
    }),
  ).toEqual([
    {
      source: "1",
      target: "4",
    },
  ]);
});

test("creates graph bridges", () => {
  const connections: Connection<string>[] = [
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

  expect(
    bridgeConnections({
      connections,
      isNodeHidden,
      getNodeId,
      getConnectionId: serializeConnection,
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
  const connections: Connection<string>[] = [
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

  expect(
    bridgeConnections({
      connections,
      isNodeHidden,
      getNodeId,
      getConnectionId: serializeConnection,
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
  const connections: Connection<string>[] = [
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

  expect(
    bridgeConnections({
      connections,
      isNodeHidden,
      getNodeId,
      getConnectionId: serializeConnection,
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

test("handles hidden leafs correctly", () => {
  const connections: Connection<string>[] = [
    {
      source: "h1",
      target: "2",
    },
    {
      source: "2",
      target: "h3",
    },
  ];

  expect(
    bridgeConnections({
      connections,
      isNodeHidden,
      getNodeId,
      getConnectionId: serializeConnection,
    }),
  ).toEqual([]);
});

test("handles hidden leafs correctly 2", () => {
  const connections: Connection<string>[] = [
    {
      source: "h1",
      target: "2",
    },
    {
      source: "2",
      target: "h3",
    },
    {
      source: "h3",
      target: "4",
    },
  ];

  expect(
    bridgeConnections({
      connections,
      isNodeHidden,
      getNodeId,
      getConnectionId: serializeConnection,
    }),
  ).toEqual([
    {
      source: "2",
      target: "4",
    },
  ]);
});

test("handles hidden leafs correctly 2", () => {
  const connections: Connection<{ path: string }>[] = [
    {
      source: { path: "h1" },
      target: { path: "2" },
    },
    {
      source: { path: "2" },
      target: { path: "h3" },
    },
    {
      source: { path: "h3" },
      target: { path: "4" },
    },
  ];

  expect(
    bridgeConnections({
      connections,
      isNodeHidden(node) {
        return node.path.startsWith("h");
      },
      getNodeId(node) {
        return node.path;
      },
      getConnectionId(connection) {
        return `${connection.source.path}#${connection.target.path}`;
      },
    }),
  ).toEqual([
    {
      source: { path: "2" },
      target: { path: "4" },
    },
  ]);
});
