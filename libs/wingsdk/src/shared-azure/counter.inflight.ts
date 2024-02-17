import { TableClient, AzureNamedKeyCredential } from "@azure/data-tables";
import type { ICounterClient } from "../cloud";

const COUNTER_ID = "counter";
const PARTITION_KEY = "partitionKey";

export class CounterClient implements ICounterClient {
  private client: TableClient;

  constructor(
    private readonly storageAccountName: string,
    private readonly storageTableName: string,
    private readonly accountKeyVariable: string,
    private readonly initial: number = 0
  ) {
    if (!process.env[this.accountKeyVariable]) {
      throw new Error("missing storage account key");
    }

    const credentials = new AzureNamedKeyCredential(
      this.storageAccountName,
      process.env[this.accountKeyVariable] as string
    );

    this.client = new TableClient(
      `https://${this.storageAccountName}.table.core.windows.net`,
      this.storageTableName,
      credentials
    );
  }

  public async inc(
    amount: number = 1,
    key: string = COUNTER_ID
  ): Promise<number> {
    const entity = await this._getEntity(key);
    const currentValue = (entity?.counterValue as number) ?? this.initial;
    const newValue = currentValue + amount;
    await this._upsertEntity(key, newValue);
    return currentValue;
  }

  public async dec(amount = 1, key: string = COUNTER_ID): Promise<number> {
    return this.inc(-1 * amount, key);
  }

  public async peek(key: string = COUNTER_ID): Promise<number> {
    const entity = await this._getEntity(key);
    return (entity?.counterValue as number) ?? this.initial;
  }

  public async set(value: number, key: string = COUNTER_ID): Promise<void> {
    await this._upsertEntity(key, value);
  }

  private async _getEntity(
    key: string
  ): Promise<Record<string, unknown> | undefined> {
    try {
      return await this.client.getEntity(PARTITION_KEY, key);
    } catch (error) {
      return undefined;
    }
  }

  private async _upsertEntity(key: string, value: number): Promise<void> {
    const entity = {
      partitionKey: PARTITION_KEY,
      rowKey: key,
      counterValue: value,
    };
    await this.client.upsertEntity(entity);
  }
}
