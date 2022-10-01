import { existsSync } from "fs";
import { join } from "path";
import { readJsonSync } from "fs-extra";
import * as tar from "tar";
import { ResourceSchema } from "../sim/schema";
import { mkdtemp } from "../util";
// eslint-disable-next-line import/no-restricted-paths, @typescript-eslint/no-require-imports
const { DefaultSimulatorFactory } = require("../sim/factory.sim");

/**
 * Options for `Simulator.fromResources`
 */
export interface SimulatorFromTreeOptions {
  /**
   * A tree of resources information to load into the simulator.
   */
  readonly tree: any;
  /**
   * The factory that dispatches to simulation implementations.
   * @default - a factory that simulates built-in Wing SDK resources
   */
  readonly factory?: ISimulatorFactory;
}

export type IResourceResolver = {
  lookup(resourceId: string): any;
};

/**
 * A simulator that can be used to test your application locally.
 */
export class Simulator {
  /**
   * Start the simulator from a Wing app file (.wx).
   */
  public static async fromWingApp(filepath: string): Promise<Simulator> {
    const workdir = mkdtemp();
    tar.extract({
      cwd: workdir,
      sync: true,
      file: filepath,
    });

    const simJson = join(workdir, "simulator.json");
    if (!existsSync(simJson)) {
      throw new Error(
        `Invalid Wing app "${filepath}" - simulator.json not found.`
      );
    }
    const data = readJsonSync(simJson);
    console.error(
      `(debug) contents of simulator.json:\n${JSON.stringify(data, null, 2)}`
    );
    return Simulator.fromTree({ tree: data });
  }

  /**
   * Start the simulator using an inline definition of your application's
   * resources.
   */
  public static async fromTree(
    options: SimulatorFromTreeOptions
  ): Promise<Simulator> {
    const factory: ISimulatorFactory =
      options.factory ?? new DefaultSimulatorFactory();

    const tree = options.tree;
    if (!tree.root) {
      throw new Error("Invalid tree: no root resource");
    }

    // This resolver allows resources to resolve deploy-time attributes about
    // other resources they depend on. For example, a queue that has a function
    // subscribed to it needs to obtain the function's simulator-unique ID in
    // order to invoke it.
    const _resolver = {
      lookup: (path: string) => {
        return findResource(tree, path);
      },
    };

    async function walk(path: string, node: ResourceSchema) {
      const { type, props } = node;
      console.error(`(debug) initializing ${path} (${type})`);
      const attrs = await factory.init(type, { ...props, _resolver });
      (node as any).attrs = attrs;
      (node as any).path = path;
      for (const [childId, child] of Object.entries(node.children ?? {})) {
        await walk(path + "/" + childId, child);
      }
    }

    await walk("root", tree.root);

    return new Simulator(factory, tree);
  }

  private constructor(
    private readonly _factory: ISimulatorFactory,
    private readonly _tree: any
  ) {}

  /**
   * Obtain a resource's attributes. This is data that gets resolved when the
   * during the resource's in-simulator creation.
   */
  public getAttributes(path: string): any {
    return findResource(this._tree, path).attrs;
  }

  /**
   * Obtain a resource's props. This is data about the resource's configuration
   * that is resolved at synth time.
   */
  public getProps(path: string): any {
    return findResource(this._tree, path).props;
  }

  /**
   * Return a copy of the simulator tree, including all resource attributes.
   */
  public get tree(): any {
    return JSON.parse(JSON.stringify(this._tree));
  }

  /**
   * Clean up all resources in this simulator.
   */
  public async cleanup(): Promise<void> {
    const factory = this._factory;

    async function walk(_id: string, node: ResourceSchema) {
      const { type, attrs } = node;
      await factory.cleanup(type, attrs);
      for (const [childId, child] of Object.entries(node.children ?? {})) {
        await walk(childId, child);
      }
    }

    await walk("root", this._tree.root);
  }
}

function findResource(tree: any, path: string): ResourceData {
  const parts = path.split("/");
  let node: any = { children: tree };
  for (const part of parts) {
    node = node.children[part];
    if (!node) {
      throw new Error(`Resource not found: ${path}`);
    }
  }
  return node;
}

interface ResourceData {
  /** Resource type name. */
  type: string;
  /** Resource data defined at synthesis time, through the construct tree. */
  props: any;
  /** Resource data created at deployment time by the simulator. */
  attrs: any;
}

/**
 * A factory specifying how to simulate polycons.
 */
export interface ISimulatorFactory {
  /**
   * Given a resource type and a resource's synthesis-time schema props, start
   * simulating a resource. This function should return an object/map containing
   * the resource's attributes.
   */
  init(type: string, props: any): Promise<any>;

  /**
   * Given a resource type and a resource's attributes, stop the resource's
   * simulation and clean up any file system resources it created.
   */
  cleanup(type: string, attrs: any): Promise<void>;
}
