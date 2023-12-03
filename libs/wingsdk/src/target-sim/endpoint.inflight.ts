import { EndpointAttributes, EndpointSchema } from "./schema-resources";
import { IEndpointClient } from "../cloud";
import { ISimulatorContext, ISimulatorResourceInstance } from "../simulator";

export class Endpoint implements IEndpointClient, ISimulatorResourceInstance {
  constructor(
    private readonly _props: EndpointSchema["props"],
    _context: ISimulatorContext
  ) {}
  public async init(): Promise<EndpointAttributes> {
    return {
      url: this._props.url,
    };
  }

  public async cleanup(): Promise<void> {}
}
