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
/** Represents a construct. */
export interface IConstruct extends IDependable {
}
/** Represents the building block of the construct graph.
All constructs besides the root construct must be created within the scope of
another construct. */
export class Construct implements IConstruct {
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
  
  Any preflight class can implement this instance method to add permissions,
  environment variables, or other capabilities to the inflight host when
  one or more of its methods are called. */
  readonly onLift: (host: IInflightHost, ops: (readonly (string)[])) => void;
}
/** Abstract interface for `Resource`. */
export interface IResource extends IConstruct, IHostedLiftable {
  /** A hook called by the Wing compiler once for each inflight host that needs to use this object inflight.
  The list of requested inflight methods
  needed by the inflight host are given by `ops`.
  
  Any preflight class can implement this instance method to add permissions,
  environment variables, or other capabilities to the inflight host when
  one or more of its methods are called. */
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
/** The request's method. */
export enum HttpMethod {
  GET = 0,
  PUT = 1,
  DELETE = 2,
  PATCH = 3,
  POST = 4,
  OPTIONS = 5,
  HEAD = 6,
  CONNECT = 7,
  TRACE = 8,
}
/** Represents a length of time. */
export class Duration implements ILiftable {
  /** Return the total number of days in this Duration.
  @returns the value of this `Duration` expressed in Days. */
  readonly days: number;
  /** Return the total number of hours in this Duration.
  @returns the value of this `Duration` expressed in Hours. */
  readonly hours: number;
  /** Return the total number of milliseconds in this Duration.
  @returns the value of this `Duration` expressed in Milliseconds. */
  readonly milliseconds: number;
  /** Return the total number of minutes in this Duration.
  @returns the value of this `Duration` expressed in Minutes. */
  readonly minutes: number;
  /** Return the total number of months in this Duration.
  @returns the value of this `Duration` expressed in Months. */
  readonly months: number;
  /** Return the total number of seconds in this Duration.
  @returns the value of this `Duration` expressed in Seconds. */
  readonly seconds: number;
  /** Return the total number of years in this Duration.
  @returns the value of this `Duration` expressed in Years. */
  readonly years: number;
}
/** Cors Options for `Bucket`. */
export interface BucketCorsOptions {
  /** The list of allowed headers.
  ["Content-Type"] */
  readonly allowedHeaders?: ((readonly (string)[])) | undefined;
  /** The list of allowed methods.
  [HttpMethod.GET, HttpMethod.POST] */
  readonly allowedMethods: (readonly (HttpMethod)[]);
  /** The allowed origin.
  "https://example.com" */
  readonly allowedOrigins: (readonly (string)[]);
  /** The list of exposed headers.
  ["Content-Type"] */
  readonly exposeHeaders?: ((readonly (string)[])) | undefined;
  /** How long the browser should cache preflight request results. */
  readonly maxAge?: (Duration) | undefined;
}
/** Code that runs at runtime and implements your application's behavior.
For example, handling API requests, processing queue messages, etc.
Inflight code can be executed on various compute platforms in the cloud,
such as function services (such as AWS Lambda or Azure Functions),
containers (such as ECS or Kubernetes), VMs or even physical servers.

This data represents the code together with the bindings to preflight data required to run. */
export interface IInflight extends IHostedLiftable {
  /** A hook called by the Wing compiler once for each inflight host that needs to use this object inflight.
  The list of requested inflight methods
  needed by the inflight host are given by `ops`.
  
  Any preflight class can implement this instance method to add permissions,
  environment variables, or other capabilities to the inflight host when
  one or more of its methods are called. */
  readonly onLift: (host: IInflightHost, ops: (readonly (string)[])) => void;
}
/** A resource with an inflight "handle" method that can be passed to the bucket events. */
export interface IBucketEventHandler extends IInflight {
  /** A hook called by the Wing compiler once for each inflight host that needs to use this object inflight.
  The list of requested inflight methods
  needed by the inflight host are given by `ops`.
  
  Any preflight class can implement this instance method to add permissions,
  environment variables, or other capabilities to the inflight host when
  one or more of its methods are called. */
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
  /** Add cors configuration to the bucket. */
  readonly addCorsConfiguration: (value: BucketCorsOptions) => void;
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