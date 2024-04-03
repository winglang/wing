import { test, expect } from "vitest";
import { listMessages } from "./util";
import * as cloud from "../../src/cloud";
import { Testing } from "../../src/simulator";
import { SimApp } from "../sim-app";

const INFLIGHT_CODE = `async handle() { console.log("super duper success"); }`;

test("create an OnDeploy", async () => {
  // GIVEN
  const app = new SimApp();
  const handler = Testing.makeHandler(INFLIGHT_CODE);
  new cloud.OnDeploy(app, "my_on_deploy", handler);
  const s = await app.startSimulator();

  // THEN
  expect(s.getResourceConfig("/my_on_deploy")).toEqual({
    attrs: {
      handle: expect.any(String),
    },
    deps: ["root/my_on_deploy/Function"],
    path: "root/my_on_deploy",
    addr: expect.any(String),
    props: {
      functionHandle: expect.any(String),
    },
    type: cloud.ON_DEPLOY_FQN,
  });

  await s.stop();
  expect(app.snapshot()).toMatchSnapshot();
  const messages = listMessages(s);
  expect(messages).toMatchSnapshot();
  expect(messages).toContain("super duper success");
});
