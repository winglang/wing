import { resolve } from "path";
import {
  IResourceContext,
  ResourceInflightMethods,
  SIM_RESOURCE_FQN,
} from "./resource";
import { ResourceSchema } from "./schema-resources";

import { Bundle } from "../shared/bundling";
import { Sandbox } from "../shared/sandbox";
import { ISimulatorContext, ISimulatorResourceInstance } from "../simulator";
import { TraceType } from "../std";

export class EmptyResource {}

export class Resource implements ISimulatorResourceInstance {
  private readonly originalFile: string;
  private sandbox: Sandbox | undefined;
  private bundle: Bundle | undefined;
  private createBundlePromise: Promise<void>;

  constructor(
    private readonly props: ResourceSchema["props"],
    private readonly context: ISimulatorContext
  ) {
    this.originalFile = resolve(context.simdir, props.sourceCodeFile);
    this.createBundlePromise = this.createBundle();
  }

  private async createBundle(): Promise<void> {
    this.bundle = await Sandbox.createBundle(this.originalFile, (msg) => {
      this.addTrace(msg);
    });
  }

  public async init(): Promise<Record<string, any>> {
    // ensure resource code is bundled before we start the resource
    await this.createBundlePromise;

    if (!this.bundle) {
      throw new Error("Bundle not created");
    }

    this.sandbox = new Sandbox(this.bundle.entrypointPath, {
      env: {
        ...this.props.environmentVariables,
        WING_SIMULATOR_URL: this.context.serverUrl,
      },
      log: (internal, _level, message) => {
        this.addTrace(message, internal);
      },
    });

    const attrs: Record<string, any> = {};
    try {
      const context: IResourceContext = {
        statedir: this.context.statedir,
        // resolveAttribute: (name, value) => {
        //   attrs[name] = value;
        // },
      } as any;
      await this.sandbox.call(ResourceInflightMethods.START, context);
    } catch (e: any) {
      this.context.addTrace({
        data: {
          message: `Failed to start resource: ${e.toString()}`,
          status: "failure",
          error: e,
        },
        type: TraceType.RESOURCE,
        sourcePath: this.context.resourcePath,
        sourceType: SIM_RESOURCE_FQN,
        timestamp: new Date().toISOString(),
      });
    }

    return attrs;
  }

  public async $callMethod(method: string, args: any[]): Promise<any> {
    if (!this.sandbox) {
      throw new Error("Resource not initialized yet");
    }

    return this.sandbox.call(method, ...args);
  }

  public async cleanup(): Promise<void> {
    if (this.sandbox) {
      await this.sandbox.call(ResourceInflightMethods.STOP);
      await this.sandbox.cleanup();
    }
  }

  public async save(): Promise<void> {}

  public async attributeResolve(key: string, value: any): Promise<void> {
    this.context.setResourceAttributes(this.context.resourcePath, {
      [key]: value,
    });
  }

  private addTrace(message: string, internal: boolean = true) {
    this.context.addTrace({
      data: { message },
      type: internal ? TraceType.RESOURCE : TraceType.LOG,
      sourcePath: this.context.resourcePath,
      sourceType: SIM_RESOURCE_FQN,
      timestamp: new Date().toISOString(),
    });
  }
}
