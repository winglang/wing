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
  ITableClient,
  OpenApiSpec,
} from "@winglang/sdk/lib/cloud/index.js";

export type { IRedisClient } from "@winglang/sdk/lib/redis/index.js";

export type {
  ApiSchema,
  TableSchema,
} from "@winglang/sdk/lib/target-sim/schema-resources.js";
