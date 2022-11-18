import * as cloud from "../../src/cloud";
import * as core from "../../src/core";
import * as sim from "../../src/target-sim";
import * as testing from "../../src/testing";
import { mkdtemp } from "../../src/util";
import { simulatorJsonOf } from "./util";

const INFLIGHT_CODE = core.NodeJsCode.fromInline(`
async function $proc($cap, event) {
  event = JSON.parse(event);
  let msg;
  if (event.name[0] !== event.name[0].toUpperCase()) {
    throw new Error("Name must start with uppercase letter");
  }
  if (process.env.PIG_LATIN) {
    msg = "Ellohay, " + event.name + "!";
  } else {
    msg = "Hello, " + event.name + "!";
  }
  return JSON.stringify({ msg });
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
  expect(s.getAttributes("main/my_function")).toEqual({
    handle: expect.any(String),
  });
  expect(s.getProps("main/my_function")).toEqual({
    sourceCodeFile: expect.any(String),
    sourceCodeLanguage: "javascript",
    environmentVariables: {
      ENV_VAR1: "true",
    },
  });
  await s.stop();

  expect(simulatorJsonOf(simfile)).toMatchSnapshot();
});

test("invoke function succeeds", async () => {
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

  const client = s.getResource("main/my_function") as cloud.IFunctionClient;

  // WHEN
  const PAYLOAD = { name: "Alice" };
  const response = await client.invoke(JSON.stringify(PAYLOAD));

  // THEN
  expect(response).toEqual(JSON.stringify({ msg: `Hello, ${PAYLOAD.name}!` }));
  await s.stop();

  expect(listMessages(s)).toEqual([
    "wingsdk.cloud.Function created.",
    'Invoke (payload="{"name":"Alice"}").',
    "wingsdk.cloud.Function deleted.",
  ]);
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

  const client = s.getResource("main/my_function") as cloud.IFunctionClient;

  // WHEN
  const PAYLOAD = { name: "Alice" };
  const response = await client.invoke(JSON.stringify(PAYLOAD));

  // THEN
  expect(response).toEqual(
    JSON.stringify({
      msg: `Ellohay, ${PAYLOAD.name}!`,
    })
  );
  await s.stop();

  expect(listMessages(s)).toEqual([
    "wingsdk.cloud.Function created.",
    'Invoke (payload="{"name":"Alice"}").',
    "wingsdk.cloud.Function deleted.",
  ]);
  expect(simulatorJsonOf(simfile)).toMatchSnapshot();
});

test("invoke function fails", async () => {
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

  const client = s.getResource("main/my_function") as cloud.IFunctionClient;

  // WHEN
  const PAYLOAD = { name: "alice" };
  await expect(client.invoke(JSON.stringify(PAYLOAD))).rejects.toThrow(
    "Name must start with uppercase letter"
  );

  // THEN
  await s.stop();

  expect(listMessages(s)).toEqual([
    "wingsdk.cloud.Function created.",
    'Invoke (payload="{"name":"alice"}").',
    "wingsdk.cloud.Function deleted.",
  ]);
  expect(s.listTraces()[1].data.error).toMatchObject({
    message: "Name must start with uppercase letter",
  });
  expect(simulatorJsonOf(simfile)).toMatchSnapshot();
});

function listMessages(s: testing.Simulator) {
  return s.listTraces().map((event) => event.data.message);
}
