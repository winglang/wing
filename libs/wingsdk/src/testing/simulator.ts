import { existsSync } from "fs";
import { join } from "path";
import * as tar from "tar";
import { SDK_VERSION } from "../constants";
import { ISimulatorResourceInstance } from "../target-sim";
// eslint-disable-next-line import/no-restricted-paths
import { DefaultSimulatorFactory } from "../target-sim/factory.inflight";
// eslint-disable-next-line import/no-restricted-paths
import { Function } from "../target-sim/function.inflight";
import { BaseResourceSchema, WingSimulatorSchema } from "../target-sim/schema";
import { mkdtemp, readJsonSync } from "../util";

/**
 * Props for `Simulator`.
 */
export interface SimulatorProps {
  /**
   * Path to a Wing simulator file (.wsim).
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
// export interface WithTraceProps<T> {
//   readonly activity: () => Promise<T>;
// }
// ...
// withTrace(event: WithTraceProps<T>): Promise<T>;

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
  readonly sourceType: string;

  /**
   * The path of the resource that emitted the trace.
   */
  readonly sourcePath: string;

  /**
   * The type of a trace.
   */
  readonly type: TraceType;

  /**
   * The timestamp of the event, in ISO 8601 format.
   * @example 2020-01-01T00:00:00.000Z
   */
  readonly timestamp: string;
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
   * The directory where all assets extracted from `.wsim` file are stored
   * during the simulation run.
   */
  readonly assetsDir: string;

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
  // fields that are same between simulation runs / reloads
  private readonly _factory: ISimulatorFactory;
  private _config: WingSimulatorSchema;
  private readonly _simfile: string;
  private _assetsDir: string;

  // fields that change between simulation runs / reloads
  private _running: boolean;
  private readonly _handles: HandleManager;
  private _traces: Array<Trace>;
  private readonly _traceSubscribers: Array<ITraceSubscriber>;

  constructor(props: SimulatorProps) {
    this._simfile = props.simfile;
    const { assetsDir, config } = this._loadApp(props.simfile);
    this._config = config;
    this._assetsDir = assetsDir;

    this._running = false;
    this._factory = props.factory ?? new DefaultSimulatorFactory();
    this._handles = new HandleManager();
    this._traces = new Array();
    this._traceSubscribers = new Array();
  }

