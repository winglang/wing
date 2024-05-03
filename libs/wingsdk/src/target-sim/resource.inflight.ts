import { resolve } from "path";
import { IResourceClient, LogLevel, SIM_RESOURCE_FQN } from "./resource";
import { SimResourceAttributes, SimResourceSchema } from "./schema-resources";
import { Bundle } from "../shared/bundling";
import { Sandbox } from "../shared/sandbox";
import {
  ISimulatorContext,
  ISimulatorResourceInstance,
  UpdatePlan,
} from "../simulator";
import { Json, TraceType } from "../std";

export class Resource implements IResourceClient, ISimulatorResourceInstance {
  private _context: ISimulatorContext | undefined;
  private readonly sourceCodeFile: string;
  private resolvedSourceCodeFile!: string;
  private sandbox: Sandbox | undefined;
  private bundle: Bundle | undefined;

  constructor(props: SimResourceSchema) {
    this.sourceCodeFile = props.sourceCodeFile;
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

  public async init(
    context: ISimulatorContext
  ): Promise<SimResourceAttributes> {
    this._context = context;
    this.resolvedSourceCodeFile = resolve(context.simdir, this.sourceCodeFile);
    await this.createBundle();
    this.sandbox = new Sandbox(this.bundle!.outfilePath, {
      env: {
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

    // We're communicating with the sandbox via IPC. It's not possible to pass
    // an IResourceContext object directly because methods like `resolveToken`
    // are not serializable. So instead, a fake ctx object is created within the
    // inflight wrapper code - see `resource.ts`.
    try {
      const attrs: Record<string, string> = await this.sandbox.call(
        "start",
        this.context.statedir
      );
      return attrs;
    } catch (err) {
      this.context.addTrace({
        data: {
          message: "Error calling onStart",
          status: "failure",
          error: err,
        },
        type: TraceType.LOG,
        sourcePath: this.context.resourcePath,
        sourceType: SIM_RESOURCE_FQN,
        timestamp: new Date().toISOString(),
      });
      return {};
    }
  }

  public async cleanup(): Promise<void> {
    try {
      await this.sandbox!.call("stop");
    } catch (err) {
      this.context.addTrace({
        data: {
          message: "Error calling onStop",
          status: "failure",
          error: err,
        },
        type: TraceType.LOG,
        sourcePath: this.context.resourcePath,
        sourceType: SIM_RESOURCE_FQN,
        timestamp: new Date().toISOString(),
      });
    } finally {
      await this.sandbox!.cleanup();
    }
  }

  public async save(): Promise<void> {}

  public async plan(): Promise<UpdatePlan> {
    // TODO: support other update plans
    return UpdatePlan.REPLACE;
  }

  public async call(method: string, args: Array<Json> = []): Promise<Json> {
    return this.context.withTrace({
      activity: async () => {
        return this.sandbox!.call("call", method, ...args);
      },
      message: this.formatCallMessage(method, args),
    });
  }

  private formatCallMessage(method: string, args: Array<Json>): string {
    let message = method.toString();
    message += "(";
    for (let i = 0; i < args.length; i++) {
      let arg = args![i];
      if (arg === null || arg === undefined) {
        message += "nil";
      } else {
        message += JSON.stringify(args![i]);
      }
      if (i < args!.length - 1) {
        message += ", ";
      }
    }
    message += ")";
    return message;
  }

  private addTrace(message: string, type: TraceType, level?: LogLevel) {
    this.context.addTrace({
      data: { message, level },
      type,
      sourcePath: this.context.resourcePath,
      sourceType: SIM_RESOURCE_FQN,
      timestamp: new Date().toISOString(),
    });
  }
}
