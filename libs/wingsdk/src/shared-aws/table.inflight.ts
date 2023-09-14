import {
  DeleteItemCommand,
  GetItemCommand,
  UpdateItemCommand,
  PutItemCommand,
  ScanCommand,
  DynamoDBClient,
  ConditionalCheckFailedException,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { ITableClient } from "../ex";
import { validateRow } from "../shared/table-utils";
import { Json } from "../std";

export class TableClient implements ITableClient {
  constructor(
    private readonly tableName: string,
    private readonly primaryKey: string,
    private readonly columns: string,
    private readonly client = new DynamoDBClient({})
  ) {}

  public async insert(key: string, row: Json): Promise<void> {
    validateRow(row, JSON.parse(this.columns));
    let insertRow = { [this.primaryKey]: key, ...row };
    try {
      const command = new PutItemCommand({
        TableName: this.tableName,
        Item: marshall(insertRow),
        ConditionExpression: `attribute_not_exists(#primary_key)`,
        ExpressionAttributeNames: {
          "#primary_key": this.primaryKey,
        },
      });
      await this.client.send(command);
    } catch (e) {
      if (e instanceof ConditionalCheckFailedException) {
        throw new Error(
          `The primary key "${key}" already exists in the "${
            this.tableName
          }" table: ${(e as Error).stack})}`
        );
      }
      throw new Error((e as Error).stack);
    }
  }

  public async upsert(key: string, row: Json): Promise<void> {
    validateRow(row, JSON.parse(this.columns));
    let insertRow = { [this.primaryKey]: key, ...row };
    const command = new PutItemCommand({
      TableName: this.tableName,
      Item: marshall(insertRow),
    });
    await this.client.send(command);
  }

  public async update(key: String, row: Json): Promise<void> {
    validateRow(row, JSON.parse(this.columns));
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
    const result = await this.tryGetJson(key);
    if (!result) {
      throw new Error(`Row does not exist (key=${key})`);
    }
    return result;
  }

  public async tryGet(key: string): Promise<Json | undefined> {
    return this.tryGetJson(key);
  }

  public async list(): Promise<Array<Json>> {
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

  private async tryGetJson(key: string): Promise<Json | undefined> {
    const command = new GetItemCommand({
      TableName: this.tableName,
      Key: { [this.primaryKey]: { S: key } },
    });
    const result = await this.client.send(command);
    if (result.Item) {
      return unmarshall(result.Item) as Json;
    }
    return undefined;
  }
}
