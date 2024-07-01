import { test, expect } from "vitest";
import * as cloud from "../../src/cloud";
import { inflight } from "../../src/core";
import { Duration } from "../../src/std";
import { SimApp } from "../sim-app";

const INFLIGHT_CODE = inflight(async (_, message) => {
  console.log("Hello from schedule!");
});

test("create a schedule", async () => {
  // GIVEN
  const app = new SimApp();
  const cron = "*/1 * * * *";
  new cloud.Schedule(app, "my_schedule", { cron });
  const s = await app.startSimulator();

  // THEN
  expect(s.getResourceConfig("/my_schedule")).toEqual({
    attrs: {
      handle: expect.any(String),
      runningState: expect.any(String),
    },
    path: "root/my_schedule",
    addr: expect.any(String),
    policy: [],
    props: {
      cronExpression: cron,
    },
    type: cloud.SCHEDULE_FQN,
  });
  await s.stop();

  // THEN
  expect(app.snapshot()).toMatchSnapshot();
});

test("schedule with one task with cron", async () => {
  // GIVEN
  const app = new SimApp();
  const schedule = new cloud.Schedule(app, "my_schedule", {
    cron: "* * * * *",
  });
  schedule.onTick(INFLIGHT_CODE);

  const s = await app.startSimulator();
  // WHEN

  await s.stop();

  // THEN
  expect(app.snapshot()).toMatchSnapshot();
});

test("schedule with one task using rate of 10m", async () => {
  // GIVEN
  const app = new SimApp();
  const schedule = new cloud.Schedule(app, "my_schedule", {
    rate: Duration.fromMinutes(10),
  });
  const expectedCron = "*/10 * * * *"; // every 10 minutes cron expression
  schedule.onTick(INFLIGHT_CODE);
  const s = await app.startSimulator();

  // THEN
  expect(app.snapshot()).toMatchSnapshot();
  expect(s.getResourceConfig("/my_schedule")).toEqual({
    attrs: {
      handle: expect.any(String),
      runningState: expect.any(String),
    },
    path: "root/my_schedule",
    addr: expect.any(String),
    policy: [],
    props: {
      cronExpression: expectedCron,
    },
    type: cloud.SCHEDULE_FQN,
  });

  await s.stop();
});

test("schedule with one task using rate of 3h", async () => {
  // GIVEN
  const app = new SimApp();
  const schedule = new cloud.Schedule(app, "my_schedule", {
    rate: Duration.fromHours(3),
  });
  const expectedCron = "* */3 * * *"; // every 3 hours cron expression
  schedule.onTick(INFLIGHT_CODE);
  const s = await app.startSimulator();

  // THEN
  expect(app.snapshot()).toMatchSnapshot();
  expect(s.getResourceConfig("/my_schedule")).toEqual({
    attrs: {
      handle: expect.any(String),
      runningState: expect.any(String),
    },
    path: "root/my_schedule",
    addr: expect.any(String),
    policy: [],
    props: {
      cronExpression: expectedCron,
    },
    type: cloud.SCHEDULE_FQN,
  });

  await s.stop();
});
