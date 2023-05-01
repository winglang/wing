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
  const cron = '*/1 * * * *';
  cloud.Schedule._newSchedule(app, "my_schedule", {cron});
  const s = await app.startSimulator();
  
  // THEN
  expect(s.getResourceConfig("/my_schedule")).toEqual({
    attrs: {
      handle: expect.any(String),
    },
    path: "root/my_schedule",
    props: {
      cronExpression: cron
    },
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

test("schedule with one task using rate of 10m", async () => {
  // GIVEN
  const app = new SimApp();
  const handler = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);
  const schedule = cloud.Schedule._newSchedule(app, "my_schedule", {rate: Duration.fromMinutes(10)});
  const expectedCron = "*/10 * * * *"; // every 10 minutes cron expression
  schedule.onTick(handler);
  const s = await app.startSimulator();

  // THEN
  await s.stop();
  expect(app.snapshot()).toMatchSnapshot();
  expect(s.getResourceConfig("/my_schedule")).toEqual({
    attrs: {
      handle: expect.any(String),
    },
    path: "root/my_schedule",
    props: {
      cronExpression: expectedCron
    },
    type: SCHEDULE_TYPE,
  });
});

test("schedule with one task using rate of 3h", async () => {
  // GIVEN
  const app = new SimApp();
  const handler = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);
  const schedule = cloud.Schedule._newSchedule(app, "my_schedule", {rate: Duration.fromHours(3)});
  const expectedCron = "* */3 * * *"; // every 3 hours cron expression
  schedule.onTick(handler);
  const s = await app.startSimulator();

  // THEN
  await s.stop();
  expect(app.snapshot()).toMatchSnapshot();
  expect(s.getResourceConfig("/my_schedule")).toEqual({
    attrs: {
      handle: expect.any(String),
    },
    path: "root/my_schedule",
    props: {
      cronExpression: expectedCron
    },
    type: SCHEDULE_TYPE,
  });
});