import { SIM_CONTAINER_FQN } from "./container";
import { EVENT_MAPPING_FQN } from "./event-mapping";
import { STATE_FQN } from "./state";
import {
  API_FQN,
  BUCKET_FQN,
  COUNTER_FQN,
  CorsHeaders,
  DOMAIN_FQN,
  ENDPOINT_FQN,
  FUNCTION_FQN,
  HttpMethod,
  ON_DEPLOY_FQN,
  OpenApiSpec,
  QUEUE_FQN,
  SCHEDULE_FQN,
  SECRET_FQN,
  SERVICE_FQN,
  TOPIC_FQN,
  WEBSITE_FQN,
} from "../cloud";
import {
  ColumnType,
  DYNAMODB_TABLE_FQN,
  REACT_APP_FQN,
  REDIS_FQN,
  TABLE_FQN,
} from "../ex";
import { GlobalSecondaryIndex as DynamodbTableGlobalSecondaryIndex } from "../ex/dynamodb-table";
import {
  BaseResourceAttributes,
  BaseResourceSchema,
} from "../simulator/simulator";
import { Json, TEST_RUNNER_FQN } from "../std";

export type FunctionHandle = string;
export type PublisherHandle = string;

/** Schema for cloud.Api */
export interface ApiSchema extends BaseResourceSchema {
  readonly type: typeof API_FQN;
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
  readonly type: typeof FUNCTION_FQN;
  readonly props: {
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
  };
}

/** Runtime attributes for cloud.Function */
export interface FunctionAttributes {}

/** Schema for cloud.Queue */
export interface QueueSchema extends BaseResourceSchema {
  readonly type: typeof QUEUE_FQN;
  readonly props: {
    /** How long a queue's consumers have to process a message, in seconds */
    readonly timeout: number;
    /** How long a queue retains a message, in seconds */
    readonly retentionPeriod: number;
  };
}

/** Schema for cloud.Service */
export interface ServiceSchema extends BaseResourceSchema {
  readonly type: typeof SERVICE_FQN;
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
  readonly type: typeof SCHEDULE_FQN;
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
  readonly type: typeof EVENT_MAPPING_FQN;
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
  readonly type: typeof TOPIC_FQN;
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
  readonly type: typeof TABLE_FQN;
  readonly props: {
    readonly name: string;
    readonly columns: { [key: string]: ColumnType };
    readonly primaryKey: string;
    readonly initialRows: Record<string, Json>;
  };
}

/** Schema for cloud.Bucket */
export interface BucketSchema extends BaseResourceSchema {
  readonly type: typeof BUCKET_FQN;
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

/** Schema for cloud.Counter */
export interface CounterSchema extends BaseResourceSchema {
  readonly type: typeof COUNTER_FQN;
  readonly props: {
    /** The initial value of the counter. */
    readonly initial: number;
  };
}

/** Runtime attributes for cloud.Counter */
export interface CounterAttributes {}

/** Schema for cloud.TestRunner */
export interface TestRunnerSchema extends BaseResourceSchema {
  readonly type: typeof TEST_RUNNER_FQN;
  readonly props: {
    /** A map from test functions to their handles. */
    readonly tests: Record<string, FunctionHandle>;
  };
}

/** Runtime attributes for cloud.TestRunner */
export interface TestRunnerAttributes {}

/** Schema for redis.Redis */
export interface RedisSchema extends BaseResourceSchema {
  readonly type: typeof REDIS_FQN;
  readonly props: {
    readonly port: string;
  };
}

/**
 * Custom routes created in preflight.
 * Each contains the data to send to the user and a contentType header.
 */
export type FileRoutes = Record<string, { data: string; contentType: string }>;

/** Schema for cloud.Website */
export interface WebsiteSchema extends BaseResourceSchema {
  readonly type: typeof WEBSITE_FQN;
  readonly props: {
    /** Path to the directory where all static files are hosted from */
    staticFilesPath: string;
    /** Map of "files" contains dynamic content inserted from preflight */
    fileRoutes: FileRoutes;
    /** Name of the error document for the website. */
    errorDocument?: string;
  };
  readonly attrs: WebsiteAttributes & BaseResourceAttributes;
}

/** Runtime attributes for cloud.Website */
export interface WebsiteAttributes {
  /** The URL of the Website. */
  readonly url: string;
}

export interface ReactAppSchema extends BaseResourceSchema {
  readonly type: typeof REACT_APP_FQN;
  readonly props: {
    path: string;
    startCommand: string;
    environmentVariables: Record<string, string>;
    useBuildCommand: boolean;
    url: string;
    localPort: string | number;
  };
}
export interface ReactAppAttributes {
  url: string;
}

export interface RedisAttributes {}

/** Schema for cloud.Secret */
export interface SecretSchema extends BaseResourceSchema {
  readonly type: typeof SECRET_FQN;
  readonly props: {
    /** The name of the secret */
    readonly name: string;
  };
}

/** Runtime attributes for cloud.Secret */
export interface SecretAttributes {}

/** Schema for cloud.OnDeploy */
export interface OnDeploySchema extends BaseResourceSchema {
  readonly type: typeof ON_DEPLOY_FQN;
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
  readonly type: typeof DYNAMODB_TABLE_FQN;
  readonly props: {
    /**
     * The port of the DynamoDB container.
     */
    readonly hostPort: string;

    /**
     * The table name.
     */
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
    /**
     * The GSI for the table.
     */
    readonly globalSecondaryIndex?: DynamodbTableGlobalSecondaryIndex[];
  };
}

/** Schema for simulator.State */
export interface StateSchema extends BaseResourceSchema {
  readonly type: typeof STATE_FQN;
  readonly props: {};
}

/** Schema for cloud.Domain */
export interface DomainSchema extends BaseResourceSchema {
  readonly type: typeof DOMAIN_FQN;
  readonly props: {};
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

/** Schema for cloud.Endpoint */
export interface EndpointSchema extends BaseResourceSchema {
  readonly type: typeof ENDPOINT_FQN;
  readonly props: {
    /** The input URL of the Endpoint. */
    readonly inputUrl: string;
    /** The output URL of the Endpoint. */
    readonly url: string;
    /** The Label of the Endpoint. */
    readonly label: string | undefined;
    /** Browser support of the Endpoint. */
    readonly browserSupport: boolean | undefined;
  };
  readonly attrs: EndpointAttributes & BaseResourceAttributes;
}

/** Schema for sim.Container */
export interface ContainerSchema extends BaseResourceSchema {
  readonly type: typeof SIM_CONTAINER_FQN;
  readonly props: {
    imageTag: string;
    image: string;
    containerPort?: number;
    env?: Record<string, string>;
    args?: string[];
    cwd: string;
  };
  readonly attrs: ContainerAttributes & BaseResourceAttributes;
}

/** Runtime attributes for sim.Container */
export interface ContainerAttributes {}
