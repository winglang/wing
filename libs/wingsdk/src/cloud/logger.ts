import { Construct, IConstruct } from "constructs";
import { Polycons } from "polycons";
import { Code } from "../core/inflight";
import { Resource } from "../core/resource";

export const LOGGER_TYPE = "wingsdk.cloud.Logger";
export const LOGGER_SYMBOL = Symbol.for(LOGGER_TYPE);

/**
 * Functionality shared between all `Logger` implementations.
 */
export abstract class LoggerBase extends Resource {
  public readonly stateful = true;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    /**
     * Information on how to display a resource in the UI.
     */
    this.display.hidden = true;
  }

  /**
   * Logs a message (preflight).
   * @param message The message to log.
   */
  public print(message: string): void {
    // default implementation, can be overridden
    console.log(message);
  }
}

/**
 * A cloud logging facility.
 *
 * @inflight `@winglang/wingsdk.cloud.ILoggerClient`
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
  public _toInflight(): Code {
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
   * NOTICE: this is not an async function because it is wrapped by `console.log()`.
   *
   * @param message The message to print
   * @inflight
   */
  print(message: string): void;
}

/**
 * List of inflight operations available for `Logger`.
 * @internal
 */
export enum LoggerInflightMethods {
  /** `Logger.print` */
  PRINT = "print",
}
