/// This file is generated by Wing.
export interface Lifts {
  "example": Example$Inflight
  "numbers": (readonly (number | number | number)[])
};
type HandlerFunction<T> = T extends { handle: (...args: any[]) => any } ? T['handle'] : T;
type ExpectedFunction = HandlerFunction<IFunctionHandler$Inflight>;
export type Handler = (ctx: Lifts, ...args: Parameters<ExpectedFunction>) => ReturnType<ExpectedFunction>;
export function inflight(handler: Handler): Handler { return handler; }
export default inflight;
/** Trait marker for classes that can be depended upon.
The presence of this interface indicates that an object has
an `IDependable` implementation.

This interface can be used to take an (ordering) dependency on a set of
constructs. An ordering dependency implies that the resources represented by
those constructs are deployed before the resources depending ON them are
deployed. */
export interface IDependable$Inflight {
}
/** Represents a construct. */
export interface IConstruct$Inflight extends IDependable$Inflight {
}
/** Represents the building block of the construct graph.
All constructs besides the root construct must be created within the scope of
another construct. */
export class Construct$Inflight implements IConstruct$Inflight {
}
/** Data that can be lifted into inflight. */
export interface ILiftable$Inflight {
}
/** A liftable object that needs to be registered on the host as part of the lifting process.
This is generally used so the host can set up permissions
to access the lifted object inflight. */
export interface IHostedLiftable$Inflight extends ILiftable$Inflight {
}
/** Abstract interface for `Resource`. */
export interface IResource$Inflight extends IConstruct$Inflight, IHostedLiftable$Inflight {
}
/** Shared behavior between all Wing SDK resources. */
export class Resource$Inflight extends Construct$Inflight implements IResource$Inflight {
}
export class Example$Inflight extends Resource$Inflight {
  readonly $inflight_init: () => Promise<Example$Inflight>;
  readonly done: () => Promise<void>;
  readonly getMessage: () => Promise<string>;
}
/** Code that runs at runtime and implements your application's behavior.
For example, handling API requests, processing queue messages, etc.
Inflight code can be executed on various compute platforms in the cloud,
such as function services (such as AWS Lambda or Azure Functions),
containers (such as ECS or Kubernetes), VMs or even physical servers.

This data represents the code together with the bindings to preflight data required to run. */
export interface IInflight$Inflight extends IHostedLiftable$Inflight {
}
/** A resource with an inflight "handle" method that can be used to create a `cloud.Function`. */
export interface IFunctionHandler$Inflight extends IInflight$Inflight {
  /** Entrypoint function that will be called when the cloud function is invoked. */
  readonly handle: (event?: (string) | undefined) => Promise<string | void>;
}