import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import * as uuid from "uuid";
import { FunctionClient } from "./function.inflight";
import { TIMERS_TABLE_ATTRIBUTES } from "./timer";
import { Function, ITimerClient as ITimerClient } from "../cloud";
import { Duration } from "../std";

const ATTRS = TIMERS_TABLE_ATTRIBUTES;

export class TimerClient implements ITimerClient {
  constructor(
    private readonly tableName: string,
    private readonly dynamodb = new DynamoDBClient({})
  ) {}

  async setTimeout(
    after: Duration,
    callback: Function,
    payload?: string | undefined
  ): Promise<void> {
    const callbackFn = callback as any as FunctionClient; // we know that the callback is a tf-aws function client.
    const callbackArn = callbackFn.functionArn;
    const expiration = Math.floor((Date.now() + after.milliseconds) / 1000);

    const setExpressions = [
      ATTRS.payload,
      ATTRS.callbackArn,
      ATTRS.expiresAt,
    ].map((attr) => `${attr} = :${attr}`);

    const counterId = uuid.v4();
    const command = new UpdateItemCommand({
      TableName: this.tableName,
      Key: { [ATTRS.timerId]: { S: counterId } },
      UpdateExpression: `SET ${setExpressions.join(", ")}`,
      ExpressionAttributeValues: {
        [`:${ATTRS.payload}`]: { S: `${payload ?? ""}` },
        [`:${ATTRS.callbackArn}`]: { S: callbackArn },
        [`:${ATTRS.expiresAt}`]: { N: expiration.toString() },
      },
    });

    await this.dynamodb.send(command);
  }
}
