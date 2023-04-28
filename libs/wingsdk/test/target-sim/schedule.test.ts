import { test, expect } from "vitest";
import * as cloud from "../../src/cloud";
import { SCHEDULE_TYPE } from "../../src/target-sim/schema-resources";
import { SimApp } from "../sim-app";
import { Testing } from "../../src/testing";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
 
test("create a schedule", async () => {
  // GIVEN
  const app = new SimApp();
  cloud.Schedule._newSchedule(app, "my_schedule");
  const s = await app.startSimulator();

  // THEN
  expect(s.getResourceConfig("/my_schedule")).toEqual({
    attrs: {
      handle: expect.any(String),
    },
    path: "root/my_schedule",
    props: {},
    type: SCHEDULE_TYPE,
  });
  await s.stop();

  // THEN
  expect(app.snapshot()).toMatchSnapshot();
});

test("schedule with one task", async () => {
  // GIVEN
  const app = new SimApp();
  const INFLIGHT_CODE = `
async handle(message) {
  console.log("Hello from schedule!");
}`;
  const handler = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);
  const schedule = cloud.Schedule._newSchedule(app, "my_schedule");
  schedule.onTick(handler);
  
  const s = await app.startSimulator();
  // WHEN
  await sleep(2000);

  await s.stop();

  // THEN
  expect(app.snapshot()).toMatchSnapshot();
});