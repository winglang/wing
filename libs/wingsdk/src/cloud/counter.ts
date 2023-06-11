import { Construct } from "constructs";
import { fqnForType } from "../constants";
import { App } from "../core";
import { Resource } from "../std";

/**
 * Global identifier for `Counter`.
 */
export const COUNTER_FQN = fqnForType("cloud.Counter");

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
 * Represents a distributed atomic counter.
 * @inflight `@winglang/sdk.cloud.ICounterClient`
 */
export abstract class Counter extends Resource {
  /**
   * Create a new counter.
   * @internal
   */
  public static _newCounter(
    scope: Construct,
    id: string,
    props: CounterProps = {}
  ): Counter {
    return App.of(scope).newAbstract(COUNTER_FQN, scope, id, props);
  }

  /**
   * The initial value of the counter.
   */
  public readonly initial: number;

  constructor(scope: Construct, id: string, props: CounterProps = {}) {
    super(scope, id);

    this.display.title = "Counter";
    this.display.description = "A distributed atomic counter";

    this._addInflightOps(
      CounterInflightMethods.INC,
      CounterInflightMethods.DEC,
      CounterInflightMethods.PEEK,
      CounterInflightMethods.SET
    );

    this.initial = props.initial ?? 0;
  }
}

/**
 * Inflight interface for `Counter`.
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
   * Decrement the counter, returning the previous value.
   * @param amount amount to decrement (default is 1).
   * @returns the previous value of the counter.
   * @inflight
   */
  dec(amount?: number): Promise<number>;

  /**
   * Get the current value of the counter.
   * Using this API may introduce race conditions since the value can change between
   * the time it is read and the time it is used in your code.
   * @returns current value
   * @inflight
   */
  peek(): Promise<number>;

  /**
   * Set a counter to a given value.
   * @param value new value
   * @inflight
   */
  set(value: number): Promise<void>;
}

/**
 * List of inflight operations available for `Counter`.
 * @internal
 */
export enum CounterInflightMethods {
  /** `Counter.inc` */
  INC = "inc",
  /** `Counter.dec` */
  DEC = "dec",
  /** `Counter.peek` */
  PEEK = "peek",
  /** `Counter.set` */
  SET = "set",
}
