import { Polycons } from "@monadahq/polycons";
import { Construct, IConstruct } from "constructs";
import { CaptureMetadata, Code, Inflight } from "../core";
import { Resource } from "./resource";

/**
 * Global identifier for `Function`.
 */
export const FUNCTION_ID = "wingsdk.cloud.Function";

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
}

/**
 * Represents a serverless function.
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
      FUNCTION_ID,
      scope,
      id,
      inflight,
      props
    ) as Function;
  }

  /**
   * @internal
   */
  public _capture(_captureScope: IConstruct, _metadata: CaptureMetadata): Code {
    throw new Error("Method not implemented.");
  }
}

/**
 * Inflight interface for `Function`.
 */
export interface IFunctionClient {
  invoke(payload: string): Promise<string>;
}

/**
 * List of inflight operations available for `Function`.
 */
export enum FunctionInflightMethods {
  INVOKE = "invoke",
}
