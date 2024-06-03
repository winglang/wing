import * as path from "path";
import { IResourceClient, SIM_RESOURCE_FQN } from "./resource";
import { SimResourceAttributes, SimResourceSchema } from "./schema-resources";
import { Bundle, isBundleInvalidated } from "../shared/bundling";
import {
  SandboxMultipleConcurrentCallsError,
  Sandbox,
  SandboxTimeoutError,
} from "../shared/sandbox";
import {
  ISimulatorContext,
  ISimulatorResourceInstance,
  UpdatePlan,
} from "../simulator";
import { Json, LogLevel, TraceType } from "../std";

export class Resource implements IResourceClient, ISimulatorResourceInstance {
  private _context: ISimulatorContext | undefined;
  private readonly sourceCodeFile: string;
  private resolvedSourceCodeFile!: string;
  private sandbox: Sandbox | undefined;
  private bundle: Bundle | undefined;
  private readonly timeout = 30_000;

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
      (msg, level) => {
        this.addTrace(msg, TraceType.RESOURCE, level);
      }
    );
  }

  public async init(
    context: ISimulatorContext
  ): Promise<SimResourceAttributes> {
    this._context = context;
    this.resolvedSourceCodeFile = path.resolve(
      context.simdir,
      this.sourceCodeFile
    );
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
      // A resource needs to respond to method calls in a timely manner since
      // the simulator server will wait for a response before responding to
      // the caller. The default timeout is 30 seconds.
      timeout: this.timeout,
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
          message: "Error initializing resource",
          status: "failure",
          error: err,
        },
        type: TraceType.LOG,
        level: LogLevel.ERROR,
        sourcePath: this.context.resourcePath,
        sourceType: SIM_RESOURCE_FQN,
        timestamp: new Date().toISOString(),
      });
      return {};
    }
  }

  public async cleanup(): Promise<void> {
    try {
      // TODO: set a timeout for the stop call
      while (true) {
        try {
          return await this.sandbox!.call("stop");
        } catch (err) {
          if (err instanceof SandboxMultipleConcurrentCallsError) {
            // If the sandbox is busy, wait and try again
            this.addTrace(
              "Sandbox is busy, waiting and retrying...",
              TraceType.SIMULATOR,
              LogLevel.VERBOSE
            );
            await new Promise((resolve) => setTimeout(resolve, 100));
          } else {
            throw err;
          }
        }
      }
    } catch (err) {
      this.context.addTrace({
        data: {
          message: "Error calling onStop",
          status: "failure",
          error: err,
        },
        type: TraceType.LOG,
        level: LogLevel.ERROR,
        sourcePath: this.context.resourcePath,
        sourceType: SIM_RESOURCE_FQN,
        timestamp: new Date().toISOString(),
      });
    } finally {
      await this.sandbox!.cleanup();
    }
  }

  public async save(): Promise<void> {}

  public async plan(invalidated: boolean): Promise<UpdatePlan> {
    // TODO: support customizing update plans
    if (invalidated) {
      return UpdatePlan.REPLACE;
    }

    // Check if any of the bundled files have changed since the last bundling
    const bundleInvalidated = await isBundleInvalidated(
      this.resolvedSourceCodeFile,
      this.bundle!,
      (msg) => this.addTrace(msg, TraceType.SIMULATOR, LogLevel.VERBOSE)
    );
    if (bundleInvalidated) {
      return UpdatePlan.REPLACE;
    }

    return UpdatePlan.SKIP;
  }

  public async call(method: string, args: Array<Json> = []): Promise<Json> {
    return this.context.withTrace({
      activity: async () => {
        // TODO: If requests take a long time for a resource to process,
        // we may end up passing requests to the sandbox after they have
        // timed out. We should consider adding a timeout to the call method
        // here or track the request's response deadline in some way.
        while (true) {
          try {
            return await this.sandbox!.call("call", method, ...args);
          } catch (err) {
            if (err instanceof SandboxMultipleConcurrentCallsError) {
              // If the sandbox is busy, wait and try again
              this.addTrace(
                "Sandbox is busy, waiting and retrying...",
                TraceType.SIMULATOR,
                LogLevel.VERBOSE
              );
              await new Promise((resolve) => setTimeout(resolve, 100));
            } else if (err instanceof SandboxTimeoutError) {
              throw new Error(
                `Call to resource "${this.context.resourcePath}" timed out after ${this.timeout}ms`
              );
            } else {
              throw err;
            }
          }
        }
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
      level: level ?? LogLevel.INFO,
      sourcePath: this.context.resourcePath,
      sourceType: SIM_RESOURCE_FQN,
      timestamp: new Date().toISOString(),
    });
  }
}
