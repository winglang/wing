import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { Construct } from "constructs";
import { Trace } from "../../src/std";
import { Simulator } from "../../src/testing";

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
  return message.map((m) => m.replace(/:\d+/, ":<port>"));
}

export async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

const DEFAULT_WAIT_TIMEOUT = 3000;

/**
 * Wait until the given function returns true or throw an error if the timeout is reached.
 */
export async function waitUntil(
  fn: () => Promise<boolean>,
  timeout = DEFAULT_WAIT_TIMEOUT
) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    if (await fn()) {
      return;
    }
    await sleep(50);
  }

  throw new Error(
    `Timeout after ${timeout}ms waiting for \`${fn.toString()}\``
  );
}

/**
 * Wait until the given trace is found in the simulator or throw an error if the timeout is reached.
 */
export async function waitUntilTrace(
  sim: Simulator,
  fn: (trace: Trace) => boolean,
  timeout = DEFAULT_WAIT_TIMEOUT
) {
  let tracesChecked = 0;
  const start = Date.now();

  while (Date.now() - start < timeout) {
    const traces = sim.listTraces();
    for (const trace of traces.slice(tracesChecked)) {
      if (fn(trace)) {
        return;
      }
    }
    tracesChecked = traces.length;
    await sleep(50);
  }

  throw new Error(
    `Timeout after ${timeout}ms waiting for \`${fn.toString()}\`\nSim Traces: ${JSON.stringify(
      sim.listTraces()
    )}`
  );
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
  const start = Date.now();
  while (Date.now() - start < timeout) {
    if (sim.listTraces().filter(fn).length >= count) {
      return;
    }
    await sleep(50);
  }

  throw new Error(
    `Timeout after ${timeout}ms waiting for \`${fn.toString()}\`\nSim Traces: ${JSON.stringify(
      sim.listTraces()
    )}`
  );
}

export async function waitUntilNextTrace(
  sim: Simulator,
  fn: (trace: Trace) => boolean
) {
  let tracesChecked = sim.listTraces().length;
  const start = Date.now();

  while (Date.now() - start < DEFAULT_WAIT_TIMEOUT) {
    const traces = sim.listTraces();
    for (const trace of traces.slice(tracesChecked)) {
      if (fn(trace)) {
        return;
      }
    }
    tracesChecked = traces.length;
    await sleep(50);
  }

  throw new Error(
    `Timeout after ${DEFAULT_WAIT_TIMEOUT}ms: ${fn.toString()}\n${JSON.stringify(
      sim.listTraces()
    )}`
  );
}
