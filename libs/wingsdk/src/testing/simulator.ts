import { existsSync } from "fs";
import { join } from "path";
import * as tar from "tar";
import { SDK_VERSION } from "../constants";
import { ISimulatorResource } from "../target-sim";
import { BaseResourceSchema, WingSimulatorSchema } from "../target-sim/schema";
import { mkdtemp, readJsonSync } from "../util";
// eslint-disable-next-line import/no-restricted-paths, @typescript-eslint/no-require-imports
const { DefaultSimulatorFactory } = require("../target-sim/factory.sim");

/**
 * Props for `Simulator`.
 */
export interface SimulatorProps {
  /**
   * Path to a Wing simulator file (.wx).
   */
  readonly simfile: string;

  /**
   * The factory that produces resource simulations.
   *
   * @default - a factory that produces simulations for built-in Wing SDK
   * resources
   */
  readonly factory?: ISimulatorFactory;

  /**
   * A collection of callbacks that are invoked at key lifecycle events of the
   * simulator, such as whenever traces or logs are emitted.
   *
   * @experimental
   *
   * @default - no hooks
   */
  readonly lifecycleHooks?: ISimulatorLifecycleHooks;
}

/**
 * A collection of callbacks that are invoked at key lifecycle events of the
 * simulator.
 */
export interface ISimulatorLifecycleHooks {
  /**
   * A function to run whenever a trace or log event is emitted.
   */
  onEvent?(event: Trace): void;
}

/**
 * Props for `ISimulatorContext.addTrace`.
 */
export interface AddTraceProps {
  /**
   * A JSON blob with structured data.
   */
  readonly data: any;

  /**
   * The type of a trace.
   */
  readonly type: TraceType;

  /**
   * The path of the resource that emitted the trace. This can be overridden
   * in cases where the resource emits a trace on behalf of another resource
   * (e.g. the logger).
   */
  readonly "source-path"?: string;
}

// Since we are using JSII we cannot use generics to type this right now:
//
// export interface WithTraceProps<T> {
//   readonly activity: () => Promise<T>;
// }
// ...
// withTrace(event: WithTraceProps<T>): Promise<T>;

/**
 * Props for `ISimulatorContext.withTrace`.
 */
export interface WithTraceProps {
  /**
   * A message to register with the trace.
   */
  readonly message: any;

  /**
   * A function to run as part of the trace.
   */
  readonly activity: () => Promise<any>;
}

/**
 * Represents an trace emitted during simulation.
 */
export interface Trace {
  /**
   * A JSON blob with structured data.
   */
  readonly data: any;

  /**
   * The type of the source that emitted the trace.
   */
  readonly "source-type": string;

  /**
   * The path of the resource that emitted the trace.
   */
  readonly "source-path": string;

  /**
   * The type of a trace.
   */
  readonly type: TraceType;

  /**
   * The timestamp of the event, in milliseconds since the epoch.
   */
  readonly timestamp: number;
}

/**
 * The type of a trace.
 */
export enum TraceType {
  /**
   * A trace representing a resource activity.
   */
  RESOURCE = "resource",
  /**
   * A trace representing information emitted by the logger.
   */
  LOG = "log",
}

/**
 * Context that is passed to individual resource simulations.
 */
export interface ISimulatorContext {
  /**
   * The absolute path to where all assets in `app.wx` are stored.
   */
  readonly assetsDir: string;

  /**
   * Find a resource simulation by its handle. Throws if the handle isn't valid.
   */
  findInstance(handle: string): ISimulatorResource;

  /**
   * Add a trace. Traces are breadcrumbs of information about resource
   * operations that occurred during simulation, useful for understanding how
   * resources interact or debugging an application.
   */
  addTrace(event: AddTraceProps): void;

  withTrace(event: WithTraceProps): Promise<any>;
}

/**
 * A resolver that can be used to look up other resources in the tree.
 */
export interface IResourceResolver {
  /**
   * Lookup a resource by its path.
   */
  lookup(resourceId: string): BaseResourceSchema;
}

/**
 * A simulator that can be used to test your application locally.
 */
export class Simulator {
  // fields that are same between simulation runs / reloads
  private readonly _factory: ISimulatorFactory;
  private _tree: WingSimulatorSchema;
  private _simfile: string;
  private _assetsDir: string;

