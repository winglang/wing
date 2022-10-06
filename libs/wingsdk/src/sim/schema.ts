import * as cloud from "../cloud";

/** Schema for simulator.json */
export interface WingSimulatorSchema {
  /** The resource at the root of the tree. */
  readonly root: ResourceSchema;
  /**
   * The order resources in which resources should be initialized based on
   * dependency relationships.
   */
  readonly initOrder: string[];
}

/** Schema for individual resources */
export interface BaseResourceSchema {
  /** The full path of the resource in the construct tree. */
  readonly path?: string;
  /** The type of the resource. */
  readonly type: string;
  /** The resource-specific properties needed to create this resource. */
  readonly props?: { [key: string]: any };
  /** The resource-specific attributes that are set after the resource is created. */
  readonly attrs?: { [key: string]: any };
  /** IDs of resources that this resource is called, triggered, or captured by. */
  readonly callers?: string[];
  /** IDs of resources that this resource calls, triggers, or captures. */
  readonly callees?: string[];
  /** The resource's children indexed by their IDs. */
  readonly children?: { [key: string]: ResourceSchema };
}

export type FunctionId = string;

/** Schema for cloud.Function */
export interface FunctionSchema extends BaseResourceSchema {
  readonly type: typeof cloud.Function.TYPE;
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

/** Schema for cloud.Queue.props.subscribers */
export interface QueueSubscriber {
  /** Function ID that should be called. */
  readonly functionId: FunctionId;
  /** Maximum number of messages that will be batched together to the subscriber. */
  readonly batchSize: number;
}

/** Schema for cloud.Queue */
export interface QueueSchema extends BaseResourceSchema {
  readonly type: typeof cloud.Queue.TYPE;
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
  readonly type: typeof cloud.Bucket.TYPE;
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

export type ResourceSchema =
  | FunctionSchema
  | QueueSchema
  | BucketSchema
  | ConstructSchema;
