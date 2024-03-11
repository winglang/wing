import * as path from "path";
import { FunctionAttributes, FunctionSchema } from "./schema-resources";
import { FUNCTION_FQN, IFunctionClient } from "../cloud";
import { Bundle } from "../shared/bundling";
import { Sandbox } from "../shared/sandbox";
import {
  ISimulatorContext,
  ISimulatorResourceInstance,
} from "../simulator/simulator";
import { TraceType } from "../std";

export class Function implements IFunctionClient, ISimulatorResourceInstance {
  private readonly originalFile: string;
  private bundle: Bundle | undefined;
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

  public async init(): Promise<FunctionAttributes> {
    return {};
  }

  public async cleanup(): Promise<void> {
    // We wait for the bundle to be created since there's no way to otherwise cancel the work.
    // If the simulator runs for a short time (and cloud.Function is created and then deleted)
    // and the bundling code is allowed to run after the simulator has stopped, it might fail
    // and throw an error to the user because the files the simulator was using may no longer be there there.
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
        const worker = await this.findAvailableWorker();
        if (!worker) {
          throw new Error(
            "Too many requests, the function has reached its concurrency limit."
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
        const worker = await this.findAvailableWorker();
        if (!worker) {
          throw new Error(
            "Too many requests, the function has reached its concurrency limit."
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

  private async createBundle(): Promise<void> {
    this.bundle = await Sandbox.createBundle(this.originalFile, (msg) => {
      this.addTrace(msg);
    });
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
    await this.createBundlePromise;

    if (!this.bundle) {
      throw new Error("Bundle not created");
    }

    return new Sandbox(this.bundle.entrypointPath, {
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
