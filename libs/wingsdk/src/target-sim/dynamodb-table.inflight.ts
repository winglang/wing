import { execSync } from "child_process";
import { resolve } from "node:path";
import {
  CreateTableCommand,
  DynamoDBClient,
  KeyType,
  KeySchemaElement,
  DescribeTableCommand,
  AttributeDefinition,
  DeleteTableCommand,
  ListTablesCommand,
} from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from "uuid";
import {
  DynamodbTableAttributes,
  DynamodbTableSchema,
} from "./schema-resources";
import { DynamodbTableClientBase } from "../ex";
import { runDockerImage } from "../shared/misc";
import {
  ISimulatorContext,
  ISimulatorResourceInstance,
} from "../simulator/simulator";

const MAX_LIST_TABLE_COMMAND_ATTEMPTS = 50;
const DB_DATA_PATH = "/home/dynamodblocal/data/";

export class DynamodbTable
  extends DynamodbTableClientBase
  implements ISimulatorResourceInstance
{
  private containerName: string;
  private readonly WING_DYNAMODB_IMAGE =
    process.env.WING_DYNAMODB_IMAGE ?? "amazon/dynamodb-local:2.0.0";
  private readonly context: ISimulatorContext;
  private client?: DynamoDBClient;

  public constructor(
    private props: DynamodbTableSchema["props"],
    context: ISimulatorContext
  ) {
    super(props.name);

    this.context = context;
    this.containerName = `wing-sim-dynamodb-${this.context.resourcePath.replace(
      /\//g,
      "."
    )}-${uuidv4()}`;
  }

  public async init(): Promise<DynamodbTableAttributes> {
    try {
      const { hostPort } = await runDockerImage({
        imageName: this.WING_DYNAMODB_IMAGE,
        containerName: this.containerName,
        containerPort: "8000",
        args: [
          "-jar",
          "DynamoDBLocal.jar",
          "-sharedDb",
          "-dbPath",
          DB_DATA_PATH,
        ],
        volumes: { [resolve(this.context.statedir)]: DB_DATA_PATH },
      });

      // dynamodb url based on host port
      this.client = new DynamoDBClient({
        region: "local",
        credentials: {
          accessKeyId: "x",
          secretAccessKey: "y",
        },
        endpoint: `http://0.0.0.0:${hostPort}`,
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
    execSync(`docker rm -f ${this.containerName}`);
  }

  public async save(): Promise<void> {}

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

    const attributeDefinitions = Object.entries(
      this.props.attributeDefinitions
    ).map(([k, v]) => ({ AttributeName: k, AttributeType: v }));

    // dynamodb server process might take some time to start
    let attemptNumber = 0;
    let shouldCreateTable = false;
    let tables: string[] | undefined;
    while (true) {
      try {
        const res = await this.client!.send(new ListTablesCommand({}));
        tables = res.TableNames;
        break;
      } catch (err) {
        if (++attemptNumber >= MAX_LIST_TABLE_COMMAND_ATTEMPTS) {
          throw err;
        }
        await this.sleep(50);
      }
    }

    // check if tables exists
    if (tables?.includes(this.tableName)) {
      const describeTableOutput = await this.client!.send(
        new DescribeTableCommand({
          TableName: this.tableName,
        })
      );
      if (describeTableOutput.Table) {
        // check if table should be recreated
        if (
          !this.compareKeySchemas(
            describeTableOutput.Table.KeySchema,
            keySchema
          ) ||
          !this.compareAttributeDefinitions(
            describeTableOutput.Table.AttributeDefinitions,
            attributeDefinitions
          )
        ) {
          shouldCreateTable = true;
          await this.client!.send(
            new DeleteTableCommand({
              TableName: this.tableName,
            })
          );
        }
      }
    } else {
      shouldCreateTable = true;
    }

    if (shouldCreateTable) {
      await this.client!.send(
        new CreateTableCommand({
          TableName: this.tableName,
          AttributeDefinitions: attributeDefinitions,
          KeySchema: keySchema,
          BillingMode: "PAY_PER_REQUEST",
        })
      );
    }
  }

  private compareKeySchemas(
    actual: KeySchemaElement[] | undefined,
    expected: KeySchemaElement[]
  ) {
    if (actual === undefined) {
      return false;
    }

    return expected.every((key, index) => {
      return (
        actual[index].KeyType == key.KeyType &&
        actual[index].AttributeName == key.AttributeName
      );
    });
  }

  private compareAttributeDefinitions(
    actual: AttributeDefinition[] | undefined,
    expected: AttributeDefinition[]
  ) {
    if (actual === undefined) {
      return false;
    }

    return expected.every((attr, index) => {
      return (
        actual[index].AttributeName == attr.AttributeName &&
        actual[index].AttributeType == attr.AttributeType
      );
    });
  }

  private async sleep(ms: number) {
    return new Promise((r) => setTimeout(r, ms));
  }
}
