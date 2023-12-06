import { cloud } from "..";

/**
 * A shared interface for AWS Counter.
 */
export interface IAwsCounter {
  /**
   * AWS Dynamodb arn
   */
  readonly dynamoTableArn: string;

  /**
   * AWS Dynamodb name
   */
  readonly dynamoTableName: string;
}

/**
 * A helper class for working with AWS Counters.
 */
export class Counter {
  /**
   * If the table is an AWS Counter, return a helper interface for
   * working with it.
   * @param counter The cloud.Counter.
   */
  public static from(counter: cloud.Counter): IAwsCounter | undefined {
    if (this.isAwsCounter(counter)) {
      return counter;
    }
    return undefined;
  }

  private static isAwsCounter(obj: any): obj is IAwsCounter {
    return (
      typeof obj.dynamoTableArn === "string" &&
      typeof obj.dynamoTableName === "string"
    );
  }
}
