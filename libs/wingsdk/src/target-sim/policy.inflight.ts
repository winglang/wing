import { IPolicyClient } from "./policy";
import { PolicySchema } from "./schema-resources";
import { ISimulatorContext, ISimulatorResourceInstance } from "../simulator";

export class Policy implements IPolicyClient, ISimulatorResourceInstance {
  constructor(_props: PolicySchema["props"]) {}
  public async init(_context: ISimulatorContext): Promise<Record<string, any>> {
    return {};
  }

  public async cleanup(): Promise<void> {}

  public async save(): Promise<void> {}
}
