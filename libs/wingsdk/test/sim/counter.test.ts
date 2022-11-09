import * as cloud from "../../src/cloud";
import { ICounterClient } from "../../src/cloud";
import { SimApp, simulatorJsonOf } from "./util";

test("create a counter", async () => {
  // GIVEN
  const app = new SimApp();
  const c = new cloud.Counter(app, "my_counter", {
    initialValue: 123,
  });

  expect(c.initialValue).toBe(123);

  const s = await app.startSimulator();
  expect(s.getAttributes("root/my_counter")).toEqual({
    handle: expect.any(String),
  });
  expect(s.getProps("root/my_counter")).toEqual({
    initialValue: 123,
  });
  await s.stop();

  expect(simulatorJsonOf(s.simfile)).toMatchSnapshot();
});

test("inc", async () => {
  // GIVEN
  const app = new SimApp();
  new cloud.Counter(app, "my_counter", {
    initialValue: 123,
  });

  const s = await app.startSimulator();

  const client = s.getResourceByPath("root/my_counter") as ICounterClient;

  const value0 = await client.inc();
  expect(value0).toEqual(123); // always returns the value before inc (like "i++");

  const value1 = await client.inc();
  expect(value1).toEqual(123 + 1);

  const value2 = await client.inc(10);
  expect(value2).toEqual(123 + 1 + 1);

  const value3 = await client.inc(10);
  expect(value3).toEqual(123 + 1 + 1 + 10);
  await s.stop();

  expect(simulatorJsonOf(s.simfile)).toMatchSnapshot();
});
