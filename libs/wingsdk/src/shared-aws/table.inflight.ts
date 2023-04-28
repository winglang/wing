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
  ) {}

  public async insert(row: Json): Promise<void> {
    this.validateRow(row);
    const command = new PutItemCommand({
      TableName: this.tableName,
      Item: marshall(row),
    });
    await this.client.send(command);
  }

  public async update(row: Json): Promise<void> {
    this.validateRow(row);
    let itemKey = {};
    let updateExpression: string[] = [];
    let expressionAttributes: any = {};
    const item = marshall(row);
    for (const [key, value] of Object.entries(item)) {
      if (key === this.primaryKey) {
        itemKey = { [key]: value };
      } else {
        updateExpression.push(`${key} = :${key}`);
        expressionAttributes[`:${key}`] = value;
      }
    }
    const command = new UpdateItemCommand({
      TableName: this.tableName,
      Key: itemKey,
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
    for (const [key, value] of Object.entries(columns)) {
      switch (value) {
        case ColumnType.STRING:
        case ColumnType.DATE:
          if (typeof (row as any)[key] !== "string") {
            throw new Error(`${key} is not a valid string.`);
          }
          break;
        case ColumnType.NUMBER:
          if (typeof (row as any)[key] !== "number") {
            throw new Error(`${key} is not a valid number.`);
          }
          break;
        case ColumnType.BOOLEAN:
          if (typeof (row as any)[key] !== "boolean") {
            throw new Error(`${key} is not a valid bool.`);
          }
          break;
        case ColumnType.JSON:
          if (typeof (row as any)[key] !== "object") {
            throw new Error(`${key} is not a valid json.`);
          }
          break;
      }
    }
    return false;
  }
}
