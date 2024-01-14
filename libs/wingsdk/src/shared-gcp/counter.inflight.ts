import { Datastore } from "@google-cloud/datastore";
import type { ICounterClient } from "../cloud";

const DEFAULT_COUNTER_KEY = "counter";
const COUNTER_ENTITY_KIND = "Counter";

export class CounterClient implements ICounterClient {
  private readonly client: Datastore;

  constructor(
    private readonly databaseName: string,
    private readonly initial: number = 0
  ) {
    this.client = new Datastore({ databaseId: this.databaseName });
  }

  public async inc(amount = 1, key = DEFAULT_COUNTER_KEY): Promise<number> {
    const currentValue = await this._getCurrentValue(key);
    const newValue = currentValue + amount;

    const counterEntity = {
      key: this.client.key([COUNTER_ENTITY_KIND, key]),
      data: { count: newValue },
    };

    await this.client.upsert(counterEntity);

    // Return the previous value before the increment
    return currentValue;
  }

  public async dec(
    amount = 1,
    key: string = DEFAULT_COUNTER_KEY
  ): Promise<number> {
    throw new Error(`Method not implemented. ${amount} ${key}`);
  }

  public async peek(key: string = DEFAULT_COUNTER_KEY): Promise<number> {
    return this._getCurrentValue(key);
  }

  public async set(
    value: number,
    key: string = DEFAULT_COUNTER_KEY
  ): Promise<void> {
    throw new Error(`Method not implemented. ${value} ${key}`);
  }

  private async _getCurrentValue(key: string): Promise<number> {
    const counterKey = this.client.key([COUNTER_ENTITY_KIND, key]);

    // Fetch the counter from the datastore
    const [existingCounter] = await this.client.get(counterKey);

    // If the counter exists, return its current count
    if (existingCounter) {
      return existingCounter.count;
    }

    // If the counter does not exist, initialize it with the initial value
    await this._initializeCounter(key);
    return this.initial;
  }

  private async _initializeCounter(key: string): Promise<void> {
    const counterEntity = {
      key: this.client.key([COUNTER_ENTITY_KIND, key]),
      data: { count: this.initial },
    };
    await this.client.insert(counterEntity);
  }
}
