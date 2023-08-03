import { existsSync } from "fs";
import { join } from "path";
import { Tree } from "./tree";
import { SDK_VERSION } from "../constants";
import { ConstructTree } from "../core";
import { readJsonSync } from "../shared/misc";
import { Trace, TraceType } from "../std";
// eslint-disable-next-line import/no-restricted-paths
import { DefaultSimulatorFactory } from "../target-sim/factory.inflight";
import { isToken } from "../target-sim/tokens";

const START_ATTEMPT_COUNT = 10;

/**
 * Props for `Simulator`.
 */
export interface SimulatorProps {
  /**
   * Path to a Wing simulator output directory (.wsim).
   */
  readonly simfile: string;

  /**
   * The factory that produces resource simulations.
   *
   * @default - a factory that produces simulations for built-in Wing SDK
   * resources
   */
  readonly factory?: ISimulatorFactory;
}

/**
 * A collection of callbacks that are invoked at key lifecycle events of the
 * simulator.
 */
export interface ISimulatorLifecycleHooks {
  /**
   * A function to run whenever a trace is emitted.
   */
  onTrace?(event: Trace): void;
}

// Since we are using JSII we cannot use generics to type this right now:
//
// Export interface WithTraceProps<T> {
//   Readonly activity: () => Promise<T>;
// }
// ...
// WithTrace(event: WithTraceProps<T>): Promise<T>;

/**
 * Props for `ISimulatorContext.withTrace`.
 */
export interface IWithTraceProps {
  /**
   * The trace message.
   */
  readonly message: any;

  /**
   * A function to run as part of the trace.
   */
  activity(): Promise<any>;
}

/**
 * Context that is passed to individual resource simulations.
 */
export interface ISimulatorContext {
  /**
   * This directory where the compilation output is
   */
  readonly simdir: string;

  /**
   * The path of the resource that is being simulated.
   */
  readonly resourcePath: string;

  /**
   * Find a resource simulation by its handle. Throws if the handle isn't valid.
   */
  findInstance(handle: string): ISimulatorResourceInstance;

  /**
   * Add a trace. Traces are breadcrumbs of information about resource
   * operations that occurred during simulation, useful for understanding how
   * resources interact or debugging an application.
   */
  addTrace(trace: Trace): void;

  /**
   * Register a trace associated with a resource activity. The activity will be
   * run, and the trace will be populated with the result's success or failure.
   */
  withTrace(trace: IWithTraceProps): Promise<any>;

  /**
   * Get a list of all traces until this point.
   */
  listTraces(): Trace[];
}

/**
 * A subscriber that can listen for traces emitted by the simulator.
 */
export interface ITraceSubscriber {
  /**
   * Called when a trace is emitted.
   */
  callback(event: Trace): void;
}

/**
 * A simulator that can be used to test your application locally.
 */
export class Simulator {
  // Fields that are same between simulation runs / reloads
  private readonly _factory: ISimulatorFactory;
  private _config: WingSimulatorSchema;
  private readonly simdir: string;

  // Fields that change between simulation runs / reloads
  private _running: boolean;
  private readonly _handles: HandleManager;
  private _traces: Array<Trace>;
  private readonly _traceSubscribers: Array<ITraceSubscriber>;
  private _tree: Tree;

  constructor(props: SimulatorProps) {
    this.simdir = props.simfile;
    const { config, treeData } = this._loadApp(props.simfile);
    this._config = config;
    this._tree = new Tree(treeData);

    this._running = false;
    this._factory = props.factory ?? new DefaultSimulatorFactory();
    this._handles = new HandleManager();
    this._traces = new Array();
    this._traceSubscribers = new Array();
  }

