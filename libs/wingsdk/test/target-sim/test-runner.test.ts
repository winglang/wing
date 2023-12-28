import { Construct } from "constructs";
import { describe, expect, test } from "vitest";
import { Testing } from "../../src/simulator";
import { Test } from "../../src/std";
import { SimApp } from "../sim-app";

describe("Single test", () => {
  class Root extends Construct {
    constructor(scope: Construct, id: string) {
      super(scope, id);
      const handler = Testing.makeHandler("");
      new Test(this, "test:first test", handler, {});
    }
  }

  test("No function handlers should exist in a non test environment", () => {
    const app = new SimApp({
      isTestEnvironment: false,
      rootConstruct: Root,
    });

    //@ts-expect-error
    const testList = app._testRunner?.getTestFunctionHandles() ?? {};
    expect(Object.keys(testList)).toEqual([]);
  });

  test("A single function handler should exist in a test environment", () => {
    const app = new SimApp({ isTestEnvironment: true, rootConstruct: Root });

    //@ts-expect-error
    const testList = app._testRunner?.getTestFunctionHandles() ?? {};
    expect(Object.keys(testList)).toEqual(["root/env0/test:first test"]);
  });
});

describe("Multiple tests", () => {
  class Root extends Construct {
    constructor(scope: Construct, id: string) {
      super(scope, id);
      const handler = Testing.makeHandler("");
      new Test(this, "test:first test", handler, {});
      new Test(this, "test:second test", handler, {});
      new Test(this, "test:third test", handler, {});
    }
  }

  test("Multiple function handlers should exist in a test environment", () => {
    const app = new SimApp({ isTestEnvironment: true, rootConstruct: Root });

    //@ts-expect-error
    const testList = app._testRunner?.getTestFunctionHandles() ?? {};
    expect(Object.keys(testList)).toEqual([
      "root/env0/test:first test",
      "root/env1/test:second test",
      "root/env2/test:third test",
    ]);
  });
});
