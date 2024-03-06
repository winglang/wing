import { afterEach, beforeEach } from "vitest";
import { Logger } from "../src/simulator";

beforeEach((test) => {
  process.env.VITEST_TEST_ID = test.task.id;
});

afterEach((test) => {
  delete process.env.VITEST_TEST_ID;
  test.onTestFailed((_result) => {
    const logs = Logger.instance.dumpLogs(test.task.id);
    if (logs) {
      console.error("Simulator logs:\n" + logs.join("\n"));
    } else {
      console.error("(No simulator logs found)");
    }
  });
});
