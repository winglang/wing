import type { BaseResourceSchema } from "@winglang/sdk/simulator";
import type {
  ApiSchema as ApiSchema_,
  WebsiteSchema as WebsiteSchema_,
  EndpointSchema as EndpointSchema_,
} from "@winglang/sdk/target-sim/schema-resources";

export {
  Simulator,
  type WingSimulatorSchema,
  type BaseResourceSchema,
} from "@winglang/sdk/simulator";

export { Json } from "@winglang/sdk/std/json";

export type {
  IBucketClient,
  IFunctionClient,
  IQueueClient,
  ICounterClient,
  ITopicClient,
  IApiClient,
  IEndpointClient,
  OpenApiSpec,
} from "@winglang/sdk/cloud";

export type { ITestRunnerClient } from "@winglang/sdk/std";

export type ApiSchema = BaseResourceSchema & {
  props: ApiSchema_;
};
export type WebsiteSchema = BaseResourceSchema & {
  props: WebsiteSchema_;
};
export type EndpointSchema = BaseResourceSchema & {
  props: EndpointSchema_;
};
