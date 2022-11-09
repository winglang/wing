import { Construct } from "constructs";
import * as sim from "../../src/sim";
import { Simulator } from "../../src/testing";
import { mkdtemp } from "../../src/util";

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
