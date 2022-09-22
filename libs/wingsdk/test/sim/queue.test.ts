import * as path from "path";
import { FunctionClient } from "../../src/sim/function.inflight";
import { init as initFunction } from "../../src/sim/function.sim";
import { QueueClient } from "../../src/sim/queue.inflight";
import { init as initQueue } from "../../src/sim/queue.sim";

jest.setTimeout(5_000); // 5 seconds

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const SOURCE_CODE_FILE = path.join(__dirname, "fixtures", "process.js");
const SOURCE_CODE_LANGUAGE = "javascript";
const ENVIRONMENT_VARIABLES = {};

describe("basic", () => {
  test("queue with batch size of 1", async () => {
    // GIVEN
    await initFunction();
    const fnClient = new FunctionClient({
      sourceCodeFile: SOURCE_CODE_FILE,
      sourceCodeLanguage: SOURCE_CODE_LANGUAGE,
      environmentVariables: ENVIRONMENT_VARIABLES,
    });

    await initQueue();
    const queueClient = new QueueClient([{ client: fnClient, batchSize: 1 }]);

    // WHEN
    await queueClient.push("A");
    await queueClient.push("B");

    await sleep(200);

    // THEN
    try {
      expect(fnClient.timesCalled).toEqual(2);
    } finally {
      queueClient.close();
    }
  });

  test("queue with batch size of 5", async () => {
    // GIVEN
    await initFunction();
    const fnClient = new FunctionClient({
      sourceCodeFile: SOURCE_CODE_FILE,
      sourceCodeLanguage: SOURCE_CODE_LANGUAGE,
      environmentVariables: ENVIRONMENT_VARIABLES,
    });

    await initQueue();
    const queueClient = new QueueClient(
      [{ client: fnClient, batchSize: 5 }],
      ["A", "B", "C", "D", "E", "F"]
    );

    await sleep(200);

    // THEN
    try {
      expect(fnClient.timesCalled).toEqual(2);
    } finally {
      queueClient.close();
    }
  });

  test("messages are requeued if the function fails", async () => {
    // GIVEN
    await initFunction();
    const fnClient = new FunctionClient({
      sourceCodeFile: SOURCE_CODE_FILE,
      sourceCodeLanguage: SOURCE_CODE_LANGUAGE,
      environmentVariables: ENVIRONMENT_VARIABLES,
    });

    await initQueue();
    const queueClient = new QueueClient(
      [{ client: fnClient, batchSize: 1 }],
      ["BAD MESSAGE"]
    );

    await sleep(300);

    // THEN
    try {
      expect(fnClient.timesCalled).toBeGreaterThan(1);
    } finally {
      queueClient.close();
    }
  });
});
