import {
  CreateTableCommand,
  DynamoDBClient,
  KeyType,
  KeySchemaElement,
} from "@aws-sdk/client-dynamodb";
import {
  DynamodbTableAttributes,
  DynamodbTableSchema,
} from "./schema-resources";
import { DynamodbTableClientBase, GlobalSecondaryIndex } from "../ex";
import {
  ISimulatorContext,
  ISimulatorResourceInstance,
} from "../simulator/simulator";

const MAX_CREATE_TABLE_COMMAND_ATTEMPTS = 50;

export class DynamodbTable
  extends DynamodbTableClientBase
  implements ISimulatorResourceInstance
{
  private client?: DynamoDBClient;
  private _endpoint?: string;

  public constructor(
    private readonly props: DynamodbTableSchema["props"],
    _context: ISimulatorContext
  ) {
    super(props.name);
  }

  public async init(): Promise<DynamodbTableAttributes> {
    try {
      this._endpoint = `http://0.0.0.0:${this.props.hostPort}`;

      // dynamodb url based on host port
      this.client = new DynamoDBClient({
        region: "local",
        credentials: {
          accessKeyId: "x",
          secretAccessKey: "y",
        },
        endpoint: this._endpoint,
      });

      await this.createTable();

      return {};
    } catch (e) {
      throw Error(`Error setting up Dynamodb resource simulation (${e})
      - Make sure you have docker installed and running`);
    }
  }

  public async cleanup(): Promise<void> {
    // disconnect from the dynamodb server
    this.client?.destroy();
    this._endpoint = undefined;
  }

  public async save(): Promise<void> {}

  /**
   * Returns the local endpoint of the DynamoDB table.
   */
  public async endpoint(): Promise<string> {
    if (!this._endpoint) {
      throw new Error("DynamoDB hasn't been started");
    }

    return this._endpoint;
  }

  public async _rawClient(): Promise<DynamoDBClient> {
    if (this.client) {
      return this.client;
    }

    throw new Error("Dynamodb server not initialized");
  }

  private async createTable() {
    const keySchema: KeySchemaElement[] = [
      {
        AttributeName: this.props.hashKey,
        KeyType: KeyType.HASH,
      },
    ];
    if (this.props.rangeKey) {
      keySchema.push({
        AttributeName: this.props.rangeKey,
        KeyType: KeyType.RANGE,
      });
    }

    const globalSecondaryIndexKeys = (i: GlobalSecondaryIndex) => {
      const keys: KeySchemaElement[] = [
        { AttributeName: i.hashKey, KeyType: KeyType.HASH },
      ];
      if (i.rangeKey) {
        keys.push({ AttributeName: i.rangeKey, KeyType: KeyType.RANGE });
      }
      return keys;
    };

    const createTableCommand = new CreateTableCommand({
      TableName: this.tableName,
      AttributeDefinitions: Object.entries(this.props.attributeDefinitions).map(
        ([k, v]) => ({ AttributeName: k, AttributeType: v })
      ),
      KeySchema: keySchema,
      BillingMode: "PAY_PER_REQUEST",
      GlobalSecondaryIndexes: this.props.globalSecondaryIndex?.map((i) => ({
        IndexName: i.name,
        KeySchema: globalSecondaryIndexKeys(i),
        Projection: {
          ProjectionType: i.projectionType,
          NonKeyAttributes: i.nonKeyAttributes,
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: i.readCapacity,
          WriteCapacityUnits: i.writeCapacity,
        },
      })),
    });

    // dynamodb server process might take some time to start
    let attemptNumber = 0;
    while (true) {
      try {
        await this.client!.send(createTableCommand);
        break;
      } catch (err) {
        if (++attemptNumber >= MAX_CREATE_TABLE_COMMAND_ATTEMPTS) {
          throw err;
        }
        await this.sleep(50);
      }
    }
  }

  private async sleep(ms: number) {
    return new Promise((r) => setTimeout(r, ms));
  }
}
