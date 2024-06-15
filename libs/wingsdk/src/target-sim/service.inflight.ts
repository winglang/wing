import { resolve } from "path";
import { ServiceAttributes, ServiceSchema } from "./schema-resources";
import { IServiceClient, SERVICE_FQN } from "../cloud";
import { Bundle, isBundleInvalidated } from "../shared/bundling";
import { Sandbox } from "../shared/sandbox";
import {
  ISimulatorContext,
  ISimulatorResourceInstance,
  UpdatePlan,
  getCallerLocation,
} from "../simulator";
import { LogLevel, TraceType } from "../std";

export class Service implements IServiceClient, ISimulatorResourceInstance {
  private _context: ISimulatorContext | undefined;
  private readonly sourceCodeFile: string;
  private readonly autoStart: boolean;
  private resolvedSourceCodeFile!: string;
  private sandbox: Sandbox | undefined;
  private bundle: Bundle | undefined;
  private running: boolean = false;
  private environmentVariables: Record<string, string>;
  private createBundlePromise!: Promise<void>;

  constructor(props: ServiceSchema) {
    this.sourceCodeFile = props.sourceCodeFile;
    this.autoStart = props.autoStart;
    this.environmentVariables = props.environmentVariables ?? {};
  }

  private get context(): ISimulatorContext {
    if (!this._context) {
      throw new Error("Cannot access context during class construction");
    }
    return this._context;
  }

  private async ensureBundled(): Promise<void> {
    await this.createBundlePromise;
    if (!this.bundle) {
      throw new Error("Bundle not created");
    }
  }

  private async createBundle(): Promise<void> {
    this.bundle = await Sandbox.createBundle(
      this.resolvedSourceCodeFile,
      (msg, level) => {
        this.addTrace(msg, TraceType.RESOURCE, level);
      }
    );
  }

  public async init(context: ISimulatorContext): Promise<ServiceAttributes> {
    this._context = context;
    this.resolvedSourceCodeFile = resolve(context.simdir, this.sourceCodeFile);
    this.createBundlePromise = this.createBundle();
    if (this.autoStart) {
      await this.start();
    }
    return {};
  }

  public async cleanup(): Promise<void> {
    await this.createBundlePromise;
    await this.stop();
  }

  public async save(): Promise<void> {}

  public async plan(invalidated: boolean): Promise<UpdatePlan> {
    if (invalidated) {
      return UpdatePlan.REPLACE;
    }

    // Make sure that we don't have an ongoing bundle operation
    await this.ensureBundled();

    // Check if any of the bundled files have changed since the last bundling
    const bundleInvalidated = await isBundleInvalidated(
      this.resolvedSourceCodeFile,
      this.bundle!,
      (msg) => this.addTrace(msg, TraceType.SIMULATOR, LogLevel.VERBOSE)
    );
    if (bundleInvalidated) {
      return UpdatePlan.REPLACE;
    }

    return UpdatePlan.SKIP;
  }

  public async start(): Promise<void> {
    // Do nothing if service is already running.
    if (this.running) {
      return;
    }

    await this.createBundlePromise;

    if (!this.bundle) {
      this.addTrace(
        "Failed to start service: bundle is not created",
        TraceType.RESOURCE,
        LogLevel.ERROR
      );
      return;
    }

    this.sandbox = new Sandbox(this.bundle.outfilePath, {
      env: {
        ...this.environmentVariables,
        WING_SIMULATOR_URL: this.context.serverUrl,
        WING_SIMULATOR_CALLER: this.context.resourceHandle,
      },
      log: (internal, level, message) => {
        this.addTrace(
          message,
          internal ? TraceType.SIMULATOR : TraceType.LOG,
          level
        );
      },
    });

    try {
      await this.sandbox.call("start");
      this.running = true;
    } catch (e: any) {
      this.addTrace(
        `Failed to start service: ${e.message}`,
        TraceType.RESOURCE,
        LogLevel.ERROR
      );
    }
  }

  public async stop(): Promise<void> {
    // Do nothing if service is already stopped.
    if (!this.running || !this.sandbox) {
      return;
    }

    try {
      this.running = false;
      await this.createBundlePromise;
      await this.sandbox.call("stop");
      await this.sandbox.cleanup();
    } catch (e: any) {
      this.addTrace(
        `Failed to stop service: ${e.message} ${e.stack}`,
        TraceType.RESOURCE,
        LogLevel.ERROR
      );
    }
  }

  public async started(): Promise<boolean> {
    return this.running;
  }

  private addTrace(message: string, type: TraceType, level: LogLevel) {
    this.context.addTrace({
      data: { message },
      type,
      sourcePath: this.context.resourcePath,
      sourceType: SERVICE_FQN,
      timestamp: new Date().toISOString(),
      sourceCode: getCallerLocation(),
      level,
    });
  }
}