  // fields that change between simulation runs / reloads
  private _running: boolean;
  private readonly _handles: HandleManager;
  private _traces: Array<Trace>;
  private readonly _lifecycleHooks: ISimulatorLifecycleHooks;

  constructor(props: SimulatorProps) {
    this._simfile = props.simfile;
    const { assetsDir, tree } = this._loadApp(props.simfile);
    this._tree = tree;
    this._assetsDir = assetsDir;

    this._running = false;
    this._factory = props.factory ?? new DefaultSimulatorFactory();
    this._handles = new HandleManager();
    this._traces = new Array();
    this._lifecycleHooks = props.lifecycleHooks ?? {};
  }

  private _loadApp(simfile: string): { assetsDir: string; tree: any } {
    // create a temporary directory to store extracted files
    const workdir = mkdtemp();
    tar.extract({
      cwd: workdir,
      sync: true,
      file: simfile,
    });

    const simJson = join(workdir, "simulator.json");
    if (!existsSync(simJson)) {
      throw new Error(
        `Invalid Wing app (${simfile}) - simulator.json not found.`
      );
    }
    const data = readJsonSync(simJson);

    const foundVersion = data.sdkVersion ?? "unknown";
    const expectedVersion = SDK_VERSION;
    if (foundVersion !== expectedVersion) {
      console.error(
        `WARNING: The simulator file (${simfile}) was generated with Wing SDK v${foundVersion} but it is being simulated with Wing SDK v${expectedVersion}.`
      );
    }

    this._annotateTreeWithPaths(data);

    return { assetsDir: workdir, tree: data };
  }

