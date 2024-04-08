import * as fs from "fs";
import { join } from "path";
import { CounterAttributes, CounterSchema } from "./schema-resources";
import { exists } from "./util";
import { ICounterClient } from "../cloud";
import {
  ISimulatorContext,
  ISimulatorResourceInstance,
  UpdatePlan,
} from "../simulator/simulator";

const VALUES_FILENAME = "values.json";

export class Counter implements ICounterClient, ISimulatorResourceInstance {
  private values: Map<string, number>;
  private initial: number;
  private _context: ISimulatorContext | undefined;

  public constructor(props: CounterSchema) {
    this.initial = props.initial ?? 0;
    this.values = new Map().set("default", this.initial);
  }

  private get context(): ISimulatorContext {
    if (!this._context) {
      throw new Error("Cannot access context during class construction");
    }
    return this._context;
  }

  public async init(context: ISimulatorContext): Promise<CounterAttributes> {
    this._context = context;
    const valuesFile = join(this.context.statedir, VALUES_FILENAME);
    const valueFilesExists = await exists(valuesFile);
    if (valueFilesExists) {
      const valuesContents = await fs.promises.readFile(valuesFile, "utf-8");
      const values = JSON.parse(valuesContents);
      this.values = new Map(values);
    }
    return {};
  }

  public async cleanup(): Promise<void> {}

  public async plan() {
    return UpdatePlan.AUTO;
  }

  public async save(): Promise<void> {
    fs.writeFileSync(
      join(this.context.statedir, VALUES_FILENAME),
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
