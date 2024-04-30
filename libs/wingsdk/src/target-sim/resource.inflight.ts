import { resolve } from "path";
import { IResourceClient, SIM_RESOURCE_FQN } from "./resource";
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
      log: (internal, _level, message) => {
        this.addTrace(message, internal ? TraceType.SIMULATOR : TraceType.LOG);
      },
    });
    await this.sandbox.call("start");
    return {};
  }

  public async cleanup(): Promise<void> {
    await this.sandbox!.call("stop");
    await this.sandbox!.cleanup();
  }

  public async save(): Promise<void> {}

  public async plan(): Promise<UpdatePlan> {
    // TODO: support other update plans
    return UpdatePlan.REPLACE;
  }

  public async call(method: string, args?: Array<Json>): Promise<Json> {
    return this.context.withTrace({
      activity: async () => {
        return this.sandbox!.call("call", method, ...(args ?? []));
      },
      message: `${method}(${args?.join(", ")})`,
    });
  }

  private addTrace(message: string, type: TraceType) {
    this.context.addTrace({
      data: { message },
      type,
      sourcePath: this.context.resourcePath,
      sourceType: SIM_RESOURCE_FQN,
      timestamp: new Date().toISOString(),
    });
  }
}
