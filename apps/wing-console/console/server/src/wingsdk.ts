export {
  Simulator,
  type WingSimulatorSchema,
  type BaseResourceSchema,
} from "@winglang/sdk/lib/testing/index.js";

export { Json } from "@winglang/sdk/lib/std/json.js";

export type {
  IBucketClient,
  IFunctionClient,
  IQueueClient,
  ICounterClient,
  ITopicClient,
  IApiClient,
  ITestRunnerClient,
  OpenApiSpec,
} from "@winglang/sdk/lib/cloud/index.js";

export type { IRedisClient, ITableClient } from "@winglang/sdk/lib/ex/index.js";

export type {
  ApiSchema,
  TableSchema,
  WebsiteSchema,
} from "@winglang/sdk/lib/target-sim/schema-resources.js";
