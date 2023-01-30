import {
  UpdateItemCommand,
  GetItemCommand,
  DynamoDBClient,
} from "@aws-sdk/client-dynamodb";
import { HASH_KEY } from "./counter";
import { CounterClientBase } from "../cloud";

const AMOUNT_TOKEN = "amount";
const INITIAL_VALUE_TOKEN = "initial";
const COUNTER_ID = "counter";
const VALUE_ATTRIBUTE = "counter_value";

export class CounterClient extends CounterClientBase {
  constructor(
    private readonly tableName: string,
    private readonly initial: number = 0,
    private readonly client = new DynamoDBClient({})
  ) {
    super();
  }

  public async inc(amount = 1): Promise<number> {
    const command = new UpdateItemCommand({
      TableName: this.tableName,
      Key: { [HASH_KEY]: { S: COUNTER_ID } },
      UpdateExpression: `SET ${VALUE_ATTRIBUTE} = if_not_exists(${VALUE_ATTRIBUTE}, :${INITIAL_VALUE_TOKEN}) + :${AMOUNT_TOKEN}`,
      ExpressionAttributeValues: {
        [`:${AMOUNT_TOKEN}`]: { N: `${amount}` },
        [`:${INITIAL_VALUE_TOKEN}`]: { N: `${this.initial}` },
      },
      ReturnValues: "UPDATED_NEW",
    });

    const result = await this.client.send(command);
    let newValue = result.Attributes?.[VALUE_ATTRIBUTE].N;
    if (!newValue) {
      throw new Error(`${VALUE_ATTRIBUTE} attribute not found on table.`);
    }

    // return the old value
    return parseInt(newValue) - amount;
  }

  public async peek(): Promise<number> {
    const command = new GetItemCommand({
      TableName: this.tableName,
      Key: { [HASH_KEY]: { S: COUNTER_ID } },
    });

    const result = await this.client.send(command);
    let currentValue = result.Item?.[VALUE_ATTRIBUTE].N;
    if (!currentValue) {
      return this.initial;
    }

    return parseInt(currentValue);
  }
}
