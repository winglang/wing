import { existsSync } from "fs";
import { mkdir, rm } from "fs/promises";
import type { Server, IncomingMessage, ServerResponse } from "http";
import { join, resolve } from "path";
import { makeSimulatorClient } from "./client";
import { Graph } from "./graph";
import { Lockfile } from "./lockfile.js";
import { deserialize, serialize } from "./serialization";
import { resolveTokens } from "./tokens";
import { Tree } from "./tree";
import { exists } from "./util";
import { SDK_VERSION } from "../constants";
import { TREE_FILE_PATH } from "../core";
import { readJsonSync } from "../shared/misc";
import { CONNECTIONS_FILE_PATH, LogLevel, Trace, TraceType } from "../std";
import { POLICY_FQN } from "../target-sim";
import { PolicySchema } from "../target-sim/schema-resources";

const LOCALHOST_ADDRESS = "127.0.0.1";
const HANDLE_ATTRIBUTE = "handle";

/**
 * If an API call is made to a resource with name as the caller, any permissions
 * checking will be skipped. Used by unit tests and the Wing Console.
 */
const ADMIN_PERMISSION = "admin";

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
   * The handle of the resource that is being simulated.
   */
  readonly resourceHandle: string;

  /**
   * The url that the simulator server is listening on.
   */
  readonly serverUrl: string;

  /**
   * Obtain a client given a resource's handle.
   */
  getClient(handle: string, asAdmin?: boolean): unknown;

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
 * Represents a resource lifecycle event.
 */
export interface ResourceLifecycleEvent {
  /**
   * The path of the resource that changed.
   */
  readonly path: string;

  /**
   * The current running state of the resource.
   */
  readonly runningState: ResourceRunningState;
}

/**
 * A subscriber that can listen for resource lifecycle events emitted by the
 * simulator.
 */
export interface IResourceLifecycleSubscriber {
  /**
   * Called when a resource lifecycle event is emitted.
   */
  callback(event: ResourceLifecycleEvent): void;
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

export type ResourceRunningState =
  | "starting"
  | "started"
  | "stopping"
  | "stopped"
  | "error";

interface Model {
  simdir: string;
  tree: Tree;
  connections: ConnectionData[];
  schema: WingSimulatorSchema;
  graph: Graph<BaseResourceSchema>;
}

interface ResourceState {
  props: Record<string, any>;
  attrs: Record<string, any>;
  policy: PolicyStatement[];
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
  private readonly _resourceLifecyleSubscribers: Array<IResourceLifecycleSubscriber>;
  private _serverUrl: string | undefined;
  private _server: Server | undefined;
  private _model: Model;
  private _policyRegistry: PolicyRegistry;

  // keeps the actual resolved state (props and attrs) of all started resources. this state is
  // merged in when calling `getResourceConfig()`.
  private state: Record<string, ResourceState> = {};

  // keeps the running state of all resources.
  private runningState: Record<string, ResourceRunningState> = {};

  private lockfile: Lockfile;

  constructor(props: SimulatorProps) {
    const simdir = resolve(props.simfile);
    this.statedir = props.stateDir ?? join(simdir, ".state");
    this.lockfile = new Lockfile({
      path: join(this.statedir, ".lock"),
      onCompromised: async (reason, error) => {
        console.error(
          `Simulator lockfile compromised. Stopping simulation.`,
          `Reason: ${reason}.`
        );
        if (error) {
          console.error(error);
        }
        await this.stop();
      },
    });

    this._running = "stopped";
    this._handles = new HandleManager();
    this._policyRegistry = new PolicyRegistry();
    this._traces = new Array();
    this._traceSubscribers = new Array();
    this._resourceLifecyleSubscribers = new Array();

    this._model = this._loadApp(simdir);
  }

