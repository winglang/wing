import { Datastore } from "@google-cloud/datastore";
import { COUNTER_HASH_KEY } from "./commons";
import type { ICounterClient } from "../cloud";

const AMOUNT_TOKEN = "amount";
const INITIAL_VALUE_TOKEN = "initial";
const COUNTER_ID = "counter";
const VALUE_ATTRIBUTE = "counter_value";
const SET_VALUE = "set_value";

export class CounterClient implements ICounterClient {
  constructor(
    private readonly database = new Datastore(),
    private readonly databaseName: string,
    private readonly initial: number = 0
  ) {}

  public async inc(amount = 1, key = COUNTER_ID): Promise<number> {
    const counterKey = this.database.key(key);
    const entity = {
      key: counterKey,
      data: [
        {
          name: "count",
          value: amount,
        },
      ],
    };

    try {
      await this.database.save(entity);
      console.log(`Counter ${counterKey.id} created successfully.`);
      return amount;
    } catch (err) {
      console.error("ERROR:", err);
    }
  }

  public async dec(amount = 1, key: string = COUNTER_ID): Promise<number> {
    throw new Error("Method not implemented.");
  }

  public async peek(key: string = COUNTER_ID): Promise<number> {
    throw new Error("Method not implemented.");
  }

  public async set(value: number, key: string = COUNTER_ID): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