  private _loadApp(simdir: string): {
    config: any;
    treeData: ConstructTree;
  } {
    const simJson = join(this.simdir, "simulator.json");
    if (!existsSync(simJson)) {
      throw new Error(
        `Invalid Wing app (${simdir}) - simulator.json not found.`
      );
    }

    const config: WingSimulatorSchema = readJsonSync(simJson);

    const foundVersion = config.sdkVersion ?? "unknown";
    const expectedVersion = SDK_VERSION;
    if (foundVersion !== expectedVersion) {
      console.error(
        `WARNING: The simulator directory (${simdir}) was generated with Wing SDK v${foundVersion} but it is being simulated with Wing SDK v${expectedVersion}.`
      );
    }
    if (config.resources === undefined) {
      throw new Error(
        `Incompatible .wsim file. The simulator directory (${simdir}) was generated with Wing SDK v${foundVersion} but it is being simulated with Wing SDK v${expectedVersion}.`
      );
    }

    const treeJson = join(this.simdir, "tree.json");
    if (!existsSync(treeJson)) {
      throw new Error(`Invalid Wing app (${simdir}) - tree.json not found.`);
    }
    const treeData = readJsonSync(treeJson);

    return { config, treeData };
  }

  /**
   * Start the simulator.
   */
  public async start(): Promise<void> {
    if (this._running) {
      throw new Error(
        "A simulation is already running. Did you mean to call `await simulator.stop()` first?"
      );
    }

    // Create a copy of the resource list to be used as an init queue.
    const initQueue: (BaseResourceSchema & { _attempts?: number })[] = [
      ...this._config.resources,
    ];

    while (true) {
      const next = initQueue.shift();
      if (!next) {
        break;
      }

      // We couldn't start this resource yet, so decrement the retry counter and put it back in
      // The init queue.
      if (!(await this.tryStartResource(next))) {
        // We couldn't start this resource yet, so decrement the attempt counter
        next._attempts = next._attempts ?? START_ATTEMPT_COUNT;
        next._attempts--;

        // If we've tried too many times, give up (might be a dependency cycle or a bad reference)
        if (next._attempts === 0) {
          throw new Error(
            `Could not start resource ${next.path} after ${START_ATTEMPT_COUNT} attempts. This could be due to a dependency cycle or an invalid attribute reference.`
          );
        }

        // Put back in the queue for another round
        initQueue.push(next);
      }
    }

    this._running = true;
  }

  /**
   * Stop the simulation and clean up all resources.
   */
  public async stop(): Promise<void> {
    if (!this._running) {
      throw new Error(
        "There is no running simulation to stop. Did you mean to call `await simulator.start()` first?"
      );
    }

    for (const resourceConfig of this._config.resources.slice().reverse()) {
      const handle = resourceConfig.attrs?.handle;
      if (!handle) {
        throw new Error(
          `Resource ${resourceConfig.path} could not be cleaned up, no handle for it was found.`
        );
      }
      const resource = this._handles.deallocate(resourceConfig.attrs!.handle);
      await resource.cleanup();

      let event: Trace = {
        type: TraceType.RESOURCE,
        data: { message: `${resourceConfig.type} deleted.` },
        sourcePath: resourceConfig.path,
        sourceType: resourceConfig.type,
        timestamp: new Date().toISOString(),
      };
      this._addTrace(event);
    }

    this._handles.reset();
    this._running = false;
  }

  /**
   * Stop the simulation, reload the simulation tree from the latest version of
   * the app file, and restart the simulation.
   */
  public async reload(): Promise<void> {
    await this.stop();

    const { config, treeData } = this._loadApp(this.simdir);
    this._config = config;
    this._tree = new Tree(treeData);

    await this.start();
  }

  /**
   * Get a list of all resource paths.
   */
  public listResources(): string[] {
    return this._config.resources.map((config) => config.path).sort();
  }

  /**
   * Get a list of all traces from the most recent simulation run.
   */
  public listTraces(): Trace[] {
    return [...this._traces];
  }

  /**
   * Get a simulated resource instance.
   * @returns the resource
   */
  public getResource(path: string): any {
    const handle = this.tryGetResource(path);
    if (!handle) {
      throw new Error(`Resource "${path}" not found.`);
    }
    return handle;
  }

  /**
   * Get a simulated resource instance.
   * @returns The resource of undefined if not found
   */
  public tryGetResource(path: string): any | undefined {
    const handle = this.tryGetResourceConfig(path)?.attrs.handle;
    if (!handle) {
      return undefined;
    }

    return this._handles.find(handle);
  }

