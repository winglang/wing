import { resolve } from "path";
import {
  ServiceAttributes,
  ServiceAutoStarterSchema,
  ServiceSchema,
} from "./schema-resources";
import { IServiceClient, SERVICE_FQN } from "../cloud";
import { Bundle } from "../shared/bundling";
import { Sandbox } from "../shared/sandbox";
import { ISimulatorContext, ISimulatorResourceInstance } from "../simulator";
import { TraceType } from "../std";

export class Service implements IServiceClient, ISimulatorResourceInstance {
  private _context: ISimulatorContext | undefined;
  private readonly sourceCodeFile: string;
  private resolvedSourceCodeFile!: string;
  private sandbox: Sandbox | undefined;
  private bundle: Bundle | undefined;
  private running: boolean = false;
  private environmentVariables: Record<string, string>;
  private createBundlePromise!: Promise<void>;

  constructor(props: ServiceSchema["props"]) {
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
    this.bundle = await Sandbox.createBundle(
      this.resolvedSourceCodeFile,
      (msg) => {
        this.addTrace(msg);
      }
    );
  }

  public async init(context: ISimulatorContext): Promise<ServiceAttributes> {
    this._context = context;
    this.resolvedSourceCodeFile = resolve(context.simdir, this.sourceCodeFile);
    this.createBundlePromise = this.createBundle();
    return {};
  }

  public async cleanup(): Promise<void> {
    await this.createBundlePromise;
    await this.stop();
  }

  public async save(): Promise<void> {}

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
        WING_SIMULATOR_CALLER: this.context.resourceHandle,
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

export class ServiceAutoStarter implements ISimulatorResourceInstance {
  private readonly serviceHandle: string;

  public constructor(props: ServiceAutoStarterSchema["props"]) {
    this.serviceHandle = props.service;
  }

  public async init(context: ISimulatorContext): Promise<ServiceAttributes> {
    const service = context.getClient(this.serviceHandle, true) as Service;
    await service.start();
    return {};
  }

  public async cleanup(): Promise<void> {}
  public async save(): Promise<void> {}
}
