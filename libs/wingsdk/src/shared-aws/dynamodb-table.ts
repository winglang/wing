import { ex } from "..";
import { NameOptions } from "../shared/resource-names";

/**
 * Table names must be between 3 and 255 characters.
 * You can use alphanumeric characters, dot (.), dash (-), and underscores (_).
 */
export const NAME_OPTS: NameOptions = {
  maxLen: 255,
  disallowedRegex: /[^a-zA-Z0-9\_\.\-]+/g,
};

/**
 * A shared interface for AWS Dynamodb.
 */
export interface IAwsDynamodbTable {
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
 * A helper class for working with AWS DynamodbTables.
 */
export class DynamodbTable {
  /**
   * If the table is an AWS Dynamodb, return a helper interface for
   * working with it.
   * @param dynamodb The ex.DynamodbTable.
   */
  public static from(
    dynamodb: ex.DynamodbTable,
  ): IAwsDynamodbTable | undefined {
    if (this.isAwsDynamodb(dynamodb)) {
      return dynamodb;
    }
    return undefined;
  }

  private static isAwsDynamodb(obj: any): obj is IAwsDynamodbTable {
    return (
      typeof obj.dynamoTableArn === "string" &&
      typeof obj.dynamoTableName === "string"
    );
  }
}
