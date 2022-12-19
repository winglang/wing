import { Construct } from "constructs";
import { Polycons } from "polycons";
import { Code, Inflight, IResource, Resource } from "../core";

/**
 * Global identifier for `Function`.
 */
export const FUNCTION_TYPE = "wingsdk.cloud.Function";

/**
 * Properties for `Function`.
 *
 * This is the type users see when constructing a cloud.Function instance.
 */
export interface FunctionProps {
  /**
   * Environment variables to pass to the function.
   * @default - No environment variables.
   */
  readonly env?: { [key: string]: string };
}

/**
 * Functionality shared between all `Function` implementations.
 */
export abstract class FunctionBase extends Resource {
  public readonly stateful = false;
  constructor(
    scope: Construct,
    id: string,
    inflight: Inflight,
    props: FunctionProps
  ) {
    super(scope, id);
    if (!scope) {
      return;
    }

    inflight;
    props;
  }

  /**
   * Add an environment variable to the function.
   */
  public abstract addEnvironment(key: string, value: string): void;
}

/**
 * Represents a function.
 *
 * @inflight `@winglang/wingsdk.cloud.IFunctionClient`
 */
export class Function extends FunctionBase {
  constructor(
    scope: Construct,
    id: string,
    inflight: Inflight,
    props: FunctionProps = {}
  ) {
    super(null as any, id, inflight, props);
    return Polycons.newInstance(
      FUNCTION_TYPE,
      scope,
      id,
      inflight,
      props
    ) as Function;
  }

  public addEnvironment(_key: string, _value: string): void {
    throw new Error("Method not implemented.");
  }

  /** @internal */
  public _toInflight(): Code {
    throw new Error("Method not implemented.");
  }
}

/**
 * Inflight interface for `Function`.
 */
export interface IFunctionClient {
  /**
   * Invoke the function asynchronously with a given payload.
   * @inflight
   */
  invoke(payload: string): Promise<string>;
}

/**
 * Represents a resource with an inflight "handle" method that can be used to
 * create a `cloud.Function`.
 *
 * @inflight `wingsdk.cloud.IFunctionHandlerClient`
 */
export interface IFunctionHandler extends IResource {}

/**
 * Inflight client for `IFunctionHandler`.
 */
export interface IFunctionHandlerClient {
  /**
   * Entrypoint function that will be called when the cloud function is invoked.
   * @inflight
   */
  handle(event: string): Promise<void>;
}

/**
 * List of inflight operations available for `Function`.
 */
export enum FunctionInflightMethods {
  /** `Function.invoke` */
  INVOKE = "invoke",
}
