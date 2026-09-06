import { expect, test } from "vitest";
import { Service } from "../../src/cloud";
import { inflight } from "../../src/core";
import { SimApp } from "../sim-app";
import { simulator } from "../../src";

/**
 * Regression for https://github.com/winglang/wing/issues/6861:
 * Stopping while the simulator is still starting must not throw, and must
 * reap detached sandbox children (e.g. Services whose start() never returns).
 */
test(
  "stop while starting with a long-running Service start handler",
  { timeout: 60_000 },
  async () => {
    const app = new SimApp({ isTestEnvironment: true });
    new Service(
      app,
      "BusyService",
      inflight(async () => {
        // Never returns — previously left a detached node at 100% CPU when
        // the parent exited mid-start. Yield so the sandbox can receive signals.
        const sleep = (ms: number) =>
          new Promise((resolve) => setTimeout(resolve, ms));
        for (;;) {
          await sleep(100);
        }
      }),
    );
    const simdir = app.synth();

    const sim = new simulator.Simulator({ simfile: simdir });

    const startPromise = sim.start();
    // Wait until the simulator has entered "starting" and begun resources.
    for (let i = 0; i < 50; i++) {
      if ((sim as any)._running === "starting" || (sim as any)._running === "running") {
        break;
      }
      await new Promise((r) => setTimeout(r, 50));
    }

    // Must not throw "Cannot stop a simulation that is still starting."
    await sim.stop();

    // start() should settle after teardown.
    await startPromise.catch(() => {});

    expect((sim as any)._running).toBe("stopped");
  },
);
