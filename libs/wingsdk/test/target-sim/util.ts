import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { Construct } from "constructs";
import { Simulator } from "../../src/simulator";
import { Trace } from "../../src/std";

export function readJsonSync(file: string) {
  return JSON.parse(readFileSync(file, "utf-8"));
}

export function simulatorJsonOf(simdir: string) {
  const simJson = join(simdir, "simulator.json");
  if (!existsSync(simJson)) {
    throw new Error(`Invalid Wing app (${simdir}) - simulator.json not found.`);
  }

  return readJsonSync(simJson);
}

export function treeJsonOf(simdir: string) {
  const treeJson = join(simdir, "tree.json");
  if (!existsSync(treeJson)) {
    throw new Error(`Invalid Wing app (${simdir}) - tree.json not found.`);
  }
  return readJsonSync(treeJson);
}

export interface IScopeCallback {
  (scope: Construct): void;
}

export function listMessages(s: Simulator) {
  const message = s.listTraces().map((trace) => trace.data.message);
  // Redact any messages containing port numbers
  return message.map((m) =>
    m
      .replace(/wing-container-\w+/g, "wing-container-<container>")
      .replace(/:\d+/, ":<port>")
  );
}

export async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

const DEFAULT_WAIT_TIMEOUT = 10000;
const DEFAULT_WAIT_INTERVAL = 150;

/**
 * Wait until the given trace is found in the simulator or throw an error if the timeout is reached.
 */
export async function waitUntilTrace(
  sim: Simulator,
  fn: (trace: Trace) => boolean,
  timeout = DEFAULT_WAIT_TIMEOUT
) {
  return waitUntilTraceCount(sim, 1, fn, timeout);
}

/**
 * Wait until the given trace is found `count` times in the simulator or throw an error if the timeout is reached.
 */
export async function waitUntilTraceCount(
  sim: Simulator,
  count: number,
  fn: (trace: Trace) => boolean,
  timeout = DEFAULT_WAIT_TIMEOUT
) {
  // wait for a tiny amount of time because you likely want at least 1 event loop tick to pass
  await sleep(1);

  const start = Date.now();
  while (Date.now() - start < timeout) {
    if (sim.listTraces().filter(fn).length >= count) {
      return;
    }
    await sleep(DEFAULT_WAIT_INTERVAL);
  }

  throw new Error(
    `Timeout after ${timeout}ms waiting for ${count} traces that match \`${fn.toString()}\`\nSim Traces: ${JSON.stringify(
      sim.listTraces()
    )}`
  );
}
