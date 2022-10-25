import { Polycons } from "@monadahq/polycons";
import { Construct, IConstruct } from "constructs";
import { CaptureMetadata, Code, ICapturable } from "../core";

export const LOGGER_TYPE = "wingsdk.cloud.Logger";
export const LOGGER_SYMBOL = Symbol.for(LOGGER_TYPE);

/**
 * Functionality shared between all `Logger` implementations.
 */
export abstract class LoggerBase extends Construct implements ICapturable {
  /**
   * Logs a message.
   * @param message The message to log.
   */
  public print(message: string): void {
    // default implementation, can be overridden
    console.log(message);
  }

  /** @internal */
  public abstract _capture(
    captureScope: IConstruct,
    metadata: CaptureMetadata
  ): Code;
}

/**
 * A cloud logging facility.
 *
 * @inflight `@monadahq/wingsdk.cloud.ILoggerClient`
 */
export class Logger extends LoggerBase {
  /**
   * Returns the logger registered to the given scope, throwing an error if
   * there is none.
   */
  public static of(scope: IConstruct): Logger {
    const logger = (scope as any)[LOGGER_SYMBOL] as Logger;
    if (logger) {
      return logger;
    }

    const parent = scope.node.scope;
    if (!parent) {
      throw new Error("No logger found in scope");
    }

    return Logger.of(parent);
  }

  /**
   * Create a logger and register it to the given scope.
   */
  public static register(scope: IConstruct) {
    const existing = (scope as any)[LOGGER_SYMBOL];
    if (existing !== undefined) {
      throw new Error("There is already a logger registered to this scope.");
    }

    const logger = new Logger(scope, "WingLogger");

    Object.defineProperty(scope, LOGGER_SYMBOL, {
      value: logger,
      enumerable: false,
      writable: false,
    });
  }

  private constructor(scope: Construct, id: string) {
    super(null as any, id);
    return Polycons.newInstance(LOGGER_TYPE, scope, id) as Logger;
  }

  /** @internal */
  public _capture(_captureScope: IConstruct, _metadata: CaptureMetadata): Code {
    throw new Error("Method not implemented.");
  }
}

/**
 * Inflight interface for `Logger`.
 */
export interface ILoggerClient {
  /**
   * Logs a message. The log will be associated with whichever resource is
   * running the inflight code.
   *
   * @param message The message to print
   */
  print(message: string): Promise<void>;

  /**
   * Fetch the latest logs associated with whichever resource is running the
   * inflight code. The logs may include cloud-provider specific messages or
   * metadata.
   */
  fetchLatestLogs(): Promise<LogEvent[]>;
}

/**
 * List of inflight operations available for `Logger`.
 */
export enum LoggerInflightMethods {
  /** `Logger.print` */
  PRINT = "print",
}

/**
 * Represents a log event.
 */
export interface LogEvent {
  /** The log message. */
  readonly message: string;
  /** The log timestamp, in milliseconds since the epoch */
  readonly timestamp: number;
}
