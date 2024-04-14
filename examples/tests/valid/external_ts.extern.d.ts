export default interface extern {
  getData: () => Promise<string>,
  getGreeting: (name: string) => string,
  getUuid: () => Promise<string>,
  preflightBucket: (bucket: Bucket, id: string) => void,
  print: (msg: string) => Promise<void>,
  regexInflight: (pattern: string, text: string) => Promise<boolean>,
}
/** Trait marker for classes that can be depended upon.
The presence of this interface indicates that an object has
an `IDependable` implementation.

This interface can be used to take an (ordering) dependency on a set of
constructs. An ordering dependency implies that the resources represented by
those constructs are deployed before the resources depending ON them are
deployed. */
export interface IDependable {
}
/** Options for `construct.addMetadata()`. */
export interface MetadataOptions {
  /** Include stack trace with metadata entry. */
  readonly stackTrace?: (boolean) | undefined;
  /** A JavaScript function to begin tracing from.
  This option is ignored unless `stackTrace` is `true`. */
  readonly traceFromFunction?: (any) | undefined;
}
/** Implement this interface in order for the construct to be able to validate itself. */
export interface IValidation {
  /** Validate the current construct.
  This method can be implemented by derived constructs in order to perform
  validation logic. It is called on all constructs before synthesis.
  @returns An array of validation error messages, or an empty array if there the construct is valid. */
  readonly validate: () => (readonly (string)[]);
}
/** In what order to return constructs. */
export enum ConstructOrder {
  PREORDER = 0,
  POSTORDER = 1,
}
/** An entry in the construct metadata table. */
export interface MetadataEntry {
  /** The data. */
  readonly data?: any;
  /** Stack trace at the point of adding the metadata.
  Only available if `addMetadata()` is called with `stackTrace: true`. */
  readonly trace?: ((readonly (string)[])) | undefined;
  /** The metadata entry type. */
  readonly type: string;
}
/** Represents the construct node in the scope tree. */
export class Node {
  /** Add an ordering dependency on another construct.
  An `IDependable` */
  readonly addDependency: (deps?: ((readonly (IDependable)[])) | undefined) => void;
  /** Adds a metadata entry to this construct.
  Entries are arbitrary values and will also include a stack trace to allow tracing back to
  the code location for when the entry was added. It can be used, for example, to include source
  mapping in CloudFormation templates to improve diagnostics. */
  readonly addMetadata: (type: string, data?: any, options?: (MetadataOptions) | undefined) => void;
  /** Adds a validation to this construct.
  When `node.validate()` is called, the `validate()` method will be called on
  all validations and all errors will be returned. */
  readonly addValidation: (validation: IValidation) => void;
  /** Returns an opaque tree-unique address for this construct.
  Addresses are 42 characters hexadecimal strings. They begin with "c8"
  followed by 40 lowercase hexadecimal characters (0-9a-f).
  
  Addresses are calculated using a SHA-1 of the components of the construct
  path.
  
  To enable refactorings of construct trees, constructs with the ID `Default`
  will be excluded from the calculation. In those cases constructs in the
  same tree may have the same addreess.
  c83a2846e506bcc5f10682b564084bca2d275709ee */
  readonly addr: string;
  /** All direct children of this construct. */
  readonly children: (readonly (IConstruct)[]);
  /** Returns the child construct that has the id `Default` or `Resource"`.
  This is usually the construct that provides the bulk of the underlying functionality.
  Useful for modifications of the underlying construct that are not available at the higher levels.
  Override the defaultChild property.
  
  This should only be used in the cases where the correct
  default child is not named 'Resource' or 'Default' as it
  should be.
  
  If you set this to undefined, the default behavior of finding
  the child named 'Resource' or 'Default' will be used.
  @returns a construct or undefined if there is no default child */
  defaultChild?: (IConstruct) | undefined;
  /** Return all dependencies registered on this node (non-recursive). */
  readonly dependencies: (readonly (IConstruct)[]);
  /** Return this construct and all of its children in the given order. */
  readonly findAll: (order?: (ConstructOrder) | undefined) => (readonly (IConstruct)[]);
  /** Return a direct child by id.
  Throws an error if the child is not found.
  @returns Child with the given id. */
  readonly findChild: (id: string) => IConstruct;
  /** Retrieves the all context of a node from tree context.
  Context is usually initialized at the root, but can be overridden at any point in the tree.
  @returns The context object or an empty object if there is discovered context */
  readonly getAllContext: (defaults?: (Readonly<any>) | undefined) => any;
  /** Retrieves a value from tree context if present. Otherwise, would throw an error.
  Context is usually initialized at the root, but can be overridden at any point in the tree.
  @returns The context value or throws error if there is no context value for this key */
  readonly getContext: (key: string) => any;
  /** The id of this construct within the current scope.
  This is a scope-unique id. To obtain an app-unique id for this construct, use `addr`. */
  readonly id: string;
  /** Locks this construct from allowing more children to be added.
  After this
  call, no more children can be added to this construct or to any children. */
  readonly lock: () => void;
  /** Returns true if this construct or the scopes in which it is defined are locked. */
  readonly locked: boolean;
  /** An immutable array of metadata objects associated with this construct.
  This can be used, for example, to implement support for deprecation notices, source mapping, etc. */
  readonly metadata: (readonly (MetadataEntry)[]);
  /** The full, absolute path of this construct in the tree.
  Components are separated by '/'. */
  readonly path: string;
  /** Returns the root of the construct tree.
  @returns The root of the construct tree. */
  readonly root: IConstruct;
  /** Returns the scope in which this construct is defined.
  The value is `undefined` at the root of the construct scope tree. */
  readonly scope?: (IConstruct) | undefined;
  /** All parent scopes of this construct.
  @returns a list of parent scopes. The last element in the list will always
  be the current construct and the first element will be the root of the
  tree. */
  readonly scopes: (readonly (IConstruct)[]);
  /** This can be used to set contextual values.
  Context must be set before any children are added, since children may consult context info during construction.
  If the key already exists, it will be overridden. */
  readonly setContext: (key: string, value?: any) => void;
  /** Return a direct child by id, or undefined.
  @returns the child if found, or undefined */
  readonly tryFindChild: (id: string) => (IConstruct) | undefined;
  /** Retrieves a value from tree context.
  Context is usually initialized at the root, but can be overridden at any point in the tree.
  @returns The context value or `undefined` if there is no context value for this key. */
  readonly tryGetContext: (key: string) => any;
  /** Remove the child with the given name, if present.
  @returns Whether a child with the given name was deleted. */
  readonly tryRemoveChild: (childName: string) => boolean;
  /** Validates this construct.
  Invokes the `validate()` method on all validations added through
  `addValidation()`.
  @returns an array of validation error messages associated with this
  construct. */
  readonly validate: () => (readonly (string)[]);
}
/** Represents a construct. */
export interface IConstruct extends IDependable {
  /** The tree node. */
  readonly node: Node;
}
/** Represents the building block of the construct graph.
All constructs besides the root construct must be created within the scope of
another construct. */
export class Construct implements IConstruct {
  /** The tree node. */
  readonly node: Node;
  /** Returns a string representation of this construct. */
  readonly toString: () => string;
}
/** Data that can be lifted into inflight. */
export interface ILiftable {
}
/** A resource that can run inflight code. */
export interface IInflightHost extends IResource {
  /** Adds an environment variable to the host. */
  readonly addEnvironment: (name: string, value: string) => void;
}
/** A liftable object that needs to be registered on the host as part of the lifting process.
This is generally used so the host can set up permissions
to access the lifted object inflight. */
export interface IHostedLiftable extends ILiftable {
  /** A hook called by the Wing compiler once for each inflight host that needs to use this object inflight.
  The list of requested inflight methods
  needed by the inflight host are given by `ops`.
  
  This method is commonly used for adding permissions, environment variables, or
  other capabilities to the inflight host. */
  readonly onLift: (host: IInflightHost, ops: (readonly (string)[])) => void;
}
/** Abstract interface for `Resource`. */
export interface IResource extends IConstruct, IHostedLiftable {
  readonly node: Node;
  readonly onLift: (host: IInflightHost, ops: (readonly (string)[])) => void;
}
/** Shared behavior between all Wing SDK resources. */
export class Resource extends Construct implements IResource {
  /** A hook called by the Wing compiler once for each inflight host that needs to use this resource inflight.
  You can override this method to perform additional logic like granting
  IAM permissions to the host based on what methods are being called. But
  you must call `super.bind(host, ops)` to ensure that the resource is
  actually bound. */
  readonly onLift: (host: IInflightHost, ops: (readonly (string)[])) => void;
}
/** Code that runs at runtime and implements your application's behavior.
For example, handling API requests, processing queue messages, etc.
Inflight code can be executed on various compute platforms in the cloud,
such as function services (such as AWS Lambda or Azure Functions),
containers (such as ECS or Kubernetes), VMs or even physical servers.

This data represents the code together with the bindings to preflight data required to run. */
export interface IInflight extends IHostedLiftable {
  readonly onLift: (host: IInflightHost, ops: (readonly (string)[])) => void;
}
/** A resource with an inflight "handle" method that can be passed to the bucket events. */
export interface IBucketEventHandler extends IInflight {
  readonly onLift: (host: IInflightHost, ops: (readonly (string)[])) => void;
}
/** `onCreate` event options. */
export interface BucketOnCreateOptions {
}
/** `onDelete` event options. */
export interface BucketOnDeleteOptions {
}
/** `onEvent` options. */
export interface BucketOnEventOptions {
}
/** `onUpdate` event options. */
export interface BucketOnUpdateOptions {
}
/** A cloud object store. */
export class Bucket extends Resource {
  /** Add a file to the bucket from system folder. */
  readonly addFile: (key: string, path: string, encoding?: (string) | undefined) => void;
  /** Add a file to the bucket that is uploaded when the app is deployed.
  TODO: In the future this will support uploading any `Blob` type or
  referencing a file from the local filesystem. */
  readonly addObject: (key: string, body: string) => void;
  /** Run an inflight whenever a file is uploaded to the bucket. */
  readonly onCreate: (fn: IBucketEventHandler, opts?: (BucketOnCreateOptions) | undefined) => void;
  /** Run an inflight whenever a file is deleted from the bucket. */
  readonly onDelete: (fn: IBucketEventHandler, opts?: (BucketOnDeleteOptions) | undefined) => void;
  /** Run an inflight whenever a file is uploaded, modified, or deleted from the bucket. */
  readonly onEvent: (fn: IBucketEventHandler, opts?: (BucketOnEventOptions) | undefined) => void;
  /** Run an inflight whenever a file is updated in the bucket. */
  readonly onUpdate: (fn: IBucketEventHandler, opts?: (BucketOnUpdateOptions) | undefined) => void;
}