  private _loadApp(simfile: string): { assetsDir: string; config: any } {
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

    const config: WingSimulatorSchema = readJsonSync(simJson);

    const foundVersion = config.sdkVersion ?? "unknown";
    const expectedVersion = SDK_VERSION;
    if (foundVersion !== expectedVersion) {
      console.error(
        `WARNING: The simulator file (${simfile}) was generated with Wing SDK v${foundVersion} but it is being simulated with Wing SDK v${expectedVersion}.`
      );
    }
    if (config.resources === undefined) {
      throw new Error(
        `Incompatible .wsim file. The simulator file (${simfile}) was generated with Wing SDK v${foundVersion} but it is being simulated with Wing SDK v${expectedVersion}.`
      );
    }

    return { assetsDir: workdir, config };
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

    for (const resourceConfig of this._config.resources) {
      const context: ISimulatorContext = {
        assetsDir: this._assetsDir,
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
      };

      const resolvedProps = this.resolveTokens(
        resourceConfig.props,
        resourceConfig.path
      );
      const resource = this._factory.resolve(
        resourceConfig.type,
        resolvedProps,
        context
      );
      await resource.init();
      const handle = this._handles.allocate(resource);
      (resourceConfig as any).attrs = { handle };
      let event: Trace = {
        type: TraceType.RESOURCE,
        data: { message: `${resourceConfig.type} created.` },
        sourcePath: resourceConfig.path,
        sourceType: resourceConfig.type,
        timestamp: new Date().toISOString(),
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

    // TODO: remove "attrs" data from tree
  }

  /**
   * Stop the simulation, reload the simulation tree from the latest version of
   * the app file, and restart the simulation.
   */
  public async reload(): Promise<void> {
    await this.stop();

    const { assetsDir, config } = this._loadApp(this._simfile);
    this._config = config;
    this._assetsDir = assetsDir;

    await this.start();
  }

  /**
   * Get a list of all resource paths.
   */
  public listResources(): string[] {
    return this._config.resources.map((config) => config.path).sort();
  }

  /**
   * Get a list of all traces added during the most recent simulation run.
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
    // shorthand - assume tree root is named "root" by default
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
   * Lists all resource with identifier "test" or that start with "test:*".
   * @returns A list of resource paths
   */
  public listTests(): string[] {
    const isTest = /(\/test$|\/test:([^\\/])+$)/;
    const all = this.listResources();
    return all.filter((f) => isTest.test(f));
  }

  /**
   * Run all tests in the simulation tree.
   *
   * A test is a `cloud.Function` resource with an identifier that starts with "test." or is "test".
   * @returns A list of test results.
   */
  public async runAllTests(): Promise<TestResult[]> {
    const results = new Array<TestResult>();
    const tests = this.listTests();

    for (const path of tests) {
      results.push(await this.runTest(path));
    }

    return results;
  }

  /**
   * Runs a single test.
   * @param path The path to a cloud.Function resource that repersents the test
   * @returns The result of the test
   */
  public async runTest(path: string): Promise<TestResult> {
    // create a new simulator instance to run this test in isolation
    const isolated = new Simulator({ simfile: this._simfile });
    await isolated.start();

    // find the test function and verify it exists and indeed is a function
    const fn: Function = isolated.tryGetResource(path);
    if (!fn) {
      const all = this.listResources();
      throw new Error(`Resource "${path}" not found. Resources: ${all}`);
    }
    if (!("invoke" in fn)) {
      throw new Error(
        `Resource "${path}" is not a cloud.Function (expecting "invoke()").`
      );
    }

    // run the test and capture any errors
    let error = undefined;
    try {
      await fn.invoke("");
    } catch (err) {
      error = (err as any).stack;
    }

    // stop the simulator
    await isolated.stop();

    return {
      path: path,
      traces: isolated.listTraces(),
      pass: !error,
      error: error,
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
   * Return an object with all tokens in it resolved to their appropriate
   * values.
   *
   * A token can be a string like "${app/my_bucket#attrs.handle}". This token
   * would be resolved to the "handle" attribute of the resource at path
   * "app/my_bucket". If that attribute does not exist at the time of resolution
   * (for example, if my_bucket is not being simulated yet), an error will be
   * thrown.
   *
   * Tokens can also be nested, like "${app/my_bucket#attrs.handle}/foo/bar".
   *
   * @param obj The object to resolve tokens in.
   * @param source The path of the resource that requested the token to be resolved.
   */
  private resolveTokens(obj: any, source: string): any {
    if (typeof obj === "string") {
      if (isToken(obj)) {
        const ref = obj.slice(2, -1);
        const [path, rest] = ref.split("#");
        const config = this.getResourceConfig(path);
        if (rest.startsWith("attrs.")) {
          if (!config.attrs) {
            throw new Error(
              `Tried to resolve token "${obj}" but resource ${path} has no attributes defined yet. Is it possible ${source} needs to take a dependency on ${path}?`
            );
          }
          return config.attrs[rest.slice(6)];
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
      return obj.map((x) => this.resolveTokens(x, source));
    }

    if (typeof obj === "object") {
      const ret: any = {};
      for (const [key, value] of Object.entries(obj)) {
        ret[key] = this.resolveTokens(value, source);
      }
      return ret;
    }

    return obj;
  }
}

function isToken(value: string): boolean {
  return value.startsWith("${") && value.endsWith("}");
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
 * A result of a single test.
 */
export interface TestResult {
  /**
   * The path to the test function.
   */
  readonly path: string;

  /**
   * Whether the test passed.
   */
  readonly pass: boolean;

  /**
   * The error message if the test failed.
   */
  readonly error?: string;

  /**
   * List of traces emitted during the test.
   */
  readonly traces: Trace[];
}
