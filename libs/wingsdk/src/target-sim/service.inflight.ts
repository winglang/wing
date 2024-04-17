import { resolve } from "path";
import { ServiceAttributes, ServiceSchema } from "./schema-resources";
import { IServiceClient, SERVICE_FQN } from "../cloud";
import { Bundle } from "../shared/bundling";
import { Sandbox } from "../shared/sandbox";
import {
  ISimulatorContext,
  ISimulatorResourceInstance,
  UpdatePlan,
} from "../simulator";
import { TraceType } from "../std";

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

  private async createBundle(): Promise<void> {
    this.bundle = await Sandbox.createBundle(
      this.resolvedSourceCodeFile,
      (msg) => {
        this.addTrace(msg, TraceType.SIMULATOR);
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

  public async plan(): Promise<UpdatePlan> {
    // for now, always replace because we can't determine if the function code
    // has changed since the last update. see https://github.com/winglang/wing/issues/6116
    return UpdatePlan.REPLACE;
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
        TraceType.RESOURCE
      );
      return;
    }

    this.sandbox = new Sandbox(this.bundle.outfilePath, {
      env: {
        ...this.environmentVariables,
        WING_SIMULATOR_URL: this.context.serverUrl,
        WING_SIMULATOR_CALLER: this.context.resourceHandle,
      },
      log: (internal, _level, message) => {
        this.addTrace(message, internal ? TraceType.SIMULATOR : TraceType.LOG);
      },
    });

    try {
      await this.sandbox.call("start");
      this.running = true;
    } catch (e: any) {
      this.addTrace(
        `Failed to start service: ${e.message}`,
        TraceType.RESOURCE
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
        TraceType.RESOURCE
      );
    }
  }

  public async started(): Promise<boolean> {
    return this.running;
  }

  private addTrace(message: string, type: TraceType) {
    this.context.addTrace({
      data: { message },
      type,
      sourcePath: this.context.resourcePath,
      sourceType: SERVICE_FQN,
      timestamp: new Date().toISOString(),
    });
  }
}
