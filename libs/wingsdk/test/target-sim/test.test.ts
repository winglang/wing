import { test, expect } from "vitest";
import { Testing } from "../../src/testing";
import { SimApp } from "../sim-app";
import { Test } from "../../src/std";

const INFLIGHT_CODE = `
async handle(event) {
  console.log("this test should pass!");
}`;

test("create a test", async () => {
  // GIVEN
  const app = new SimApp();
  const handler = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);
  new Test(app, "test:my_test", handler);

  // THEN
  const s = await app.startSimulator();

  // for now, it just creates a cloud.Function
  expect(s.getResourceConfig("/test:my_test/Handler")).toEqual({
    attrs: {
      handle: expect.any(String),
    },
    path: "root/test:my_test/Handler",
    props: {
      environmentVariables: {},
      sourceCodeFile: expect.any(String),
      sourceCodeLanguage: "javascript",
      timeout: 60000,
    },
    type: "wingsdk.cloud.Function",
  });
  await s.stop();

  expect(app.snapshot()).toMatchSnapshot();
});
