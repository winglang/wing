import { ISimulatorResourceInstance, TracingContext } from "./resource";
import { CounterSchema } from "./schema-resources";
import { ICounterClient } from "../cloud";
import { ISimulatorContext } from "../testing/simulator";

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

  public async init(): Promise<void> {}
  public async cleanup(): Promise<void> {}

  public async inc(amount: number = 1, ctx?: TracingContext): Promise<number> {
    return this.context.withTrace({
      message: `Inc (amount=${amount}).`,
      activity: async () => {
        const prev = this.value;
        this.value += amount;
        return prev;
      },
      ctx,
    });
  }

  public async dec(amount: number = 1, ctx?: TracingContext): Promise<number> {
    return this.context.withTrace({
      message: `Dec (amount=${amount}).`,
      activity: async () => {
        const prev = this.value;
        this.value -= amount;
        return prev;
      },
      ctx,
    });
  }

  public async peek(ctx?: TracingContext): Promise<number> {
    return this.context.withTrace({
      message: `Peek (value=${this.value})`,
      activity: async () => {
        return this.value;
      },
      ctx,
    });
  }
}
