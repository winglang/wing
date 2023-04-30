import * as sim from "../src/target-sim";
import { Simulator } from "../src/testing";
import { directorySnapshot, mkdtemp } from "../src/util";

/**
 * A simulated app.
 *
 * A great way to write unit tests for the cloud. Just use this as your base app
 * and then call `app.startSimulator()` to start an instance of this app inside
 * a cloud simulator.
 */
export class SimApp extends sim.App {
  private _synthesized: boolean = false;
  constructor() {
    super({ outdir: mkdtemp() });
  }

  /**
   * Creates a simulator and starts it.
   *
   * @returns A started `Simulator` instance. No need to call `start()` again.
   */
  public async startSimulator(): Promise<Simulator> {
    this.synthIfNeeded();
    const simfile = this.synth();
    const s = new Simulator({ simfile });
    await s.start();
    return s;
  }

  /**
   * Executes a code block with a simulator, will stop the simulator after the
   * code block is done.
   *
   * @param cb code block closure to execute with the simulator
   * @internal
   */
  public async _withSimulator(cb: (s: Simulator) => Promise<void>) {
    const s = await this.startSimulator();
    try {
      await cb(s);
    } finally {
      await s.stop();
    }
  }

  /**
   * Takes a snapshot of the output directory, returning a map of filenames to
   * their contents.
   */
  public snapshot(): Record<string, any> {
    this.synthIfNeeded();
    return directorySnapshot(this.outdir);
  }

  private synthIfNeeded() {
    if (!this._synthesized) {
      this.synth();
      this._synthesized = true;
    }
  }
}
