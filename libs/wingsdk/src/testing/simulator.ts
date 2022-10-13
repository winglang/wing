import { existsSync } from "fs";
import { join } from "path";
import * as tar from "tar";
import { BaseResourceSchema, WingSimulatorSchema } from "../sim/schema";
import { log, mkdtemp, readJsonSync } from "../util";
// eslint-disable-next-line import/no-restricted-paths, @typescript-eslint/no-require-imports
const { DefaultSimulatorDispatcher } = require("../sim/dispatcher.sim");

/**
 * Props for `Simulator`.
 */
export interface SimulatorProps {
  /**
   * Path to a Wing app file (.wx).
   */
  readonly appPath: string;

  /**
   * The factory that dispatches to simulation implementations.
   * @default - a factory that simulates built-in Wing SDK resources
   */
  readonly dispatcher?: ISimulatorDispatcher;
}

/**
 * Context that is passed to individual resource simulations.
 */
export interface SimulatorContext {
  /**
   * A resolver that can be used to look up other resources in the tree.
   */
  readonly resolver: IResourceResolver;

  /**
   * The absolute path to where all assets in `app.wx` are stored.
   */
  readonly assetsDir: string;
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
  private readonly _dispatcher: ISimulatorDispatcher;
  private _tree: WingSimulatorSchema;
  private _appPath: string;
  private _assetsDir: string;

  constructor(props: SimulatorProps) {
    this._appPath = props.appPath;
    const { assetsDir, tree } = this._loadApp(props.appPath);
    this._tree = tree;
    this._assetsDir = assetsDir;

    this._dispatcher = props.dispatcher ?? new DefaultSimulatorDispatcher();
  }

  private _loadApp(appPath: string): { assetsDir: string; tree: any } {
    // create a temporary directory to store extracted files
    const workdir = mkdtemp();
    tar.extract({
      cwd: workdir,
      sync: true,
      file: appPath,
    });

    log("extracted app to", workdir);

    const simJson = join(workdir, "simulator.json");
    if (!existsSync(simJson)) {
      throw new Error(
        `Invalid Wing app (${appPath}) - simulator.json not found.`
      );
    }
    const data = readJsonSync(simJson);

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
    // TODO: what if start() gets called twice in a row?

    const context: SimulatorContext = {
      // This resolver allows resources to resolve deploy-time attributes about
      // other resources they depend on. For example, a queue that has a function
      // subscribed to it needs to obtain the function's simulator-unique ID in
      // order to invoke it.
      resolver: {
        lookup: (path: string) => {
          return findResource(this._tree, path);
        },
      },
      assetsDir: this._assetsDir,
    };

    for (const path of this._tree.startOrder) {
      const res = findResource(this._tree, path);
      log(`starting resource ${path} (${res.type})`);
      const props = resolveTokens(res.props, context.resolver);
      const attrs = await this._dispatcher.start(res.type, props, context);
      (res as any).attrs = attrs;
    }
  }

  /**
   * Stop the simulation and clean up all resources.
   */
  public async stop(): Promise<void> {
    // TODO: what if stop() gets called twice in a row?
    for (const path of this._tree.startOrder.slice().reverse()) {
      const res = findResource(this._tree, path);
      log(`stopping resource ${path} (${res.type})`);
      await this._dispatcher.stop(res.type, res.attrs);
    }
  }

  /**
   * Stop the simulation, reload the simulation tree from the latest version of
   * the app file, and restart the simulation.
   */
  public async reload(): Promise<void> {
    await this.stop();

    const { assetsDir, tree } = this._loadApp(this._appPath);
    this._tree = tree;
    this._assetsDir = assetsDir;

    await this.start();
  }

  /**
   * Obtain a resource's attributes. This is data that gets resolved when the
   * during the resource's in-simulator creation.
   */
  public getAttributes(path: string): { [key: string]: any } {
    return findResource(this._tree, path).attrs;
  }

  /**
   * Obtain a resource's props. This is data about the resource's configuration
   * that is resolved at synth time.
   */
  public getProps(path: string): { [key: string]: any } {
    return findResource(this._tree, path).props;
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
}

function isToken(value: string): boolean {
  return value.startsWith("${") && value.endsWith("}");
}

function resolveTokens(props: any, resolver: IResourceResolver): any {
  if (typeof props === "string") {
    if (isToken(props)) {
      const ref = props.slice(2, -1);
      const [path, rest] = ref.split("#");
      const resource = resolver.lookup(path);
      if (rest.startsWith("attrs.")) {
        return resource.attrs[rest.slice(6)];
      } else if (rest.startsWith("props.")) {
        return resource.props[rest.slice(6)];
      } else {
        throw new Error(`Invalid token reference: ${ref}`);
      }
    }
    return props;
  }

  if (Array.isArray(props)) {
    return props.map((x) => resolveTokens(x, resolver));
  }

  if (typeof props === "object") {
    const ret: any = {};
    for (const [key, value] of Object.entries(props)) {
      ret[key] = resolveTokens(value, resolver);
    }
    return ret;
  }

  return props;
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
 * Represents a class that can start and stop the simulation of an individual
 * resource.
 */
export interface ISimulatorDispatcher {
  /**
   * Start simulating a resource. This function should return an object/map
   * containing the resource's attributes.
   */
  start(type: string, props: any, context: SimulatorContext): Promise<any>;

  /**
   * Stop the resource's simulation and clean up any file system resources it
   * created.
   */
  stop(type: string, attrs: any): Promise<void>;
}
