import { resolve } from "path";
import {
  IResourceClient,
  IResourceContext,
  ResourceInflightMethods,
  SIM_RESOURCE_FQN,
} from "./resource";
import { ResourceSchema } from "./schema-resources";

import { LegacySandbox } from "../shared/legacy-sandbox";
import { ISimulatorContext, ISimulatorResourceInstance } from "../simulator";
import { TraceType } from "../std";

export class EmptyResource {}

export class Resource implements IResourceClient, ISimulatorResourceInstance {
  private readonly entrypoint: string;
  private readonly sandbox: LegacySandbox;

  constructor(
    props: ResourceSchema["props"],
    private readonly context: ISimulatorContext
  ) {
    this.entrypoint = resolve(context.simdir, props.sourceCodeFile);
    this.sandbox = new LegacySandbox(this.entrypoint, {
      env: {
        ...props.environmentVariables,
        WING_SIMULATOR_URL: this.context.serverUrl,
      },
      log: (internal, _level, message) => {
        this.context.addTrace({
          data: { message },
          type: internal ? TraceType.RESOURCE : TraceType.LOG,
          sourcePath: this.context.resourcePath,
          sourceType: SIM_RESOURCE_FQN,
          timestamp: new Date().toISOString(),
        });
      },
    });
  }

  public async start(_context: IResourceContext): Promise<void> {}
  public async stop(): Promise<void> {}

  public async init(): Promise<Record<string, any>> {
    const attrs: Record<string, any> = {};
    try {
      const context: IResourceContext = {
        statedir: this.context.statedir,
        resolveAttribute: (name, value) => {
          attrs[name] = value;
        },
      };
      await this.sandbox.call(ResourceInflightMethods.START, context);
    } catch (e: any) {
      this.context.addTrace({
        data: { message: `Failed to start resource: ${e.message}` },
        type: TraceType.RESOURCE,
        sourcePath: this.context.resourcePath,
        sourceType: SIM_RESOURCE_FQN,
        timestamp: new Date().toISOString(),
      });
    }

    return attrs;
  }

  public async cleanup(): Promise<void> {
    await this.sandbox.call(ResourceInflightMethods.STOP);
  }

  public async save(): Promise<void> {}

  public async attributeResolve(key: string, value: any): Promise<void> {
    this.context.setResourceAttributes(this.context.resourcePath, {
      [key]: value,
    });
  }
}
