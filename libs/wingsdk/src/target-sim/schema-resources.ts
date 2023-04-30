import { ColumnType, HttpMethod } from "../cloud";
import { Json } from "../std";
import {
  BaseResourceAttributes,
  BaseResourceSchema,
} from "../testing/simulator";

export const API_TYPE = "wingsdk.cloud.Api";
export const QUEUE_TYPE = "wingsdk.cloud.Queue";
export const EVENT_MAPPING_TYPE = "wingsdk.sim.EventMapping";
export const FUNCTION_TYPE = "wingsdk.cloud.Function";
export const BUCKET_TYPE = "wingsdk.cloud.Bucket";
export const TOPIC_TYPE = "wingsdk.cloud.Topic";
export const COUNTER_TYPE = "wingsdk.cloud.Counter";
export const SCHEDULE_TYPE = "wingsdk.cloud.Schedule";
export const TABLE_TYPE = "wingsdk.cloud.Table";
export const LOGGER_TYPE = "wingsdk.cloud.Logger";
export const TEST_RUNNER_TYPE = "wingsdk.cloud.TestRunner";
export const REDIS_TYPE = "wingsdk.redis.Redis";
export const WEBSITE_TYPE = "wingsdk.cloud.Website";
export const SECRET_TYPE = "wingsdk.cloud.Secret";

export type FunctionHandle = string;
export type PublisherHandle = string;

/** Schema for cloud.Api */
export interface ApiSchema extends BaseResourceSchema {
  readonly type: typeof API_TYPE;
  readonly props: {
    /** The routes that the API should handle. */
    readonly routes: ApiRoute[];
  };
  readonly attrs: ApiAttributes & BaseResourceAttributes;
}

/** Runtime attributes for cloud.Api */
export interface ApiAttributes {
  /** The URL of the API. */
  readonly url: string;
}

/** Schema for cloud.Api.props.routes */
export interface ApiRoute {
  /** The route to handle. */
  readonly route: string;
  /** The HTTP method to handle. */
  readonly method: HttpMethod;
  /** The function that should be called when the route is hit. */
  readonly functionHandle: FunctionHandle;
}

/** Schema for cloud.Function */
export interface FunctionSchema extends BaseResourceSchema {
  readonly type: typeof FUNCTION_TYPE;
  readonly props: {
    /** The path to a file containing source code to be run when invoked. */
    readonly sourceCodeFile: string;
    /** The language of the function's source code. */
    readonly sourceCodeLanguage: string;
    /** A map of environment variables to run the function with. */
    readonly environmentVariables: Record<string, string>;
    /** The maximum amount of time the function can run, in milliseconds. */
    readonly timeout: number;
  };
}

/** Runtime attributes for cloud.Function */
export interface FunctionAttributes {}

/** Schema for cloud.Queue */
export interface QueueSchema extends BaseResourceSchema {
  readonly type: typeof QUEUE_TYPE;
  readonly props: {
    /** How long a queue's consumers have to process a message, in seconds */
    readonly timeout: number;
    /** How long a queue retains a message, in seconds */
    readonly retentionPeriod: number;
    /** Initial messages to be pushed to the queue. */
    readonly initialMessages: string[];
  };
}

export interface EventSubscription {}

/** Schema for sim.EventMapping */
export interface EventMappingSchema extends BaseResourceSchema {
  readonly type: typeof EVENT_MAPPING_TYPE;
  readonly props: {
    /** Function handle to call for subscriber */
    subscriber: FunctionHandle;
    /** Publisher handle of the event */
    publisher: PublisherHandle;
    /** Additional properties of event subscription */
    subscriptionProps: EventSubscription;
  };
}

/** Runtime attributes for cloud.EventMapping */
export interface EventMappingAttributes {}

/** Runtime attributes for cloud.Queue */
export interface QueueAttributes {}

/** Schema for cloud.Queue.props.subscribers */
export interface QueueSubscriber extends EventSubscription {
  /** Function that should be called. */
  readonly functionHandle: FunctionHandle;
  /** Maximum number of messages that will be batched together to the subscriber. */
  readonly batchSize: number;
}

/** Schema for cloud.Topic */
export interface TopicSchema extends BaseResourceSchema {
  readonly type: typeof TOPIC_TYPE;
  readonly props: {};
}

/** Runtime attributes for cloud.Topic */
export interface TopicAttributes {}

export interface TopicSubscriber extends EventSubscription {
  /** Function that should be called */
  readonly functionHandle: FunctionHandle;
}

/** Runtime attributes for cloud.Table */
export interface TableAttributes {}

/** Schema for cloud.Table */
export interface TableSchema extends BaseResourceSchema {
  readonly type: typeof TABLE_TYPE;
  readonly props: {
    readonly name: string;
    readonly columns: { [key: string]: ColumnType };
    readonly primaryKey: string;
  };
}

/** Schema for cloud.Bucket */
export interface BucketSchema extends BaseResourceSchema {
  readonly type: typeof BUCKET_TYPE;
  readonly props: {
    /** Whether the bucket should be publicly accessible. */
    readonly public: boolean;
    /** The initial objects uploaded to the bucket. */
    readonly initialObjects: Record<string, string>;
    /** Event notification topics- the record has BucketEventType as a key and a topic handle as a value  */
    readonly topics: Record<string, string>;
  };
}

/** Runtime attributes for cloud.Bucket */
export interface BucketAttributes {}

/** Schema for cloud.Logger */
export interface LoggerSchema extends BaseResourceSchema {
  readonly type: typeof LOGGER_TYPE;
  readonly props: {};
}

/** Runtime attributes for cloud.Logger */
export interface LoggerAttributes {}

/** Schema for cloud.Counter */
export interface CounterSchema extends BaseResourceSchema {
  readonly type: typeof COUNTER_TYPE;
  readonly props: {
    /** The initial value of the counter. */
    readonly initial: number;
  };
}

/** Runtime attributes for cloud.Counter */
export interface CounterAttributes {}

/** Schema for cloud.TestRunner */
export interface TestRunnerSchema extends BaseResourceSchema {
  readonly type: typeof TEST_RUNNER_TYPE;
  readonly props: {
    /** A map from test functions to their handles. */
    readonly tests: Record<string, FunctionHandle>;
  };
}

/** Runtime attributes for cloud.TestRunner */
export interface TestRunnerAttributes {}

/** Schema for redis.Redis */
export interface RedisSchema extends BaseResourceSchema {
  readonly type: typeof REDIS_TYPE;
  readonly props: {};
}

/** Schema for cloud.Website */
export interface WebsiteSchema extends BaseResourceSchema {
  readonly type: typeof WEBSITE_TYPE;
  readonly props: {
    /** Path to the directory where all static files are hosted from */
    staticFilesPath: string;
    /** Map of `.json` file paths to dynamic content inserted from preflight */
    jsonRoutes: Record<string, Json>;
  };
}

export interface RedisAttributes {}

/** Schema for cloud.Secret */
export interface SecretSchema extends BaseResourceSchema {
  readonly type: typeof SECRET_TYPE;
  readonly props: {
    /** The name of the secret */
    readonly name: string;
  };
}

/** Runtime attributes for cloud.Secret */
export interface SecretAttributes {}
