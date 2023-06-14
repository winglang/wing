import { Code, InflightClient } from "../core";
import { Duration, IResource } from "../std";

/**
 * Properties for `util.wait`.
 */
export interface WaitProps {
  /**
   * The timeout for keep trying predicate
   * @default 1m
   */
  readonly timeout?: Duration;
  /**
   * Interval between predicate retries 
   * @default 0.1s
   */
  readonly interval?: Duration;
}


/**
 * Represents a predicate with an inflight "handle" method that can be passed to
 * `util.busyWait`.
 * @inflight `@winglang/sdk.util.IPredicateHandlerClient`
 */
export interface IPredicateHandler extends IResource {}

/**
 * Inflight client for `IPredicateHandler`.
 */
export interface IPredicateHandlerClient {
  /**
   * The Predicate function that is called 
   * @inflight
   */
  handle(): Promise<boolean>;
}

/**
 * Utility functions.
 */
export class Util {
  /**
   * Returns the value of an environment variable. Throws if not found or empty.
   * @param name The name of the environment variable.
   */
  public static env(name: string): string {
    const value = Util.tryEnv(name);
    if (!value) {
      throw new Error(`Environment variable ${name} not found.`);
    }
    return value;
  }

  /**
   * Returns the value of an environment variable. Returns `nil` if not found or empty.
   * @param name The name of the environment variable.
   * @returns The value of the environment variable or `nil`.
   */
  public static tryEnv(name: string): string | undefined {
    return process.env[name];
  }

  /**
   * Suspends execution for a given duration.
   * @param delay The time to suspend execution
   * @inflight
   */
  public static async sleep(delay: Duration): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, delay.seconds * 1000));
  }

  /**
   * Waits until predicate is true or return false
   * @param predicate
   * @inflight
   */
  public static async wait(predicate: IPredicateHandler, props: WaitProps = {}): Promise<boolean> {
    const timeout = props.timeout ?? Duration.fromMinutes(1);
    const interval = props.interval ?? Duration.fromSeconds(0.1);
    const f = (predicate as any);
    let elapsed = 0;
    while (elapsed < timeout.seconds ) {
      if (await f()) {
          return true;
      }
      elapsed += interval.seconds;
      await this.sleep(interval);
    }
    return false;
  }

  /**
   * @internal
   */
  public static _toInflightType(): Code {
    return InflightClient.forType(__filename, this.name);
  }
}
