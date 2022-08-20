import { Polycons } from "@monadahq/polycons";
import { Construct } from "constructs";
import { Capture, Code, Process } from "../core";
import { IResource, Resource } from "./resource";

export interface IFunction extends IResource {}

/**
 * Global identifier for `Function`.
 */
export const FUNCTION_ID = "wingsdk.cloud.Function";

/**
 * Functionality shared between all `Function` implementations.
 */
export abstract class FunctionBase extends Resource implements IFunction {
  public readonly stateful = false;
  constructor(scope: Construct, id: string, process: Process) {
    super(scope, id);
    if (!scope) {
      return;
    }

    process;
  }

  public abstract capture(consumer: any, capture: Capture): Code;
}

/**
 * Represents a serverless function.
 */
export class Function extends FunctionBase {
  constructor(scope: Construct, id: string, process: Process) {
    super(null as any, id, process);
    return Polycons.newInstance(FUNCTION_ID, scope, id, process) as Function;
  }

  public capture(_consumer: any, _capture: Capture): Code {
    throw new Error("Method not implemented.");
  }
}
