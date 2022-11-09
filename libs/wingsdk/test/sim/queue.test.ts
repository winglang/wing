import * as cloud from "../../src/cloud";
import * as core from "../../src/core";
import * as sim from "../../src/sim";
import { IFunctionClient, IQueueClient } from "../../src/sim";
import * as testing from "../../src/testing";
import { mkdtemp } from "../../src/util";
import { SimApp, simulatorJsonOf } from "./util";

jest.setTimeout(5_000); // 5 seconds

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const INFLIGHT_CODE = core.NodeJsCode.fromInline(`
async function $proc($cap, message) {
    if (message === "BAD MESSAGE") {
        throw new Error("ERROR");
    }
}`);

describe("basic", () => {
  test("queue with default batch size of 1", async () => {
    // GIVEN
    const app = new SimApp();
    const handler = new core.Inflight({
      code: INFLIGHT_CODE,
      entrypoint: "$proc",
    });
    const queue = new cloud.Queue(app, "my_queue");
    queue.onMessage(handler);

    const s = await app.startSimulator();

    const queueClient = s.getResourceByPath("root/my_queue") as IQueueClient;
    const fnClient = s.getResourceByPath(
      "root/my_queue/OnMessage-236ff3d72ad0ae46"
    ) as IFunctionClient;

    // WHEN
    await queueClient.push("A");
    await queueClient.push("B");

    // TODO: queueClient.awaitMessages(2) or queueClient.untilEmpty() or something
    await sleep(200);

    // THEN
    expect(await fnClient.timesCalled()).toEqual(2);
    await s.stop();

    expect(simulatorJsonOf(s.simfile)).toMatchSnapshot();
  });

  test("queue with batch size of 5", async () => {
    // GIVEN
    const app = new SimApp();
    const handler = new core.Inflight({
      code: INFLIGHT_CODE,
      entrypoint: "$proc",
    });
    const queue = new cloud.Queue(app, "my_queue", {
      initialMessages: ["A", "B", "C", "D", "E", "F"],
    });
    queue.onMessage(handler, { batchSize: 5 });

    const s = await app.startSimulator();

    // WHEN
    const fnClient = s.getResourceByPath(
      "root/my_queue/OnMessage-236ff3d72ad0ae46"
    ) as IFunctionClient;

    await sleep(200);

    // THEN
    expect(await fnClient.timesCalled()).toEqual(2);
    await s.stop();

    expect(simulatorJsonOf(s.simfile)).toMatchSnapshot();
  });

  test("messages are requeued if the function fails", async () => {
    // silence console.error
    const originalError = console.error;
    console.error = jest.fn();

    // GIVEN
    const app = new SimApp();
    const handler = new core.Inflight({
      code: INFLIGHT_CODE,
      entrypoint: "$proc",
    });
    const queue = new cloud.Queue(app, "my_queue");
    queue.onMessage(handler);

    const s = await app.startSimulator();

    // WHEN
    const queueClient = s.getResourceByPath("root/my_queue") as IQueueClient;
    const fnClient = s.getResourceByPath(
      "root/my_queue/OnMessage-236ff3d72ad0ae46"
    ) as IFunctionClient;

    await queueClient.push("BAD MESSAGE");

    await sleep(300);

    // THEN
    expect(await fnClient.timesCalled()).toBeGreaterThan(1);
    await s.stop();

    expect(simulatorJsonOf(s.simfile)).toMatchSnapshot();

    // restore console.error
    console.error = originalError;
  });
});
