import { writeFileSync } from "fs";
import { mkdtemp, readFile, stat } from "fs/promises";
import { tmpdir } from "os";
import * as path from "path";
import { FunctionAttributes, FunctionSchema } from "./schema-resources";
import { FUNCTION_FQN, IFunctionClient } from "../cloud";
import { createBundle } from "../shared/bundling";
import { Sandbox } from "../shared/sandbox";
import {
  ISimulatorContext,
  ISimulatorResourceInstance,
} from "../simulator/simulator";
import { TraceType } from "../std";

export class Function implements IFunctionClient, ISimulatorResourceInstance {
  private readonly originalFile: string;
  private bundledFile: string | undefined;
  private readonly env: Record<string, string>;
  private readonly context: ISimulatorContext;
  private readonly timeout: number;
  private readonly maxWorkers: number;
  private readonly workers = new Array<Sandbox>();
  private createBundlePromise: Promise<void>;

  constructor(props: FunctionSchema["props"], context: ISimulatorContext) {
    if (props.sourceCodeLanguage !== "javascript") {
      throw new Error("Only JavaScript is supported");
    }
    this.originalFile = path.resolve(context.simdir, props.sourceCodeFile);
    this.env = props.environmentVariables ?? {};
    this.context = context;
    this.timeout = props.timeout;
    this.maxWorkers = props.concurrency;

    this.createBundlePromise = this.createBundle();
  }

  // Create a bundle with the code that will be run by all workers.
  private async createBundle() {
    const workdir = await mkdtemp(path.join(tmpdir(), "wing-bundles-"));

    let contents = (await readFile(this.originalFile)).toString();

    // log a warning if contents includes __dirname or __filename
    if (contents.includes("__dirname") || contents.includes("__filename")) {
      this.addTrace(
        `Warning: __dirname and __filename cannot be used within bundled cloud functions. There may be unexpected behavior.`,
        false
      );
    }

    // wrap contents with a shim that handles the communication with the parent process
    // we insert this shim before bundling to ensure source maps are generated correctly
    contents = `
"use strict";
${contents}
process.on("message", async (message) => {
  const { fn, args } = message;
  try {
    const value = await exports[fn](...args);
    process.send({ type: "resolve", value });
  } catch (err) {
    process.send({ type: "reject", reason: err });
  }
});
`;
    const wrappedPath = this.originalFile.replace(/\.js$/, ".sandbox.js");
    writeFileSync(wrappedPath, contents); // async fsPromises.writeFile "flush" option is not available in Node 20
    const bundle = createBundle(wrappedPath, [], workdir);
    this.bundledFile = bundle.entrypointPath;

    if (process.env.DEBUG) {
      const fileStats = await stat(this.originalFile);
      this.addTrace(`Bundled code (${fileStats.size} bytes).`);
    }
  }

  public async init(): Promise<FunctionAttributes> {
    return {};
  }

  public async cleanup(): Promise<void> {
    await this.createBundlePromise;
    for (const worker of this.workers) {
      await worker.cleanup();
    }
  }

  public async save(): Promise<void> {}

  public async invoke(payload: string): Promise<string> {
    return this.context.withTrace({
      message: `Invoke (payload=${JSON.stringify(payload)}).`,
      activity: async () => {
        await this.createBundlePromise; // ensure inflight code is bundled before doing any work
        const worker = this.findAvailableWorker();
        if (!worker) {
          throw new Error(
            "Too many requests, the function has reach its concurrency limit."
          );
        }
        return worker.call("handler", payload);
      },
    });
  }

  public async invokeAsync(payload: string): Promise<void> {
    await this.context.withTrace({
      message: `InvokeAsync (payload=${JSON.stringify(payload)}).`,
      activity: async () => {
        await this.createBundlePromise; // ensure inflight code is bundled before doing any work
        const worker = this.findAvailableWorker();
        if (!worker) {
          throw new Error(
            "Too many requests, the function has reach its concurrency limit."
          );
        }
        process.nextTick(() => {
          // If the call fails, we log the error and continue since we've already
          // handed control back to the caller.
          void worker.call("handler", payload).catch((e) => {
            this.context.addTrace({
              data: {
                message: `InvokeAsync (payload=${JSON.stringify(payload)}).`,
                status: "failure",
                error: e,
              },
              type: TraceType.RESOURCE,
              sourcePath: this.context.resourcePath,
              sourceType: FUNCTION_FQN,
              timestamp: new Date().toISOString(),
            });
          });
        });
      },
    });
  }

  private findAvailableWorker(): Sandbox | undefined {
    const worker = this.workers.find((w) => w.isAvailable());
    if (worker) {
      return worker;
    }

    if (this.workers.length < this.maxWorkers) {
      const newWorker = this.initWorker();
      this.workers.push(newWorker);
      return newWorker;
    }

    return undefined;
  }

  private initWorker(): Sandbox {
    if (!this.bundledFile) {
      throw new Error("Bundle not created");
    }

    return new Sandbox(this.bundledFile, {
      env: {
        ...this.env,
        WING_SIMULATOR_URL: this.context.serverUrl,
      },
      timeout: this.timeout,
      log: (internal, _level, message) => {
        this.addTrace(message, internal);
      },
    });
  }

  private addTrace(message: string, internal: boolean = true) {
    this.context.addTrace({
      data: { message },
      type: internal ? TraceType.RESOURCE : TraceType.LOG,
      sourcePath: this.context.resourcePath,
      sourceType: FUNCTION_FQN,
      timestamp: new Date().toISOString(),
    });
  }
}
