import * as cloud from "../../src/cloud";
import * as core from "../../src/core";
import * as sim from "../../src/sim";
import { IFunctionClient } from "../../src/sim";
import * as testing from "../../src/testing";
import { mkdtemp } from "../../src/util";
import { simulatorJsonOf } from "./util";

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
  const app = new sim.App({ outdir: mkdtemp() });
  const handler = new core.Inflight({
    code: INFLIGHT_CODE,
    entrypoint: "$proc",
  });
  new cloud.Function(app, "my_function", handler, {
    env: {
      ENV_VAR1: "true",
    },
  });
  const simfile = app.synth();

  // THEN
  const s = new testing.Simulator({ simfile });
  await s.start();
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

  expect(simulatorJsonOf(simfile)).toMatchSnapshot();
});

test("invoke function", async () => {
  // GIVEN
  const app = new sim.App({ outdir: mkdtemp() });
  const handler = new core.Inflight({
    code: INFLIGHT_CODE,
    entrypoint: "$proc",
  });
  new cloud.Function(app, "my_function", handler);
  const simfile = app.synth();

  const s = new testing.Simulator({ simfile });
  await s.start();

  const client = s.getResourceByPath("root/my_function") as IFunctionClient;

  // WHEN
  const PAYLOAD = { name: "Alice" };
  const response = await client.invoke(JSON.stringify(PAYLOAD));

  // THEN
  expect(response).toEqual({ msg: `Hello, ${PAYLOAD.name}!` });
  await s.stop();

  expect(simulatorJsonOf(simfile)).toMatchSnapshot();
});

test("invoke function with environment variables", async () => {
  // GIVEN
  const app = new sim.App({ outdir: mkdtemp() });
  const handler = new core.Inflight({
    code: INFLIGHT_CODE,
    entrypoint: "$proc",
  });
  new cloud.Function(app, "my_function", handler, {
    env: {
      PIG_LATIN: "true",
    },
  });
  const simfile = app.synth();

  const s = new testing.Simulator({ simfile });
  await s.start();

  const client = s.getResourceByPath("root/my_function") as IFunctionClient;

  // WHEN
  const PAYLOAD = { name: "Alice" };
  const response = await client.invoke(JSON.stringify(PAYLOAD));

  // THEN
  expect(response).toEqual({
    msg: `Ellohay, ${PAYLOAD.name}!`,
  });
  await s.stop();

  expect(simulatorJsonOf(simfile)).toMatchSnapshot();
});