  /**
   * Obtain a resource's configuration, including its type, props, and attrs.
   * @returns The resource configuration or undefined if not found
   */
  public tryGetResourceConfig(path: string): BaseResourceSchema | undefined {
    // Shorthand - assume tree root is named "root" by default
    if (path.startsWith("/")) {
      path = `root${path}`;
    }
    return this._config.resources.find((r) => r.path === path);
  }

  /**
   * Obtain a resource's configuration, including its type, props, and attrs.
   * @param path The resource path
   * @returns The resource configuration
   */
  public getResourceConfig(path: string): BaseResourceSchema {
    const config = this.tryGetResourceConfig(path);
    if (!config) {
      throw new Error(`Resource "${path}" not found.`);
    }
    return config;
  }

  /**
   * Register a subscriber that will be notified when a trace is emitted by
   * the simulator.
   */
  public onTrace(subscriber: ITraceSubscriber) {
    this._traceSubscribers.push(subscriber);
  }

  /**
   * Obtain information about the application's resource tree.
   */
  public tree(): Tree {
    return this._tree;
  }

  private async tryStartResource(
    resourceConfig: BaseResourceSchema
  ): Promise<boolean> {
    const context = this.createContext(resourceConfig);

    const resolvedProps = this.tryResolveTokens(
      resourceConfig.props,
      resourceConfig.path
    );
    if (resolvedProps === undefined) {
      this._addTrace({
        type: TraceType.RESOURCE,
        data: { message: `${resourceConfig.path} is waiting on a dependency` },
        sourcePath: resourceConfig.path,
        sourceType: resourceConfig.type,
        timestamp: new Date().toISOString(),
      });

      // This means the resource has a dependency that hasn't been started yet (hopefully). return
      // It to the init queue.
      return false;
    }

    // Create the resource based on its type
    const resourceObject = this._factory.resolve(
      resourceConfig.type,
      resolvedProps,
      context
    );

    // Go ahead and initialize the resource
    const attrs = await resourceObject.init();

    // Allocate a handle for the resource so others can find it
    const handle = this._handles.allocate(resourceObject);

    // Update the resource configuration with new attrs returned after initialization
    (resourceConfig as any).attrs = { ...attrs, handle };

    // Trace the resource creation
    this._addTrace({
      type: TraceType.RESOURCE,
      data: { message: `${resourceConfig.type} created.` },
      sourcePath: resourceConfig.path,
      sourceType: resourceConfig.type,
      timestamp: new Date().toISOString(),
    });

    return true;
  }

  private createContext(resourceConfig: BaseResourceSchema): ISimulatorContext {
    return {
      simdir: this.simdir,
      resourcePath: resourceConfig.path,
      findInstance: (handle: string) => {
        return this._handles.find(handle);
      },
      addTrace: (trace: Trace) => {
        this._addTrace(trace);
      },
      withTrace: async (props: IWithTraceProps) => {
        // TODO: log start time and end time of activity?
        try {
          let result = await props.activity();
          this._addTrace({
            data: {
              message: props.message,
              status: "success",
              result: JSON.stringify(result),
            },
            type: TraceType.RESOURCE,
            sourcePath: resourceConfig.path,
            sourceType: resourceConfig.type,
            timestamp: new Date().toISOString(),
          });
          return result;
        } catch (err) {
          this._addTrace({
            data: { message: props.message, status: "failure", error: err },
            type: TraceType.RESOURCE,
            sourcePath: resourceConfig.path,
            sourceType: resourceConfig.type,
            timestamp: new Date().toISOString(),
          });
          throw err;
        }
      },
      listTraces: () => {
        return [...this._traces];
      },
    };
  }

  private _addTrace(event: Trace) {
    event = Object.freeze(event);
    for (const sub of this._traceSubscribers) {
      sub.callback(event);
    }
    this._traces.push(event);
  }

