import { join } from "path";
import { Construct } from "constructs";
import * as core from "../../src/core";
import * as sim from "../../src/sim";
import { mkdtemp } from "../util";

export function synthSimulatedApp(fn: IScopeCallback) {
  const outdir = mkdtemp();
  const app = new core.App({
    synthesizer: new sim.Synthesizer({ outdir }),
  });
  fn(app.root);
  app.synth();
  return join(outdir, "app.wx");
}

export interface IScopeCallback {
  (scope: Construct): void;
}
