import { existsSync } from "fs";
import { join } from "path";
import { Construct } from "constructs";
import * as tar from "tar";
import { Simulator } from "../../src/testing";
import { mkdtemp, readJsonSync } from "../../src/util";

export function simulatorJsonOf(simfile: string) {
  // extract the simulator.json from the .wsim file
  const workdir = mkdtemp();
  tar.extract({
    cwd: workdir,
    sync: true,
    file: simfile,
  });

  const simJson = join(workdir, "simulator.json");
  if (!existsSync(simJson)) {
    throw new Error(
      `Invalid Wing app (${simfile}) - simulator.json not found.`
    );
  }

  return readJsonSync(simJson);
}

export function treeJsonOf(simfile: string) {
  // extract the simulator.json from the .wsim file
  const workdir = mkdtemp();
  tar.extract({
    cwd: workdir,
    sync: true,
    file: simfile,
  });

  const treeJson = join(workdir, "tree.json");
  if (!existsSync(treeJson)) {
    throw new Error(`Invalid Wing app (${simfile}) - tree.json not found.`);
  }
  return readJsonSync(treeJson);
}

export interface IScopeCallback {
  (scope: Construct): void;
}

export function listMessages(s: Simulator) {
  return s.listTraces().map((trace) => trace.data.message);
}
