import * as fs from "fs";
import { join } from "path";
import { CounterBackendProps } from "./counter";
import { IResource, IResourceContext } from "./resource";
import { exists } from "./util";
import { ICounterClient } from "../cloud";

const VALUES_FILENAME = "values.json";

export class CounterBackend implements ICounterClient, IResource {
  private values: Map<string, number>;
  private initial: number;
  private _ctx: IResourceContext | undefined;

  public constructor(props: CounterBackendProps) {
    this.initial = props.initial ?? 0;
    this.values = new Map().set("default", this.initial);
  }

  private get ctx(): IResourceContext {
    if (!this._ctx) {
      throw new Error("Cannot access context during class construction");
    }
    return this._ctx;
  }

  public async onStart(ctx: IResourceContext): Promise<void> {
    this._ctx = ctx;

    // Load the values from disk
    const valuesFile = join(this.ctx.statedir, VALUES_FILENAME);
    const valueFilesExists = await exists(valuesFile);
    if (valueFilesExists) {
      const valuesContents = await fs.promises.readFile(valuesFile, "utf-8");
      const values = JSON.parse(valuesContents);
      this.values = new Map(values);
    }
  }

  public async onStop(): Promise<void> {
    // Save the values to disk
    fs.writeFileSync(
      join(this.ctx.statedir, VALUES_FILENAME),
      JSON.stringify(Array.from(this.values.entries()))
    );
  }

  public async inc(
    amount: number = 1,
    key: string = "default"
  ): Promise<number> {
    const prev = this.values.get(key) ?? this.initial;
    this.values.set(key, prev + amount);
    return prev;
  }

  public async dec(
    amount: number = 1,
    key: string = "default"
  ): Promise<number> {
    const prev = this.values.get(key) ?? this.initial;
    this.values.set(key, prev - amount);
    return prev;
  }

  public async peek(key: string = "default"): Promise<number> {
    return this.values.get(key) ?? this.initial;
  }

  public async set(value: number, key: string = "default"): Promise<void> {
    this.values.set(key, value);
  }
}
