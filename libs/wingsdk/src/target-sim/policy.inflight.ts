import { IPolicyClient } from "./policy";
import { PolicySchema } from "./schema-resources";
import {
  ISimulatorContext,
  ISimulatorResourceInstance,
  UpdatePlan,
} from "../simulator";

export class Policy implements IPolicyClient, ISimulatorResourceInstance {
  constructor(_props: PolicySchema) {}
  public async init(_context: ISimulatorContext): Promise<Record<string, any>> {
    return {};
  }

  public async cleanup(): Promise<void> {}

  public async save(): Promise<void> {}

  public async plan(): Promise<UpdatePlan> {
    return UpdatePlan.AUTO;
  }
}
