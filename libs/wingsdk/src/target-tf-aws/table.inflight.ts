import { DeleteItemCommand, GetItemCommand, UpdateItemCommand, PutItemCommand, ScanCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { ColumnType, ITableClient } from "../cloud";
import { Json } from "../std";

export class TableClient implements ITableClient {
  private readonly primaryKey: string;
  private readonly columns: { [key: string]: any };
  private readonly primaryKeyType: string;

  constructor(
    private readonly tableName: string,
    private readonly client = new DynamoDBClient({})
  ) {
    this.primaryKey = process.env.PRIMARY_KEY!;
    this.columns = JSON.parse(process.env.COLUMNS!);
    this.primaryKeyType =
      this.columns[this.primaryKey] == ColumnType.STRING
        ? "string"
        : "number";
  }

  public async insert(row: Json): Promise<void> {
    this.validateRow(row as any);

    const command = new PutItemCommand({
      TableName: this.tableName,
      Item: marshall(row),
    });
    await this.client.send(command);
  }

  public async update(row: Json): Promise<void> {
    this.validateRow(row as any);

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

  public async delete(key: any): Promise<void> {
    const command = new DeleteItemCommand({
      TableName: this.tableName,
      Key: marshall({ [this.primaryKey]: key })
    });
    await this.client.send(command);
  }

  public async get(key: any): Promise<any> {
    const command = new GetItemCommand({
      TableName: this.tableName,
      Key: marshall({ [this.primaryKey]: key })
    });
    const result = await this.client.send(command);
    return unmarshall(result.Item!);
  }

  public async list(): Promise<any> {
    const command = new ScanCommand({
      TableName: this.tableName
    });
    const result = await this.client.send(command);
    const response: any = [];
    for (const item of result.Items!) {
      response.push(unmarshall(item));
    }
    return response;
  }

  private validateRow(row: any) {
    if (!row[this.primaryKey]) {
      throw new Error(`${this.primaryKey} not found`);
    }
    if (typeof row[this.primaryKey] !== this.primaryKeyType) {
      throw new Error(`${this.primaryKey} is not a ${this.primaryKeyType}.`);
    }
  }
}
