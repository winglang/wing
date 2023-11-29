import { EndpointSchema } from "./schema-resources";
import { IEndpointClient } from "../cloud";
import { ISimulatorContext, ISimulatorResourceInstance } from "../simulator";

export class Endpoint implements IEndpointClient, ISimulatorResourceInstance {
  constructor(_props: EndpointSchema["props"], _context: ISimulatorContext) {}
  public async init(): Promise<Record<string, any>> {
    return {};
  }

  public async cleanup(): Promise<void> {}
}
