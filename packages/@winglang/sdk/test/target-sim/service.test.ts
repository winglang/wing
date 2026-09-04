import { test, expect } from "vitest";
import * as cloud from "../../src/cloud";
import { inflight } from "../../src/core";
import { SimApp } from "../sim-app";

const HANDLER_WITH_START = inflight(async () => {
  console.log("start!");
});

const HANDLER_WITH_START_AND_STOP = inflight(async () => {
  console.log("start!");
  return () => console.log("stop!");
});

test("create a service with on start method", async () => {
  // GIVEN
  const app = new SimApp();
  new cloud.Service(app, "my_service", HANDLER_WITH_START);

  // WHEN
  const s = await app.startSimulator();

  // THEN
  expect(s.getResourceConfig("/my_service")).toEqual({
    attrs: {
      handle: expect.any(String),
    },
    path: "root/my_service",
    addr: expect.any(String),
    policy: [],
    props: {
      autoStart: true,
      sourceCodeFile: expect.any(String),
      environmentVariables: {},
    },
    type: cloud.SERVICE_FQN,
  });

  await s.stop();
  expect(app.snapshot()).toMatchSnapshot();
});

test("create a service with a on stop method", async () => {
  // Given
  const app = new SimApp();
  new cloud.Service(app, "my_service", HANDLER_WITH_START_AND_STOP);

  // WHEN
  const s = await app.startSimulator();

  // THEN
  expect(s.getResourceConfig("/my_service")).toEqual({
    attrs: {
      handle: expect.any(String),
    },
    path: "root/my_service",
    addr: expect.any(String),
    policy: [],
    props: {
      autoStart: true,
      sourceCodeFile: expect.any(String),
      environmentVariables: {},
    },
    type: cloud.SERVICE_FQN,
  });

  await s.stop();

  expect(
    s
      .listTraces()
      .filter((v) => v.sourceType == cloud.SERVICE_FQN)
      .map((trace) => trace.data.message),
  ).toEqual([
    "start!",
    "root/my_service started",
    "stop!",
    "root/my_service stopped",
  ]);
});

test("create a service without autostart", async () => {
  // Given
  const app = new SimApp();
  new cloud.Service(app, "my_service", HANDLER_WITH_START_AND_STOP, {
    autoStart: false,
  });

  // WHEN
  const s = await app.startSimulator();

  // THEN
  expect(s.getResourceConfig("/my_service")).toEqual({
    attrs: {
      handle: expect.any(String),
    },
    path: "root/my_service",
    addr: expect.any(String),
    policy: [],
    props: {
      autoStart: false,
      sourceCodeFile: expect.any(String),
      environmentVariables: {},
    },
    type: cloud.SERVICE_FQN,
  });

  await s.stop();

  expect(
    s
      .listTraces()
      .filter((v) => v.sourceType == cloud.SERVICE_FQN)
      .map((trace) => trace.data.message),
  ).toEqual(["root/my_service started", "root/my_service stopped"]);
});

test("start and stop service", async () => {
  // Given
  const app = new SimApp();

  new cloud.Service(app, "my_service", HANDLER_WITH_START_AND_STOP, {
    autoStart: false,
  });
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
      .map((trace) => trace.data.message),
  ).toEqual(["root/my_service started", "start!", "stop!", "start!", "stop!"]);
});

test("consecutive start and stop service", async () => {
  // GIVEN
  const app = new SimApp();
  new cloud.Service(app, "my_service", HANDLER_WITH_START_AND_STOP, {
    autoStart: false,
  });
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
      .map((trace) => trace.data.message),
  ).toEqual(["root/my_service started", "start!", "stop!"]);
});

test("throws during service start", async () => {
  // GIVEN
  const app = new SimApp();
  new cloud.Service(
    app,
    "my_service",
    inflight(async () => {
      throw new Error("ThisIsAnError");
    }),
  );

  const s = await app.startSimulator();
  const msg = s
    .listTraces()
    .find((t) => t.data.message.startsWith("Failed to start service"));
  expect(msg).toBeTruthy();
  expect(msg?.data.message).toEqual("Failed to start service: ThisIsAnError");
});

test("stop a service with a continuous loop start handler", async () => {
  // GIVEN — start handler never returns (no onStop closure)
  const app = new SimApp();
  new cloud.Service(
    app,
    "my_service",
    inflight(async () => {
      console.log("start!");
      // Continuous loop — never returns a stop handler
      while (true) {
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
    }),
    { autoStart: false },
  );
  const s = await app.startSimulator();
  const service = s.getResource("/my_service") as cloud.IServiceClient;

  // WHEN — start without awaiting (it never resolves on its own)
  const startPromise = service.start();
  // Allow the sandbox to enter the loop
  await new Promise((resolve) => setTimeout(resolve, 200));
  expect(await service.started()).toBeTruthy();

  await service.stop();
  // start() should settle once the sandbox is terminated
  await startPromise;

  // THEN
  expect(await service.started()).toBeFalsy();
  expect(
    s
      .listTraces()
      .filter((v) => v.sourceType == cloud.SERVICE_FQN)
      .map((trace) => trace.data.message),
  ).toContain("start!");

  // Can start again after forced stop
  const startPromise2 = service.start();
  await new Promise((resolve) => setTimeout(resolve, 200));
  expect(await service.started()).toBeTruthy();
  await service.stop();
  await startPromise2;
  expect(await service.started()).toBeFalsy();

  await s.stop();
});
