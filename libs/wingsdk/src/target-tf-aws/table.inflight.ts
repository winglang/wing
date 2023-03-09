import {
  DeleteItemCommand,
  GetItemCommand,
  UpdateItemCommand,
  PutItemCommand,
  ScanCommand,
  DynamoDBClient,
} from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { ColumnType, ITableClient } from "../cloud";
import { Json } from "../std";

export class TableClient implements ITableClient {
  constructor(
    private readonly tableName: string,
    private readonly primaryKey: string,
    private readonly columns: string,
    private readonly client = new DynamoDBClient({})
  ) { }

  private marshallJson(item: any) {
    let items: { [key: string]: any } = {};
    for (const [key, value] of Object.entries(item)) {
      switch (typeof value) {
        case "string":
          items[key] = { "S": value };
          break;
        case "number":
          items[key] = { "N": String(value) };
          break;
        case "object":
          items[key] = { "M": this.marshallJson(value) };
          break;
      }
    }
    return items;
  }

  private marshallItens(row: any) {
    const columns = JSON.parse(this.columns);
    let items: { [key: string]: any } = {};
    for (const [key, value] of Object.entries(columns)) {
      if (key == this.primaryKey) {
        items[key] = { "S": row[key] };
        continue;
      }
      switch (value) {
        case ColumnType.DATE:
        case ColumnType.STRING:
          items[key] = { "S": row[key] };
          break;
        case ColumnType.NUMBER:
          items[key] = { "N": String(row[key]) };
          break;
        case ColumnType.BOOLEAN:
          items[key] = { "BOOL": row[key] };
          break;
        case ColumnType.JSON:
          items[key] = { "M": this.marshallJson(row[key]) };
          break;
      }
    }
    return items;
  }

  public async insert(row: Json): Promise<void> {
    const command = new PutItemCommand({
      TableName: this.tableName,
      Item: this.marshallItens(row as any),
    });
    await this.client.send(command);
  }

  public async update(row: Json): Promise<void> {
    let itemKey = {};
    let updateExpression: string[] = [];
    let expressionAttributes: any = {};
    const item = this.marshallItens(row);
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
      Key: { [this.primaryKey]: { "S": key } },
    });
    await this.client.send(command);
  }

  public async get(key: string): Promise<any> {
    const command = new GetItemCommand({
      TableName: this.tableName,
      Key: { [this.primaryKey]: { "S": key } },
    });
    const result = await this.client.send(command);
    if (result.Item) {
      return unmarshall(result.Item);
    }
    return null;
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
}