  /**
   * Return an object with all tokens in it resolved to their appropriate values.
   *
   * A token can be a string like "${app/my_bucket#attrs.handle}". This token would be resolved to
   * the "handle" attribute of the resource at path "app/my_bucket". If that attribute does not
   * exist at the time of resolution (for example, if my_bucket is not being simulated yet), an
   * error will be thrown.
   *
   * Tokens can also be nested, like "${app/my_bucket#attrs.handle}/foo/bar".
   *
   * @param obj The object to resolve tokens in.
   * @param source The path of the resource that requested the token to be resolved.
   * @returns `undefined` if the token could not be resolved (e.g. needs a dependency), otherwise
   * the resolved value.
   */
  private tryResolveTokens(obj: any, source: string): any {
    if (typeof obj === "string") {
      if (isToken(obj)) {
        const ref = obj.slice(2, -1);
        const [path, rest] = ref.split("#");
        const config = this.getResourceConfig(path);
        if (rest.startsWith("attrs.")) {
          const attrName = rest.slice(6);
          const attr = config?.attrs[attrName];

          // We couldn't find the attribute. this doesn't mean it doesn't exist, it's just likely
          // That this resource haven't been started yet. so return `undefined`, which will cause
          // This resource to go back to the init queue.
          if (!attr) {
            return undefined;
          }
          return attr;
        } else if (rest.startsWith("props.")) {
          if (!config.props) {
            throw new Error(
              `Tried to resolve token "${obj}" but resource ${path} has no props defined.`
            );
          }
          return config.props;
        } else {
          throw new Error(`Invalid token reference: "${ref}"`);
        }
      }

      return obj;
    }

    if (Array.isArray(obj)) {
      const result = [];
      for (const x of obj) {
        const value = this.tryResolveTokens(x, source);
        if (value === undefined) {
          return undefined;
        }
        result.push(value);
      }

      return result;
    }

    if (typeof obj === "object") {
      const ret: any = {};
      for (const [key, value] of Object.entries(obj)) {
        const resolved = this.tryResolveTokens(value, source);
        if (resolved === undefined) {
          return undefined;
        }
        ret[key] = resolved;
      }
      return ret;
    }

    return obj;
  }
}

/**
 * A factory that can turn resource descriptions into (inflight) resource simulations.
 */
export interface ISimulatorFactory {
  /**
   * Resolve the parameters needed for creating a specific resource simulation.
   */
  resolve(
    type: string,
    props: any,
    context: ISimulatorContext
  ): ISimulatorResourceInstance;
}

class HandleManager {
  private readonly handles: Map<string, ISimulatorResourceInstance>;
  private nextHandle: number;

  public constructor() {
    this.handles = new Map();
    this.nextHandle = 0;
  }

  public allocate(resource: ISimulatorResourceInstance): string {
    const handle = `sim-${this.nextHandle++}`;
    this.handles.set(handle, resource);
    return handle;
  }

  public find(handle: string): ISimulatorResourceInstance {
    const instance = this.handles.get(handle);
    if (!instance) {
      throw new Error(`No resource found with handle "${handle}".`);
    }
    return instance;
  }

  public deallocate(handle: string): ISimulatorResourceInstance {
    const instance = this.handles.get(handle);
    if (!instance) {
      throw new Error(`No resource found with handle "${handle}".`);
    }
    this.handles.delete(handle);
    return instance;
  }

  public reset(): void {
    this.handles.clear();
    this.nextHandle = 0;
  }
}

/**
 * Shared interface for resource simulations.
 */
export interface ISimulatorResourceInstance {
  /**
   * Perform any async initialization required by the resource. Return a map of
   * the resource's runtime attributes.
   */
  init(): Promise<Record<string, any>>;

  /**
   * Stop the resource and clean up any physical resources it may have created
   * (files, ports, etc).
   */
  cleanup(): Promise<void>;
}

/** Schema for simulator.json */
export interface WingSimulatorSchema {
  /** The list of resources. */
  readonly resources: BaseResourceSchema[];
  /** The version of the Wing SDK used to synthesize the .wsim file. */
  readonly sdkVersion: string;
}

/** Schema for individual resources */
export interface BaseResourceSchema {
  /** The resource path from the app's construct tree. */
  readonly path: string;
  /** The type of the resource. */
  readonly type: string;
  /** The resource-specific properties needed to create this resource. */
  readonly props: { [key: string]: any };
  /** The resource-specific attributes that are set after the resource is created. */
  readonly attrs: Record<string, any>;
  // TODO: model dependencies
}

/** Schema for resource attributes */
export interface BaseResourceAttributes {
  /** The resource's simulator-unique id. */
  readonly handle: string;
}
