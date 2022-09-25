import * as path from "path";
import { FunctionClient } from "../../src/sim/function.inflight";
import {
  init as initFunction,
  cleanup as cleanupFunction,
} from "../../src/sim/function.sim";
import { QueueClient } from "../../src/sim/queue.inflight";
import {
  init as initQueue,
  cleanup as cleanupQueue,
} from "../../src/sim/queue.sim";

jest.setTimeout(5_000); // 5 seconds

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const SOURCE_CODE_FILE = path.join(__dirname, "fixtures", "process.js");
const SOURCE_CODE_LANGUAGE = "javascript";
const ENVIRONMENT_VARIABLES = {};

describe("basic", () => {
  test("queue with batch size of 1", async () => {
    // GIVEN
    const { functionId } = await initFunction({
      sourceCodeFile: SOURCE_CODE_FILE,
      sourceCodeLanguage: SOURCE_CODE_LANGUAGE,
      environmentVariables: ENVIRONMENT_VARIABLES,
    });
    const fnClient = new FunctionClient(functionId);

    const { queueId } = await initQueue({
      subscribers: [{ client: fnClient, batchSize: 1 }],
    });
    const queueClient = new QueueClient(queueId);

    // WHEN
    await queueClient.push("A");
    await queueClient.push("B");

    await sleep(200);

    // THEN
    expect(fnClient.timesCalled).toEqual(2);
    await cleanupQueue(queueId);
    await cleanupFunction(functionId);
  });

  test("queue with batch size of 5", async () => {
    // GIVEN
    const { functionId } = await initFunction({
      sourceCodeFile: SOURCE_CODE_FILE,
      sourceCodeLanguage: SOURCE_CODE_LANGUAGE,
      environmentVariables: ENVIRONMENT_VARIABLES,
    });
    const fnClient = new FunctionClient(functionId);

    const { queueId } = await initQueue({
      subscribers: [{ client: fnClient, batchSize: 5 }],
      // push messages at initialization so they all get processed in sync
      initialMessages: ["A", "B", "C", "D", "E", "F"],
    });

    await sleep(200);

    // THEN
    expect(fnClient.timesCalled).toEqual(2);
    await cleanupQueue(queueId);
    await cleanupFunction(functionId);
  });

  test("messages are requeued if the function fails", async () => {
    // GIVEN
    const { functionId } = await initFunction({
      sourceCodeFile: SOURCE_CODE_FILE,
      sourceCodeLanguage: SOURCE_CODE_LANGUAGE,
      environmentVariables: ENVIRONMENT_VARIABLES,
    });
    const fnClient = new FunctionClient(functionId);

    const { queueId } = await initQueue({
      subscribers: [{ client: fnClient, batchSize: 1 }],
    });
    const queueClient = new QueueClient(queueId);

    // WHEN
    await queueClient.push("BAD MESSAGE");

    await sleep(300);

    // THEN
    expect(fnClient.timesCalled).toBeGreaterThan(1);
    await cleanupQueue(queueId);
    await cleanupFunction(functionId);
  });
});
