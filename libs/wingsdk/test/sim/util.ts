import { existsSync } from "fs";
import { join } from "path";
import { Construct } from "constructs";
import * as tar from "tar";
import * as core from "../../src/core";
import * as sim from "../../src/sim";
import { mkdtemp, readJsonSync } from "../../src/util";

export function synthSimulatedApp(fn: IScopeCallback) {
  const outdir = mkdtemp();
  const app = new core.App({
    synthesizer: new sim.Synthesizer({ outdir }),
  });
  fn(app.root);
  app.synth();
  return join(outdir, "app.wx");
}

export function simulatorJsonOf(appPath: string) {
  // extract the simulator.json from the app.wx
  const workdir = mkdtemp();
  tar.extract({
    cwd: workdir,
    sync: true,
    file: appPath,
  });

  const simJson = join(workdir, "simulator.json");
  if (!existsSync(simJson)) {
    throw new Error(
      `Invalid Wing app (${appPath}) - simulator.json not found.`
    );
  }

  return readJsonSync(simJson);
}

export interface IScopeCallback {
  (scope: Construct): void;
}
