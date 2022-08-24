import { Polycons } from "@monadahq/polycons";
import { Construct } from "constructs";
import { Capture, Code, Inflight } from "../core";
import { IResource, Resource } from "./resource";

export interface IFunction extends IResource {}

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
   */
  readonly env?: { [key: string]: string };
}

/**
 * Properties for `Function`.
 *
 * This is the type used for concrete implementations of cloud.Function.
 */
export interface FunctionImplProps extends FunctionProps {
  /**
   * The code that will be executed by the function.
   */
  readonly inflight: Inflight;
}

// Implementation note: For improved ergonomics, the constructor of Function
// expects Inflight to be specified as a distinct argument, before the rest of
// its props.
//
// To ensure this works with polycons, actual implementations of Function should
// use `FunctionImplProps` which includes the Inflight as a prop.

/**
 * Functionality shared between all `Function` implementations.
 */
export abstract class FunctionBase extends Resource implements IFunction {
  public readonly stateful = false;
  constructor(scope: Construct, id: string, props: FunctionImplProps) {
    super(scope, id);
    if (!scope) {
      return;
    }

    props;
  }

  public abstract capture(consumer: any, capture: Capture): Code;
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
    const fullProps = { inflight, ...props };
    super(null as any, id, fullProps);
    return Polycons.newInstance(FUNCTION_ID, scope, id, fullProps) as Function;
  }

  public capture(_consumer: any, _capture: Capture): Code {
    throw new Error("Method not implemented.");
  }
}