  private _annotateTreeWithPaths(tree: any) {
    function walk(path: string, node: BaseResourceSchema) {
      (node as any).path = path;
      for (const [childId, child] of Object.entries(node.children ?? {})) {
        walk(path + "/" + childId, child);
      }
    }

    walk("root", tree.root);
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

    this._traces = [];

    for (const path of this._tree.startOrder) {
      const resourceData = findResource(this._tree, path);

      const context: ISimulatorContext = {
        assetsDir: this._assetsDir,
        findInstance: (handle: string) => {
          return this._handles.find(handle);
        },
        addTrace: (props: AddTraceProps) => {
          let trace: Trace = {
            ...props,
            "source-path": path,
            "source-type": resourceData.type,
            timestamp: Date.now(),
          };
          this._addTrace(trace);
        },
        withTrace: async (props: WithTraceProps) => {
          // TODO: log start time and end time of activity?
          try {
            let result = await props.activity();
            this._addTrace({
              data: { message: props.message, result: "success" },
              type: TraceType.RESOURCE,
              "source-path": path,
              "source-type": resourceData.type,
              timestamp: Date.now(),
            });
            return result;
          } catch (err) {
            this._addTrace({
              data: { message: props.message, result: "failure", error: err },
              type: TraceType.RESOURCE,
              "source-path": path,
              "source-type": resourceData.type,
              timestamp: Date.now(),
            });
            throw err;
          }
        },
      };

      const props = this.resolveTokens(path, resourceData.props);
      const resource = this._factory.resolve(resourceData.type, props, context);
      await resource.init();
      const handle = this._handles.allocate(resource);
      (resourceData as any).attrs = { handle };
      let event: Trace = {
        type: TraceType.RESOURCE,
        data: { message: `${resourceData.type} created.` },
        "source-path": path,
        "source-type": resourceData.type,
        timestamp: Date.now(),
      };
      this._addTrace(event);
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

    for (const path of this._tree.startOrder.slice().reverse()) {
      const res = findResource(this._tree, path);
      const resource = this._handles.deallocate(res.attrs!.handle);
      await resource.cleanup();

      let event: Trace = {
        type: TraceType.RESOURCE,
        data: { message: `${res.type} deleted.` },
        "source-path": path,
        "source-type": res.type,
        timestamp: Date.now(),
      };
      this._addTrace(event);
    }

    this._handles.reset();
    this._running = false;

    // TODO: remove "attrs" data from tree
  }

  /**
   * Stop the simulation, reload the simulation tree from the latest version of
   * the app file, and restart the simulation.
   */
  public async reload(): Promise<void> {
    await this.stop();

    const { assetsDir, tree } = this._loadApp(this._simfile);
    this._tree = tree;
    this._assetsDir = assetsDir;

    await this.start();
  }

  /**
   * Get a list of all resource paths.
   */
  public listResources(): string[] {
    return this._tree.startOrder.slice().sort();
  }

  /**
   * Get a list of all traces added during the most recent simulation run.
   */
  public listTraces(): Trace[] {
    return [...this._traces];
  }

  /**
   * Get the resource instance for a given path.
   */
  public getResourceByPath(path: string): any {
    const handle = this.getAttributes(path).handle;
    if (!handle) {
      throw new Error(`Resource ${path} does not have a handle.`);
    }
    return this._handles.find(handle);
  }

  /**
   * Obtain a resource's attributes. This is data that gets resolved when the
   * during the resource's in-simulator creation.
   */
  public getAttributes(path: string): { [key: string]: any } {
    // TODO: this should throw if called while the simulator is not running
    return findResource(this._tree, path).attrs ?? {};
  }

  /**
   * Obtain a resource's props. This is data about the resource's configuration
   * that is resolved at synth time.
   */
  public getProps(path: string): { [key: string]: any } {
    return findResource(this._tree, path).props ?? {};
  }

  /**
   * Obtain a resource's data, including its path, props, attrs, and children.
   */
  public getData(path: string): BaseResourceSchema {
    return findResource(this._tree, path);
  }

  /**
   * Return a copy of the simulator tree, including all resource attributes.
   */
  public get tree(): any {
    return JSON.parse(JSON.stringify(this._tree));
  }

  private _addTrace(event: Trace) {
    event = Object.freeze(event);
    if (this._lifecycleHooks.onEvent) {
      this._lifecycleHooks.onEvent(event);
    }
    this._traces.push(event);
  }

  private resolveTokens(tokenOrigin: string, props: any): any {
    if (typeof props === "string") {
      if (isToken(props)) {
        const ref = props.slice(2, -1);
        const [path, rest] = ref.split("#");
        const resource = findResource(this._tree, path);
        if (rest.startsWith("attrs.")) {
          if (!resource.attrs) {
            throw new Error(
              `Tried to resolve token "${props}" but resource ${path} has no attributes defined yet. Is it possible ${tokenOrigin} needs to take a dependency on ${path}?`
            );
          }
          return resource.attrs[rest.slice(6)];
        } else if (rest.startsWith("props.")) {
          if (!resource.props) {
            throw new Error(
              `Tried to resolve token "${props}" but resource ${path} has no props defined.`
            );
          }
          return resource.props;
        } else {
          throw new Error(`Invalid token reference: "${ref}"`);
        }
      }
      return props;
    }

    if (Array.isArray(props)) {
      return props.map((x) => this.resolveTokens(tokenOrigin, x));
    }

    if (typeof props === "object") {
      const ret: any = {};
      for (const [key, value] of Object.entries(props)) {
        ret[key] = this.resolveTokens(tokenOrigin, value);
      }
      return ret;
    }

    return props;
  }
}

function isToken(value: string): boolean {
  return value.startsWith("${") && value.endsWith("}");
}

function findResource(tree: any, path: string): BaseResourceSchema {
  const parts = path.split("/");
  let node: any = { children: tree };
  for (const part of parts) {
    node = node.children[part];
    if (!node) {
      // TODO: better error message - "Try calling listResources() on your simulator to see what resources are available."
      throw new Error(`Resource not found: ${path}`);
    }
  }
  return node;
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
  ): ISimulatorResource;
}

class HandleManager {
  private readonly handles: Map<string, ISimulatorResource>;
  private nextHandle: number;

  public constructor() {
    this.handles = new Map();
    this.nextHandle = 0;
  }

  public allocate(resource: ISimulatorResource): string {
    const handle = `sim-${this.nextHandle++}`;
    this.handles.set(handle, resource);
    return handle;
  }

  public find(handle: string): ISimulatorResource {
    const instance = this.handles.get(handle);
    if (!instance) {
      throw new Error(`No resource found with handle "${handle}".`);
    }
    return instance;
  }

  public deallocate(handle: string): ISimulatorResource {
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
