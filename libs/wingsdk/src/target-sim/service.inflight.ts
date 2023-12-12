import { resolve } from "path";
import { ServiceAttributes, ServiceSchema } from "./schema-resources";
import {
  IServiceClient,
  IServiceStopHandlerClient,
  SERVICE_FQN,
} from "../cloud";
import { Sandbox } from "../shared/sandbox";
import { ISimulatorContext, ISimulatorResourceInstance } from "../simulator";
import { TraceType } from "../std";

export class Service implements IServiceClient, ISimulatorResourceInstance {
  private readonly context: ISimulatorContext;
  private readonly entrypoint: string;
  private readonly autoStart: boolean;
  private readonly sandbox: Sandbox;
  private running: boolean = false;
  private onStop?: IServiceStopHandlerClient;

  constructor(props: ServiceSchema["props"], context: ISimulatorContext) {
    this.context = context;
    this.entrypoint = resolve(context.simdir, props.sourceCodeFile);
    this.autoStart = props.autoStart;
    this.sandbox = new Sandbox(this.entrypoint, {
      env: {
        ...props.environmentVariables,
        WING_SIMULATOR_URL: this.context.serverUrl,
      },
      log: (internal, _level, message) => {
        this.context.addTrace({
          data: { message },
          type: internal ? TraceType.RESOURCE : TraceType.LOG,
          sourcePath: this.context.resourcePath,
          sourceType: SERVICE_FQN,
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

  public async save(): Promise<void> {}

  public async start(): Promise<void> {
    // Do nothing if service is already running.
    if (this.running) {
      return;
    }

    this.onStop = await this.sandbox.call("handle");
    this.running = true;
  }

  public async stop(): Promise<void> {
    // Do nothing if service is already stopped.
    if (!this.running) {
      return;
    }

    if (this.onStop) {
      // wing has a quirk where it will return either a function or an object that implements
      // "handle", depending on whether the closure is defined in an inflight context or preflight
      // context. so we need to handle both options here. (in wing this is handled by the compiler).
      if (typeof this.onStop === "function") {
        await (this.onStop as any)();
      } else {
        await this.onStop.handle();
      }
    }

    this.running = false;
  }

  public async started(): Promise<boolean> {
    return this.running;
  }
}
