import { IFunctionClient, IServiceClient, TraceType } from "../cloud";
import { ISimulatorContext, ISimulatorResourceInstance } from "../testing";
import { SERVICE_TYPE, ServiceAttributes, ServiceSchema } from "./schema-resources";

export class Service implements IServiceClient, ISimulatorResourceInstance {
  private readonly context: ISimulatorContext;
  private readonly onStartHandler: string;
  private readonly onStopHandler?: string;
  private readonly autoStart: boolean;
  private running: boolean = false;

  constructor(props: ServiceSchema["props"], context: ISimulatorContext) {
    this.context = context;
    this.onStartHandler = props.onStartHandler;
    this.onStopHandler = props.onStopHandler;
    this.autoStart = props.autoStart;
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
  
    const fnClient = this.context.findInstance(this.onStartHandler) as ISimulatorResourceInstance & IFunctionClient;
    if (!fnClient) {
      throw new Error("No function client found!");
    }

    this.context.addTrace({
      type: TraceType.RESOURCE,
      data: {
        message: `Starting service (onStartHandler=${this.onStartHandler}).`,
      },
      sourcePath: this.context.resourcePath,
      sourceType: SERVICE_TYPE,
      timestamp: new Date().toISOString(),
    });
    await fnClient.invoke("");
    this.running = true;
  }

  public async stop(): Promise<void> {
    // Do nothing if service is already stopped.
    if (!this.running || !this.onStopHandler) {
      return;
    }

    const fnClient = this.context.findInstance(this.onStopHandler!) as ISimulatorResourceInstance & IFunctionClient;

    this.context.addTrace({
      type: TraceType.RESOURCE,
      data: {
        message: `Stopping service (onStopHandler=${this.onStopHandler}).`,
      },
      sourcePath: this.context.resourcePath,
      sourceType: SERVICE_TYPE,
      timestamp: new Date().toISOString(),
    });

    await fnClient.invoke("");

    this.running = false;
  }
}