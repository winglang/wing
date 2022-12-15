import * as cloud from "../../src/cloud";
import { SimApp, Testing } from "../../src/testing";
import { listMessages } from "./util";

const INFLIGHT_CODE = `
async handle(event) {
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
}`;

test("create a function", async () => {
  // GIVEN
  const app = new SimApp();
  const handler = Testing.makeFunctionHandler(app, "Handler", INFLIGHT_CODE);
  new cloud.Function(app, "my_function", handler, {
    env: {
      ENV_VAR1: "true",
    },
  });

  // THEN
  const s = await app.startSimulator();
  expect(s.getResourceConfig("/my_function")).toEqual({
    attrs: {
      handle: expect.any(String),
    },
    path: "root/my_function",
    props: {
      sourceCodeFile: expect.any(String),
      sourceCodeLanguage: "javascript",
      environmentVariables: {
        ENV_VAR1: "true",
      },
    },
    type: "wingsdk.cloud.Function",
  });
  await s.stop();

  expect(app.snapshot()).toMatchSnapshot();
});

test("invoke function succeeds", async () => {
  // GIVEN
  const app = new SimApp();
  const handler = Testing.makeFunctionHandler(app, "Handler", INFLIGHT_CODE);
  new cloud.Function(app, "my_function", handler);

  const s = await app.startSimulator();

  const client = s.getResource("/my_function") as cloud.IFunctionClient;

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
  expect(app.snapshot()).toMatchSnapshot();
});

test("invoke function with environment variables", async () => {
  // GIVEN
  const app = new SimApp();
  const handler = Testing.makeFunctionHandler(app, "Handler", INFLIGHT_CODE);
  new cloud.Function(app, "my_function", handler, {
    env: {
      PIG_LATIN: "true",
    },
  });

  const s = await app.startSimulator();

  const client = s.getResource("/my_function") as cloud.IFunctionClient;

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
  expect(app.snapshot()).toMatchSnapshot();
});

test("invoke function fails", async () => {
  // GIVEN
  const app = new SimApp();
  const handler = Testing.makeFunctionHandler(app, "Handler", INFLIGHT_CODE);
  new cloud.Function(app, "my_function", handler);
  const s = await app.startSimulator();

  const client = s.getResource("/my_function") as cloud.IFunctionClient;

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
  expect(app.snapshot()).toMatchSnapshot();
});
