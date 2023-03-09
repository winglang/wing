import { BaseResourceSchema } from "./schema";

export const QUEUE_TYPE = "wingsdk.cloud.Queue";
export const FUNCTION_TYPE = "wingsdk.cloud.Function";
export const BUCKET_TYPE = "wingsdk.cloud.Bucket";
export const TOPIC_TYPE = "wingsdk.cloud.Topic";
export const COUNTER_TYPE = "wingsdk.cloud.Counter";
export const SCHEDULE_TYPE = "wingsdk.cloud.Schedule";
export const LOGGER_TYPE = "wingsdk.cloud.Logger";

export type FunctionHandle = string;

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

/** Schema for cloud.Logger */
export interface LoggerSchema extends BaseResourceSchema {
  readonly type: typeof LOGGER_TYPE;
  readonly props: {};
}

/** Schema for cloud.Counter */
export interface CounterSchema extends BaseResourceSchema {
  readonly type: typeof COUNTER_TYPE;
  readonly props: {
    /** The initial value of the counter. */
    readonly initial: number;
  };
}
