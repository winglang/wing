import * as cloud from "../../src/cloud";
import * as core from "../../src/core";
import { SimApp, Simulator } from "../../src/testing";

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
      WING_SIM_INFLIGHT_RESOURCE_PATH: "root/my_function",
      WING_SIM_INFLIGHT_RESOURCE_TYPE: "wingsdk.cloud.Function",
    },
  });
  await s.stop();

  expect(s.tree).toMatchSnapshot();
});

test("invoke function succeeds", async () => {
  // GIVEN
  const app = new SimApp();
  const handler = new core.Inflight({
    code: INFLIGHT_CODE,
    entrypoint: "$proc",
  });
  new cloud.Function(app, "my_function", handler);

  const s = await app.startSimulator();

  const client = s.getResourceByPath(
    "root/my_function"
  ) as cloud.IFunctionClient;

  // WHEN
  const PAYLOAD = { name: "Alice" };
  const response = await client.invoke(JSON.stringify(PAYLOAD));

  // THEN
  expect(response).toEqual(JSON.stringify({ msg: `Hello, ${PAYLOAD.name}!` }));
  await s.stop();

  expect(s.tree).toMatchSnapshot();
  expect(listMessages(s)).toEqual([
    "wingsdk.cloud.Function created.",
    'Invoke (payload="{"name":"Alice"}").',
    "wingsdk.cloud.Function deleted.",
  ]);
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

  const client = s.getResourceByPath(
    "root/my_function"
  ) as cloud.IFunctionClient;

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

  expect(s.tree).toMatchSnapshot();
  expect(listMessages(s)).toEqual([
    "wingsdk.cloud.Function created.",
    'Invoke (payload="{"name":"Alice"}").',
    "wingsdk.cloud.Function deleted.",
  ]);
});

test("invoke function fails", async () => {
  // GIVEN
  const app = new SimApp();
  const handler = new core.Inflight({
    code: INFLIGHT_CODE,
    entrypoint: "$proc",
  });
  new cloud.Function(app, "my_function", handler);
  const s = await app.startSimulator();

  const client = s.getResourceByPath(
    "root/my_function"
  ) as cloud.IFunctionClient;

  // WHEN
  const PAYLOAD = { name: "alice" };
  await expect(client.invoke(JSON.stringify(PAYLOAD))).rejects.toThrow(
    "Name must start with uppercase letter"
  );

  // THEN
  await s.stop();

  expect(s.tree).toMatchSnapshot();
  expect(listMessages(s)).toEqual([
    "wingsdk.cloud.Function created.",
    'Invoke (payload="{"name":"alice"}").',
    "wingsdk.cloud.Function deleted.",
  ]);
  expect(s.listTraces()[1].data.error).toMatchObject({
    message: "Name must start with uppercase letter",
  });
});

function listMessages(s: Simulator) {
  return s.listTraces().map((event) => event.data.message);
}
