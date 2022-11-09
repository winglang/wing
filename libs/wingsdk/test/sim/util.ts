import { existsSync } from "fs";
import { join } from "path";
import { Construct } from "constructs";
import * as tar from "tar";
import * as sim from "../../src/sim";
import { Simulator } from "../../src/testing";
import { mkdtemp, readJsonSync } from "../../src/util";

export function simulatorJsonOf(simfile: string) {
  // extract the simulator.json from the app.wx
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

/**
 * A simulated app.
 *
 * @todo Do we want to make this available under the "testing"
 * module? Seems like a useful fixture for unit tests. No?
 */
export class SimApp extends sim.App {
  constructor() {
    super({ outdir: mkdtemp() });
  }

  /**
   * Creates a simulator and starts it.
   *
   * @returns A started `Simulator` instance. No need to call `start()` again.
   */
  public async startSimulator(): Promise<Simulator> {
    const simfile = this.synth();
    const s = new Simulator({ simfile });
    await s.start();
    return s;
  }
}

export interface IScopeCallback {
  (scope: Construct): void;
}
