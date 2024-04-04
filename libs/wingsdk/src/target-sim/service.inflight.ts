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
  private readonly context: ISimulatorContext;
  private readonly originalFile: string;
  private readonly autoStart: boolean;
  private sandbox: Sandbox | undefined;
  private bundle: Bundle | undefined;
  private createBundlePromise: Promise<void>;
  private running: boolean = false;
  private environmentVariables: Record<string, string>;

  constructor(props: ServiceSchema["props"], context: ISimulatorContext) {
    this.context = context;
    this.originalFile = resolve(context.simdir, props.sourceCodeFile);
    this.autoStart = props.autoStart;
    this.environmentVariables = props.environmentVariables ?? {};

    this.createBundlePromise = this.createBundle();
  }

  private async createBundle(): Promise<void> {
    this.bundle = await Sandbox.createBundle(this.originalFile, (msg) => {
      this.addTrace(msg);
    });
  }

  public async init(): Promise<ServiceAttributes> {
    if (this.autoStart) {
      await this.start();
    }
    return {};
  }

  public async cleanup(): Promise<void> {
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
      await this.createBundlePromise;
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
