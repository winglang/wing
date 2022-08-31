// copied from @monadahq/wing-local
// TODO: move to another library?

/** Schema for wing.local.json */
export interface WingLocalSchema {
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
  /** IDs of resources that this resource is called, triggered, or captured by. */
  readonly callers?: string[];
  /** IDs of resources that this resource calls, triggers, or captures. */
  readonly callees?: string[];
}

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
    readonly targetId: string;
  };
}

/** Schema for cloud.Queue */
export interface QueueSchema extends BaseResourceSchema {
  readonly type: "cloud.Queue";
  readonly props: {
    /** How long a queue's consumers have to process a message. (TODO: format?) */
    readonly timeout: string;
  };
}

/** Schema for cloud.Bucket */
export interface BucketSchema extends BaseResourceSchema {
  readonly type: "cloud.Bucket";
  // readonly props: {};
}

/** Schema for ordinary constructs */
export interface ConstructSchema extends BaseResourceSchema {
  readonly type: "constructs.Construct";
  // readonly props: {};
  /** The resource's children indexed by their IDs. */
  readonly children?: { [key: string]: ResourceSchema };
}

export type ResourceSchema =
  | FunctionSchema
  | EndpointSchema
  | QueueSchema
  | BucketSchema
  | ConstructSchema;
