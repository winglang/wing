import * as cloud from "../../src/cloud";
import * as core from "../../src/core";
import * as sim from "../../src/sim";
import { IFunctionClient } from "../../src/sim";
import * as testing from "../../src/testing";
import { mkdtemp } from "../../src/util";
import { SimApp, simulatorJsonOf } from "./util";

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

test("create a function", async () => {
  // GIVEN
  const app = new SimApp();
  const handler = new core.Inflight({
    code: INFLIGHT_CODE,
    entrypoint: "$proc",
  });
  new cloud.Function(app, "my_function", handler, {
    env: {
      ENV_VAR1: "true",
    },
  });

  // THEN
  const s = await app.startSimulator();
  expect(s.getAttributes("root/my_function")).toEqual({
    handle: expect.any(String),
  });
  expect(s.getProps("root/my_function")).toEqual({
    sourceCodeFile: expect.any(String),
    sourceCodeLanguage: "javascript",
    environmentVariables: {
      ENV_VAR1: "true",
      WING_SIM_RUNTIME_FUNCTION_PATH: "root/my_function",
    },
  });
  await s.stop();

  expect(simulatorJsonOf(s.simfile)).toMatchSnapshot();
});

test("invoke function", async () => {
  // GIVEN
  const app = new SimApp();
  const handler = new core.Inflight({
    code: INFLIGHT_CODE,
    entrypoint: "$proc",
  });
  new cloud.Function(app, "my_function", handler);

  const s = await app.startSimulator();

  const client = s.getResourceByPath("root/my_function") as IFunctionClient;

  // WHEN
  const PAYLOAD = { name: "Alice" };
  const response = await client.invoke(JSON.stringify(PAYLOAD));

  // THEN
  expect(response).toEqual({ msg: `Hello, ${PAYLOAD.name}!` });
  await s.stop();

  expect(simulatorJsonOf(s.simfile)).toMatchSnapshot();
});

test("invoke function with environment variables", async () => {
  // GIVEN
  const app = new SimApp();
  const handler = new core.Inflight({
    code: INFLIGHT_CODE,
    entrypoint: "$proc",
  });
  new cloud.Function(app, "my_function", handler, {
    env: {
      PIG_LATIN: "true",
    },
  });

  const s = await app.startSimulator();

  const client = s.getResourceByPath("root/my_function") as IFunctionClient;

  // WHEN
  const PAYLOAD = { name: "Alice" };
  const response = await client.invoke(JSON.stringify(PAYLOAD));

  // THEN
  expect(response).toEqual({
    msg: `Ellohay, ${PAYLOAD.name}!`,
  });
  await s.stop();

  expect(simulatorJsonOf(s.simfile)).toMatchSnapshot();
});
