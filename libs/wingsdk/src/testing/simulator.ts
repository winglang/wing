// TODO: revisit this
// eslint-disable-next-line import/no-restricted-paths
import { DefaultSimulatorFactory } from "../sim/factory.sim";

export interface SimulatorFromResourcesProps {
  readonly resources: { [key: string]: any };
  readonly factory?: ISimulatorFactory;
}

export class Simulator {
  public static async fromResources(props: SimulatorFromResourcesProps) {
    const factory = props.factory ?? new DefaultSimulatorFactory();

    const resourceAttributes: { [resourceId: string]: any } = {};
    for (const [id, resource] of Object.entries(props.resources)) {
      const { type, props: resourceProps } = resource;
      const attrs = await factory.resolve(type, resourceProps);
      resourceAttributes[id] = attrs;
    }
    return new Simulator(resourceAttributes);
  }

  private constructor(
    private readonly resourceAttributes: { [key: string]: any }
  ) {}

  public getAttributes(resourceId: string) {
    return this.resourceAttributes[resourceId];
  }
}

export interface ISimulatorFactory {
  resolve(polyconId: string, props: any): Promise<any>;
}
