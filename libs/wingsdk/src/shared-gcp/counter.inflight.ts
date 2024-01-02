import { Datastore } from "@google-cloud/datastore";
import type { ICounterClient } from "../cloud";

const DEFAULT_COUNTER_KEY = "counter";

export class CounterClient implements ICounterClient {
  private readonly client: Datastore;

  constructor(
    private readonly databaseName: string,
    private readonly initial: number = 0
  ) {
    this.client = new Datastore({ databaseId: this.databaseName });
  }

  public async inc(amount = 1, key = DEFAULT_COUNTER_KEY): Promise<number> {
    const kind = "Counter";
    const name = key;
    const counterKey = this.client.key([kind, name]);

    // Fetch the current counter
    const [existingCounter] = await this.client.get(counterKey);

    // Determine the current value of the counter or use the initial value
    const currentValue = existingCounter?.data?.count ?? this.initial;

    // Calculate the new value
    const newValue = currentValue + amount;

    // Save the updated counter
    const counter = {
      key: counterKey,
      data: {
        count: newValue,
      },
    };

    await this.client.save(counter);
    console.log(`Saved ${counter.key.name}: ${counter.data.count}`);

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
    throw new Error(`Method not implemented. ${key}`);
  }

  public async set(
    value: number,
    key: string = DEFAULT_COUNTER_KEY
  ): Promise<void> {
    throw new Error(`Method not implemented. ${value} ${key}`);
  }
}
