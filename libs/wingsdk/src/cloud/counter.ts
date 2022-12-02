import { Construct } from "constructs";
import { Polycons } from "polycons";
import { CaptureMetadata, Code, Resource } from "../core";

/**
 * Global identifier for `Counter`.
 */
export const COUNTER_TYPE = "wingsdk.cloud.Counter";

/**
 * Properties for `Counter`.
 */
export interface CounterProps {
  /**
   * The initial value of the counter.
   * @default 0
   */
  readonly initial?: number;
}

/**
 * Functionality shared between all `Counter` implementations.
 */
export abstract class CounterBase extends Resource {
  public readonly stateful = true;

  /**
   * The initial value of the counter.
   */
  public readonly initial: number;

  constructor(scope: Construct, id: string, props: CounterProps = {}) {
    super(scope, id);
    if (!scope) {
      this.initial = -1; // not used
      return;
    }

    this.initial = props.initial ?? 0;
  }
}

/**
 * Represents a distributed atomic counter.
 *
 * @inflight `@winglang/wingsdk.cloud.ICounterClient`
 */
export class Counter extends CounterBase {
  constructor(scope: Construct, id: string, props: CounterProps = {}) {
    super(null as any, id, props);
    return Polycons.newInstance(COUNTER_TYPE, scope, id, props) as Counter;
  }

  /**
   * @internal
   */
  public _bind(_captureScope: Resource, _metadata: CaptureMetadata): Code {
    throw new Error("Method not implemented.");
  }
}

/**
 * Inflight interface for `Queue`.
 */
export interface ICounterClient {
  /**
   * Increments the counter atomically by a certain amount and returns the previous value.
   * @param amount amount to increment (default is 1).
   * @returns the previous value of the counter.
   */
  inc(amount?: number): Promise<number>;
}

/**
 * List of inflight operations available for `Counter`.
 */
export enum CounterInflightMethods {
  /** `Counter.inc` */
  INC = "inc",
}
