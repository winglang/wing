import { DomainSchema } from "./schema-resources";
import { IDomainClient } from "../cloud";
import {
  ISimulatorContext,
  ISimulatorResourceInstance,
  UpdatePlan,
} from "../simulator";

export class Domain implements IDomainClient, ISimulatorResourceInstance {
  constructor(_props: DomainSchema) {}
  public async init(_context: ISimulatorContext): Promise<Record<string, any>> {
    return {};
  }

  public async cleanup(): Promise<void> {}

  public async save(): Promise<void> {}

  public async plan() {
    return UpdatePlan.AUTO;
  }
}
