import { Construct } from "constructs";
import { Polycons } from "polycons";
import { Code, Resource } from "../core";

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

  /** @internal */
  public _toInflight(): Code {
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
   * @inflight
   */
  inc(amount?: number): Promise<number>;

  /**
   * Get the current value of the counter.
   * Using this API may introduce race conditions since the value can change between
   * the time it is read and the time it is used in your code.
   * @returns current value
   * @inflight
   */
  peek(): Promise<number>;
}

/**
 * List of inflight operations available for `Counter`.
 * @internal
 */
export enum CounterInflightMethods {
  /** `Counter.inc` */
  INC = "inc",
  /** `Counter.peek` */
  PEEK = "peek",
}
