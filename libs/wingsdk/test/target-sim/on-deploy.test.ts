import { test, expect } from "vitest";
import * as cloud from "../../src/cloud";
import { Testing } from "../../src/testing";
import { SimApp } from "../sim-app";

const INFLIGHT_CODE = `async handle() { console.log("Hello world!"); }`;

test("create an OnDeploy", async () => {
  // GIVEN
  const app = new SimApp();
  const handler = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);
  cloud.OnDeploy._newOnDeploy(app, "my_on_deploy", handler);
  const s = await app.startSimulator();

  // THEN
  expect(s.getResourceConfig("/my_on_deploy")).toEqual({
    attrs: {
      handle: expect.any(String),
    },
    path: "root/my_on_deploy",
    props: {
      functionHandle: expect.any(String),
    },
    type: "wingsdk.cloud.OnDeploy",
  });
  await s.stop();

  expect(app.snapshot()).toMatchSnapshot();
});
