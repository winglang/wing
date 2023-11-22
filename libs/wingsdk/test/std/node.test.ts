import { expect, test } from "vitest";
import { SimApp } from "../sim-app";
import { Bucket, BucketInflightMethods } from "../../src/cloud";
import { IGetOrCreateFactory, Node } from "../../src/std";
import { Construct, IConstruct } from "constructs";

test("Node.of(scope).app returns the root app", () => {
  const app = new SimApp();

  const myBucket = new Bucket(app, "MyBucket");

  const a1 = Node.of(myBucket).app;

  expect(a1.node).toBe(app.node)
  expect(a1.workdir).toBe(app.workdir);
  expect(a1.isTestEnvironment).toBe(app.isTestEnvironment);
  expect(a1.entrypointDir).toBe(app.entrypointDir);

  // equivalence
  expect(Node.of(myBucket).root).toBe(a1);
  expect(Node.of(myBucket).app).toBe(a1);
});

test("tryFindChild(id) returns the child if it exists", () => {
  const app = new SimApp();
  const myBucket = new Bucket(app, "MyBucket");
  const child = app.tryFindChild("MyBucket");
  expect(child).toBe(myBucket);
});