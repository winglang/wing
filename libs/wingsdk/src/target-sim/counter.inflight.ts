import { SimulatorResource } from "./resource";
import { CounterSchema } from "./schema-resources";
import { ICounterClient } from "../cloud";
import { ISimulatorContext } from "../testing/simulator";

export class Counter extends SimulatorResource implements ICounterClient {
  private value: number;
  private readonly context: ISimulatorContext;
  public constructor(
    props: CounterSchema["props"],
    context: ISimulatorContext
  ) {
    super();
    this.value = props.initial;
    this.context = context;
  }

  public async inc(amount: number = 1): Promise<number> {
    return this.context.withTrace({
      message: `Inc (amount=${amount}).`,
      activity: async () => {
        const prev = this.value;
        this.value += amount;
        return prev;
      },
      metadata: this.metadata?.tracing,
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
      metadata: this.metadata?.tracing,
    });
  }

  public async peek(): Promise<number> {
    return this.context.withTrace({
      message: `Peek (value=${this.value})`,
      activity: async () => {
        return this.value;
      },
      metadata: this.metadata?.tracing,
    });
  }
}