  private _loadApp(simdir: string): Model {
    const simJson = join(simdir, "simulator.json");
    if (!existsSync(simJson)) {
      throw new Error(
        `Invalid Wing app (${simdir}) - simulator.json not found.`
      );
    }

    const schema = readJsonSync(simJson) as WingSimulatorSchema;

    const foundVersion = schema.sdkVersion ?? "unknown";
    const expectedVersion = SDK_VERSION;
    if (foundVersion !== expectedVersion) {
      console.error(
        `WARNING: The simulator directory (${simdir}) was generated with Wing SDK v${foundVersion} but it is being simulated with Wing SDK v${expectedVersion}.`
      );
    }
    if (schema.resources === undefined) {
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
    const graph = new Graph(Object.values(schema.resources));

    // initialize new resources to "stopped" state.
    for (const node of graph.nodes) {
      if (this.tryGetResourceRunningState(node.path) !== undefined) {
        continue;
      }

      this.setResourceRunningState(node.path, "stopped");
    }

    return { schema, tree, connections, simdir, graph };
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

    try {
      await this.lockfile.lock();
      await this.startServer();
      await this.startResources();
    } catch (err: any) {
      this.stopServer();
      this._running = "stopped";
      throw err;
    }
  }

  private async startResources() {
    const retries: Record<string, number> = {};
    const queue = this._model.graph.nodes.map((n) => n.path);
    const failed = [];
    while (queue.length > 0) {
      const top = queue.shift()!;
      try {
        await this.startResource(top);
      } catch (e: any) {
        if (e instanceof UnresolvedTokenError) {
          retries[top] = (retries[top] ?? 0) + 1;

          if (retries[top] < 10) {
            queue.push(top);
            continue;
          } else {
            failed.push(top);
          }
        }

        this.addSimulatorTrace(top, { message: e.message }, LogLevel.ERROR);
      }
    }

    // mark as "running" so that we can stop the simulation if needed
    this._running = "running";

    // since some resources failed to start, we are going to stop all resources that were started
    if (failed.length > 0) {
      await this.stop();

      throw new Error(
        `Failed to start resources: ${failed.map((r) => `"${r}"`).join(", ")}`
      );
    }
  }

  /**
   * Updates the running simulation with a new version of the app. This will create/update/delete
   * resources as necessary to get to the desired state.
   * @param simDir The path to the new version of the app
   */
  public async update(simDir: string) {
    const newModel = this._loadApp(simDir);

    const plan = await this.planUpdate(
      this._model.schema.resources,
      newModel.schema.resources
    );

    this.addTrace({
      type: TraceType.SIMULATOR,
      data: {
        message: `Update: ${plan.added.length} added, ${plan.updated.length} updated, ${plan.deleted.length} deleted`,
        update: plan,
      },
      sourcePath: "root",
      sourceType: "Simulator",
      level: LogLevel.VERBOSE,
      timestamp: new Date().toISOString(),
    });

    // stop all *deleted* and *updated* resources
    for (const c of [...plan.deleted, ...plan.updated]) {
      await this.stopResource(c); // <-- this also stops all dependent resources if needed
    }

    // now update the internal model to the new version
    this._model = newModel;

    // start all *added* and *updated* resources (the updated model basically includes only these)
    // this will also start all dependencies as needed and not touch any resource that is already started
    await this.startResources();
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

    // just call "stopResource" for all resources. it will stop all dependents as well.
    for (const node of this._model.graph.nodes) {
      await this.stopResource(node.path);
    }

    this.stopServer();

    await this.lockfile.release();

    this._handles.reset();
    this._running = "stopped";
  }

  private isStarted(path: string): boolean {
    return path in this.state;
  }

  private setResourceRunningState(
    path: string,
    runningState: ResourceRunningState
  ) {
    this.runningState[path] = runningState;

    for (const subscriber of this._resourceLifecyleSubscribers) {
      subscriber.callback({ path, runningState });
    }
  }

  private async stopResource(path: string) {
    if (!this.isStarted(path)) {
      return; // resource is already stopped
    }

    // first, stop all dependent resources
    for (const consumer of this._model.graph.tryFind(path)?.dependents ?? []) {
      await this.stopResource(consumer);
    }

    const handle = this.tryGetResourceHandle(path);
    if (!handle) {
      throw new Error(
        `Resource ${path} could not be cleaned up, no handle for it was found.`
      );
    }

    this.setResourceRunningState(path, "stopping");

    try {
      const resource = this._handles.find(handle);
      await this.ensureStateDirExists(path);
      await resource.save(this.getResourceStateDir(path));
      await resource.cleanup();
      this._handles.deallocate(handle);
    } catch (err) {
      console.warn(err);
    }

    // remove the resource's policy from the policy registry
    this._policyRegistry.deregister(path);

    this.setResourceRunningState(path, "stopped");

    this.addSimulatorTrace(
      path,
      { message: `${path} stopped` },
      LogLevel.VERBOSE
    );

    delete this.state[path]; // delete the state of the resource
  }

  private addSimulatorTrace(path: string, data: any, level: LogLevel) {
    const resourceConfig = this.getResourceConfig(path);
    this.addTrace({
      type: TraceType.SIMULATOR,
      level,
      data: data,
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
      this._traces = [];
    }

    this._model = this._loadApp(this._model.simdir);

    await this.start();
  }

  /**
   * Get a list of all resource paths.
   */
  public listResources(): string[] {
    return this._model.graph.nodes.map((x) => x.path).sort();
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
    if (handle) {
      return makeSimulatorClient(this.url, handle, ADMIN_PERMISSION);
    }

    // backwards compatibility trick: if a unit test requests a resource with a path like "foo/bar"
    // which is not found, but a resource "foo/bar/Resource" exists and its
    // type is @winglang/sdk.sim.Resource, then we will return that client instead
    const childPath = `${path}/Resource`;
    const childConfig = this.tryGetResourceConfig(childPath);
    if (childConfig?.type === "@winglang/sdk.sim.Resource") {
      const childHandle = this.tryGetResourceHandle(childPath);
      if (childHandle) {
        const client = makeSimulatorClient(
          this.url,
          childHandle,
          ADMIN_PERMISSION
        );

        const get = (_target: any, method: string, _receiver: any) => {
          return async function (...args: any[]) {
            return client.call(method, args);
          };
        };

        return new Proxy({}, { get });
      }
    }

    return undefined;
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

    const def = this._model.graph.tryFind(path)?.def;
    if (!def) {
      return undefined;
    }

    const state = this.state[path];

    return {
      ...def,

      // merge the actual state (props and attrs) over the desired state in `def`
      ...state,
    };
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
   * Get the running state of a resource.
   */
  public tryGetResourceRunningState(
    path: string
  ): ResourceRunningState | undefined {
    return this.runningState[path];
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

  private async ensureStateDirExists(path: string) {
    const statedir = this.getResourceStateDir(path);
    const statedirExists = await exists(statedir);
    if (!statedirExists) {
      await mkdir(statedir, { recursive: true });
    }
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
    const schema = this._model.schema.types[fqn];
    if (!schema) {
      throw new Error(`Unknown simulator type ${fqn}`);
    }
    return schema;
  }

  /**
   * Register a subscriber that will be notified when a trace is emitted by
   * the simulator.
   */
  public onTrace(subscriber: ITraceSubscriber) {
    this._traceSubscribers.push(subscriber);
  }

  /**
   * Register a subscriber that will be notified when a resource's lifecycle
   * state changes.
   */
  public onResourceLifecycleEvent(subscriber: IResourceLifecycleSubscriber) {
    this._resourceLifecyleSubscribers.push(subscriber);
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

  private checkPermission(
    callerHandle: string,
    calleeHandle: string,
    method: string
  ): { granted: boolean; reason?: string } {
    if (callerHandle === ADMIN_PERMISSION) {
      return { granted: true };
    }

    if (method === "then") {
      // Always grant permissions for the "then" method so that an error isn't thrown
      // if `await client` is called on a Proxy object. In JavaScript, `await x` will
      // implicitly call `x.then()`.
      return { granted: true };
    }

    const callerPath = this._handles.tryFindPath(callerHandle);
    if (!callerPath) {
      return {
        granted: false,
        reason: `(Permission checking) No caller resource with handle "${callerHandle}" found.`,
      };
    }

    const calleePath = this._handles.tryFindPath(calleeHandle);
    if (!calleePath) {
      return {
        granted: false,
        reason: `(Permission checking) No callee resource with handle "${calleeHandle}" found.`,
      };
    }

    if (
      this._policyRegistry.checkPermission(callerHandle, calleeHandle, method)
    ) {
      return { granted: true };
    }

    return {
      granted: false,
      reason: `Resource "${callerPath}" does not have permission to perform operation "${method}" on resource "${calleePath}".`,
    };
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
        const { caller, handle, method, args } = request;
        const resource = this._handles.tryFind(handle);

        // Check if the caller has permission to call the method on the resource
        const grant = this.checkPermission(caller, handle, method);
        if (!grant.granted) {
          res.writeHead(403, { "Content-Type": "application/json" });
          res.end(
            serialize({
              error: {
                message: grant.reason,
              },
            }),
            "utf-8"
          );
          return;
        }

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
          const resourcePath = this._handles.tryFindPath(handle);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(
            serialize({
              error: {
                message: `Method "${method}" not found on resource ${handle} (${resourcePath}).`,
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
    await new Promise<void>((ok) => {
      server.listen(0, LOCALHOST_ADDRESS, () => {
        const addr = server.address();
        if (addr && typeof addr === "object" && (addr as any).port) {
          this._serverUrl = `http://${addr.address}:${addr.port}`;
        }
        this._server = server;
        ok();
      });
    });
  }

  /**
   * Stop the simulator server.
   */
  private stopServer() {
    this._server?.close();
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

  private async startResource(path: string): Promise<void> {
    if (this.isStarted(path)) {
      return; // already started
    }

    // first lets make sure all my dependencies have been started (depth-first)
    for (const d of this._model.graph.tryFind(path)?.dependencies ?? []) {
      await this.startResource(d);
    }

    const resourceConfig = this.getResourceConfig(path);

    const resolvedProps = this.resolveTokens(path, resourceConfig.props);
    const resolvedPolicy: PolicyStatement[] =
      this.resolveTokens(path, resourceConfig.policy) ?? [];

    // look up the location of the code for the type
    const typeInfo = this.typeInfo(resourceConfig.type);

    // set up a state directory for the resource
    await mkdir(this.getResourceStateDir(resourceConfig.path), {
      recursive: true,
    });

    // initialize the resource state object without attrs for now
    this.state[path] = {
      props: resolvedProps,
      attrs: {},
      policy: resolvedPolicy,
    };
    this.setResourceRunningState(path, "starting");

    // create the resource based on its type
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const ResourceType = require(typeInfo.sourcePath)[typeInfo.className];
    const resourceObject = new ResourceType(resolvedProps);

    // allocate a handle for the resource so others can find it
    const handle = this._handles.allocate(path, resourceObject);

    // if the resource is a policy, add it to the policy registry
    if (resourceConfig.type === POLICY_FQN) {
      const policy = resolvedProps as PolicySchema;
      this._policyRegistry.register(resourceConfig.path, policy);
    } else {
      // otherwise, add the resource's inline policy to the policy registry
      const policy = {
        statements: resolvedPolicy,
        principal: handle,
      };
      this._policyRegistry.register(resourceConfig.path, policy);
    }

    // initialize the resource with the simulator context
    const context = this.createContext(resourceConfig, handle);
    let initError: any;
    try {
      const attrs = await resourceObject.init(context);

      this.state[path].attrs = {
        ...this.state[path].attrs,
        ...attrs,
      };
    } catch (error: any) {
      initError = error;
    }

    // save the current state
    await resourceObject.save();

    // merge the attributes
    this.state[path].attrs = {
      ...this.state[path].attrs,
      [HANDLE_ATTRIBUTE]: handle,
    };
    this.setResourceRunningState(path, initError ? "error" : "started");

    this.addSimulatorTrace(
      path,
      {
        message: initError
          ? `${resourceConfig.path} failed to start: ${initError}`
          : `${resourceConfig.path} started`,
      },
      initError ? LogLevel.ERROR : LogLevel.VERBOSE
    );
  }

  private createContext(
    resourceConfig: BaseResourceSchema,
    resourceHandle: string
  ): ISimulatorContext {
    return {
      simdir: this._model.simdir,
      statedir: join(this.statedir, resourceConfig.addr),
      resourcePath: resourceConfig.path,
      resourceHandle: resourceHandle,
      serverUrl: this.url,
      getClient: (calleeHandle: string, asAdmin: boolean) => {
        const callerHandle = asAdmin ? ADMIN_PERMISSION : resourceHandle;
        return makeSimulatorClient(this.url, calleeHandle, callerHandle);
      },
      addTrace: (trace: Trace) => {
        this.addTrace(trace);
      },
      withTrace: async (props: IWithTraceProps) => {
        // TODO: log start time and end time of activity?
        try {
          let result = await props.activity();
          this.addTrace({
            data: {
              message: props.message,
              status: "success",
              result: JSON.stringify(result),
            },
            type: TraceType.RESOURCE,
            level: LogLevel.VERBOSE,
            sourcePath: resourceConfig.path,
            sourceType: resourceConfig.type,
            timestamp: new Date().toISOString(),
          });
          return result;
        } catch (err: any) {
          this.addTrace({
            data: {
              message: `Error: ${err.message} (${props.message})`,
              error: err,
              status: "failure",
            },
            type: TraceType.RESOURCE,
            level: LogLevel.VERBOSE,
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
        for (const [key, value] of Object.entries(attrs)) {
          this.addSimulatorTrace(
            path,
            {
              message: `${path}.${key} = ${value}`,
            },
            LogLevel.VERBOSE
          );
        }

        this.state[path].attrs = { ...this.state[path].attrs, ...attrs };
      },
      resourceAttributes: (path: string) => {
        return this.state[path].attrs;
      },
    };
  }

  private addTrace(event: Trace) {
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
   * @returns `undefined` if the token could not be resolved (e.g. needs a dependency), otherwise
   * the resolved value.
   */
  private resolveTokens(resolver: string, obj: any): any {
    return resolveTokens(obj, (token) => {
      const target = this._model.graph.tryFind(token.path);
      if (!target) {
        throw new Error(
          `Could not resolve token "${token}" because the resource at path "${token.path}" does not exist.`
        );
      }

      const r = this.getResourceConfig(target.path);

      if (token.attr) {
        const value = r.attrs[token.attr];
        if (value === undefined) {
          throw new UnresolvedTokenError(
            `Unable to resolve attribute '${token.attr}' for resource "${target.path}" referenced by "${resolver}"`
          );
        }
        return value;
      }

      if (token.prop) {
        return r.props[token.prop];
      }

      throw new Error(`Invalid token: ${token}`);
    });
  }

  /**
   * Given the "current" set of resources and a "next" set of resources, calculate the diff and
   * determine which resources need to be added, updated or deleted.
   *
   * Note that dependencies are not considered here but they are implicitly handled by the
   * `startResource` and `stopResource` methods. So, for example, when a resource is updated,
   * all of it's dependents will be stopped and started again.
   */
  private async planUpdate(
    current: Record<string, BaseResourceSchema>,
    next: Record<string, BaseResourceSchema>
  ) {
    // Make sure we're working on a copy of "current"
    current = { ...current };

    const added: string[] = [];
    const updated: string[] = [];
    const deleted: string[] = [];

    for (const [path, nextConfig] of Object.entries(next)) {
      const currConfig = current[path];

      // if the resource is not in "current", it means it was added
      if (!currConfig) {
        added.push(nextConfig.path);
        continue;
      }

      // the resource is already in "current", if it's different from "next", it means it was updated
      if (await this.shouldReplace(path, currConfig, nextConfig)) {
        updated.push(nextConfig.path);
      }

      // remove it from "current" so we know what's left to be deleted
      delete current[path];
    }

    // everything left in "current" is to be deleted
    for (const config of Object.values(current)) {
      deleted.push(config.path);
    }

    return { added, updated, deleted };
  }

  private async shouldReplace(
    path: string,
    oldConfig: BaseResourceSchema,
    newConfig: BaseResourceSchema
  ) {
    const state = (r: BaseResourceSchema) =>
      JSON.stringify({
        props: r.props,
        type: r.type,
        policyStatements: r.policy,
      });

    const invalidated = state(oldConfig) !== state(newConfig);

    // consult the resource's "plan()" method if it has one
    const instance = this.tryGetResource(path) as ISimulatorResourceInstance;
    const plan = instance ? await instance.plan(invalidated) : UpdatePlan.AUTO;

    switch (plan) {
      case UpdatePlan.SKIP:
        return false;

      case UpdatePlan.REPLACE:
        return true;

      case UpdatePlan.AUTO:
        // Replace the resource if the new configuration is different from the current configuration
        //
        // Note: we're comparing the unresolved configurations, either of which may contain tokens.
        // So even if the configurations may look the same, it's possible that a replacement
        // is still necessary.
        return invalidated;
    }
  }
}

class UnresolvedTokenError extends Error {}

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
  private readonly paths: Map<string, string>; // handle -> path
  private nextHandle: number;

  public constructor() {
    this.handles = new Map();
    this.paths = new Map();
    this.nextHandle = 0;
  }

  public allocate(path: string, resource: ISimulatorResourceInstance): string {
    const handle = `sim-${this.nextHandle++}`;
    this.handles.set(handle, resource);
    this.paths.set(handle, path);
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

  public tryFindPath(handle: string): string | undefined {
    return this.paths.get(handle);
  }

  public deallocate(handle: string): ISimulatorResourceInstance {
    const instance = this.handles.get(handle);
    if (!instance) {
      throw new Error(`No resource found with handle "${handle}".`);
    }
    this.handles.delete(handle);
    this.paths.delete(handle);
    return instance;
  }

  public reset(): void {
    this.handles.clear();
    this.paths.clear();
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
  init(ctx: ISimulatorContext): Promise<Record<string, any>>;

  /**
   * Stop the resource and clean up any physical resources it may have created
   * (files, ports, etc).
   */
  cleanup(): Promise<void>;

  /**
   * Save the resource's state into the state directory.
   */
  save(statedir: string): Promise<void>;

  /**
   * Determines the update plan for applying a new configuration for this resource.
   *
   * If this is not implemented, the default behavior is to automatically replace the resource if
   * the new configuration is different from the current configuration.
   *
   * @param invalidated Whether the new configuration is different from the current configuration.
   */
  plan(invalidated: boolean): Promise<UpdatePlan>;
}

/**
 * Determines how updates are performed on this resource.
 */
export enum UpdatePlan {
  /**
   * Does nothing. This resource is already in the desired state.
   */
  SKIP = "SKIP",

  /**
   * Deletes the resource and creates a new instance with the new configuration.
   */
  REPLACE = "REPLACE",

  /**
   * Auto detect changes in new configuration and replace the resource.
   */
  AUTO = "AUTO",
}

/** Schema for simulator.json */
export interface WingSimulatorSchema {
  /** The resources, indexed by their construct path. */
  readonly resources: Record<string, BaseResourceSchema>;
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

/**
 * Schema for individual resources.
 * Only contains fields that need to be returned by `toSimulator()`.
 */
export interface ToSimulatorOutput {
  /** The type of the resource. */
  readonly type: string;
  /** The resource-specific properties needed to create this resource. */
  readonly props: { [key: string]: any };
  /** A list of inline policy statements that define permissions for this resource. */
  readonly policy?: PolicyStatement[];
}

/** Schema for individual resources */
export interface BaseResourceSchema extends ToSimulatorOutput {
  /** The resource path from the app's construct tree. */
  readonly path: string;
  /** An opaque tree-unique address of the resource, calculated as a SHA-1 hash of the resource path. */
  readonly addr: string;
  /** The resource-specific attributes that are set after the resource is created. */
  readonly attrs: Record<string, any>;
  /** Resources that should be deployed before this resource. */
  readonly deps?: string[];
}

/** A policy statement that defines a permission for a resource. */
export interface PolicyStatement {
  /** The operation that can be performed. */
  readonly operation: string;
  /** The resource the operation can be performed on. */
  readonly resourceHandle: string;
}

/** Schema for `.connections` in connections.json */
export interface ConnectionData {
  /** The path of the source construct. */
  readonly source: string;
  /**
   * An operation that the source object supports.
   * @default - no operation
   */
  readonly sourceOp?: string;
  /** The path of the target construct. */
  readonly target: string;
  /**
   * An operation that the target object supports.
   * @default - no operation
   */
  readonly targetOp?: string;
  /** A name for the connection. */
  readonly name: string;
}

/**
 * Internal schema for requests to the simulator server's /v1/call endpoint.
 * Subject to breaking changes.
 */
export interface SimulatorServerRequest {
  /** The handle of the resource making the request. */
  readonly caller: string;
  /** The target resource handle (an ID unique among resources in the simulation). */
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

class PolicyRegistry {
  private readonly policies: Record<string, PolicySchema>;

  constructor() {
    this.policies = {};
  }

  public register(id: string, policy: PolicySchema) {
    if (this.policies[id]) {
      throw new Error(`Policy with id ${id} already registered.`);
    }
    this.policies[id] = policy;
  }

  public deregister(id: string) {
    delete this.policies[id];
  }

  public checkPermission(
    caller: string,
    callee: string,
    method: string
  ): boolean {
    for (const policy of Object.values(this.policies)) {
      if (policy.principal === caller) {
        for (const statement of policy.statements) {
          if (
            statement.resourceHandle === callee &&
            statement.operation === method
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }
}
