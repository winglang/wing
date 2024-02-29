import { StateSchema } from "./schema-resources";
import { IStateClient } from "./state";
import { ISimulatorContext, ISimulatorResourceInstance } from "../simulator";
import { Json } from "../std";

export class State implements IStateClient, ISimulatorResourceInstance {
  constructor(
    _props: StateSchema["props"],
    private readonly context: ISimulatorContext,
  ) {}
  public async init(): Promise<Record<string, any>> {
    return {};
  }

  public async cleanup(): Promise<void> {}

  public async save(): Promise<void> {}

  public async set(key: string, value: any): Promise<void> {
    this.context.setResourceAttributes(this.context.resourcePath, {
      [key]: value,
    });
  }

  public async get(key: string): Promise<any> {
    const value = await this.tryGet(key);
    if (value === undefined) {
      throw new Error(`Key "${key}" not found`);
    }

    return value;
  }

  public async tryGet(key: string): Promise<Json | undefined> {
    return this.context.resourceAttributes(this.context.resourcePath)[key];
  }
}
