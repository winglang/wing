import { UpdateItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { HASH_KEY, ICounterClient } from "./counter";

const AMOUNT_TOKEN = "amount";
const COUNTER_ID = "counter";
const VALUE_ATTRIBUTE = "value";

export class CounterClient implements ICounterClient {
  constructor(
    private readonly tableName: string,
    private readonly client = new DynamoDBClient({})
  ) {}

  public async inc(amount = 1): Promise<number> {
    const command = new UpdateItemCommand({
      TableName: this.tableName,
      Key: { [HASH_KEY]: { S: COUNTER_ID } },
      UpdateExpression: `SET ${VALUE_ATTRIBUTE} = ${VALUE_ATTRIBUTE} + :${AMOUNT_TOKEN}`,
      ExpressionAttributeValues: { [`:${AMOUNT_TOKEN}`]: { N: `${amount}` } },
      ConditionExpression: `attribute_exists(${VALUE_ATTRIBUTE})`,
      ReturnValues: "UPDATED_OLD",
    });

    const result = await this.client.send(command);
    let prev = result.Attributes?.[VALUE_ATTRIBUTE].N;
    if (!prev) {
      throw new Error(`counter not initialized`);
    }

    return parseInt(prev);
  }
}
