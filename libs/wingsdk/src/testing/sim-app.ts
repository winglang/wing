import { Simulator } from ".";
import * as sim from "../target-sim";
import { directorySnapshot, mkdtemp } from "../util";

/**
 * A simulated app.
 *
 * A great way to write unit tests for the cloud. Just use this as your base app
 * and then call `app.startSimulator()` to start an instance of this app inside
 * a cloud simulator.
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

  public snapshot(): Record<string, any> {
    return directorySnapshot(this.outdir);
  }
}
