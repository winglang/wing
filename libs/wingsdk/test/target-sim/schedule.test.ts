import { test, expect } from "vitest";
import * as cloud from "../../src/cloud";
import { SCHEDULE_TYPE } from "../../src/target-sim/schema-resources";
import { SimApp } from "../sim-app";
import { Testing } from "../../src/testing";
import { Duration } from "../../src/std";

const INFLIGHT_CODE = `
async handle(message) {
console.log("Hello from schedule!");
}`;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
 
test("create a schedule", async () => {
  // GIVEN
  const app = new SimApp();
  cloud.Schedule._newSchedule(app, "my_schedule", {cron: '*/1 * * * *'});
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

test("schedule with one task with cron", async () => {
  // GIVEN
  const app = new SimApp();
  const handler = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);
  const schedule = cloud.Schedule._newSchedule(app, "my_schedule", {cron: '* * * * *'});
  schedule.onTick(handler);

  const s = await app.startSimulator();
  // WHEN

  await s.stop();

  // THEN
  expect(app.snapshot()).toMatchSnapshot();
});

test("schedule with one task using rate", async () => {
  // GIVEN
  const app = new SimApp();
  const handler = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);
  const schedule = cloud.Schedule._newSchedule(app, "my_schedule", {rate: Duration.fromSeconds(1)});
  schedule.onTick(handler);
  const s = await app.startSimulator();

  // WHEN

  // THEN
  await s.stop();
  expect(app.snapshot()).toMatchSnapshot();
  expect(
    s.listTraces()
    .filter((v) => v.sourceType == SCHEDULE_TYPE)
    .map((trace) => trace.data.message)
  ).toEqual([
    "wingsdk.cloud.Schedule created.",
    "wingsdk.cloud.Schedule deleted."
  ])
});