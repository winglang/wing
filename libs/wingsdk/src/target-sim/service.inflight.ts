import { resolve } from "path";
import {
  SERVICE_TYPE,
  ServiceAttributes,
  ServiceSchema,
} from "./schema-resources";
import { IServiceClient } from "../cloud";
import { Sandbox } from "../shared/sandbox";
import { ISimulatorContext, ISimulatorResourceInstance } from "../simulator";
import { TraceType } from "../std";

export class Service implements IServiceClient, ISimulatorResourceInstance {
  private readonly context: ISimulatorContext;
  private readonly entrypoint: string;
  private readonly autoStart: boolean;
  private readonly sandbox: Sandbox;
  private running: boolean = false;

  constructor(props: ServiceSchema["props"], context: ISimulatorContext) {
    this.context = context;
    this.entrypoint = resolve(context.simdir, props.sourceCodeFile);
    this.autoStart = props.autoStart;
    this.sandbox = new Sandbox(this.entrypoint, {
      env: props.environmentVariables,
      context: { $simulator: this.context },
      log: (_level, message) => {
        this.context.addTrace({
          data: { message },
          type: TraceType.LOG,
          sourcePath: this.context.resourcePath,
          sourceType: SERVICE_TYPE,
          timestamp: new Date().toISOString(),
        });
      },
    });

    props;
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

  public async start(): Promise<void> {
    // Do nothing if service is already running.
    if (this.running) {
      return;
    }

    await this.sandbox.call("onStart");
    this.running = true;
  }

  public async stop(): Promise<void> {
    // Do nothing if service is already stopped.
    if (!this.running) {
      return;
    }

    await this.sandbox.call("onStop");
  }
}
