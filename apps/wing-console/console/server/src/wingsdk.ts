export {
  Simulator,
  type WingSimulatorSchema,
  type BaseResourceSchema,
} from "@winglang/sdk/lib/simulator/index.js";

export { Json } from "@winglang/sdk/lib/std/json.js";

export type {
  IBucketClient,
  IFunctionClient,
  IQueueClient,
  ICounterClient,
  ITopicClient,
  IApiClient,
  OpenApiSpec,
  IWebsiteClient,
} from "@winglang/sdk/lib/cloud/index.js";

export type { ITestRunnerClient } from "@winglang/sdk/lib/std/index.js";

export type {
  IRedisClient,
  ITableClient,
  IDynamodbTableClient,
} from "@winglang/sdk/lib/ex/index.js";

export type {
  ApiSchema,
  DynamodbTableSchema,
  TableSchema,
  WebsiteSchema,
} from "@winglang/sdk/lib/target-sim/schema-resources.js";
