import { StateSchema } from "./schema-resources";
import { IStateClient } from "./state";
import {
  ISimulatorContext,
  ISimulatorResourceInstance,
  UpdatePlan,
} from "../simulator";
import { Json } from "../std";

export class State implements IStateClient, ISimulatorResourceInstance {
  private _context: ISimulatorContext | undefined;
  constructor(_props: StateSchema) {}

  private get context(): ISimulatorContext {
    if (!this._context) {
      throw new Error("Cannot access context during class construction");
    }
    return this._context;
  }

  public async init(context: ISimulatorContext): Promise<Record<string, any>> {
    this._context = context;
    return {};
  }

  public async cleanup(): Promise<void> {}

  public async save(): Promise<void> {}

  public async plan() {
    return UpdatePlan.AUTO;
  }

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
