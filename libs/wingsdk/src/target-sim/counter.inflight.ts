import { ICounterClient } from "../cloud";
import { ISimulatorContext } from "../testing/simulator";
import { ISimulatable } from "./resource";
import { CounterSchema } from "./schema-resources";

export class Counter implements ICounterClient, ISimulatable {
  private value: number;
  private readonly context: ISimulatorContext;

  public constructor(
    props: CounterSchema["props"],
    context: ISimulatorContext
  ) {
    this.value = props.initialValue;
    this.context = context;
  }

  public async init(): Promise<void> {}
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
}
