import { resolve } from "path";
import { ServiceAttributes, ServiceSchema } from "./schema-resources";
import { IServiceClient, SERVICE_FQN } from "../cloud";
import { Bundle } from "../shared/bundling";
import { Sandbox } from "../shared/sandbox";
import { ISimulatorContext, ISimulatorResourceInstance } from "../simulator";
import { TraceType } from "../std";

export class Service implements IServiceClient, ISimulatorResourceInstance {
  private _context: ISimulatorContext | undefined;
  private readonly sourceCodeFile: string;
  private originalFile!: string;
  private readonly autoStart: boolean;
  private sandbox: Sandbox | undefined;
  private bundle: Bundle | undefined;
  private running: boolean = false;
  private environmentVariables: Record<string, string>;

  constructor(props: ServiceSchema["props"]) {
    this.autoStart = props.autoStart;
    this.sourceCodeFile = props.sourceCodeFile;
    this.environmentVariables = props.environmentVariables ?? {};
  }

  private get context(): ISimulatorContext {
    if (!this._context) {
      throw new Error("Cannot access context during class construction");
    }
    return this._context;
  }

  private async createBundle(): Promise<void> {
    this.bundle = await Sandbox.createBundle(this.originalFile, (msg) => {
      this.addTrace(msg);
    });
  }

  public async init(context: ISimulatorContext): Promise<ServiceAttributes> {
    this._context = context;
    this.originalFile = resolve(context.simdir, this.sourceCodeFile);
    await this.createBundle();
    if (this.autoStart) {
      await this.start();
    }
    return {};
  }

  public async cleanup(): Promise<void> {
    await this.stop();
  }

  public async save(): Promise<void> {}

  public async start(): Promise<void> {
    // Do nothing if service is already running.
    if (this.running) {
      return;
    }

    if (!this.bundle) {
      this.addTrace("Failed to start service: bundle is not created");
      return;
    }

    this.sandbox = new Sandbox(this.bundle.entrypointPath, {
      env: {
        ...this.environmentVariables,
        WING_SIMULATOR_URL: this.context.serverUrl,
      },
      log: (internal, _level, message) => {
        this.addTrace(message, internal);
      },
    });

    try {
      await this.sandbox.call("start");
      this.running = true;
    } catch (e: any) {
      this.addTrace(`Failed to start service: ${e.message}`);
    }
  }

  public async stop(): Promise<void> {
    // Do nothing if service is already stopped.
    if (!this.running || !this.sandbox) {
      return;
    }

    try {
      this.running = false;
      await this.sandbox.call("stop");
      await this.sandbox.cleanup();
    } catch (e: any) {
      this.addTrace(`Failed to stop service: ${e.message}`);
    }
  }

  public async started(): Promise<boolean> {
    return this.running;
  }

  private addTrace(message: string, internal: boolean = true) {
    this.context.addTrace({
      data: { message },
      type: internal ? TraceType.RESOURCE : TraceType.LOG,
      sourcePath: this.context.resourcePath,
      sourceType: SERVICE_FQN,
      timestamp: new Date().toISOString(),
    });
  }
}
