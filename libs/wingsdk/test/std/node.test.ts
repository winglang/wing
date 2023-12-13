import { Construct } from "constructs";
import { expect, test } from "vitest";
import { Bucket } from "../../src/cloud";
import { Node } from "../../src/std";
import { SimApp } from "../sim-app";

test("Node.of(scope).app returns the root app", () => {
  const app = new SimApp();

  const myBucket = new Bucket(app, "MyBucket");

  const a1 = Node.of(myBucket).app;

  expect(a1.node).toBe(app.node);
  expect(a1.workdir).toBe(app.workdir);
  expect(a1.isTestEnvironment).toBe(app.isTestEnvironment);
  expect(a1.entrypointDir).toBe(app.entrypointDir);

  // equivalence
  expect(Node.of(myBucket).root).toBe(a1);
  expect(Node.of(myBucket).app).toBe(a1);
});

test("Node.of(scope).root returns the first root found in the tree", () => {
  const app = new SimApp();

  // this is the setup we have in synthRoots
  class Root extends Construct {}
  Node._markRoot(Root);

  const root = new Root(app, "MyRoot");

  const myBucket = new Bucket(root, "MyBucket");

  const theRoot = Node.of(myBucket).root;
  expect(theRoot).toBe(root);
});
