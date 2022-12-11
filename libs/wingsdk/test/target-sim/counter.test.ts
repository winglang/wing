import * as cloud from "../../src/cloud";
import { ICounterClient } from "../../src/cloud";
import { SimApp, Simulator } from "../../src/testing";

test("create a counter", async () => {
  // GIVEN
  const app = new SimApp();
  const c = new cloud.Counter(app, "my_counter", {
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
  new cloud.Counter(app, "my_counter", {
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

  expect(listMessages(s)).toEqual([
    "wingsdk.cloud.Counter created.",
    "Inc (amount=1).",
    "Inc (amount=1).",
    "Inc (amount=10).",
    "Inc (amount=10).",
    "wingsdk.cloud.Counter deleted.",
  ]);
  expect(app.snapshot()).toMatchSnapshot();
});

function listMessages(s: Simulator) {
  return s.listTraces().map((event) => event.data.message);
}
