import { CorsHeaders, HttpMethod, OpenApiSpec } from "../cloud/api";
import { ColumnType } from "../ex";
import { PolicyStatement } from "../simulator/simulator";
import { Json } from "../std";

export type ResourceHandle = string;

/** Properties for cloud.Api */
export interface ApiSchema {
  readonly openApiSpec: OpenApiSpec;
  readonly corsHeaders?: CorsHeaders;
}

/** Runtime attributes for cloud.Api */
export interface ApiAttributes {
  /** The URL of the API. */
  readonly url: string;
}

/** Schema for cloud.Api.props.routes */
export interface ApiRoute {
  /** The HTTP path pattern to handle. */
  readonly pathPattern: string;
  /** The HTTP method to handle. */
  readonly method: HttpMethod;
}

/** Schema for an Api event subscription */
export interface ApiEventSubscription extends EventSubscription {
  /** Subscribed routes */
  readonly routes: ApiRoute[];
}

/** Properties for cloud.Function */
export interface FunctionSchema {
  /** The path to a file containing source code to be run when invoked. */
  readonly sourceCodeFile: string;
  /** The language of the function's source code. */
  readonly sourceCodeLanguage: string;
  /** A map of environment variables to run the function with. */
  readonly environmentVariables: Record<string, string>;
  /** The maximum amount of time the function can run, in milliseconds. */
  readonly timeout: number;
  /** The maximum number of concurrent invocations that can run at one time. */
  readonly concurrency: number;
}

/** Runtime attributes for cloud.Function */
export interface FunctionAttributes {}

export interface DeadLetterQueueSchema {
  /** Dead-letter queue handler token */
  dlqHandler: string;
  /** Number of time a message will be processed */
  maxDeliveryAttemps: number;
}

/** Schema for cloud.Queue */
export interface QueueSchema {
  /** How long a queue's consumers have to process a message, in seconds */
  readonly timeout: number;
  /** How long a queue retains a message, in seconds */
  readonly retentionPeriod: number;
  /** Dead-letter queue options */
  readonly dlq?: DeadLetterQueueSchema;
}

/** Runtime attributes for cloud.Queue */
export interface QueueAttributes {}

/** Schema for a Queue event subscription */
export interface QueueSubscriber extends EventSubscription {
  /** Function that should be called. */
  readonly functionHandle: ResourceHandle;
  /** Maximum number of messages that will be batched together to the subscriber. */
  readonly batchSize: number;
}

/** Properties for cloud.Service */
export interface ServiceSchema {
  /** The source code of the service */
  readonly sourceCodeFile: string;
  /** A map of environment variables to run the function with. */
  readonly environmentVariables: Record<string, string>;
  /** Whether to auto-start the service. */
  readonly autoStart: boolean;
}

/** Runtime attributes for cloud.Service */
export interface ServiceAttributes {}

/** Properties for cloud.Schedule */
export interface ScheduleSchema {
  /** The cron expression that defines when the schedule should run. */
  readonly cronExpression: string;
}

/** Runtime attributes for cloud.Schedule */
export interface ScheduleAttributes {}

/** Schema for a Schedule event subscription */
export interface ScheduleTask extends EventSubscription {
  /** The function that should be called. */
  readonly functionHandle: ResourceHandle;
}

/** Base schema for an event subscription. */
export interface EventSubscription {}

/** Properties for sim.EventMapping */
export interface EventMappingSchema {
  /** Function handle to call for subscriber */
  readonly subscriber: ResourceHandle;
  /** Publisher handle of the event */
  readonly publisher: ResourceHandle;
  /** Additional properties of event subscription. The specific schema will depend on who the publisher is. */
  readonly subscriptionProps: EventSubscription;
}

/** Runtime attributes for cloud.EventMapping */
export interface EventMappingAttributes {}

/** Properties for cloud.Topic */
export interface TopicSchema {}

/** Runtime attributes for cloud.Topic */
export interface TopicAttributes {}

/** Schema for a Topic event subscription */
export interface TopicSubscriber extends EventSubscription {
  /** Function that should be called */
  readonly functionHandle: ResourceHandle;
}

/** Properties for cloud.Table */
export interface TableSchema {
  readonly name: string;
  readonly columns: { [key: string]: ColumnType };
  readonly primaryKey: string;
  readonly initialRows: Record<string, Json>;
}

/** Runtime attributes for cloud.Table */
export interface TableAttributes {}

