import { Construct } from "constructs";
import { test, expect } from "vitest";
import { inflight } from "../../src/core";
import { Test } from "../../src/std";
import { SimApp } from "../sim-app";

const INFLIGHT_CODE = inflight(async () =>
  console.log("this test should pass!")
);

test("create a test", async () => {
  // GIVEN
  class Root extends Construct {
    constructor(scope: Construct, id: string) {
      super(scope, id);
      new Test(this, "test:my_test", INFLIGHT_CODE);
    }
  }
  const app = new SimApp({ isTestEnvironment: true, rootConstruct: Root });

  // THEN
  const s = await app.startSimulator();

  // for now, it just creates a cloud.Function
  expect(s.getResourceConfig("/env0/test:my_test/Handler")).toEqual({
    attrs: {
      handle: expect.any(String),
    },
    path: "root/env0/test:my_test/Handler",
    addr: expect.any(String),
    policy: [],
    props: {
      environmentVariables: {},
      sourceCodeFile: expect.any(String),
      sourceCodeLanguage: "javascript",
      timeout: 60000,
      concurrency: 100,
    },
    type: "@winglang/sdk.cloud.Function",
  });
  await s.stop();

  expect(app.snapshot()).toMatchSnapshot();
});
