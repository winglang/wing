import { IResource } from "../std";

/**
 * A shared interface for AWS tables.
 */
export interface IAwsTable {
  /**
   * Get iinternal AWS Table
   */
  innerAwsTable(): any;
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
  public static from(table: IResource): IAwsTable | undefined {
    if (this.isAwsTable(table)) {
      return table;
    }
    return undefined;
  }

  private static isAwsTable(obj: any): obj is IAwsTable {
    return (
      typeof obj.innerAwsTable === "function"
    );
  }
}