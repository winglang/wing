import { existsSync } from "fs";
import { join } from "path";
import { Construct } from "constructs";
import * as tar from "tar";
import { mkdtemp, readJsonSync } from "../../src/util";

export function simulatorJsonOf(simfile: string) {
  // extract the simulator.json from the .wx file
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

export interface IScopeCallback {
  (scope: Construct): void;
}
