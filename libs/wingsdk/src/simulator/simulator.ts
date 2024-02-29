import { existsSync } from "fs";
import { mkdir, rm } from "fs/promises";
import type { Server, IncomingMessage, ServerResponse } from "http";
import { join } from "path";
import { makeSimulatorClient } from "./client";
import { deserialize, serialize } from "./serialization";
import { Tree } from "./tree";
import { SDK_VERSION } from "../constants";
import { TREE_FILE_PATH } from "../core";
import { readJsonSync } from "../shared/misc";
import { CONNECTIONS_FILE_PATH, Trace, TraceType } from "../std";
import {
  SIMULATOR_TOKEN_REGEX,
  SIMULATOR_TOKEN_REGEX_FULL,
} from "../target-sim/tokens";

const START_ATTEMPT_COUNT = 10;
const LOCALHOST_ADDRESS = "127.0.0.1";
const HANDLE_ATTRIBUTE = "handle";

/**
 * Props for `Simulator`.
 */
export interface SimulatorProps {
  /**
   * Path to a Wing simulator output directory (.wsim).
   */
  readonly simfile: string;

  /**
   * Path to a state directory where the simulator can store state between
   * simulation runs.
   * @default - a directory named ".state" inside the simulator output directory
   */
  readonly stateDir?: string;

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
 * Context that is passed to individual resource simulations.
 */
export interface ISimulatorContext {
  /**
   * The directory where the compilation output is
   */
  readonly simdir: string;

  /**
   * The directory for the resource's state.
   */
  readonly statedir: string;

  /**
   * The path of the resource that is being simulated.
   */
  readonly resourcePath: string;

  /**
   * The url that the simulator server is listening on.
   */
  readonly serverUrl: string;

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

  /**
   * Sets the runtime attributes of a resource.
   * @param path The resource path
   * @param attrs Attributes to set (will be merged with existing attributes)
   */
  setResourceAttributes(path: string, attrs: Record<string, any>): void;

  /**
   * Returns the runtime attributes of a resource.
   * @param path The resource path
   */
  resourceAttributes(path: string): Record<string, any>;
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
 * The simulator can transition between these states:
 * ┌─────────┐    ┌─────────┐
 * │ stopped ├───►│starting │
 * └─────────┘    └────┬────┘
 *      ▲              │
 *      │              ▼
 * ┌────┴────┐    ┌─────────┐
 * │stopping │◄───┤ running │
 * └─────────┘    └─────────┘
 */
type RunningState = "starting" | "running" | "stopping" | "stopped";

interface Model {
  simdir: string;
  tree: Tree;
  connections: ConnectionData[];
  config: WingSimulatorSchema;
}

/**
 * A simulator that can be used to test your application locally.
 */
export class Simulator {
  // fields that are same between simulation runs / reloads
  private readonly statedir: string;

  // fields that change between simulation runs / reloads
  private _running: RunningState;
  private readonly _handles: HandleManager;
  private _traces: Array<Trace>;
  private readonly _traceSubscribers: Array<ITraceSubscriber>;
  private _serverUrl: string | undefined;
  private _server: Server | undefined;
  private _model: Model;

  constructor(props: SimulatorProps) {
    const simdir = props.simfile;
    this.statedir = props.stateDir ?? join(simdir, ".state");
    this._model = this._loadApp(simdir);

    this._running = "stopped";
    this._handles = new HandleManager();
    this._traces = new Array();
    this._traceSubscribers = new Array();
  }

  private _loadApp(simdir: string): Model {
    const simJson = join(simdir, "simulator.json");
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

    const treeJson = join(simdir, TREE_FILE_PATH);
    if (!existsSync(treeJson)) {
      throw new Error(
        `Invalid Wing app (${simdir}) - ${TREE_FILE_PATH} not found.`
      );
    }

    const tree = new Tree(readJsonSync(treeJson));

    const connectionJson = join(simdir, CONNECTIONS_FILE_PATH);
    if (!existsSync(connectionJson)) {
      throw new Error(
        `Invalid Wing app (${simdir}) - ${CONNECTIONS_FILE_PATH} not found.`
      );
    }
    const connections = readJsonSync(connectionJson).connections;
    return { config, tree, connections, simdir };
  }

  /**
   * Start the simulator.
   */
  public async start(): Promise<void> {
    if (this._running !== "stopped") {
      throw new Error(
        "A simulation is already running. Did you mean to call `await simulator.stop()` first?"
      );
    }
    this._running = "starting";

    await this.startServer();

    try {
      await this.startResources(
        this._model.config.resources.map((x) => x.path)
      );

      this._running = "running";
    } catch (err) {
      this.stopServer();
      this._running = "stopped";
      throw err;
    }
  }

