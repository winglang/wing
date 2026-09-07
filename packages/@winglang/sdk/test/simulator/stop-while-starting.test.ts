import { readFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { expect, test } from "vitest";
import { Service } from "../../src/cloud";
import { inflight } from "../../src/core";
import { SimApp } from "../sim-app";
import { simulator } from "../../src";

/**
 * Regression for https://github.com/winglang/wing/issues/6861:
 * Stopping while the simulator is still starting must not throw, and must
 * reap detached sandbox children (e.g. Services whose start() never returns).
 *
 * The handler writes its own PID to a file (path passed via env), so the
 * test can verify the detached child was reaped — not just that the SDK's
 * `_running` state machine reported "stopped".
 */
test(
  "stop while starting with a long-running Service start handler",
  { timeout: 60_000 },
  async () => {
    const pidFile = join(
      tmpdir(),
      `wing-busy-pid-${process.pid}-${Date.now()}.txt`,
    );

    const app = new SimApp({ isTestEnvironment: true });
    new Service(
      app,
      "BusyService",
      inflight(async () => {
        // Write our PID so the test can verify reaping, then loop forever.
        const fs = await import("fs");
        fs.writeFileSync(process.env.PID_FILE!, String(process.pid));
        const sleep = (ms: number) =>
          new Promise((resolve) => setTimeout(resolve, ms));
        for (;;) {
          await sleep(100);
        }
      }),
      { env: { PID_FILE: pidFile } },
    );
    const simdir = app.synth();

    const sim = new simulator.Simulator({ simfile: simdir });

    const startPromise = sim.start();
    // Wait until the simulator has entered "starting" and the child handler
    // has had time to write its PID file.
    for (let i = 0; i < 100; i++) {
      if (
        (sim as any)._running === "starting" ||
        (sim as any)._running === "running"
      ) {
        break;
      }
      await new Promise((r) => setTimeout(r, 50));
    }

    // Wait for the child to actually start and write its PID.
    let childPid: number | undefined;
    for (let i = 0; i < 100; i++) {
      try {
        childPid = Number(readFileSync(pidFile, "utf-8").trim());
        if (Number.isFinite(childPid) && childPid > 0) {
          break;
        }
      } catch {
        // file not written yet
      }
      await new Promise((r) => setTimeout(r, 50));
    }
    expect(childPid).toBeDefined();
    expect(process.kill(childPid!, 0)).toBe(true);

    // Must not throw "Cannot stop a simulation that is still starting."
    await sim.stop();

    // start() should settle after teardown.
    await startPromise.catch(() => {});

    expect((sim as any)._running).toBe("stopped");

    // The actual regression check: the detached child MUST be reaped. If the
    // SDK's "no handle" branch never reaches resource.cleanup() (the path
    // that calls Service.stop() → sandbox.cleanup()), the child keeps running
    // and the test would hang at 100% CPU after vitest moves on.
    await new Promise((r) => setTimeout(r, 200));
    let stillAlive = false;
    try {
      process.kill(childPid!, 0);
      stillAlive = true;
    } catch {
      // ESRCH — good, the child is gone.
    }
    expect(stillAlive).toBe(false);
  },
);
