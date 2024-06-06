import * as fs from "fs";
import { join } from "path";
import { onTestFailed } from "vitest";
import { directorySnapshot, mkdtemp } from "./util";
import { Function, IFunctionClient, IFunctionHandler } from "../src/cloud";
import { PolyconFactory } from "../src/core";
import { Simulator } from "../src/simulator";
import { App } from "../src/target-sim/app";
import { Platform } from "../src/target-sim/platform";

/**
 * @see AppProps
 */
export interface SimAppProps {
  /**
   * The output directory for the synthesized app.
   * @default - a fresh temporary directory
   */
  readonly outdir?: string;
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
    const { isTestEnvironment, rootConstruct, outdir } = props;

    const platform = new Platform();
    const polyconFactory = new PolyconFactory(
      [platform.newInstance.bind(platform)],
      [platform.typeForFqn.bind(platform)]
    );

    super({
      outdir: outdir ?? mkdtemp(),
      entrypointDir: __dirname,
      isTestEnvironment,
      rootConstruct,
      polyconFactory,
    });

    // symlink the node_modules so we can test imports and stuffs
    try {
      fs.symlinkSync(
        join(__dirname, "..", "node_modules"),
        join(this.outdir, "node_modules")
      );
    } catch (e) {
      if (e.code !== "EEXIST") {
        throw e;
      }
    }
  }

  /**
   * A helper to define a new cloud.Function within this app.
   * @param code The function body.
   * @returns An "invoker" function which can be used to invoke the function after the simulator had
   * started.
   */
  public newCloudFunction(handler: IFunctionHandler) {
    const id = `Function.${this.functionIndex++}`;

    new Function(this, id, handler);

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
