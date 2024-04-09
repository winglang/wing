import type { BaseResourceSchema } from "@winglang/sdk/lib/simulator/index.js";
import type {
  ApiSchema as ApiSchema_,
  TableSchema as TableSchema_,
  WebsiteSchema as WebsiteSchema_,
  EndpointSchema as EndpointSchema_,
  ReactAppSchema as ReactAppSchema_,
} from "@winglang/sdk/lib/target-sim/schema-resources.js";

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
  IEndpointClient,
  OpenApiSpec,
} from "@winglang/sdk/lib/cloud/index.js";

export type { ITestRunnerClient } from "@winglang/sdk/lib/std/index.js";

export type { IRedisClient, ITableClient } from "@winglang/sdk/lib/ex/index.js";

export type ApiSchema = BaseResourceSchema & {
  props: ApiSchema_;
};
export type TableSchema = BaseResourceSchema & {
  props: TableSchema_;
};
export type WebsiteSchema = BaseResourceSchema & {
  props: WebsiteSchema_;
};
export type EndpointSchema = BaseResourceSchema & {
  props: EndpointSchema_;
};
export type ReactAppSchema = BaseResourceSchema & {
  props: ReactAppSchema_;
};
