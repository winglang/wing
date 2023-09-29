import { test, expect } from "vitest";
import { listMessages } from "./util";
import * as cloud from "../../src/cloud";
import { Testing } from "../../src/simulator";
import { SimApp } from "../sim-app";

const INFLIGHT_CODE = `async handle() { console.log("super duper success"); }`;

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
  const messages = listMessages(s);
  expect(messages).toMatchSnapshot();
  expect(messages).toContain("super duper success");
});
