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
  // returns the tree.json content
  const treeJsonFile =
    simfile.substring(0, simfile.lastIndexOf("/")) + "/tree.json";
  if (!existsSync(treeJsonFile)) {
    throw new Error(`Invalid path (${simfile}) - tree.json not found.`);
  }
  return readJsonSync(treeJsonFile);
}

export interface IScopeCallback {
  (scope: Construct): void;
}

export function listMessages(s: Simulator) {
  return s.listTraces().map((trace) => trace.data.message);
}
