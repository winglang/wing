import { ISimulatorContext } from "../testing/simulator";
import { ICounterClient } from "./counter";
import { ISimulatorResource } from "./resource";
import { CounterSchema } from "./schema-resources";

export class Counter implements ICounterClient, ISimulatorResource {
  private value: number;

  public constructor(
    props: CounterSchema["props"],
    _context: ISimulatorContext
  ) {
    this.value = props.initialValue;
  }

  public async init(): Promise<void> {}
  public async cleanup(): Promise<void> {}

  public async inc(amount: number = 1): Promise<number> {
    const prev = this.value;
    this.value += amount ?? 1;
    return prev;
  }
}
