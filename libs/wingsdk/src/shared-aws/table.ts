import { ex } from "..";

/**
 * A shared interface for AWS tables.
 */
export interface IAwsTable {
  /**
   * AWS Table arn
   */
  readonly arn: string;

  /**
   * AWS Table name
   */
  readonly tableName: string;
}

/**
 * A helper class for working with AWS tables.
 */
export class Table {
  /**
   * If the table is an AWS DynamoDB, return a helper interface for
   * working with it.
   * @param table The ex.Table.
   */
  public static from(table: ex.Table): IAwsTable | undefined {
    if (this.isAwsTable(table)) {
      return table;
    }
    return undefined;
  }

  private static isAwsTable(obj: any): obj is IAwsTable {
    return typeof obj.arn === "string" && typeof obj.tableName === "string";
  }
}