  private async startResources(paths: string[]) {
    // create a copy of the resource list to be used as an init queue.
    const initQueue: { path: string; _attempts?: number }[] = [
      ...paths.map((r) => ({ path: r })),
    ];

    while (true) {
      const next = initQueue.shift();
      if (!next) {
        break;
      }

      // we couldn't start this resource yet, so decrement the retry counter and put it back in
      // the init queue.
      if (!(await this.tryStartResource(next.path))) {
        // we couldn't start this resource yet, so decrement the attempt counter
        next._attempts = next._attempts ?? START_ATTEMPT_COUNT;
        next._attempts--;

        // if we've tried too many times, give up (might be a dependency cycle or a bad reference)
        if (next._attempts === 0) {
          throw new Error(
            `Could not start resource ${next.path} after ${START_ATTEMPT_COUNT} attempts. This could be due to a dependency cycle or an invalid attribute reference.`
          );
        }

        // put back in the queue for another round
        initQueue.push(next);
      }
    }
  }

  /**
   * Updates the running simulation with a new version of the app. This will create/update/delete
   * resources as necessary to get to the desired state.
   * @param simDir The path to the new version of the app
   */
  public async update(simDir: string) {
    const newModel = this._loadApp(simDir);

    const plan = planUpdate(
      this._model.config.resources,
      newModel.config.resources
    );

    // stop all *deleted* and *updated* resources
    for (const c of [...plan.deleted, ...plan.updated]) {
      await this.stopResource(c);
    }

    // ugly! copy retained resources from old model to new model (they have attributes and
    // properties that we need)
    for (const c of plan.retain) {
      const oldConfig = this._model.config.resources.find((x) => x.path === c);
      const newConfig = newModel.config.resources.find((x) => x.path === c);

      // this shouldn't happen (because we are looking at "retained" resources, dah)
      if (!oldConfig || !newConfig) {
        throw new Error(
          `unexpected - resource ${c} was in the retain list but not found in either old or new model`
        );
      }

      // copy the attributes and properties from the old resource to the new resource
      (newConfig.props as any) = oldConfig.props;
      (newConfig.attrs as any) = oldConfig.attrs;
    }

    // now update the internal model because startResources() looks up the resource configuration in
    // there.
    this._model = newModel;

    // start all *added* and *updated* resources
    await this.startResources([...plan.added, ...plan.updated]);
  }

  /**
   * Stop the simulation and clean up all resources.
   */
  public async stop(): Promise<void> {
    if (this._running === "starting") {
      throw new Error("Cannot stop a simulation that is still starting.");
    }
    if (this._running === "stopping") {
      throw new Error("There is already a stop operation in progress.");
    }
    if (this._running === "stopped") {
      throw new Error(
        "There is no running simulation to stop. Did you mean to call `await simulator.start()` first?"
      );
    }
    this._running = "stopping";

    for (const resourceConfig of this._model.config.resources
      .slice()
      .reverse()) {
      await this.stopResource(resourceConfig.path);
    }

    this.stopServer();

    this._handles.reset();
    this._running = "stopped";
  }

