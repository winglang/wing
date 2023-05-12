import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { Construct } from "constructs";
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
