import { Construct } from "constructs";
import { describe, expect, test } from "vitest";
import { AwsApp } from "./aws-util";
import { inflight } from "../../src/core";
import { Test } from "../../src/std";

const NOOP = inflight(async () => {});

describe("Single test", () => {
  class Root extends Construct {
    constructor(scope: Construct, id: string) {
      super(scope, id);
      new Test(this, "test:first test", NOOP, {});
    }
  }

  test("No function handlers should exist in a non test environment", () => {
    const app = new AwsApp({ rootConstruct: Root });

    //@ts-expect-error
    const testList = app._testRunner?.getTestFunctionArns() ?? new Map();
    expect([...testList.keys()]).toEqual([]);
  });

  test("A single function handler should exist in a test environment", () => {
    const app = new AwsApp({ isTestEnvironment: true, rootConstruct: Root });

    //@ts-expect-error
    const testList = app._testRunner?.getTestFunctionArns() ?? new Map();
    expect([...testList.keys()]).toEqual(["root/Default/env0/test:first test"]);
  });
});

describe("Multiple tests", () => {
  class Root extends Construct {
    constructor(scope: Construct, id: string) {
      super(scope, id);
      new Test(this, "test:first test", NOOP, {});
      new Test(this, "test:second test", NOOP, {});
      new Test(this, "test:third test", NOOP, {});
    }
  }

  test("Multiple function handlers should exist in a test environment", () => {
    const app = new AwsApp({ isTestEnvironment: true, rootConstruct: Root });

    //@ts-expect-error
    const testList = app._testRunner?.getTestFunctionArns() ?? new Map();
    expect([...testList.keys()]).toEqual([
      "root/Default/env0/test:first test",
      "root/Default/env1/test:second test",
      "root/Default/env2/test:third test",
    ]);
  });
});
