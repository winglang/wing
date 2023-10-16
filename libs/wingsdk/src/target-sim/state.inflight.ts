import { StateSchema } from "./schema-resources";
import { IStateClient } from "./state";
import { ISimulatorContext, ISimulatorResourceInstance } from "../simulator";

export class State implements IStateClient, ISimulatorResourceInstance {
  constructor(
    private readonly path: string,
    _props: StateSchema["props"],
    private readonly context: ISimulatorContext
  ) {}
  public async init(): Promise<Record<string, any>> {
    return {};
  }

  public async cleanup(): Promise<void> {}

  public async set(key: string, value: any): Promise<void> {
    // once the property is set on the object, the token will be resolved.
    Object.defineProperty(this, key, { value });
    this.context.setResourceAttributes(this.path, { [key]: value });
  }

  public async get(key: string): Promise<any> {
    const value = this.context.resourceAttributes(this.path)[key];
    if (value === undefined) {
      throw new Error(`Key ${key} not found`);
    }

    return value;
  }
}
