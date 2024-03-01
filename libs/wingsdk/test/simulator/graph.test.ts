import { test, expect, describe } from "vitest";
import { Graph } from "../../src/simulator/graph";

test("empty", () => {
  const graph = new Graph([]);
  expect(graph.nodes.length).toBe(0);
});

test("two disconnected nodes", () => {
  const graph = new Graph([{ path: "a" }, { path: "b" }]);

  expect(graph.nodes.length).toBe(2);

  const a = graph.find("a");
  expect(a?.def).toStrictEqual({ path: "a" });
  expect(a?.dependencies).toStrictEqual([]);
  expect(a?.dependents).toStrictEqual([]);

  const b = graph.find("b");
  expect(b?.def).toStrictEqual({ path: "b" });
  expect(b?.dependencies).toStrictEqual([]);
  expect(b?.dependents).toStrictEqual([]);
});

test("explicit deps", () => {
  const graph = new Graph([{ path: "a", deps: ["b"] }, { path: "b" }]);

  const a = graph.find("a");
  expect(a?.dependencies.length).toBe(1);
  expect(a?.dependencies[0].def.path).toBe("b");

  const b = graph.find("b");
  expect(b?.dependents.length).toBe(1);
  expect(b?.dependents[0].def.path).toBe("a");
});

test("implicit deps", () => {
  const graph = new Graph([
    {
      path: "a",
      props: {
        foo: "${wsim#b#attrs.bar}",
        another: "i depend on: ${wsim#c/d/e#attrs.xxx}",
      },
    },
    { path: "b", props: { hello: ["bang", "${wsim#c/d/e#attrs.aaa}"] } },
    { path: "c/d/e" },
    { path: "d", props: { a: "${wsim#a#attrs.aaa}" }, deps: ["b"] },
  ]);

  const a = graph.find("a");
  expect(a?.dependencies.map((x) => x.def.path)).toStrictEqual(["b", "c/d/e"]);
  expect(a?.dependents.map((x) => x.def.path)).toStrictEqual(["d"]);

  const b = graph.find("b");
  expect(b?.dependencies.map((x) => x.def.path)).toStrictEqual(["c/d/e"]);
  expect(b?.dependents.map((x) => x.def.path)).toStrictEqual(["a", "d"]);

  const c = graph.find("c/d/e");
  expect(c?.dependencies.map((x) => x.def.path)).toStrictEqual([]);
  expect(c?.dependents.map((x) => x.def.path)).toStrictEqual(["a", "b"]);

  const d = graph.find("d");
  expect(d?.dependencies.map((x) => x.def.path)).toStrictEqual(["b", "a"]);
  expect(d?.dependents.map((x) => x.def.path)).toStrictEqual([]);
});

test("fails on a direct cyclic dependency", () => {
  expect(() => {
    new Graph([
      { path: "a", deps: ["b"] },
      { path: "b", deps: ["a"] },
    ]);
  }).toThrowError(/cyclic dependency detected: b -> a/);
});

test("fails on an indirect cyclic dependency", () => {
  expect(() => {
    new Graph([
      { path: "a", deps: ["b"] },
      { path: "b", deps: ["c"] },
      { path: "c", deps: ["a"] },
    ]);
  }).toThrowError(/cyclic dependency detected: c -> a/);
});

describe("depthFirst", () => {
  test("empty graph", () => {
    const graph = new Graph();
    expect(graph.toposort([])).toStrictEqual([]);
  });

  test("two disconnected nodes", () => {
    const graph = new Graph([{ path: "a" }, { path: "b" }]);
    expect(graph.toposort(["a", "b"])).toStrictEqual([["a", "b"]]);
  });

  test("two dependent nodes", () => {
    const graph = new Graph([{ path: "a", deps: ["b"] }, { path: "b" }]);
    expect(graph.toposort(["a", "b"])).toStrictEqual([["b"], ["a"]]);
  });

  test("two waves", () => {
    const graph = new Graph([
      { path: "a", deps: ["b", "c"] },
      { path: "b" },
      { path: "c" },
    ]);

    expect(graph.toposort(["a", "b", "c"])).toStrictEqual([["b", "c"], ["a"]]);
  });

  test("three waves", () => {
    const graph = new Graph([
      { path: "a", deps: ["b", "c"] },
      { path: "b" },
      { path: "c" },
      { path: "d", deps: ["c", "a"] },
      { path: "e", deps: ["a"] },
    ]);

    expect(graph.toposort(["a", "b", "c", "d", "e"])).toStrictEqual([
      ["b", "c"],
      ["a"],
      ["d", "e"],
    ]);
  });
});
