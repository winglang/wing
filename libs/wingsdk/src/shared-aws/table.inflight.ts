import {
  DeleteItemCommand,
  GetItemCommand,
  UpdateItemCommand,
  PutItemCommand,
  ScanCommand,
  DynamoDBClient,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { ColumnType, ITableClient } from "../cloud";
import { Json } from "../std";

export class TableClient implements ITableClient {
  constructor(
    private readonly tableName: string,
    private readonly primaryKey: string,
    private readonly columns: string,
    private readonly client = new DynamoDBClient({})
  ) { }

  public async insert(key: string, row: Json): Promise<void> {
    this.validateRow(row);
    let insertRow = { [this.primaryKey]: key, ...row };
    const command = new PutItemCommand({
      TableName: this.tableName,
      Item: marshall(insertRow),
    });
    await this.client.send(command);
  }

  public async update(key: String, row: Json): Promise<void> {
    this.validateRow(row);
    let itemKey = { [this.primaryKey]: key };
    let updateExpression: string[] = [];
    let expressionAttributes: any = {};
    const item = marshall(row);
    for (const [id, value] of Object.entries(item)) {
      if (id !== this.primaryKey) {
        updateExpression.push(`${id} = :${id}`);
        expressionAttributes[`:${id}`] = value;
      }
    }
    const command = new UpdateItemCommand({
      TableName: this.tableName,
      Key: marshall(itemKey),
      UpdateExpression: `set ${updateExpression.toString()}`,
      ExpressionAttributeValues: expressionAttributes,
    });
    await this.client.send(command);
  }

  public async delete(key: string): Promise<void> {
    const command = new DeleteItemCommand({
      TableName: this.tableName,
      Key: { [this.primaryKey]: { S: key } },
    });
    await this.client.send(command);
  }

  public async get(key: string): Promise<Json> {
    const command = new GetItemCommand({
      TableName: this.tableName,
      Key: { [this.primaryKey]: { S: key } },
    });
    const result = await this.client.send(command);
    if (result.Item) {
      return unmarshall(result.Item) as Json;
    }
    return {} as Json;
  }

  public async list(): Promise<any> {
    const command = new ScanCommand({
      TableName: this.tableName,
    });
    const result = await this.client.send(command);
    const response: any = [];
    for (const item of result.Items!) {
      response.push(unmarshall(item));
    }
    return response;
  }

  private validateRow(row: Json) {
    const columns = JSON.parse(this.columns);
    for (const [key, value] of Object.entries(row)) {
      if (!columns.hasOwnProperty(key)) {
        throw new Error(`"${key}" is not a valid column in the table.`);
      }
      switch (columns[key]) {
        case ColumnType.STRING:
        case ColumnType.DATE:
          if (typeof value !== "string") {
            throw new Error(`"${key}" value is not a valid string.`);
          }
          break;
        case ColumnType.NUMBER:
          if (typeof value !== "number") {
            throw new Error(`"${key}" value is not a valid number.`);
          }
          break;
        case ColumnType.BOOLEAN:
          if (typeof value !== "boolean") {
            throw new Error(`"${key}" value is not a valid bool.`);
          }
          break;
        case ColumnType.JSON:
          if (typeof value !== "object") {
            throw new Error(`"${key}" value is not a valid json.`);
          }
          break;
      }
    }
  }
}
