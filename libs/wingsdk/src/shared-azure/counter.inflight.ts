import { TableClient } from "@azure/data-tables";
import type { ICounterClient } from "../cloud";

const COUNTER_ID = "counter";

export class CounterClient implements ICounterClient {
  private client: TableClient;

  constructor(
    private readonly storageAccountName: string,
    private readonly storageTableName: string,
    private readonly initial: number = 0
  ) {
    this.client = new TableClient(
      `https://${this.storageAccountName}.table.core.windows.net`,
      this.storageTableName
    );
  }

  public async inc(
    amount: number = 1,
    key: string = COUNTER_ID
  ): Promise<number> {
    const entity = await this._getEntity(key);
    const newValue = (entity?.counterValue || this.initial) + amount;
    await this._upsertEntity(key, newValue);
    return newValue;
  }

  public async dec(amount = 1, key: string = COUNTER_ID): Promise<number> {
    throw new Error(`Method not implemented. ${amount} ${key}`);
  }

  public async peek(key: string = COUNTER_ID): Promise<number> {
    throw new Error(`Method not implemented. ${key}`);
  }

  public async set(value: number, key: string = COUNTER_ID): Promise<void> {
    throw new Error(`Method not implemented. ${value} ${key}`);
  }

  private async _getEntity(key: string): Promise<any> {
    try {
      return await this.client.getEntity("partitionKey", key);
    } catch (error) {
      return undefined;
    }
  }

  private async _upsertEntity(key: string, value: number): Promise<void> {
    const entity = {
      partitionKey: "partitionKey",
      rowKey: key,
      counterValue: value,
    };
    await this.client.upsertEntity(entity);
  }
}
