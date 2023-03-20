import { existsSync } from "fs";
import { join } from "path";
import { Construct } from "constructs";
import { Simulator } from "../../src/testing";
import { mkdtemp, readJsonSync } from "../../src/util";

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
  return s.listTraces().map((trace) => trace.data.message);
}
