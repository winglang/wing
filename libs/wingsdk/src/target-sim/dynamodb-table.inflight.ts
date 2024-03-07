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
  generateDockerContainerName,
  runDockerImage,
  runCommand,
} from "../shared/misc";
import {
  ISimulatorContext,
  ISimulatorResourceInstance,
} from "../simulator/simulator";

const MAX_CREATE_TABLE_COMMAND_ATTEMPTS = 50;

export class DynamodbTable
  extends DynamodbTableClientBase
  implements ISimulatorResourceInstance
{
  private containerName: string;
  private readonly WING_DYNAMODB_IMAGE =
    process.env.WING_DYNAMODB_IMAGE ?? "amazon/dynamodb-local:2.0.0";
  private readonly context: ISimulatorContext;
  private client?: DynamoDBClient;
  private _endpoint?: string;

  public constructor(
    private props: DynamodbTableSchema["props"],
    context: ISimulatorContext
  ) {
    super(props.name);

    this.context = context;
    this.containerName = generateDockerContainerName(
      `wing-sim-dynamodb-${this.context.resourcePath}`
    );
  }

  public async init(): Promise<DynamodbTableAttributes> {
    try {
      const { hostPort } = await runDockerImage({
        imageName: this.WING_DYNAMODB_IMAGE,
        containerName: this.containerName,
        containerPort: "8000",
      });

      this._endpoint = `http://0.0.0.0:${hostPort}`;

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
    // stop the dynamodb container
    await runCommand("docker", ["rm", "-f", this.containerName]);
    this._endpoint = undefined;
  }

  public async save(): Promise<void> {}

  /**
   * Returns the local endpoint of the DynamoDB table.
   */
  public async endpoint(): string {
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
