import * as path from "path";
import { FunctionClient } from "../../src/sim/function.inflight";
import { QueueClient } from "../../src/sim/queue.inflight";
import { Simulator } from "../../src/testing/simulator";

jest.setTimeout(5_000); // 5 seconds

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const SOURCE_CODE_FILE = path.join(__dirname, "fixtures", "process.js");
const SOURCE_CODE_LANGUAGE = "javascript";
const ENVIRONMENT_VARIABLES = {};

describe("basic", () => {
  test("queue with batch size of 1", async () => {
    // GIVEN
    const sim = await Simulator.fromTree({
      tree: {
        root: {
          type: "constructs.Construct",
          children: {
            my_function: {
              type: "wingsdk.cloud.Function",
              props: {
                sourceCodeFile: SOURCE_CODE_FILE,
                sourceCodeLanguage: SOURCE_CODE_LANGUAGE,
                environmentVariables: ENVIRONMENT_VARIABLES,
              },
            },
            my_queue: {
              type: "wingsdk.cloud.Queue",
              props: {
                subscribers: [
                  {
                    functionId: "root/my_function",
                    batchSize: 1,
                  },
                ],
              },
            },
          },
        },
        startOrder: ["root", "root/my_function", "root/my_queue"],
      },
    });

    const fnAttrs = sim.getAttributes("root/my_function");
    const fnClient = new FunctionClient(fnAttrs.functionAddr);

    const queueAttrs = sim.getAttributes("root/my_queue");
    const queueClient = new QueueClient(queueAttrs.queueAddr);

    // WHEN
    await queueClient.push("A");
    await queueClient.push("B");

    await sleep(200);

    // THEN
    expect(await fnClient.timesCalled()).toEqual(2);
    await sim.stop();
  });

  test("queue with batch size of 5", async () => {
    // GIVEN
    const sim = await Simulator.fromTree({
      tree: {
        root: {
          type: "constructs.Construct",
          children: {
            my_function: {
              type: "wingsdk.cloud.Function",
              props: {
                sourceCodeFile: SOURCE_CODE_FILE,
                sourceCodeLanguage: SOURCE_CODE_LANGUAGE,
                environmentVariables: ENVIRONMENT_VARIABLES,
              },
            },
            my_queue: {
              type: "wingsdk.cloud.Queue",
              props: {
                initialMessages: ["A", "B", "C", "D", "E", "F"],
                subscribers: [
                  {
                    functionId: "root/my_function",
                    batchSize: 5,
                  },
                ],
              },
            },
          },
        },
        startOrder: ["root", "root/my_function", "root/my_queue"],
      },
    });

    const fnAttrs = sim.getAttributes("root/my_function");
    const fnClient = new FunctionClient(fnAttrs.functionAddr);

    await sleep(200);

    // THEN
    expect(await fnClient.timesCalled()).toEqual(2);
    await sim.stop();
  });

  test("messages are requeued if the function fails", async () => {
    // GIVEN
    const sim = await Simulator.fromTree({
      tree: {
        root: {
          type: "constructs.Construct",
          children: {
            my_function: {
              type: "wingsdk.cloud.Function",
              props: {
                sourceCodeFile: SOURCE_CODE_FILE,
                sourceCodeLanguage: SOURCE_CODE_LANGUAGE,
                environmentVariables: ENVIRONMENT_VARIABLES,
              },
            },
            my_queue: {
              type: "wingsdk.cloud.Queue",
              props: {
                subscribers: [
                  {
                    functionId: "root/my_function",
                    batchSize: 1,
                  },
                ],
              },
            },
          },
        },
        startOrder: ["root", "root/my_function", "root/my_queue"],
      },
    });

    // WHEN
    const fnAttrs = sim.getAttributes("root/my_function");
    const fnClient = new FunctionClient(fnAttrs.functionAddr);

    const queueAttrs = sim.getAttributes("root/my_queue");
    const queueClient = new QueueClient(queueAttrs.queueAddr);

    await queueClient.push("BAD MESSAGE");

    await sleep(300);

    // THEN
    expect(await fnClient.timesCalled()).toBeGreaterThan(1);
    await sim.stop();
  });
});
