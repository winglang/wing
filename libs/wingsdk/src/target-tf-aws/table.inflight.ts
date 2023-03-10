import {
  DeleteItemCommand,
  GetItemCommand,
  UpdateItemCommand,
  PutItemCommand,
  ScanCommand,
  DynamoDBClient,
} from "@aws-sdk/client-dynamodb";
import { ColumnType, ITableClient } from "../cloud";
import { Json } from "../std";

export class TableClient implements ITableClient {
  constructor(
    private readonly tableName: string,
    private readonly primaryKey: string,
    private readonly columns: string,
    private readonly client = new DynamoDBClient({})
  ) { }

  public async insert(row: Json): Promise<void> {
    const command = new PutItemCommand({
      TableName: this.tableName,
      Item: this.marshallItems(row as any),
    });
    await this.client.send(command);
  }

  public async update(row: Json): Promise<void> {
    let itemKey = {};
    let updateExpression: string[] = [];
    let expressionAttributes: any = {};
    const item = this.marshallItems(row);
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
      return this.unmarshallItems(result.Item);
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
      response.push(this.unmarshallItems(item));
    }
    return response;
  }

  private unmarshallJson(item: any) {
    let items: { [key: string]: any } = {};
    for (const [key, value] of Object.entries<any>(item)) {
      if (value["S"]) {
        items[key] = value["S"];
      } else if (value["N"]) {
        items[key] = Number(value["N"]);
      } else if (value["BOOL"]) {
        items[key] = value["BOOL"];
      } else if (value["M"]) {
        items[key] = this.unmarshallJson(value["M"]);
      }
    }
    return items;
  }

  private unmarshallItems(row: any) {
    const columns = JSON.parse(this.columns);
    let items: { [key: string]: any } = {};
    items[this.primaryKey] = row[this.primaryKey].S;
    for (const [key, value] of Object.entries(columns)) {
      switch (value) {
        case ColumnType.DATE:
        case ColumnType.STRING:
          items[key] = row[key].S;
          break;
        case ColumnType.NUMBER:
          items[key] = Number(row[key].N);
          break;
        case ColumnType.BOOLEAN:
          items[key] = row[key].BOOL;
          break;
        case ColumnType.JSON:
          items[key] = this.unmarshallJson(row[key].M);
          break;
      }
    }
    return items;
  }

  private marshallJson(item: any) {
    let items: { [key: string]: any } = {};
    for (const [key, value] of Object.entries(item)) {
      switch (typeof value) {
        case "string":
          items[key] = { S: value };
          break;
        case "number":
          items[key] = { N: String(value) };
          break;
        case "boolean":
          items[key] = { BOOL: value };
          break;
        case "object":
          items[key] = { M: this.marshallJson(value) };
          break;
      }
    }
    return items;
  }

  private marshallItems(row: any) {
    const columns = JSON.parse(this.columns);
    let items: { [key: string]: any } = {};
    items[this.primaryKey] = { S: row[this.primaryKey] };
    for (const [key, value] of Object.entries(columns)) {
      switch (value) {
        case ColumnType.DATE:
        case ColumnType.STRING:
          items[key] = { S: row[key] };
          break;
        case ColumnType.NUMBER:
          items[key] = { N: String(row[key]) };
          break;
        case ColumnType.BOOLEAN:
          items[key] = { BOOL: row[key] };
          break;
        case ColumnType.JSON:
          items[key] = { M: this.marshallJson(row[key]) };
          break;
      }
    }
    return items;
  }
}
