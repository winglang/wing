import { Construct } from "constructs";
import { Polycons } from "polycons";
import { CaptureMetadata, Code, Inflight } from "../core";
import { Resource } from "../core/resource";

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
 * Represents a serverless function.
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

  /**
   * @internal
   */
  public _bind(_captureScope: Resource, _metadata: CaptureMetadata): Code {
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
