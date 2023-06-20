import {
  UpdateItemCommand,
  GetItemCommand,
  DynamoDBClient,
} from "@aws-sdk/client-dynamodb";
import { COUNTER_HASH_KEY } from "./commons";
import type { ICounterClient } from "../cloud";

const AMOUNT_TOKEN = "amount";
const INITIAL_VALUE_TOKEN = "initial";
const COUNTER_ID = "counter";
const VALUE_ATTRIBUTE = "counter_value";
const SET_VALUE = "set_value";

export class CounterClient implements ICounterClient {
  constructor(
    private readonly tableName: string,
    private readonly initial: number = 0,
    private readonly client = new DynamoDBClient({})
  ) {}

  public async inc(amount = 1, key = COUNTER_ID): Promise<number> {
    const command = new UpdateItemCommand({
      TableName: this.tableName,
      Key: { [COUNTER_HASH_KEY]: { S: key } },
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

  public async dec(amount = 1, key: string = COUNTER_ID): Promise<number> {
    return this.inc(-1 * amount, key);
  }

  public async peek(key: string = COUNTER_ID): Promise<number> {
    const command = new GetItemCommand({
      TableName: this.tableName,
      Key: { [COUNTER_HASH_KEY]: { S: key } },
    });

    const result = await this.client.send(command);
    let currentValue = result.Item?.[VALUE_ATTRIBUTE].N;
    if (!currentValue) {
      return this.initial;
    }

    return parseInt(currentValue);
  }

  public async set(value: number, key: string = COUNTER_ID): Promise<void> {
    const command = new UpdateItemCommand({
      TableName: this.tableName,
      Key: { [COUNTER_HASH_KEY]: { S: key } },
      UpdateExpression: `SET ${VALUE_ATTRIBUTE} = :${SET_VALUE}`,
      ExpressionAttributeValues: {
        [`:${SET_VALUE}`]: { N: `${value}` },
      },
      ReturnValues: "UPDATED_NEW",
    });

    await this.client.send(command);

    return;
  }
}
