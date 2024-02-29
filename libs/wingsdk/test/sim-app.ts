import * as fs from "fs";
import { join } from "path";
import { onTestFailed } from "vitest";
import { directorySnapshot, mkdtemp } from "./util";
import { Function, IFunctionClient } from "../src/cloud";
import { Simulator, Testing } from "../src/simulator";
import { App } from "../src/target-sim/app";

/**
 * @see AppProps
 */
export interface SimAppProps {
  readonly isTestEnvironment?: boolean;
  readonly rootConstruct?: any;
}

/**
 * A simulated app.
 *
 * A great way to write unit tests for the cloud. Just use this as your base app
 * and then call `app.startSimulator()` to start an instance of this app inside
 * a cloud simulator.
 */
export class SimApp extends App {
  private _synthesized: boolean = false;
  private functionIndex: number = 0;

  constructor(props: SimAppProps = {}) {
    const { isTestEnvironment, rootConstruct } = props;
    super({
      outdir: mkdtemp(),
      entrypointDir: __dirname,
      isTestEnvironment,
      rootConstruct,
    });

    // symlink the node_modules so we can test imports and stuffs
    fs.symlinkSync(
      join(__dirname, "..", "node_modules"),
      join(this.outdir, "node_modules")
    );
  }

  /**
   * A helper to define a new cloud.Function within this app.
   * @param code The function body.
   * @returns An "invoker" function which can be used to invoke the function after the simulator had
   * started.
   */
  public newCloudFunction(code: string) {
    const id = `Function.${this.functionIndex++}`;
    new Function(
      this,
      id,
      Testing.makeHandler(`async handle() {
          ${code}
        }`)
    );

    // returns an "invoker" for this function
    return async (s: Simulator) => {
      const fn = s.getResource("/" + id) as IFunctionClient;
      return fn.invoke();
    };
  }

  /**
   * Creates a simulator and starts it.
   *
   * @returns A started `Simulator` instance. No need to call `start()` again.
   */
  public async startSimulator(stateDir?: string): Promise<Simulator> {
    this.synthIfNeeded();
    const simfile = this.synth();
    const s = new Simulator({ simfile, stateDir });
    await s.start();

    // When tests fail, we still want to make sure the simulator is stopped
    onTestFailed(async () => {
      if ((s as any)._running === "running") {
        await s.stop();
      }
    });

    return s;
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
