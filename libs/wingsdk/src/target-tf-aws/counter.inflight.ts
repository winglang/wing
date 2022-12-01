import { UpdateItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { ICounterClient } from "../cloud";
import { HASH_KEY } from "./counter";

const AMOUNT_TOKEN = "amount";
const INITIAL_VALUE_TOKEN = "initial_value";
const COUNTER_ID = "counter";
const VALUE_ATTRIBUTE = "counter_value";

export class CounterClient implements ICounterClient {
  constructor(
    private readonly tableName: string,
    private readonly initial: number = 0,
    private readonly client = new DynamoDBClient({})
  ) {}

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
}
