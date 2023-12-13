import { DomainSchema } from "./schema-resources";
import { IDomainClient } from "../cloud";
import { ISimulatorContext, ISimulatorResourceInstance } from "../simulator";

export class Domain implements IDomainClient, ISimulatorResourceInstance {
  constructor(_props: DomainSchema["props"], _context: ISimulatorContext) {}
  public async init(): Promise<Record<string, any>> {
    return {};
  }

  public async cleanup(): Promise<void> {}
}
