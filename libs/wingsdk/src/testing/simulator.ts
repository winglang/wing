import { existsSync } from "fs";
import { join } from "path";
import * as tar from "tar";
import { ISimulatorResource } from "../sim";
import { BaseResourceSchema, WingSimulatorSchema } from "../sim/schema";
import { log, mkdtemp, readJsonSync } from "../util";
// eslint-disable-next-line import/no-restricted-paths, @typescript-eslint/no-require-imports
const { DefaultSimulatorFactory } = require("../sim/factory.sim");

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
}

/**
 * Context that is passed to individual resource simulations.
 */
export interface ISimulatorContext {
  /**
   * A unique id for this particular simulation run. This can be used to
   * distinguish between multiple runs of the same simulation.
   */
  readonly simulationId: string;

  /**
   * The absolute path to where all assets in `app.wx` are stored.
   */
  readonly assetsDir: string;

  /**
   * Find a resource simulation by its handle. Throws if the handle isn't valid.
   */
  findInstance(handle: string): ISimulatorResource;
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
  private _simulationId: string | undefined; // defined when start() is called
  private readonly handles = new Map<string, ISimulatorResource>();

  constructor(props: SimulatorProps) {
    this._simfile = props.simfile;
    const { assetsDir, tree } = this._loadApp(props.simfile);
    this._tree = tree;
    this._assetsDir = assetsDir;

    this._factory = props.factory ?? new DefaultSimulatorFactory();
  }

  private _loadApp(simfile: string): { assetsDir: string; tree: any } {
    // create a temporary directory to store extracted files
    const workdir = mkdtemp();
    tar.extract({
      cwd: workdir,
      sync: true,
      file: simfile,
    });

    log("extracted app to", workdir);

    const simJson = join(workdir, "simulator.json");
    if (!existsSync(simJson)) {
      throw new Error(
        `Invalid Wing app (${simfile}) - simulator.json not found.`
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
    if (this._simulationId) {
      throw new Error(
        "A simulation is already running. Did you mean to call `await simulator.stop()` first?"
      );
    }

    const simulationId = `${Date.now().toString(36)}`;

    const context: ISimulatorContext = {
      simulationId,
      assetsDir: this._assetsDir,
      findInstance: (handle: string) => {
        return this.findInstance(handle);
      },
    };

    for (const path of this._tree.startOrder) {
      const resourceData = findResource(this._tree, path);
      log(`starting resource ${path} (${resourceData.type})`);
      const props = this.resolveTokens(path, resourceData.props);
      const resource = this._factory.resolve(resourceData.type, props, context);
      await resource.init();
      const handle = this.addInstance(resourceData.type, path, resource);
      (resourceData as any).attrs = { handle };
    }

    this._simulationId = simulationId;
  }

  private addInstance(
    type: string,
    path: string,
    resource: ISimulatorResource
  ): string {
    const handle = `sim://${this._simulationId}/${type.toUpperCase()}/${path}`;
    this.handles.set(handle, resource);
    return handle;
  }

  private findInstance(handle: string): ISimulatorResource {
    const instance = this.handles.get(handle);
    if (!instance) {
      throw new Error(`No resource found with handle "${handle}".`);
    }
    return instance;
  }

  private removeInstance(handle: string): ISimulatorResource {
    const instance = this.handles.get(handle);
    if (!instance) {
      throw new Error(`No resource found with handle "${handle}".`);
    }
    this.handles.delete(handle);
    return instance;
  }

  /**
   * Stop the simulation and clean up all resources.
   */
  public async stop(): Promise<void> {
    if (!this._simulationId) {
      throw new Error(
        "There is no running simulation to stop. Did you mean to call `await simulator.start()` first?"
      );
    }

    for (const path of this._tree.startOrder.slice().reverse()) {
      const res = findResource(this._tree, path);
      log(`stopping resource ${path} (${res.type})`);
      const resource = this.removeInstance(res.attrs!.handle);
      await resource.cleanup();
    }

    this.handles.clear();
    this._simulationId = undefined;

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
   * Get the resource instance for a given path.
   */
  public getResourceByPath(path: string): any {
    const handle = this.getAttributes(path).handle;
    if (!handle) {
      throw new Error(`Resource ${path} does not have a handle.`);
    }
    return this.findInstance(handle);
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
 * A factory that can turn resource descriptions into resource simulations.
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
