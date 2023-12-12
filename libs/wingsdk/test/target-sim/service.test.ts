import { test, expect } from "vitest";
import * as cloud from "../../src/cloud";
import { Testing } from "../../src/simulator";
import { SimApp } from "../sim-app";

const HANDLER_WITH_START = `\
async handle() {
  console.log("start!");
}`;

const HANDLER_WITH_START_AND_STOP = `\
async handle() {
  console.log("start!");
  return () => console.log("stop!");
}`;

test("create a service with on start method", async () => {
  // GIVEN
  const app = new SimApp();
  new cloud.Service(app, "my_service", Testing.makeHandler(HANDLER_WITH_START));

  // WHEN
  const s = await app.startSimulator();

  // THEN
  expect(s.getResourceConfig("/my_service")).toEqual({
    attrs: {
      handle: expect.any(String),
    },
    path: "root/my_service",
    props: {
      sourceCodeFile: expect.any(String),
      environmentVariables: {},
      autoStart: true,
    },
    type: cloud.SERVICE_FQN,
  });

  await s.stop();
  expect(app.snapshot()).toMatchSnapshot();
});

test("create a service with a on stop method", async () => {
  // Given
  const app = new SimApp();
  new cloud.Service(
    app,
    "my_service",
    Testing.makeHandler(HANDLER_WITH_START_AND_STOP)
  );

  // WHEN
  const s = await app.startSimulator();
  await s.stop();

  // THEN
  expect(s.getResourceConfig("/my_service")).toEqual({
    attrs: {
      handle: expect.any(String),
    },
    path: "root/my_service",
    props: {
      sourceCodeFile: expect.any(String),
      environmentVariables: {},
      autoStart: true,
    },
    type: cloud.SERVICE_FQN,
  });

  expect(
    s
      .listTraces()
      .filter((v) => v.sourceType == cloud.SERVICE_FQN)
      .map((trace) => trace.data.message)
  ).toEqual([
    "start!",
    "@winglang/sdk.cloud.Service created.",
    "stop!",
    "@winglang/sdk.cloud.Service deleted.",
  ]);
});

test("create a service without autostart", async () => {
  // Given
  const app = new SimApp();
  new cloud.Service(
    app,
    "my_service",
    Testing.makeHandler(HANDLER_WITH_START_AND_STOP),
    { autoStart: false }
  );

  // WHEN
  const s = await app.startSimulator();
  await s.stop();

  // THEN
  expect(s.getResourceConfig("/my_service")).toEqual({
    attrs: {
      handle: expect.any(String),
    },
    path: "root/my_service",
    props: {
      sourceCodeFile: expect.any(String),
      environmentVariables: {},
      autoStart: false,
    },
    type: cloud.SERVICE_FQN,
  });

  expect(
    s
      .listTraces()
      .filter((v) => v.sourceType == cloud.SERVICE_FQN)
      .map((trace) => trace.data.message)
  ).toEqual([
    "@winglang/sdk.cloud.Service created.", // Service created never started
    "@winglang/sdk.cloud.Service deleted.",
  ]);
});

test("start and stop service", async () => {
  // Given
  const app = new SimApp();

  new cloud.Service(
    app,
    "my_service",
    Testing.makeHandler(HANDLER_WITH_START_AND_STOP),
    {
      autoStart: false,
    }
  );
  const s = await app.startSimulator();
  const service = s.getResource("/my_service") as cloud.IServiceClient;

  // WHEN
  await service.start();
  await service.stop();
  await service.start();
  await service.stop();

  // THEN
  expect(
    s
      .listTraces()
      .filter((v) => v.sourceType == cloud.SERVICE_FQN)
      .map((trace) => trace.data.message)
  ).toEqual([
    "@winglang/sdk.cloud.Service created.",
    "start!",
    "stop!",
    "start!",
    "stop!",
  ]);
});

test("consecutive start and stop service", async () => {
  // GIVEN
  const app = new SimApp();
  new cloud.Service(
    app,
    "my_service",
    Testing.makeHandler(HANDLER_WITH_START_AND_STOP),
    {
      autoStart: false,
    }
  );
  const s = await app.startSimulator();
  const service = s.getResource("/my_service") as cloud.IServiceClient;

  // WHEN
  await service.start();
  await service.start();
  await service.start();
  await service.stop();
  await service.stop();
  await service.stop();

  // THEN
  expect(
    s
      .listTraces()
      .filter((v) => v.sourceType == cloud.SERVICE_FQN)
      .map((trace) => trace.data.message)
  ).toEqual(["@winglang/sdk.cloud.Service created.", "start!", "stop!"]);
});
