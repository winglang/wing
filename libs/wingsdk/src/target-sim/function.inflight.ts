import * as path from "path";
import { FunctionAttributes, FunctionSchema } from "./schema-resources";
import { FUNCTION_FQN, IFunctionClient } from "../cloud";
import { Bundle, isBundleInvalidated } from "../shared/bundling";
import { Sandbox, SandboxTimeoutError } from "../shared/sandbox";
import {
  ISimulatorContext,
  ISimulatorResourceInstance,
  UpdatePlan,
} from "../simulator/simulator";
import { LogLevel, Json, TraceType } from "../std";

export class Function implements IFunctionClient, ISimulatorResourceInstance {
  private readonly sourceCodeFile: string;
  private originalFile!: string;
  private bundle: Bundle | undefined;
  private readonly env: Record<string, string>;
  private _context: ISimulatorContext | undefined;
  private readonly timeout: number;
  private readonly maxWorkers: number;
  private readonly workers = new Array<Sandbox>();
  private createBundlePromise!: Promise<void>;

  constructor(props: FunctionSchema) {
    this.sourceCodeFile = props.sourceCodeFile;
    if (props.sourceCodeLanguage !== "javascript") {
      throw new Error("Only JavaScript is supported");
    }
    this.env = props.environmentVariables ?? {};
    this.timeout = props.timeout;
    this.maxWorkers = props.concurrency;
  }

  private get context(): ISimulatorContext {
    if (!this._context) {
      throw new Error("Cannot access context during class construction");
    }
    return this._context;
  }

  public async init(context: ISimulatorContext): Promise<FunctionAttributes> {
    this._context = context;
    this.originalFile = path.resolve(context.simdir, this.sourceCodeFile);
    this.createBundlePromise = this.createBundle();
    return {};
  }

  public async cleanup(): Promise<void> {
    // We wait for the bundle to be created since there's no way to otherwise cancel the work.
    // If the simulator runs for a short time (and cloud.Function is created and then deleted)
    // and the bundling code is allowed to run after the simulator has stopped, it might fail
    // and throw an error to the user because the files the simulator was using may no longer be there there.
    await this.createBundlePromise;
    await Promise.allSettled(this.workers.map((w) => w.cleanup()));
  }

  public async save(): Promise<void> {}

  public async plan(invalidated: boolean): Promise<UpdatePlan> {
    // If our function config changed, always replace
    if (invalidated) {
      return UpdatePlan.REPLACE;
    }

    // Make sure that we don't have an ongoing bundle operation
    await this.ensureBundled();

    // Check if any of the bundled files have changed since the last bundling
    const bundleInvalidated = await isBundleInvalidated(
      this.originalFile,
      this.bundle!,
      (msg) => this.addTrace(msg, TraceType.SIMULATOR, LogLevel.VERBOSE)
    );
    if (bundleInvalidated) {
      return UpdatePlan.REPLACE;
    }

    return UpdatePlan.SKIP;
  }

  public async invoke(payload: Json): Promise<Json> {
    return this.context.withTrace({
      message: `Invoke (payload=${JSON.stringify(payload)}).`,
      activity: async () => {
        const worker = await this.findAvailableWorker();
        if (!worker) {
          throw new Error(
            "Too many requests, the function has reached its concurrency limit."
          );
        }
        try {
          return await worker.call("handler", payload);
        } catch (err) {
          if (err instanceof SandboxTimeoutError) {
            throw new Error(
              `Function timed out (it was configured with a timeout of ${this.timeout}ms).`
            );
          } else {
            throw err;
          }
        }
      },
    });
  }

  public async invokeAsync(payload: Json): Promise<void> {
    await this.context.withTrace({
      message: `InvokeAsync (payload=${JSON.stringify(payload)}).`,
      activity: async () => {
        const worker = await this.findAvailableWorker();
        if (!worker) {
          throw new Error(
            "Too many requests, the function has reached its concurrency limit."
          );
        }
        process.nextTick(() => {
          void worker.call("handler", payload).catch((e) => {
            // If the call fails, we log the error and continue since we've already
            // handed control back to the caller.
            this.context.addTrace({
              data: {
                message: `InvokeAsync (payload=${JSON.stringify(
                  payload
                )}) failure.`,
                status: "failure",
                error: e,
              },
              type: TraceType.LOG,
              level: LogLevel.ERROR,
              sourcePath: this.context.resourcePath,
              sourceType: FUNCTION_FQN,
              timestamp: new Date().toISOString(),
            });
          });
        });
      },
    });
  }

  private async createBundle(): Promise<void> {
    this.bundle = await Sandbox.createBundle(
      this.originalFile,
      (msg, level) => {
        this.addTrace(msg, TraceType.RESOURCE, level);
      }
    );
  }

  private async ensureBundled(): Promise<void> {
    await this.createBundlePromise;
    if (!this.bundle) {
      throw new Error("Bundle not created");
    }
  }

  // Used internally by cloud.Queue to apply backpressure
  public async hasAvailableWorkers(): Promise<boolean> {
    return (
      this.workers.length < this.maxWorkers ||
      this.workers.some((w) => w.isAvailable())
    );
  }

  private async findAvailableWorker(): Promise<Sandbox | undefined> {
    const worker = this.workers.find((w) => w.isAvailable());
    if (worker) {
      return worker;
    }

    if (this.workers.length < this.maxWorkers) {
      const newWorker = await this.initWorker();
      this.workers.push(newWorker);
      return newWorker;
    }

    return undefined;
  }

  private async initWorker(): Promise<Sandbox> {
    // ensure inflight code is bundled before we create any workers
    await this.ensureBundled();

    return new Sandbox(this.bundle!.outfilePath, {
      env: {
        ...this.env,
        WING_SIMULATOR_CALLER: this.context.resourceHandle,
        WING_SIMULATOR_URL: this.context.serverUrl,
      },
      timeout: this.timeout,
      log: (internal, level, message) => {
        this.addTrace(
          message,
          internal ? TraceType.SIMULATOR : TraceType.LOG,
          level
        );
      },
    });
  }

  private addTrace(message: string, type: TraceType, level: LogLevel) {
    this.context.addTrace({
      data: { message },
      type,
      level,
      sourcePath: this.context.resourcePath,
      sourceType: FUNCTION_FQN,
      timestamp: new Date().toISOString(),
    });
  }
}
