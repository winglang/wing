import * as fs from "fs";
import { join } from "path";
import { CounterAttributes, CounterSchema } from "./schema-resources";
import { ICounterClient } from "../cloud";
import {
  ISimulatorContext,
  ISimulatorResourceInstance,
} from "../simulator/simulator";

export class Counter implements ICounterClient, ISimulatorResourceInstance {
  private values: Map<string, number>;
  private initial: number;
  private readonly context: ISimulatorContext;

  public constructor(
    props: CounterSchema["props"],
    context: ISimulatorContext
  ) {
    this.initial = props.initial ?? 0;
    this.values = new Map().set("default", this.initial);
    this.context = context;
  }

  public async init(): Promise<CounterAttributes> {
    return {};
  }

  public async cleanup(): Promise<void> {}

  public async save(dir: string): Promise<void> {
    await fs.promises.writeFile(
      join(dir, "values.json"),
      JSON.stringify(Array.from(this.values.entries()))
    );
  }

  public async inc(
    amount: number = 1,
    key: string = "default"
  ): Promise<number> {
    return this.context.withTrace({
      message: `Inc (amount=${amount}${
        key != "default" ? ", key: " + key : ""
      }).`,
      activity: async () => {
        const prev = this.values.get(key) ?? this.initial;
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
        const prev = this.values.get(key) ?? this.initial;
        this.values.set(key, prev - amount);
        return prev;
      },
    });
  }

  public async peek(key: string = "default"): Promise<number> {
    return this.context.withTrace({
      message: `Peek (value=${this.values.get(key) ?? this.initial}${
        key != "default" ? ", key: " + key : ""
      }).`,
      activity: async () => {
        return this.values.get(key) ?? this.initial;
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
