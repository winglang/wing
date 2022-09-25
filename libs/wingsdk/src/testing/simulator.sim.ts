import { DefaultSimulatorFactory } from "../sim/factory.sim";

export interface SimulatorFromResourcesProps {
  readonly resources: { [key: string]: any };
  readonly factory?: ISimulatorFactory;
}

export type IResourceResolver = {
  lookup(resourceId: string): any;
};

export class Simulator {
  public static async fromResources(props: SimulatorFromResourcesProps) {
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
        return resource.attributes;
      },
    };
    for (const [resourceId, resource] of Object.entries(props.resources)) {
      const { type, props: resourceProps } = resource;
      const attributes = await factory.init(type, {
        ...resourceProps,
        _resolver,
      });
      resourceData[resourceId] = {
        type,
        props: resourceProps,
        attributes,
      };
    }

    return new Simulator(factory, resourceData);
  }

  private constructor(
    private readonly factory: ISimulatorFactory,
    private readonly resourceData: { [key: string]: ResourceData }
  ) {}

  public getAttributes(resourceId: string) {
    return this.resourceData[resourceId].attributes;
  }

  public async cleanup() {
    for (const [_resourceId, resource] of Object.entries(this.resourceData)) {
      const { type, attributes } = resource;
      await this.factory.cleanup(type, attributes);
    }
  }
}

interface ResourceData {
  // TODO: what about non-polycon resources?
  /** Polycon ID */
  type: string;
  /** Resource data defined at synthesis time, through the construct tree. */
  props: any;
  /** Resource data created at deployment time by the simulator.  */
  attributes: any;
}

export interface ISimulatorFactory {
  init(polyconId: string, props: any): Promise<any>;
  cleanup(polyconId: string, props: any): Promise<void>;
}
