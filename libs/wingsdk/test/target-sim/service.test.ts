import { test, expect } from "vitest";
import * as cloud from "../../src/cloud";
import { Testing } from "../../src/simulator";
import { SERVICE_TYPE } from "../../src/target-sim/schema-resources";
import { SimApp } from "../sim-app";

const INFLIGHT_ON_START = `
async handle(message) {
  console.log("Service Started");
}`;

const INFLIGHT_ON_START_WITH_LOOP = `
async handle(message) {
  console.log("Service Started");
  while (true) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}`;

const INFLIGHT_ON_STOP = `
async handle(message) {
  console.log("Service Stopped");
}`;

test("create a service with on start method", async () => {
  // GIVEN
  const app = new SimApp();
  const handler = Testing.makeHandler(app, "OnStartHandler", INFLIGHT_ON_START);
  cloud.Service._newService(app, "my_service", {
    onStart: handler,
  });

  // WHEN
  const s = await app.startSimulator();

  // THEN
  expect(s.getResourceConfig("/my_service")).toEqual({
    attrs: {
      handle: expect.any(String),
    },
    path: "root/my_service",
    props: {
      onStartHandler: expect.any(String),
      autoStart: true,
    },
    type: "wingsdk.cloud.Service",
  });

  await s.stop();
  expect(app.snapshot()).toMatchSnapshot();
});

test(
  "on start method does not block other resources from deploying",
  async () => {
    // GIVEN
    const app = new SimApp();
    const handler = Testing.makeHandler(
      app,
      "OnStartHandler",
      INFLIGHT_ON_START_WITH_LOOP
    );
    cloud.Service._newService(app, "my_service", {
      onStart: handler,
    });

    // WHEN
    const s = await app.startSimulator();

    // THEN
    await s.stop();
  },
  { timeout: 10000 }
);

test("create a service with a on stop method", async () => {
  // Given
  const app = new SimApp();
  const onStartHandler = Testing.makeHandler(
    app,
    "OnStartHandler",
    INFLIGHT_ON_START
  );
  const onStopHandler = Testing.makeHandler(
    app,
    "OnStopHandler",
    INFLIGHT_ON_STOP
  );
  cloud.Service._newService(app, "my_service", {
    onStart: onStartHandler,
    onStop: onStopHandler,
  });

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
      onStartHandler: expect.any(String),
      onStopHandler: expect.any(String),
      autoStart: true,
    },
    type: "wingsdk.cloud.Service",
  });

  expect(
    s
      .listTraces()
      .filter((v) => v.sourceType == SERVICE_TYPE)
      .map((trace) => trace.data.message)
  ).toEqual([
    "Starting service (onStartHandler=sim-1).",
    "wingsdk.cloud.Service created.",
    "Stopping service (onStopHandler=sim-2).",
    "wingsdk.cloud.Service deleted.",
  ]);
});

test("create a service without autostart", async () => {
  // Given
  const app = new SimApp();
  const onStartHandler = Testing.makeHandler(
    app,
    "OnStartHandler",
    INFLIGHT_ON_START
  );
  cloud.Service._newService(app, "my_service", {
    onStart: onStartHandler,
    autoStart: false,
  });

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
      onStartHandler: expect.any(String),
      autoStart: false,
    },
    type: "wingsdk.cloud.Service",
  });

  expect(
    s
      .listTraces()
      .filter((v) => v.sourceType == SERVICE_TYPE)
      .map((trace) => trace.data.message)
  ).toEqual([
    "wingsdk.cloud.Service created.", // Service created never started
    "wingsdk.cloud.Service deleted.",
  ]);
});

test("start and stop service", async () => {
  // Given
  const app = new SimApp();
  const onStartHandler = Testing.makeHandler(
    app,
    "OnStartHandler",
    INFLIGHT_ON_START
  );
  const onStopHandler = Testing.makeHandler(
    app,
    "OnStopHandler",
    INFLIGHT_ON_STOP
  );

  cloud.Service._newService(app, "my_service", {
    onStart: onStartHandler,
    onStop: onStopHandler,
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
      .filter((v) => v.sourceType == SERVICE_TYPE)
      .map((trace) => trace.data.message)
  ).toEqual([
    "wingsdk.cloud.Service created.",
    "Starting service (onStartHandler=sim-1).",
    "Stopping service (onStopHandler=sim-2).",
    "Starting service (onStartHandler=sim-1).",
    "Stopping service (onStopHandler=sim-2).",
  ]);
});

test("consecutive start and stop service", async () => {
  // GIVEN
  const app = new SimApp();
  const onStartHandler = Testing.makeHandler(
    app,
    "OnStartHandler",
    INFLIGHT_ON_START
  );
  const onStopHandler = Testing.makeHandler(
    app,
    "OnStopHandler",
    INFLIGHT_ON_STOP
  );

  cloud.Service._newService(app, "my_service", {
    onStart: onStartHandler,
    onStop: onStopHandler,
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
      .filter((v) => v.sourceType == SERVICE_TYPE)
      .map((trace) => trace.data.message)
  ).toEqual([
    "wingsdk.cloud.Service created.",
    "Starting service (onStartHandler=sim-1).",
    "Stopping service (onStopHandler=sim-2).",
  ]);
});
