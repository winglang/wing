import { CorsHeaders, HttpMethod, OpenApiSpec } from "../cloud";
import { ColumnType } from "../ex";
import {
  BaseResourceAttributes,
  BaseResourceSchema,
} from "../simulator/simulator";
import { Json } from "../std";

export const API_TYPE = "wingsdk.cloud.Api";
export const QUEUE_TYPE = "wingsdk.cloud.Queue";
export const EVENT_MAPPING_TYPE = "wingsdk.sim.EventMapping";
export const FUNCTION_TYPE = "wingsdk.cloud.Function";
export const BUCKET_TYPE = "wingsdk.cloud.Bucket";
export const TOPIC_TYPE = "wingsdk.cloud.Topic";
export const COUNTER_TYPE = "wingsdk.cloud.Counter";
export const SCHEDULE_TYPE = "wingsdk.cloud.Schedule";
export const TABLE_TYPE = "wingsdk.cloud.Table"; // for backwards compat
export const LOGGER_TYPE = "wingsdk.cloud.Logger";
export const TEST_RUNNER_TYPE = "wingsdk.cloud.TestRunner";
export const REDIS_TYPE = "wingsdk.redis.Redis"; // for backwards compat
export const WEBSITE_TYPE = "wingsdk.cloud.Website";
export const REACT_APP_TYPE = "wingsdk.ex.ReactApp";
export const SECRET_TYPE = "wingsdk.cloud.Secret";
export const SERVICE_TYPE = "wingsdk.cloud.Service";
export const ON_DEPLOY_TYPE = "wingsdk.cloud.OnDeploy";
export const DYNAMODB_TABLE_TYPE = "wingsdk.ex.DynamodbTable";

export type FunctionHandle = string;
export type PublisherHandle = string;

/** Schema for cloud.Api */
export interface ApiSchema extends BaseResourceSchema {
  readonly type: typeof API_TYPE;
  readonly props: {
    openApiSpec: OpenApiSpec;
    corsHeaders?: CorsHeaders;
  };
  readonly attrs: ApiAttributes & BaseResourceAttributes;
}

export interface ApiEventSubscription extends EventSubscription {
  /** Subscribed routes */
  readonly routes: ApiRoute[];
}

/** Runtime attributes for cloud.Api */
export interface ApiAttributes {
  /** The URL of the API. */
  readonly url: string;
}

/** Schema for cloud.Api.props.routes */
export interface ApiRoute {
  /** The path to handle. */
  readonly path: string;
  /** The HTTP method to handle. */
  readonly method: HttpMethod;
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
  };
}

/** Schema for cloud.Service */
export interface ServiceSchema extends BaseResourceSchema {
  readonly type: typeof SERVICE_TYPE;
  readonly props: {
    /** The source code of the service */
    readonly sourceCodeFile: string;
    /** Whether the service should start when sim starts */
    readonly autoStart: boolean;
    /** A map of environment variables to run the function with. */
    readonly environmentVariables: Record<string, string>;
  };
}

/** Runtime attributes for cloud.Service */
export interface ServiceAttributes {}

/** Runtime attributes for cloud.Schedule */
export interface ScheduleAttributes {}

/** Schema for cloud.Schedule */
export interface ScheduleSchema extends BaseResourceSchema {
  readonly type: typeof SCHEDULE_TYPE;
  readonly props: {
    /** The cron expression that defines when the schedule should run. */
    readonly cronExpression: string;
  };
}

/** Schema for cloud.Queue.props.subscribers */
export interface ScheduleTask extends EventSubscription {
  /** Function that should be called. */
  readonly functionHandle: FunctionHandle;
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
    readonly initialRows: Record<string, Json>;
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

export type FileRoutes = Record<string, { data: string; contentType: string }>;

/** Schema for cloud.Website */
export interface WebsiteSchema extends BaseResourceSchema {
  readonly type: typeof WEBSITE_TYPE;
  readonly props: {
    /** Path to the directory where all static files are hosted from */
    staticFilesPath: string;
    /** Map of `.json` file paths to dynamic content inserted from preflight */
    fileRoutes: FileRoutes;
  };
}

export interface ReactAppSchema extends BaseResourceSchema {
  readonly type: typeof REACT_APP_TYPE;
  readonly props: {
    path: string;
    startCommand: string;
    environmentVariables: Record<string, string>;
    isDevRun: boolean;
    url: string;
  };
}
export interface ReactAppAttributes {
  url: string;
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

/** Schema for cloud.OnDeploy */
export interface OnDeploySchema extends BaseResourceSchema {
  readonly type: typeof ON_DEPLOY_TYPE;
  readonly props: {
    /** The function to run on deploy. */
    readonly functionHandle: FunctionHandle;
  };
}

/** Runtime attributes for cloud.OnDeploy */
export interface OnDeployAttributes {}

/** Runtime attributes for ex.DynamodbTable */
export interface DynamodbTableAttributes {}

/** Schema for ex.DynamodbTable */
export interface DynamodbTableSchema extends BaseResourceSchema {
  readonly type: typeof DYNAMODB_TABLE_TYPE;
  readonly props: {
    readonly name: string;
    /**
     * Table attribute definitions. e.g. { "myKey": "S", "myOtherKey": "S" }.
     */
    readonly attributeDefinitions: Json;
    /**
     * Hash key for this table.
     */
    readonly hashKey: string;
    /**
     * Range key for this table.
     */
    readonly rangeKey?: string;
  };
}
