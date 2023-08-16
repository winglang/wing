import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { Construct, IConstruct } from "constructs";
import { IQueueClient } from "../../src/cloud";
import { IResource, Trace } from "../../src/std";
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

export async function waitUntil(timeout: number, fn: () => Promise<boolean>) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    if (await fn()) {
      return;
    }
    await sleep(50);
  }
  throw new Error(`Timeout after ${timeout}ms: ${fn.toString()}`);
}

export async function waitUntilTrace(
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
}

/**
 * Wait until all resources are "done".
 * "done" means that action wrapped with `withTrace`.
 * @param sim
 * @param resources
 */
export async function waitUntilResourcesDone(
  sim: Simulator,
  ...resources: IConstruct[]
): Promise<void> {
  await Promise.all(
    resources.map(async (f) => {
      await waitUntilTrace(
        sim,
        (trace) =>
          trace.sourcePath === f.node.path &&
          (trace.data.status === "success" || trace.data.status === "failure")
      );
    })
  );
}

export async function waitUntilQueueEmpty(queue: IQueueClient) {
  await waitUntil(
    DEFAULT_WAIT_TIMEOUT,
    async () => (await queue.approxSize()) == 0
  );
}
