import { BaseResourceAttributes, BaseResourceSchema } from "./schema";
import { HttpMethod } from "../cloud";

export const API_TYPE = "wingsdk.cloud.Api";
export const QUEUE_TYPE = "wingsdk.cloud.Queue";
export const FUNCTION_TYPE = "wingsdk.cloud.Function";
export const BUCKET_TYPE = "wingsdk.cloud.Bucket";
export const TOPIC_TYPE = "wingsdk.cloud.Topic";
export const COUNTER_TYPE = "wingsdk.cloud.Counter";
export const SCHEDULE_TYPE = "wingsdk.cloud.Schedule";
export const LOGGER_TYPE = "wingsdk.cloud.Logger";

export type FunctionHandle = string;

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
    /** How long a queue's consumers have to process a message, in milliseconds */
    readonly timeout: number;
    /** Function that should process queue messages. */
    readonly subscribers: QueueSubscriber[];
    /** Initial messages to be pushed to the queue. */
    readonly initialMessages: string[];
  };
}

/** Runtime attributes for cloud.Queue */
export interface QueueAttributes {}

/** Schema for cloud.Queue.props.subscribers */
export interface QueueSubscriber {
  /** Function that should be called. */
  readonly functionHandle: FunctionHandle;
  /** Maximum number of messages that will be batched together to the subscriber. */
  readonly batchSize: number;
}

/** Schema for cloud.Topic */
export interface TopicSchema extends BaseResourceSchema {
  readonly type: typeof TOPIC_TYPE;
  readonly props: {
    readonly subscribers: TopicSubscriber[];
  };
}

/** Runtime attributes for cloud.Topic */
export interface TopicAttributes {}

export interface TopicSubscriber {
  /** Function that should be called */
  readonly functionHandle: FunctionHandle;
}

/** Schema for cloud.Bucket */
export interface BucketSchema extends BaseResourceSchema {
  readonly type: typeof BUCKET_TYPE;
  readonly props: {
    /** Whether the bucket should be publicly accessible. */
    readonly public: boolean;
    /** The initial objects uploaded to the bucket. */
    readonly initialObjects: Record<string, string>;
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
