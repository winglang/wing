import { BUCKET_TYPE, FUNCTION_TYPE, QUEUE_TYPE } from "../cloud";
import { BaseResourceSchema } from "./schema";

export type FunctionId = string;

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
  };
  readonly attrs: {
    /** A unique address of the function in the simulator. */
    readonly functionAddr: number;
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
  readonly attrs: {
    /** A unique address of the queue in the simulator. */
    readonly queueAddr: number;
  };
}

/** Schema for cloud.Queue.props.subscribers */
export interface QueueSubscriber {
  /** Function ID that should be called. */
  readonly functionId: FunctionId;
  /** Maximum number of messages that will be batched together to the subscriber. */
  readonly batchSize: number;
}

/** Schema for cloud.Bucket */
export interface BucketSchema extends BaseResourceSchema {
  readonly type: typeof BUCKET_TYPE;
  readonly props: {};
  readonly attrs: {
    /** The address of the bucket on the local file system. */
    readonly bucketAddr: string;
  };
}

/** Schema for ordinary constructs */
export interface ConstructSchema extends BaseResourceSchema {
  readonly type: "constructs.Construct";
}
