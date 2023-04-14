import { CounterAttributes, CounterSchema } from "./schema-resources";
import { ICounterClient } from "../cloud";
import {
  ISimulatorContext,
  ISimulatorResourceInstance,
} from "../testing/simulator";

export class Counter implements ICounterClient, ISimulatorResourceInstance {
  private value: number;
  private readonly context: ISimulatorContext;

  public constructor(
    props: CounterSchema["props"],
    context: ISimulatorContext
  ) {
    this.value = props.initial;
    this.context = context;
  }

  public async init(): Promise<CounterAttributes> {
    return {};
  }

  public async cleanup(): Promise<void> {}

  public async inc(amount: number = 1): Promise<number> {
    return this.context.withTrace({
      message: `Inc (amount=${amount}).`,
      activity: async () => {
        const prev = this.value;
        this.value += amount;
        return prev;
      },
    });
  }

  public async dec(amount: number = 1): Promise<number> {
    return this.context.withTrace({
      message: `Dec (amount=${amount}).`,
      activity: async () => {
        const prev = this.value;
        this.value -= amount;
        return prev;
      },
    });
  }

  public async peek(): Promise<number> {
    return this.context.withTrace({
      message: `Peek (value=${this.value}).`,
      activity: async () => {
        return this.value;
      },
    });
  }

  public async reset(reset_value: number = 0): Promise<void> {
    return this.context.withTrace({
      message: `Reset (value=${this.value}).`,
      activity: async () => {
        this.value = reset_value;
      },
    });
  }
}
