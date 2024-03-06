import { afterEach, beforeEach } from "vitest";
import { AllSimulators } from "../src/simulator";

beforeEach((test) => {
  process.env.VITEST_TEST_ID = test.task.id;
});

afterEach((test) => {
  delete process.env.VITEST_TEST_ID;
  test.onTestFailed(async (_result) => {
    const sims = AllSimulators.forTest(test.task.id);
    for (const sim of sims) {
      if (sim._runningState() === "running") {
        await sim.stop();
      }
      sim._dumpLogs();
    }
  });
});
