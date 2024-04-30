/* eslint-disable unicorn/consistent-function-scoping */
import { expect, test } from "vitest";

import type { Connection } from "./use-map-v2.bridge-connections.js";
import { bridgeConnections } from "./use-map-v2.bridge-connections.js";

const isNodeHidden = (path: string) => path.startsWith("h");

test("happy path", () => {
  const connections: Connection[] = [
    {
      source: "1",
      target: "2",
    },
  ];

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

test("handles hidden leafs correctly", () => {
  const connections: Connection[] = [
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
    }),
  ).toEqual([]);
});

test("handles hidden leafs correctly 2", () => {
  const connections: Connection[] = [
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
    }),
  ).toEqual([
    {
      source: "2",
      target: "4",
    },
  ]);
});

test("xxx", () => {
  const connections: Connection[] = [
    {
      source: "hroot/Default/$Closure1_0#handle#source",
      target: "root/Default/Counter#inc#target",
    },
    {
      source: "root/Default/IncrementCounter#invoke#source",
      target: "hroot/Default/$Closure1_0#handle#target",
    },
    {
      source: "root/Default/IncrementCounter#invoke#source",
      target: "hroot/Default/$Closure1_0#handle#target",
    },
  ];

  expect(
    bridgeConnections({
      connections,
      isNodeHidden,
    }),
  ).toEqual([
    {
      source: "2",
      target: "4",
    },
  ]);
});
