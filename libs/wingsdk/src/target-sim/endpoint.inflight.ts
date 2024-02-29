import { EndpointAttributes, EndpointSchema } from "./schema-resources";
import { IEndpointClient } from "../cloud";
import { ISimulatorContext, ISimulatorResourceInstance } from "../simulator";

export class Endpoint implements IEndpointClient, ISimulatorResourceInstance {
  constructor(
    private readonly _props: EndpointSchema["props"],
    _context: ISimulatorContext,
  ) {}
  public async init(): Promise<EndpointAttributes> {
    return {
      inputUrl: this._props.inputUrl,
      url: this._props.url,
      label: this._props.label,
      browserSupport: this._props.browserSupport,
    };
  }

  public async cleanup(): Promise<void> {}

  public async save(): Promise<void> {}
}
