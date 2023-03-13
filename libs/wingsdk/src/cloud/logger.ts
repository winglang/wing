import { Construct, IConstruct } from "constructs";
import { fqnForType } from "../constants";
import { App } from "../core";
import { Resource } from "../core/resource";

export const LOGGER_FQN = fqnForType("cloud.Logger");
const LOGGER_SYMBOL = Symbol.for(LOGGER_FQN);

/**
 * A cloud logging facility.
 *
 * @inflight `@winglang/sdk.cloud.ILoggerClient`
 */
export abstract class Logger extends Resource {
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

    const logger = App.of(scope).newAbstract(
      LOGGER_FQN,
      scope,
      "WingLogger"
    ) as Logger;

    Object.defineProperty(scope, LOGGER_SYMBOL, {
      value: logger,
      enumerable: false,
      writable: false,
    });
  }

  public readonly stateful = true;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.display.hidden = true;
    this.display.title = "Logger";
    this.display.description = "A cloud logging facility";
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
