import { test, expect } from "vitest";
import { listMessages, treeJsonOf } from "./util";
import * as cloud from "../../src/cloud";
import { ICounterClient } from "../../src/cloud";
import { SimApp } from "../sim-app";

test("create a counter", async () => {
  // GIVEN
  const app = new SimApp();
  const c = cloud.Counter._newCounter(app, "my_counter", {
    initial: 123,
  });

  expect(c.initial).toBe(123);

  const s = await app.startSimulator();
  expect(s.getResourceConfig("/my_counter")).toEqual({
    attrs: {
      handle: expect.any(String),
    },
    path: "root/my_counter",
    props: {
      initial: 123,
    },
    type: "wingsdk.cloud.Counter",
  });
  await s.stop();

  expect(app.snapshot()).toMatchSnapshot();
});

test("inc", async () => {
  // GIVEN
  const app = new SimApp();
  cloud.Counter._newCounter(app, "my_counter", {
    initial: 123,
  });

  const s = await app.startSimulator();

  const client = s.getResource("/my_counter") as ICounterClient;

  const value0 = await client.inc();
  expect(value0).toEqual(123); // always returns the value before inc (like "i++");

  const value1 = await client.inc();
  expect(value1).toEqual(123 + 1);

  const value2 = await client.inc(10);
  expect(value2).toEqual(123 + 1 + 1);

  const value3 = await client.inc(10);
  expect(value3).toEqual(123 + 1 + 1 + 10);
  await s.stop();

  expect(listMessages(s)).toMatchSnapshot();
  expect(app.snapshot()).toMatchSnapshot();
});

test("key inc", async () => {
  // GIVEN
  const app = new SimApp();
  cloud.Counter._newCounter(app, "my_counter");

  const s = await app.startSimulator();

  const client = s.getResource("/my_counter") as ICounterClient;

  const value0 = await client.inc(1, "my-key");
  expect(value0).toEqual(0); // always returns the value before inc (like "i++");

  const value1 = await client.inc(undefined, "my-key");
  expect(value1).toEqual(1);

  const value2 = await client.inc(10, "my-key");
  expect(value2).toEqual(1 + 1);

  const value3 = await client.inc(10, "my-key");
  expect(value3).toEqual(1 + 1 + 10);
  await s.stop();

  expect(listMessages(s)).toMatchSnapshot();
  expect(app.snapshot()).toMatchSnapshot();
});

test("dec", async () => {
  // GIVEN
  const app = new SimApp();
  cloud.Counter._newCounter(app, "my_counter", {
    initial: 123,
  });

  const s = await app.startSimulator();

  const client = s.getResource("/my_counter") as ICounterClient;

  const value0 = await client.dec();
  expect(value0).toEqual(123); // always returns the value before inc (like "i--");

  const value1 = await client.dec();
  expect(value1).toEqual(123 - 1);

  const value2 = await client.dec(10);
  expect(value2).toEqual(123 - 1 - 1);

  const value3 = await client.dec(10);
  expect(value3).toEqual(123 - 1 - 1 - 10);
  await s.stop();

  expect(listMessages(s)).toMatchSnapshot();
  expect(app.snapshot()).toMatchSnapshot();
});

test("key dec", async () => {
  // GIVEN
  const app = new SimApp();
  cloud.Counter._newCounter(app, "my_counter");

  const s = await app.startSimulator();

  const client = s.getResource("/my_counter") as ICounterClient;

  const value0 = await client.dec(1, "my-key");
  expect(value0).toEqual(0); // always returns the value before inc (like "i--");

  const value1 = await client.dec(undefined, "my-key");
  expect(value1).toEqual(-1);

  const value2 = await client.dec(10, "my-key");
  expect(value2).toEqual(-1 - 1);

  const value3 = await client.dec(10, "my-key");
  expect(value3).toEqual(-1 - 1 - 10);
  await s.stop();

  expect(listMessages(s)).toMatchSnapshot();
  expect(app.snapshot()).toMatchSnapshot();
});

test("peek without initial value", async () => {
  // GIVEN
  const app = new SimApp();
  cloud.Counter._newCounter(app, "my_counter");

  const s = await app.startSimulator();

  const client = s.getResource("/my_counter") as ICounterClient;

  const peek = await client.peek();
  expect(peek).toEqual(0);
});

test("peek with initial value", async () => {
  // GIVEN
  const app = new SimApp();
  cloud.Counter._newCounter(app, "my_counter", {
    initial: 123,
  });

  const s = await app.startSimulator();

  const client = s.getResource("/my_counter") as ICounterClient;

  const peek = await client.peek();
  expect(peek).toEqual(123);
});

test("key peek without value", async () => {
  // GIVEN
  const app = new SimApp();
  cloud.Counter._newCounter(app, "my_counter");

  const s = await app.startSimulator();

  const client = s.getResource("/my_counter") as ICounterClient;

  const peek = await client.peek("my-key");
  expect(peek).toEqual(0);
});

test("key peek with value", async () => {
  // GIVEN
  const app = new SimApp();
  cloud.Counter._newCounter(app, "my_counter");

  const s = await app.startSimulator();

  const client = s.getResource("/my_counter") as ICounterClient;

  await client.inc(10, "my-key");
  const peek = await client.peek("my-key");
  expect(peek).toEqual(10);
});

test("set to new value", async () => {
  // GIVEN
  const app = new SimApp();
  cloud.Counter._newCounter(app, "my_counter", {
    initial: 123,
  });

  const s = await app.startSimulator();

  const client = s.getResource("/my_counter") as ICounterClient;

  await client.set(5);
  const peek = await client.peek();
  expect(peek).toEqual(5);

  await s.stop();

  expect(listMessages(s)).toMatchSnapshot();
  expect(app.snapshot()).toMatchSnapshot();
});

test("key set to new value", async () => {
  // GIVEN
  const app = new SimApp();
  cloud.Counter._newCounter(app, "my_counter");

  const s = await app.startSimulator();

  const client = s.getResource("/my_counter") as ICounterClient;

  await client.set(5, "my-key");
  const peek = await client.peek("my-key");
  expect(peek).toEqual(5);

  await s.stop();

  expect(listMessages(s)).toMatchSnapshot();
  expect(app.snapshot()).toMatchSnapshot();
});

test("counter has no display hidden property", async () => {
  // GIVEN
  const app = new SimApp();
  cloud.Counter._newCounter(app, "my_counter");

  const treeJson = treeJsonOf(app.synth());
  const counter = app.node.tryFindChild("my_counter") as cloud.Counter;

  // THEN
  expect(counter.display.hidden).toBeUndefined();
  expect(treeJson.tree.children).toBeDefined();
  expect(treeJson.tree.children).not.toMatchObject({
    my_counter: {
      display: {
        hidden: expect.any(Boolean),
      },
    },
  });
});

test("counter has display title and description properties", async () => {
  // GIVEN
  const app = new SimApp();
  cloud.Counter._newCounter(app, "my_counter");

  // WHEN
  const treeJson = treeJsonOf(app.synth());
  const counter = app.node.tryFindChild("my_counter") as cloud.Counter;

  // THEN
  expect(counter.display.title).toBeDefined();
  expect(counter.display.description).toBeDefined();
  expect(treeJson.tree.children).toMatchObject({
    my_counter: {
      display: {
        title: expect.any(String),
        description: expect.any(String),
      },
    },
  });
});
