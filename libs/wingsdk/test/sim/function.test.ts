import * as cloud from "../../src/cloud";
import * as core from "../../src/core";
import { FunctionClient } from "../../src/sim/function.inflight";
import * as testing from "../../src/testing";
import { synthSimulatedApp } from "./util";

const INFLIGHT_CODE = core.NodeJsCode.fromInline(`
async function $proc($cap, event) {
  event = JSON.parse(event);
  let msg;
  if (process.env.PIG_LATIN) {
    msg = "Ellohay, " + event.name + "!";
  } else {
    msg = "Hello, " + event.name + "!";
  }
  return { msg };
}`);

test("invoke function", async () => {
  // GIVEN
  const appPath = synthSimulatedApp((scope) => {
    const handler = new core.Inflight({
      code: INFLIGHT_CODE,
      entrypoint: "$proc",
    });
    new cloud.Function(scope, "my_function", handler);
  });
  const s = new testing.Simulator({ appPath });
  await s.start();

  const attrs = s.getAttributes("root/my_function");
  const fnClient = new FunctionClient(attrs.functionAddr);

  // WHEN
  const PAYLOAD = { name: "Alice" };
  const response = await fnClient.invoke(JSON.stringify(PAYLOAD));

  // THEN
  expect(response).toEqual({ msg: `Hello, ${PAYLOAD.name}!` });
  await s.stop();
});

test("invoke function with environment variables", async () => {
  // GIVEN
  const appPath = synthSimulatedApp((scope) => {
    const handler = new core.Inflight({
      code: INFLIGHT_CODE,
      entrypoint: "$proc",
    });
    new cloud.Function(scope, "my_function", handler, {
      env: {
        PIG_LATIN: "true",
      },
    });
  });
  const s = new testing.Simulator({ appPath });
  await s.start();

  const attrs = s.getAttributes("root/my_function");
  const fnClient = new FunctionClient(attrs.functionAddr);

  // WHEN
  const PAYLOAD = { name: "Alice" };
  const response = await fnClient.invoke(JSON.stringify(PAYLOAD));

  // THEN
  expect(response).toEqual({
    msg: `Ellohay, ${PAYLOAD.name}!`,
  });
  await s.stop();
});