/** Properties for cloud.Bucket */
export interface BucketSchema {
  /** Whether the bucket should be publicly accessible. */
  readonly public: boolean;
  /** The initial objects uploaded to the bucket. */
  readonly initialObjects: Record<string, string>;
  /** Event notification topics- the record has BucketEventType as a key and a topic handle as a value  */
  readonly topics: Record<string, string>;
}

/** Runtime attributes for cloud.Bucket */
export interface BucketAttributes {}

/** Properties for cloud.Counter */
export interface CounterSchema {
  /** The initial value of the counter. */
  readonly initial: number;
}

/** Runtime attributes for cloud.Counter */
export interface CounterAttributes {}

/** Properties for cloud.TestRunner */
export interface TestRunnerSchema {
  /** A map from test functions to their handles. */
  readonly tests: Record<string, ResourceHandle>;
}

/** Runtime attributes for cloud.TestRunner */
export interface TestRunnerAttributes {}

/** Properties for redis.Redis */
export interface RedisSchema {
  /** The port to run the Redis server on. */
  readonly port: string;
}

/** Runtime attributes for ex.Redis */
export interface RedisAttributes {}

/**
 * Custom routes created in preflight.
 * Each contains the data to send to the user and a contentType header.
 */
export type FileRoutes = Record<string, { data: string; contentType: string }>;

/** Properties for cloud.Website */
export interface WebsiteSchema {
  /** Path to the directory where all static files are hosted from */
  readonly staticFilesPath: string;
  /** Map of "files" contains dynamic content inserted from preflight */
  readonly fileRoutes: FileRoutes;
  /** Name of the error document for the website. */
  readonly errorDocument?: string;
}

/** Runtime attributes for cloud.Website */
export interface WebsiteAttributes {
  /** The URL of the Website. */
  readonly url: string;
}

/** Properties for ex.ReactApp */
export interface ReactAppSchema {
  readonly path: string;
  readonly startCommand: string;
  readonly environmentVariables: Record<string, string>;
  readonly useBuildCommand: boolean;
  readonly url: string;
  readonly localPort: string | number;
}

/** Runtime attributes for ex.ReactApp */
export interface ReactAppAttributes {
  readonly url: string;
}

/** Properties for cloud.Secret */
export interface SecretSchema {
  /** The name of the secret */
  readonly name: string;
}

/** Runtime attributes for cloud.Secret */
export interface SecretAttributes {}

/** Properties for cloud.OnDeploy */
export interface OnDeploySchema {
  /** The function to run on deploy. */
  readonly functionHandle: ResourceHandle;
}

/** Runtime attributes for cloud.OnDeploy */
export interface OnDeployAttributes {}

/** Properties for sim.State */
export interface StateSchema {}

/** Runtime attributes for sim.State */
export interface StateAttributes {}

/** Properties for cloud.Domain */
export interface DomainSchema {}

/** Runtime attributes for cloud.Domain */
export interface DomainAttributes {}

/** Properties for cloud.Endpoint */
export interface EndpointSchema {
  /** The input URL of the Endpoint. */
  readonly inputUrl: string;
  /** The output URL of the Endpoint. */
  readonly url: string;
  /** The Label of the Endpoint. */
  readonly label: string | undefined;
  /** Browser support of the Endpoint. */
  readonly browserSupport: boolean | undefined;
}

/** Runtime attributes for cloud.Endpoint */
export interface EndpointAttributes {
  /** The input URL of the Endpoint. */
  readonly inputUrl: string;
  /** The output URL of the Endpoint. */
  readonly url: string;
  /** The Label of the Endpoint. */
  readonly label: string | undefined;
  /** Browser support of the Endpoint. */
  readonly browserSupport: boolean | undefined;
}

/** Properties for sim.Container */
export interface ContainerSchema {
  readonly imageTag: string;
  readonly image: string;
  readonly containerPort?: number;
  readonly env?: Record<string, string>;
  readonly args?: string[];
  readonly cwd: string;
}

/** Runtime attributes for sim.Container */
export interface ContainerAttributes {}

/** Properties for sim.Policy */
export interface PolicySchema {
  /** The resource which the policy is attached to. */
  readonly principal: ResourceHandle;
  /** The statements in the policy. */
  readonly statements: PolicyStatement[];
}

/** Runtime attributes for sim.Policy */
export interface PolicyAttributes {}
