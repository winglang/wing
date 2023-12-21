import { createHash } from "crypto";
import { nanoid, customAlphabet } from "nanoid";
import { ulid } from "ulid";
import { v4 } from "uuid";
import { InflightClient } from "../core";
import { Duration, IInflight } from "../std";

/**
 * Properties for `util.waitUntil`.
 */
export interface WaitUntilProps {
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
 * A predicate with an inflight "handle" method that can be passed to
 * `util.busyWait`.
 * @inflight `@winglang/sdk.util.IPredicateHandlerClient`
 */
export interface IPredicateHandler extends IInflight {}

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
 * Options to generating a unique ID
 */
export interface NanoidOptions {
  /**
   * Size of ID
   * @default 21
   */
  readonly size?: number;
  /**
   * Characters that make up the alphabet to generate the ID, limited to 256 characters or fewer.
   */
  readonly alphabet?: string;
}

/**
 * Options to generate universally unique lexicographically sortable identifiers.
 */
export interface UlidOptions {
  /**
   * You can also input a seed time which will consistently give you the same string for the time component. This is useful for migrating to ulid.
   * @default Date.now()
   */
  readonly seed?: number;
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
   * Converts a string from UTF-8 to base64.
   * @param stringToEncode The name of the UTF-8 string to encode.
   * @param url If `true`, a URL-safe base64 string is returned.
   * @returns The base64 string.
   */
  public static base64Encode(stringToEncode: string, url?: boolean): string {
    return Buffer.from(stringToEncode).toString(url ? "base64url" : "base64");
  }

  /**
   * Converts a string from base64 to UTF-8.
   * @param stringToDecode base64 string to decode.
   * @param url If `true`, the source is expected to be a URL-safe base64 string.
   * @returns The UTF-8 string.
   */
  public static base64Decode(stringToDecode: string, url?: boolean): string {
    return Buffer.from(stringToDecode, url ? "base64url" : "base64").toString(
      "utf8"
    );
  }

  /**
   * Suspends execution for a given duration.
   * @param delay The time to suspend execution.
   * @inflight
   */
  public static async sleep(delay: Duration): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, delay.seconds * 1000));
  }

  /**
   * Run a predicate repeatedly, waiting until it returns true or until the timeout elapses.
   * @param predicate The function that will be evaluated.
   * @param props Timeout and interval values, default to one 1m timeout and 0.1sec interval.
   * @throws Will throw if the given predicate throws.
   * @returns True if predicate is truthful within timeout.
   * @inflight
   */
  public static async waitUntil(
    predicate: IPredicateHandler,
    props: WaitUntilProps = {}
  ): Promise<boolean> {
    const timeout = props.timeout ?? Duration.fromMinutes(1);
    const interval = props.interval ?? Duration.fromSeconds(0.1);
    const f = predicate as any;
    let elapsed = 0;
    while (elapsed < timeout.seconds) {
      if (await f()) {
        return true;
      }
      // not taking account the real elapsed time just the sum of intervals till timeout
      // it might be that predicate takes a long time and it is not considered inside timeout
      elapsed += interval.seconds;
      await this.sleep(interval);
    }
    return false;
  }

  /**
   * Computes the SHA256 hash of the given data.
   * @param data - The string to be hashed.
   */
  public static sha256(data: string): string {
    return createHash("sha256").update(data).digest("hex");
  }

  /**
   * Generates a version 4 UUID.
   */
  public static uuidv4(): string {
    return v4();
  }

  /**
   * Generates a unique ID using the nanoid library.
   # @link https://github.com/ai/nanoid
   * @param options - Optional options object for generating the ID.
   */
  public static nanoid(options?: NanoidOptions): string {
    const size = options?.size ?? 21;
    const nano = options?.alphabet
      ? customAlphabet(options.alphabet, size)
      : undefined;
    return nano ? nano(size) : nanoid(size);
  }

  /**
   * Generates universally unique lexicographically sortable identifier.
   # @link https://github.com/ulid/javascript
   * @param options - Optional options object for generating the ID.
   */
  public static ulid(options?: UlidOptions): string {
    const seed = options?.seed;
    return ulid(seed);
  }

  /**
   * @internal
   */
  public static _toInflightType(): string {
    return InflightClient.forType(__filename, this.name);
  }
  private constructor() {}
}
