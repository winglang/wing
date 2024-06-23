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
const getConnectionId: GetConnectionId<string> = (connection) =>
  `${connection.source}#${connection.target}`;
const resolveNode = (path: string) => {
  const parts = path.split("/");
  for (const [index, part] of Object.entries(parts)) {
    if (isNodeHidden(part)) {
      return parts.slice(0, Number(index)).join("/");
    }
  }
  return path;
};

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
      getConnectionId,
      resolveNode,
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
      getConnectionId,
      resolveNode,
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
      getConnectionId,
      resolveNode,
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
      getConnectionId,
      resolveNode,
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
      getConnectionId,
      resolveNode,
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
      getConnectionId,
      resolveNode,
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
      getConnectionId,
      resolveNode,
    }),
  ).toEqual([]);
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
      getConnectionId,
      resolveNode,
    }),
  ).toEqual([
    {
      source: "2",
      target: "4",
    },
  ]);
});

test("handles hidden leafs correctly", () => {
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
      resolveNode(node) {
        const path = resolveNode(node.path);
        if (!path) {
          return;
        }

        return {
          path,
        };
      },
    }),
  ).toEqual([
    {
      source: { path: "2" },
      target: { path: "4" },
    },
  ]);
});

test("upcasts connections", () => {
  const connections: Connection<string>[] = [
    {
      source: "1",
      target: "2/h3",
    },
  ];

  expect(
    bridgeConnections({
      connections,
      isNodeHidden,
      getNodeId,
      getConnectionId,
      resolveNode,
    }),
  ).toEqual([
    {
      source: "1",
      target: "2",
    },
  ]);
});

test("upcasts connections", () => {
  const connections: Connection<string>[] = [
    {
      source: "1",
      target: "2/h4/5/h6",
    },
    {
      source: "2/h3",
      target: "3",
    },
  ];

  expect(
    bridgeConnections({
      connections,
      isNodeHidden,
      getNodeId,
      getConnectionId,
      resolveNode,
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
  ]);
});
