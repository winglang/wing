import { Construct } from "constructs";
import { fqnForType } from "../constants";
import { INFLIGHT_SYMBOL } from "../core/types";
import { Node, Resource } from "../std";

/**
 * Global identifier for `Counter`.
 */
export const COUNTER_FQN = fqnForType("cloud.Counter");

/**
 * Options for `Counter`.
 */
export interface CounterProps {
  /**
   * The initial value of the counter.
   * @default 0
   */
  readonly initial?: number;
}

/**
 * A distributed atomic counter.
 * @inflight `@winglang/sdk.cloud.ICounterClient`
 * @abstract
 */
export class Counter extends Resource {
  /** @internal */
  public [INFLIGHT_SYMBOL]?: ICounterClient;

  /**
   * The initial value of the counter.
   */
  public readonly initial!: number;

  constructor(scope: Construct, id: string, props: CounterProps = {}) {
    if (new.target === Counter) {
      return Resource._newFromFactory(COUNTER_FQN, scope, id, props);
    }

    super(scope, id);

    Node.of(this).title = "Counter";
    Node.of(this).description = "A distributed atomic counter";

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
   * @param key specify the key to be incremented.
   * @returns the previous value of the counter.
   * @inflight
   */
  inc(amount?: number, key?: string): Promise<number>;

  /**
   * Decrement the counter, returning the previous value.
   * @param amount amount to decrement (default is 1).
   * @param key specify the key to be decremented.
   * @returns the previous value of the counter.
   * @inflight
   */
  dec(amount?: number, key?: string): Promise<number>;

  /**
   * Get the current value of the counter.
   * Using this API may introduce race conditions since the value can change between
   * the time it is read and the time it is used in your code.
   * @param key specify the key to be retrieved.
   * @returns current value
   * @inflight
   */
  peek(key?: string): Promise<number>;

  /**
   * Set a counter to a given value.
   * @param value new value
   * @param key specify the key to be set.
   * @inflight
   */
  set(value: number, key?: string): Promise<void>;
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
