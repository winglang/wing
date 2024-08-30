import { Datastore } from "@google-cloud/datastore";
import type { ICounterClient } from "../cloud";

const DEFAULT_COUNTER_KEY = "counter";
const COUNTER_ENTITY_KIND = "Counter";

export class CounterClient implements ICounterClient {
  private readonly client: Datastore;
  private readonly databaseName: string;
  private readonly initial: number;

  constructor({
    $databaseName,
    $initial,
  }: {
    $databaseName: string;
    $initial?: number;
  }) {
    this.databaseName = $databaseName;
    this.initial = $initial ?? 0;
    this.client = new Datastore({ databaseId: this.databaseName });
  }

  public async inc(
    amount: number = 1,
    key: string = DEFAULT_COUNTER_KEY
  ): Promise<number> {
    const currentValue = await this._getCounterValue(key);
    const newValue = currentValue + amount;

    await this._updateCounter(key, newValue);

    // Return the previous value before the increment
    return currentValue;
  }

  public async dec(
    amount: number = 1,
    key: string = DEFAULT_COUNTER_KEY
  ): Promise<number> {
    const currentValue = await this._getCounterValue(key);
    const newValue = currentValue - amount;

    await this._updateCounter(key, newValue);

    // Return the previous value before the decrement
    return currentValue;
  }

  public async set(
    value: number,
    key: string = DEFAULT_COUNTER_KEY
  ): Promise<void> {
    await this._updateCounter(key, value);
  }

  public async peek(key: string = DEFAULT_COUNTER_KEY): Promise<number> {
    return this._getCounterValue(key);
  }

  private async _getCounterValue(key: string): Promise<number> {
    const counterKey = this.client.key([COUNTER_ENTITY_KIND, key]);

    // Fetch the counter from the datastore
    const [existingCounter] = await this.client.get(counterKey);

    // If the counter exists, return its current count
    // Else, initialize it with the `initial` value
    if (existingCounter) {
      return existingCounter.count;
    } else {
      await this._initCounter(key);
      return this.initial;
    }
  }

  private async _initCounter(key: string): Promise<void> {
    const counterEntity = {
      key: this.client.key([COUNTER_ENTITY_KIND, key]),
      data: { count: this.initial },
    };

    await this.client.insert(counterEntity);
  }

  private async _updateCounter(key: string, newValue: number): Promise<void> {
    const counterEntity = {
      key: this.client.key([COUNTER_ENTITY_KIND, key]),
      data: { count: newValue },
    };

    await this.client.save(counterEntity);
  }
}
