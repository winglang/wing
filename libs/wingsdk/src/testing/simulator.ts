// eslint-disable-next-line import/no-restricted-paths, @typescript-eslint/no-require-imports
const { DefaultSimulatorFactory } = require("../sim/factory.sim");

export interface SimulatorFromResourcesProps {
  readonly resources: { [key: string]: any };
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
   * Start the simulator using an inline definition of your application's
   * resources.
   *
   * TODO: reference API schema?
   */
  public static async fromResources(
    props: SimulatorFromResourcesProps
  ): Promise<Simulator> {
    const factory = props.factory ?? new DefaultSimulatorFactory();

    const resourceData: { [resourceId: string]: ResourceData } = {};

    // This is an ad-hoc mechanism to allow resources to resolve deploy-time
    // attributes about other resources they depend on. For example, a queue
    // that has a function subscribed to it needs to obtain the function's
    // simulator-unique ID so it can create a Function client and invoke it.
    const _resolver = {
      lookup: (resourceId: string) => {
        const resource = resourceData[resourceId];
        if (!resource) {
          throw new Error(`Resource ${resourceId} not found.`);
        }
        return resource.attrs;
      },
    };
    for (const [resourceId, resource] of Object.entries(props.resources)) {
      const { type, props: resourceProps } = resource;
      const attrs = await factory.init(type, {
        ...resourceProps,
        _resolver,
      });
      resourceData[resourceId] = {
        type,
        props: resourceProps,
        attrs,
      };
    }

    return new Simulator(factory, resourceData);
  }

  private constructor(
    private readonly factory: ISimulatorFactory,
    private readonly resourceData: { [key: string]: ResourceData }
  ) {}

  /**
   * Obtain a resource's attributes. This is data that gets resolved when the
   * during the resource's in-simulator creation.
   */
  public getAttributes(resourceId: string): any {
    return this.resourceData[resourceId].attrs;
  }

  /**
   * Obtain a resource's props. This is data about the resource's configuration
   * that is resolved at synth time.
   */
  public getProps(resourceId: string): any {
    return this.resourceData[resourceId].props;
  }

  /**
   * Clean up all resources in this simulator.
   */
  public async cleanup(): Promise<void> {
    for (const [_resourceId, resource] of Object.entries(this.resourceData)) {
      const { type, attrs } = resource;
      await this.factory.cleanup(type, attrs);
    }
  }
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
