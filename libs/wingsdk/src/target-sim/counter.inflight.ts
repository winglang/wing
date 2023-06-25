import { CounterAttributes, CounterSchema } from "./schema-resources";
import { ICounterClient } from "../cloud";
import {
  ISimulatorContext,
  ISimulatorResourceInstance,
} from "../testing/simulator";

export class Counter implements ICounterClient, ISimulatorResourceInstance {
  private values: Map<string, number>;
  private readonly context: ISimulatorContext;

  public constructor(
    props: CounterSchema["props"],
    context: ISimulatorContext
  ) {
    this.values = new Map().set("default", props.initial);
    this.context = context;
  }

  public async init(): Promise<CounterAttributes> {
    return {};
  }

  public async cleanup(): Promise<void> {}

  public async inc(
    amount: number = 1,
    key: string = "default"
  ): Promise<number> {
    return this.context.withTrace({
      message: `Inc (amount=${amount}${
        key != "default" ? ", key: " + key : ""
      }).`,
      activity: async () => {
        const prev = this.values.get(key) ?? 0;
        this.values.set(key, prev + amount);
        return prev;
      },
    });
  }

  public async dec(
    amount: number = 1,
    key: string = "default"
  ): Promise<number> {
    key;
    return this.context.withTrace({
      message: `Dec (amount=${amount}${
        key != "default" ? ", key: " + key : ""
      }).`,
      activity: async () => {
        const prev = this.values.get(key) ?? 0;
        this.values.set(key, prev - amount);
        return prev;
      },
    });
  }

  public async peek(key: string = "default"): Promise<number> {
    return this.context.withTrace({
      message: `Peek (value=${this.values.get(key) ?? 0}${
        key != "default" ? ", key: " + key : ""
      }).`,
      activity: async () => {
        return this.values.get(key) ?? 0;
      },
    });
  }

  public async set(value: number, key: string = "default"): Promise<void> {
    key;
    return this.context.withTrace({
      message: `Set (value=${value}${
        key != "default" ? ", key: " + key : ""
      }).`,
      activity: async () => {
        this.values.set(key, value);
      },
    });
  }
}
