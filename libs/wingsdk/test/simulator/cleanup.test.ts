import * as cp from "child_process";
import { expect, test } from "vitest";
import { Service } from "../../src/cloud";
import { Testing } from "../../src/simulator";
import { SimApp } from "../sim-app";

const script = (simdir: string) => `
const { simulator } = require("./src");

async function main() {
  const sim = new simulator.Simulator({ simfile: "${simdir}" });
  sim.onTrace({
    callback: (trace) => {
      console.log(trace.data.message);
    },
  });
  console.log("Starting simulator");
  await sim.start();
  console.log("Simulator started");

  process.on("SIGTERM", async () => {
    console.log("SIGTERM received, stopping simulator...");
    await sim.stop();
    process.exit(1);
  });
}

main();
`;

const code = `
async handle() {
  console.log("start!");
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  return async () => {
    console.log("stopping...");
    await sleep(1000);
    console.log("stopped!");
  };
}`;

// This test validates that if a process running the simulator is killed
// and that process has code set up for gracefully shutting down the simulator,
// then the simulator will be stopped correctly (including child processes
// like services).
test("simulator cleanup", async () => {
  // Synthesize configuration for the simulator to use in the test
  const app = new SimApp({ isTestEnvironment: true });
  const handler = Testing.makeHandler(code);
  new Service(app, "Service", handler);
  const simdir = app.synth();

  // Start the simulator in a child process
  const child = cp.spawn(process.argv0, ["-e", script(simdir)], {
    stdio: ["pipe", "pipe", "pipe"],
  });

  child.stdout?.on("data", (data) => {
    console.error(data.toString());
  });
  child.stderr?.on("data", (data) => {
    console.error(data.toString());
  });

  let stopped = false;

  const stoppedPromise = new Promise((resolve) => {
    child.stdout?.on("data", (data) => {
      if (data.toString().includes("stopped!")) {
        stopped = true;
        resolve(undefined);
      }
    });
    child.stderr?.on("data", (data) => {
      if (data.toString().includes("stopped!")) {
        stopped = true;
        resolve(undefined);
      }
    });
  });

  // Wait for the "Simulator started" message, then kill the child process
  await new Promise((resolve) => {
    child.stdout?.on("data", (data) => {
      if (data.toString().includes("Simulator started")) {
        child.kill("SIGTERM");
        resolve(undefined);
      }
    });
    child.stderr?.on("data", (data) => {
      if (data.toString().includes("Simulator started")) {
        child.kill("SIGTERM");
        resolve(undefined);
      }
    });
  });

  // Wait for the "stopped!" message from cloud.Service (running in a grandchild process)
  await stoppedPromise;

  expect(stopped).toBe(true);
});
