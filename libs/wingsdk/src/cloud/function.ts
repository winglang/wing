import { Construct } from "constructs";
import { Polycons } from "polycons";
import { Code, IResource, OperationPolicy, Resource } from "../core";

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
 * Represents a resource with an inflight "handle" method that can be used to
 * create a `cloud.Function`.
 */
export interface IFunctionHandler extends IResource {
  /** contains inflight "handle" method */
}

/**
 * Functionality shared between all `Function` implementations.
 */
export abstract class FunctionBase extends Resource {
  public readonly stateful = false;
  constructor(
    scope: Construct,
    id: string,
    inflight: IFunctionHandler,
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
  /** @internal */
  public readonly _policies = {};

  constructor(
    scope: Construct,
    id: string,
    inflight: IFunctionHandler,
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

  /**
   * @internal
   */
  public _bind(_host: Resource, _policy: OperationPolicy): Code {
    throw new Error("Method not implemented.");
  }

  public addEnvironment(_key: string, _value: string): void {
    throw new Error("Method not implemented.");
  }
}

/**
 * Inflight interface for `Function`.
 */
export interface IFunctionClient {
  /**
   * Invoke the function asynchronously with a given payload.
   */
  invoke(payload: string): Promise<string>;
}

/**
 * List of inflight operations available for `Function`.
 */
export enum FunctionInflightMethods {
  /** `Function.invoke` */
  INVOKE = "invoke",
}