  private async stopResource(path: string) {
    const handle = this.tryGetResourceHandle(path);
    if (!handle) {
      throw new Error(
        `Resource ${path} could not be cleaned up, no handle for it was found.`
      );
    }

    try {
      const resource = this._handles.find(handle);
      await resource.save(this.getResourceStateDir(path));
      this._handles.deallocate(handle);
      await resource.cleanup();
    } catch (err) {
      console.warn(err);
    }

    const resourceConfig = this.getResourceConfig(path);
    this._addTrace({
      type: TraceType.RESOURCE,
      data: { message: `${resourceConfig.type} deleted.` },
      sourcePath: resourceConfig.path,
      sourceType: resourceConfig.type,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Stop the simulation, reload the simulation tree from the latest version of
   * the app file, and restart the simulation.
   */
  public async reload(resetState: boolean): Promise<void> {
    await this.stop();

    if (resetState) {
      await rm(this.statedir, { recursive: true });
    }

    this._model = this._loadApp(this._model.simdir);

    await this.start();
  }

  /**
   * Get a list of all resource paths.
   */
  public listResources(): string[] {
    return this._model.config.resources.map((config) => config.path).sort();
  }

  /**
   * Get a list of all traces from the most recent simulation run.
   */
  public listTraces(): Trace[] {
    return [...this._traces];
  }

  /**
   * Get a resource client.
   * @returns the resource
   */
  public getResource(path: string): any {
    const client = this.tryGetResource(path);
    if (!client) {
      throw new Error(`Resource "${path}" not found.`);
    }
    return client;
  }

  /**
   * Get a resource client.
   * @returns The resource or undefined if not found
   */
  public tryGetResource(path: string): any | undefined {
    const handle = this.tryGetResourceHandle(path);
    if (!handle) {
      return undefined;
    }

    return makeSimulatorClient(this.url, handle);
  }

  private tryGetResourceHandle(path: string): string | undefined {
    return this.tryGetResourceConfig(path)?.attrs[HANDLE_ATTRIBUTE];
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
    return this._model.config.resources.find((r) => r.path === path);
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
   * Obtain a resource's state directory path.
   * @param path The resource path
   * @returns The resource state directory path
   */
  public getResourceStateDir(path: string): string {
    const config = this.getResourceConfig(path);
    return join(this.statedir, config.addr);
  }

  /**
   * Obtain a resource's visual interaction components.
   * @returns An array of UIComponent objects
   */
  public getResourceUI(path: string): any {
    let treeData = this.tree().rawDataForNode(path);
    if (!treeData) {
      throw new Error(`Resource "${path}" not found.`);
    }
    return treeData.display?.ui ?? [];
  }

  private typeInfo(fqn: string): TypeSchema {
    return this._model.config.types[fqn];
  }

  /**
   * Register a subscriber that will be notified when a trace is emitted by
   * the simulator.
   */
  public onTrace(subscriber: ITraceSubscriber) {
    this._traceSubscribers.push(subscriber);
  }

  /**
   * Obtain information about the application's construct tree.
   */
  public tree(): Tree {
    return this._model.tree;
  }

  /**
   * Obtain information about the application's connections.
   */
  public connections(): ConnectionData[] {
    return structuredClone(this._model.connections);
  }

  /**
   * Start a server that allows any resource to be accessed via HTTP.
   */
  private async startServer(): Promise<void> {
    const requestListener = (req: IncomingMessage, res: ServerResponse) => {
      if (!req.url?.startsWith("/v1/call")) {
        res.writeHead(404);
        res.end();
        return;
      }

      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", () => {
        const request: SimulatorServerRequest = deserialize(body);
        const { handle, method, args } = request;
        const resource = this._handles.tryFind(handle);

        // If we weren't able to find a resource with the given handle, it could actually
        // be OK if the resource is still starting up or has already been cleaned up.
        // In that case, we return a 500 error with a message that explains what happened.
        if (!resource) {
          res.writeHead(500, { "Content-Type": "application/json" });
          if (this._running === "starting") {
            res.end(
              serialize({
                error: {
                  message: `Resource ${handle} not found. It may not have been initialized yet.`,
                },
              }),
              "utf-8"
            );
            return;
          } else if (this._running === "stopping") {
            res.end(
              serialize({
                error: {
                  message: `Resource ${handle} not found. It may have been cleaned up already.`,
                },
              }),
              "utf-8"
            );
            return;
          } else {
            res.end(
              serialize({
                error: {
                  message: `Internal error - resource ${handle} not found.`,
                },
              }),
              "utf-8"
            );
            return;
          }
        }

        const methodExists = (resource as any)[method] !== undefined;
        if (!methodExists) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(
            serialize({
              error: {
                message: `Method ${method} not found on resource ${handle}.`,
              },
            }),
            "utf-8"
          );
          return;
        }

        (resource as any)
          [method](...args)
          .then((result: any) => {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(serialize({ result }), "utf-8");
          })
          .catch((err: any) => {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(
              serialize({
                error: {
                  message: err?.message ?? `${err}`,
                  stack: err.stack,
                  name: err.name,
                },
              }),
              "utf-8"
            );
          });
      });
    };

    // only import "http" when this method is called to reduce the time it takes to load Wing SDK
    const http = await import("node:http");

    // start the server, and wait for it to be listening
    const server = http.createServer(requestListener);
    await new Promise<void>((resolve) => {
      server.listen(0, LOCALHOST_ADDRESS, () => {
        const addr = server.address();
        if (addr && typeof addr === "object" && (addr as any).port) {
          this._serverUrl = `http://${addr.address}:${addr.port}`;
        }
        this._server = server;
        resolve();
      });
    });
  }

  /**
   * Stop the simulator server.
   */
  private stopServer() {
    this._server!.close();
  }

  /**
   * The URL that the simulator server is listening on.
   */
  public get url(): string {
    if (!this._serverUrl) {
      throw new Error("Simulator server is not running.");
    }
    return this._serverUrl;
  }

  private async tryStartResource(path: string): Promise<boolean> {
    const resourceConfig = this.getResourceConfig(path);
    const context = this.createContext(resourceConfig);

    const { resolved, value: resolvedProps } = this.tryResolveTokens(
      resourceConfig.props
    );

    if (!resolved) {
      this._addTrace({
        type: TraceType.RESOURCE,
        data: { message: `${resourceConfig.path} is waiting on a dependency` },
        sourcePath: resourceConfig.path,
        sourceType: resourceConfig.type,
        timestamp: new Date().toISOString(),
      });

      // this means the resource has a dependency that hasn't been started yet (hopefully). return
      // it to the init queue.
      return false;
    }

    // update the resource's config with the resolved props
    (resourceConfig.props as any) = resolvedProps;

    // look up the location of the code for the type
    const typeInfo = this.typeInfo(resourceConfig.type);

    // set up a state directory for the resource
    await mkdir(this.getResourceStateDir(resourceConfig.path), {
      recursive: true,
    });

    // create the resource based on its type
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const ResourceType = require(typeInfo.sourcePath)[typeInfo.className];
    const resourceObject = new ResourceType(resolvedProps, context);
    const attrs = await resourceObject.init();

    // save the current state
    await resourceObject.save();

    // allocate a handle for the resource so others can find it
    const handle = this._handles.allocate(resourceObject);

    // update the resource configuration with new attrs returned after initialization
    context.setResourceAttributes(path, {
      ...attrs,
      [HANDLE_ATTRIBUTE]: handle,
    });

    // trace the resource creation
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
      simdir: this._model.simdir,
      statedir: join(this.statedir, resourceConfig.addr),
      resourcePath: resourceConfig.path,
      serverUrl: this.url,
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
      setResourceAttributes: (path: string, attrs: Record<string, any>) => {
        const config = this.getResourceConfig(path);
        const prev = config.attrs;
        (config as any).attrs = { ...prev, ...attrs };
      },
      resourceAttributes: (path: string) => {
        return this.getResourceConfig(path).attrs;
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

  private tryResolveToken(s: string): { resolved: boolean; value: any } {
    const ref = s.slice(2, -1);
    const [_, path, rest] = ref.split("#");
    const config = this.getResourceConfig(path);
    if (rest.startsWith("attrs.")) {
      const attrName = rest.slice(6);
      const attr = config?.attrs[attrName];

      // we couldn't find the attribute. this doesn't mean it doesn't exist, it's just likely
      // that this resource haven't been started yet. so return `undefined`, which will cause
      // this resource to go back to the init queue.
      if (!attr) {
        return { resolved: false, value: undefined };
      }
      return { resolved: true, value: attr };
    } else if (rest.startsWith("props.")) {
      if (!config.props) {
        throw new Error(
          `Tried to resolve token "${s}" but resource ${path} has no props defined.`
        );
      }
      const propPath = rest.slice(6);
      const value = config.props[propPath];
      if (value === undefined) {
        throw new Error(
          `Tried to resolve token "${s}" but resource ${path} has no prop "${propPath}".`
        );
      }
      return { resolved: true, value };
    } else {
      throw new Error(`Invalid token reference: "${ref}"`);
    }
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
   * @returns `undefined` if the token could not be resolved (e.g. needs a dependency), otherwise
   * the resolved value.
   */
  private tryResolveTokens(obj: any): { resolved: boolean; value: any } {
    if (typeof obj === "string") {
      // there are two cases - a token can be the entire string, or it can be part of the string.
      // first, check if the entire string is a token
      if (SIMULATOR_TOKEN_REGEX_FULL.test(obj)) {
        const { resolved, value } = this.tryResolveToken(obj);
        if (!resolved) {
          return { resolved: false, value: undefined };
        }
        return { resolved: true, value };
      }

      // otherwise, check if the string contains tokens inside it. if so, we need to resolve them
      // and then check if the result is a string
      const globalRegex = new RegExp(SIMULATOR_TOKEN_REGEX.source, "g");
      const matches = obj.matchAll(globalRegex);
      const replacements = [];
      for (const match of matches) {
        const { resolved, value } = this.tryResolveToken(match[0]);
        if (!resolved) {
          return { resolved: false, value: undefined };
        }
        if (typeof value !== "string") {
          throw new Error(
            `Expected token "${
              match[0]
            }" to resolve to a string, but it resolved to ${typeof value}.`
          );
        }
        replacements.push({ match, value });
      }

      // replace all the tokens in reverse order, and return the result
      // if a token returns another token (god forbid), do not resolve it again
      let result = obj;
      for (const { match, value } of replacements.reverse()) {
        if (match.index === undefined) {
          throw new Error(`unexpected error: match.index is undefined`);
        }
        result =
          result.slice(0, match.index) +
          value +
          result.slice(match.index + match[0].length);
      }
      return { resolved: true, value: result };
    }

    if (Array.isArray(obj)) {
      const result = [];
      for (const x of obj) {
        const { resolved, value } = this.tryResolveTokens(x);
        if (!resolved) {
          return { resolved: false, value: undefined };
        }
        result.push(value);
      }

      return { resolved: true, value: result };
    }

    if (typeof obj === "object") {
      const ret: any = {};
      for (const [key, v] of Object.entries(obj)) {
        const { resolved, value } = this.tryResolveTokens(v);
        if (!resolved) {
          return { resolved: false, value: undefined };
        }
        ret[key] = value;
      }
      return { resolved: true, value: ret };
    }

    return { resolved: true, value: obj };
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
    const instance = this.tryFind(handle);
    if (!instance) {
      throw new Error(`No resource found with handle "${handle}".`);
    }
    return instance;
  }

  public tryFind(handle: string): ISimulatorResourceInstance | undefined {
    return this.handles.get(handle);
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

  /**
   * Save the resource's state into the state directory.
   */
  save(statedir: string): Promise<void>;
}

/** Schema for simulator.json */
export interface WingSimulatorSchema {
  /** The list of resources. */
  readonly resources: BaseResourceSchema[];
  /** The map of types. */
  readonly types: { [fqn: string]: TypeSchema };
  /** The version of the Wing SDK used to synthesize the .wsim file. */
  readonly sdkVersion: string;
}

/** Schema for individual types. */
export interface TypeSchema {
  /** Location of the source file that exports a simulation API. */
  readonly sourcePath: string;
  /** Name of the class that is exported by the `sourcePath`. */
  readonly className: string;
}

/** Schema for individual resources */
export interface BaseResourceSchema {
  /** The resource path from the app's construct tree. */
  readonly path: string;
  /** An opaque tree-unique address of the resource, calculated as a SHA-1 hash of the resource path. */
  readonly addr: string;
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
  readonly [HANDLE_ATTRIBUTE]: string;
}

/** Schema for `.connections` in connections.json */
export interface ConnectionData {
  /** The path of the source construct. */
  readonly source: string;
  /** The path of the target construct. */
  readonly target: string;
  /** A name for the connection. */
  readonly name: string;
}

/**
 * Internal schema for requests to the simulator server's /v1/call endpoint.
 * Subject to breaking changes.
 */
export interface SimulatorServerRequest {
  /** The resource handle (an ID unique among resources in the simulation). */
  readonly handle: string;
  /** The method to call on the resource. */
  readonly method: string;
  /** The arguments to the method. */
  readonly args: any[];
}

/**
 * Internal schema for responses from the simulator server's /v1/call endpoint.
 * Subject to breaking changes.
 */
export interface SimulatorServerResponse {
  /** The result of the method call. */
  readonly result?: any;
  /** The error that occurred during the method call. */
  readonly error?: any;
}

function planUpdate(current: BaseResourceSchema[], next: BaseResourceSchema[]) {
  const currentByPath = resourceByPath(current);
  const nextByPath = resourceByPath(next);

  const added: string[] = [];
  const updated: string[] = [];
  const deleted: string[] = [];
  const retain: string[] = [];

  for (const [path, nextConfig] of Object.entries(nextByPath)) {
    const currConfig = currentByPath[path];

    // if the resource is not in "current", it means it was added
    if (!currConfig) {
      added.push(nextConfig.path);
      continue;
    }

    // the resource is already in "current", if it's different from "next", it means it was updated
    const state = (r: BaseResourceSchema) =>
      JSON.stringify({
        props: r.props,
        type: r.type,
      });

    if (state(currConfig) !== state(nextConfig)) {
      updated.push(nextConfig.path);
    } else {
      retain.push(nextConfig.path);
    }

    // remove it from "current" so we know what's left to be deleted
    delete currentByPath[path];
  }

  // everything left in "current" is to be deleted
  for (const config of Object.values(currentByPath)) {
    deleted.push(config.path);
  }

  return { added, updated, deleted, retain };
}

function resourceByPath(list: BaseResourceSchema[]): {
  [path: string]: BaseResourceSchema;
} {
  const ret: { [path: string]: BaseResourceSchema } = {};
  for (const resource of list) {
    if (ret[resource.path]) {
      throw new Error(
        `unexpected - duplicate resources with the same path: ${resource.path}`
      );
    }
    ret[resource.path] = resource;
  }
  return ret;
}
