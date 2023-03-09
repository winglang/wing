import {
  DeleteItemCommand,
  GetItemCommand,
  UpdateItemCommand,
  PutItemCommand,
  ScanCommand,
  DynamoDBClient,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { ITableClient } from "../cloud";
import { Json } from "../std";

export class TableClient implements ITableClient {
  private readonly primaryKeyType: string;

  constructor(
    private readonly tableName: string,
    private readonly primaryKey: string,
    private readonly columns: string,
    private readonly client = new DynamoDBClient({})
  ) { }

  public async insert(row: Json): Promise<void> {
    const command = new PutItemCommand({
      TableName: this.tableName,
      Item: marshall(row),
    });
    await this.client.send(command);
  }

  public async update(row: Json): Promise<void> {
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
      Key: marshall({ [this.primaryKey]: key }),
    });
    await this.client.send(command);
  }

  public async get(key: string): Promise<any> {
    const command = new GetItemCommand({
      TableName: this.tableName,
      Key: marshall({ [this.primaryKey]: key }),
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
