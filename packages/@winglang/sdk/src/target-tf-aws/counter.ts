import { Construct } from "constructs";
import { DynamodbTable } from "../.gen/providers/aws/dynamodb-table";
import * as cloud from "../cloud";
import { NameOptions, ResourceNames } from "../shared/resource-names";
import { Counter as AwsCounter, COUNTER_HASH_KEY } from "../shared-aws/counter";

/**
 * Counter (Table) names must be between 3 and 255 characters.
 * You can use alphanumeric characters, dot (.), dash (-), and underscores (_).
 */
const NAME_OPTS: NameOptions = {
  maxLen: 255,
  disallowedRegex: /[^a-zA-Z0-9\_\.\-]+/g,
  prefix: "wing-counter-",
};

/**
 * AWS implementation of `cloud.Counter`.
 *
 * @inflight `@winglang/sdk.cloud.ICounterClient`
 */
export class Counter extends AwsCounter  {
  private readonly table: DynamodbTable;

  constructor(scope: Construct, id: string, props: cloud.CounterProps = {}) {
    super(scope, id, props);

    this.table = new DynamodbTable(this, "Default", {
      name: ResourceNames.generateName(this, NAME_OPTS),
      attribute: [{ name: COUNTER_HASH_KEY, type: "S" }],
      hashKey: COUNTER_HASH_KEY,
      billingMode: "PAY_PER_REQUEST",
    });
  }

  public get dynamoTableArn(): string {
    return this.table.arn;
  }

  public get dynamoTableName(): string {
    return this.table.name;
  }
}
