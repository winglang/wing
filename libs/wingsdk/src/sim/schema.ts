/** Schema for simulator.json */
export interface WingSimulatorSchema {
  /** Schema version. */
  readonly version: string;
  /** The resource at the root of the tree. */
  readonly root: ConstructSchema;
}

/** Schema for individual resources */
export interface BaseResourceSchema {
  /** A unique id for the resource. */
  readonly id: string;
  /** The full path of the resource in the construct tree. */
  readonly path: string;
  /** The type of the resource. */
  readonly type: string;
  /** The resource-specific properties needed to create this resource. */
  readonly props?: { [key: string]: any };
  /** The resource-specific attributes that are set after the resource is created. */
  readonly attributes?: { [key: string]: any };
  /** IDs of resources that this resource is called, triggered, or captured by. */
  readonly callers?: string[];
  /** IDs of resources that this resource calls, triggers, or captures. */
  readonly callees?: string[];
}

export type FunctionId = string;

/** Schema for cloud.Function */
export interface FunctionSchema extends BaseResourceSchema {
  readonly type: "cloud.Function";
  readonly props: {
    /** The path to a file containing source code to be run when invoked. */
    readonly sourceCodeFile: string;
    /** The language of the function's source code. */
    readonly sourceCodeLanguage: string;
    /** A map of environment variables to run the function with. */
    readonly environmentVariables: Record<string, string>;
  };
  readonly attributes?: {};
}

/** Schema for cloud.Endpoint */
export interface EndpointSchema extends BaseResourceSchema {
  readonly type: "cloud.Endpoint";
  readonly props: {
    /** The HTTP request method, such as "GET", "POST", etc. */
    readonly requestMethod: string;
    /** The HTTP request path, such as "/users". */
    readonly requestPath: string;
    /** ID of the resource that should handle any requests sent to the endpoint. */
    readonly targetId: FunctionId;
  };
}

/** Schema for cloud.Queue */
export interface QueueSchema extends BaseResourceSchema {
  readonly type: "cloud.Queue";
  readonly props: {
    /** How long a queue's consumers have to process a message, in milliseconds */
    readonly timeout: number;
    /** Function that should process queue messages. */
    readonly subscribers: QueueSubscriber[];
  };
}

/** Schema for cloud.Queue.props.subscribers */
export interface QueueSubscriber {
  /** Function ID that should be called. */
  readonly subscriberFunctionId: FunctionId;
  /** Maximum number of messages that will be batched together to the subscriber. */
  readonly batchSize: number;
}

/** Schema for cloud.Bucket */
export interface BucketSchema extends BaseResourceSchema {
  readonly type: "cloud.Bucket";
  readonly props: {};
  readonly attributes?: {
    /** The address of the bucket on the local file system. */
    readonly bucketAddr: string;
  };
}

/** Schema for ordinary constructs */
export interface ConstructSchema extends BaseResourceSchema {
  readonly type: "constructs.Construct";
  readonly props: {};
  /** The resource's children indexed by their IDs. */
  readonly children?: { [key: string]: ResourceSchema };
}

export type ResourceSchema =
  | FunctionSchema
  | EndpointSchema
  | QueueSchema
  | BucketSchema
  | ConstructSchema;
