import { Node, IConstruct, Construct } from "constructs";
import { test, expect } from "vitest";
import { DependencyGraph } from "../../src/core/dependency";

test("topology returns correct order", () => {
  const root = new Construct(undefined as any, "App");
  const group = new Construct(root, "chart1");

  const obj1 = new Construct(group, "obj1");
  const obj2 = new Construct(group, "obj2");
  const obj3 = new Construct(group, "obj3");

  Node.of(obj1).addDependency(obj2);
  Node.of(obj2).addDependency(obj3);

  const graph = new DependencyGraph(Node.of(group));

  expect(graph.topology()).toEqual([group, obj3, obj2, obj1]);
});

test("cycle detection", () => {
  const root = new Construct(undefined as any, "App");
  const group = new Construct(root, "chart1");

  const obj1 = new Construct(group, "obj1");
  const obj2 = new Construct(group, "obj2");
  const obj3 = new Construct(group, "obj3");

  Node.of(obj1).addDependency(obj2);
  Node.of(obj2).addDependency(obj3);
  Node.of(obj3).addDependency(obj1);

  expect(() => {
    new DependencyGraph(Node.of(group));
  }).toThrowError(
    `Dependency cycle detected: ${Node.of(obj1).path} => ${
      Node.of(obj2).path
    } => ${Node.of(obj3).path} => ${Node.of(obj1).path}`,
  );
});

test("value of root is null", () => {
  const root = new Construct(undefined as any, "App");
  const group = new Construct(root, "chart1");

  const obj1 = new Construct(group, "obj1");
  const obj2 = new Construct(group, "obj2");
  const obj3 = new Construct(group, "obj3");

  Node.of(obj1).addDependency(obj2);
  Node.of(obj2).addDependency(obj3);

  expect(new DependencyGraph(Node.of(group)).root.value).toBeUndefined();
});

test("children of root contains all orphans", () => {
  const root = new Construct(undefined as any, "App");
  const group = new Construct(root, "chart1");

  const obj1 = new Construct(group, "obj1");
  const obj2 = new Construct(group, "obj2");

  Node.of(obj1).addDependency(obj2);

  const expected = new Set<IConstruct>();

  new DependencyGraph(Node.of(group)).root.outbound.forEach((c) =>
    expected.add(c.value!),
  );

  // chart1 and obj1 are orphans because no one depends on them (no parents)
  // they should be dependency roots, i.e chidren of the dummy root.
  expect(expected).toEqual(new Set<IConstruct>([group, obj1]));
});

test("ignores cross-scope nodes", () => {
  const root = new Construct(undefined as any, "App");
  const group1 = new Construct(root, "group1");
  const group2 = new Construct(root, "group2");

  const obj1 = new Construct(group1, "obj1");
  const obj2 = new Construct(group1, "obj2");
  const obj3 = new Construct(group2, "obj3");

  Node.of(obj1).addDependency(obj2);

  // this is a cross-scope dependency since 'obj2' is
  // not inside the scope of 'chart1'
  Node.of(obj2).addDependency(obj3);

  // we expect obj3 to not be part of the graph
  const graph = new DependencyGraph(Node.of(group1));

  expect(graph.topology()).toEqual([group1, obj2, obj1]);
});
