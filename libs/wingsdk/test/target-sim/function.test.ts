import { test, expect } from "vitest";
import { listMessages, treeJsonOf } from "./util";
import * as cloud from "../../src/cloud";
import { Testing } from "../../src/simulator";
import { Node } from "../../src/std";
import { SimApp } from "../sim-app";

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

const INFLIGHT_PANIC = `
async handle() {
  process.exit(1);
}`;

test("create a function", async () => {
  // GIVEN
  const app = new SimApp();
  const handler = Testing.makeHandler(INFLIGHT_CODE);
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
    addr: expect.any(String),
    policy: [],
    props: {
      sourceCodeFile: expect.any(String),
      sourceCodeLanguage: "javascript",
      environmentVariables: {
        ENV_VAR1: "true",
      },
      concurrency: 100,
      timeout: 60000,
    },
    type: cloud.FUNCTION_FQN,
  });
  await s.stop();

  expect(app.snapshot()).toMatchSnapshot();
});

test("invoke function succeeds", async () => {
  // GIVEN
  const app = new SimApp();
  const handler = Testing.makeHandler(INFLIGHT_CODE);
  new cloud.Function(app, "my_function", handler);

  const s = await app.startSimulator();

  const client = s.getResource("/my_function") as cloud.IFunctionClient;

  // WHEN
  const PAYLOAD = { name: "Alice" };
  const response = await client.invoke(JSON.stringify(PAYLOAD));

  // THEN
  expect(response).toEqual(JSON.stringify({ msg: `Hello, ${PAYLOAD.name}!` }));
  await s.stop();

  expect(listMessages(s)).toMatchSnapshot();
  expect(app.snapshot()).toMatchSnapshot();
});

test("async invoke function cleanup while running", async () => {
  // GIVEN
  const app = new SimApp();
  const handler = Testing.makeHandler(`
  async handle(event) {
    // sleep forever
    await new Promise(() => {});
  }`);
  new cloud.Function(app, "my_function", handler);

  const s = await app.startSimulator();

  const client = s.getResource("/my_function") as cloud.IFunctionClient;

  // WHEN
  await client.invokeAsync();

  // THEN
  await s.stop();

  // wait for a small time to let the child process fail to exit
  await new Promise((resolve) => setTimeout(resolve, 150));

  expect(s.listTraces().every((t) => t.data.error === undefined)).toBe(true);
}, 10000);

test("invoke function with environment variables", async () => {
  // GIVEN
  const app = new SimApp();
  const handler = Testing.makeHandler(INFLIGHT_CODE);
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

  expect(listMessages(s)).toMatchSnapshot();
  expect(app.snapshot()).toMatchSnapshot();
});

test("invoke function fails", async () => {
  // GIVEN
  const app = new SimApp();
  const handler = Testing.makeHandler(INFLIGHT_CODE);
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

  expect(listMessages(s)).toMatchSnapshot();
  expect(s.listTraces()[1].data.error).toMatchObject({
    message: "Name must start with uppercase letter",
  });
  expect(app.snapshot()).toMatchSnapshot();
});

test("function has no display hidden property", async () => {
  // GIVEN
  const app = new SimApp();
  const handler = Testing.makeHandler(INFLIGHT_CODE);
  new cloud.Function(app, "my_function", handler);

  const treeJson = treeJsonOf(app.synth());
  const func = app.node.tryFindChild("my_function") as cloud.Function;

  // THEN
  expect(Node.of(func).hidden).toBeUndefined();
  expect(treeJson.tree.children).toBeDefined();
  expect(treeJson.tree.children).not.toMatchObject({
    my_function: {
      display: {
        hidden: expect.any(Boolean),
      },
    },
  });
});

test("function has display title and description properties", async () => {
  // GIVEN
  const app = new SimApp();
  const handler = Testing.makeHandler(INFLIGHT_CODE);
  new cloud.Function(app, "my_function", handler);

  // WHEN
  const treeJson = treeJsonOf(app.synth());
  const func = app.node.tryFindChild("my_function") as cloud.Function;

  // THEN
  expect(Node.of(func).title).toBeDefined();
  expect(Node.of(func).description).toBeDefined();
  expect(treeJson.tree.children).toMatchObject({
    my_function: {
      display: {
        title: expect.any(String),
        description: expect.any(String),
      },
    },
  });
});

test("invoke function with process.exit(1)", async () => {
  // GIVEN
  const app = new SimApp();
  const handler = Testing.makeHandler(INFLIGHT_PANIC);
  new cloud.Function(app, "my_function", handler);
  const s = await app.startSimulator();
  const client = s.getResource("/my_function") as cloud.IFunctionClient;
  // WHEN
  const PAYLOAD = {};
  await expect(client.invoke(JSON.stringify(PAYLOAD))).rejects.toThrow(
    "Process exited with code 1, signal null"
  );
  // THEN
  await s.stop();
  expect(listMessages(s)).toMatchSnapshot();
  expect(s.listTraces()[1].data.error).toMatchObject({
    message: "Process exited with code 1, signal null",
  });
  expect(app.snapshot()).toMatchSnapshot();
});

test("runtime environment tests", async () => {
  const app = new SimApp();

  const urlSearchParamsFn = app.newCloudFunction(`
    const query = "q=URLUtils.searchParams&topic=api";
    const p = new URLSearchParams(query);
    return p.get("topic");
  `);

  // check that fetch is a function (we can't really make network calls here)
  const fetchFn = app.newCloudFunction(`
    return typeof fetch;
  `);

  const cryptoFn = app.newCloudFunction(`
    const c = require("crypto");
    return typeof c.createHash;
  `);

  // check that we can import ESM modules
  const esmModulesFn = app.newCloudFunction(`
    const { nanoid } = await import("nanoid");
    return nanoid();
  `);

  // THEN
  const s = await app.startSimulator();
  expect(await cryptoFn(s)).toEqual("function");
  expect(await urlSearchParamsFn(s)).toBe("api");
  expect(await fetchFn(s)).toEqual("function");
  expect(await esmModulesFn(s)).toHaveLength(21);

  await s.stop();
  expect(app.snapshot()).toMatchSnapshot();
});

test("__dirname and __filename cannot be used within inflight code", async () => {
  const app = new SimApp();
  const dirnameInvoker = app.newCloudFunction(`__dirname`);
  const filenameInvoker = app.newCloudFunction(`__filename`);

  const s = await app.startSimulator();

  await dirnameInvoker(s);
  await filenameInvoker(s);

  await s.stop();

  expect(
    listMessages(s).filter((m) =>
      m.includes(
        "Warning: __dirname and __filename cannot be used within bundled cloud functions."
      )
    )
  ).toHaveLength(2);
});
