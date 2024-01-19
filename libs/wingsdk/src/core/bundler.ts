import { writeFileSync } from "fs";
import { join } from "path";
import { IConstruct } from "constructs";
import { App } from "./app";
import { createBundle } from "../shared/bundling";

const BUNDLER_SYMBOL = Symbol.for("@winglang/sdk.core.Bundler");

/**
 * An object that produces lines of code.
 */
export interface ICodeProducer {
  /**
   * Produces lines of code.
   * The lines of code will be concatenated and written to an entrypoint file.
   */
  lines(): string[];
}

export class Bundler {
  /**
   * Return the matching Bundler of the given construct tree.
   */
  public static of(construct: IConstruct): Bundler {
    let bundler = (construct.node.root as any)[BUNDLER_SYMBOL];

    if (!bundler) {
      const entrypoint = join(App.of(construct).workdir, "handler.js");
      bundler = new Bundler(entrypoint);
      (construct.node.root as any)[BUNDLER_SYMBOL] = bundler;
    }

    return bundler;
  }

  private readonly producers: Array<ICodeProducer> = [];
  private _bundle: Bundle | undefined;
  private constructor(private readonly entrypoint: string) {}

  /**
   * Register a callback that produces lines of code that should be bundled.
   */
  public addCode(producer: ICodeProducer): void {
    this.producers.push(producer);
  }

  /**
   * Returns the bundle.
   */
  public get bundle(): Bundle {
    if (!this._bundle) {
      // All code producers are called.
      // Then their lines are concatenated and written to the entrypoint file.
      const lines = Object.values(this.producers)
        .map((producer) => producer.lines())
        .flat();

      writeFileSync(this.entrypoint, lines.join("\n") + "\n");

      this._bundle = createBundle(this.entrypoint);
    }

    return this._bundle;
  }
}

/**
 * Information about a produced JavaScript code bundle.
 */
export interface Bundle {
  readonly entrypointPath: string;
  readonly directory: string;
  readonly hash: string;
  readonly outfilePath: string;
  readonly sourcemapPath: string;
}
