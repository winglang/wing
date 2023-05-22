import { test, expect } from "vitest";
import { listMessages, treeJsonOf } from "./util";
import * as cloud from "../../src/cloud";
import { Simulator, Testing } from "../../src/testing";
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
  const handler = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);
  cloud.Function._newFunction(app, "my_function", handler, {
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
      timeout: 60000,
    },
    type: "wingsdk.cloud.Function",
  });
  await s.stop();

  expect(app.snapshot()).toMatchSnapshot();
});

test("invoke function succeeds", async () => {
  // GIVEN
  const app = new SimApp();
  const handler = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);
  cloud.Function._newFunction(app, "my_function", handler);

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

test("invoke function with environment variables", async () => {
  // GIVEN
  const app = new SimApp();
  const handler = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);
  cloud.Function._newFunction(app, "my_function", handler, {
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
  const handler = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);
  cloud.Function._newFunction(app, "my_function", handler);
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
  expect(s.listTraces()[2].data.error).toMatchObject({
    message: "Name must start with uppercase letter",
  });
  expect(app.snapshot()).toMatchSnapshot();
});

test("function has no display hidden property", async () => {
  // GIVEN
  const app = new SimApp();
  const handler = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);
  cloud.Function._newFunction(app, "my_function", handler);

  const treeJson = treeJsonOf(app.synth());
  const func = app.node.tryFindChild("my_function") as cloud.Function;

  // THEN
  expect(func.display.hidden).toBeUndefined();
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
  const handler = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);
  cloud.Function._newFunction(app, "my_function", handler);

  // WHEN
  const treeJson = treeJsonOf(app.synth());
  const func = app.node.tryFindChild("my_function") as cloud.Function;

  // THEN
  expect(func.display.title).toBeDefined();
  expect(func.display.description).toBeDefined();
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
  const handler = Testing.makeHandler(app, "Handler", INFLIGHT_PANIC);
  cloud.Function._newFunction(app, "my_function", handler);
  const s = await app.startSimulator();
  const client = s.getResource("/my_function") as cloud.IFunctionClient;
  // WHEN
  const PAYLOAD = {};
  await expect(client.invoke(JSON.stringify(PAYLOAD))).rejects.toThrow(
    "process.exit() was called with exit code 1"
  );
  // THEN
  await s.stop();
  expect(listMessages(s)).toMatchSnapshot();
  expect(s.listTraces()[2].data.error).toMatchObject({
    message: "process.exit() was called with exit code 1",
  });
  expect(app.snapshot()).toMatchSnapshot();
});

test("runtime environment tests", async () => {
  const app = new SimApp();

  let index = 0;

  const newCloudFunction = (code: string) => {
    const id = `func-${index++}`;
    cloud.Function._newFunction(
      app,
      id,
      Testing.makeHandler(
        app,
        `${id}.handler`,
        `async handle() {
          ${code}
        }`
      )
    );

    // returns an "invoker" for this function
    return async (s: Simulator) => {
      const fn = s.getResource("/" + id) as cloud.IFunctionClient;
      return fn.invoke("");
    };
  };

  const urlSearchParamsFunction = newCloudFunction(`
    const query = "q=URLUtils.searchParams&topic=api";
    const p = new URLSearchParams(query);
    return p.get("topic");
  `);

  // check that fetch is a function (we can't really make network calls here)
  const fetchFunction = newCloudFunction(`
    return fetch;
  `);

  const cryptoFunction = newCloudFunction(`
    const c = require("crypto");
    return c;
  `);

  // check that we can import ESM modules
  const esmModulesFunction = newCloudFunction(`
    const { nanoid } = await import("nanoid");
    return nanoid();
  `);

  // THEN
  const s = await app.startSimulator();
  await cryptoFunction(s);
  expect(await urlSearchParamsFunction(s)).toBe("api");
  expect(await fetchFunction(s)).toBeTypeOf("function");
  expect(await esmModulesFunction(s)).toHaveLength(21);

  await s.stop();
  expect(app.snapshot()).toMatchSnapshot();
});
