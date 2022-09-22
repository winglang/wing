import { IConstruct } from "constructs";
import { Code } from "./inflight";
import { PREBUNDLE_SYMBOL } from "./internal";

/**
 * Testing utilities.
 */
export class Testing {
  /**
   * Obtain a reference to the prebundled Code for a given capture scope.
   */
  public static inspectPrebundledCode(captureScope: IConstruct): Code {
    const prebundle = (captureScope as any)[PREBUNDLE_SYMBOL];
    if (!prebundle) {
      throw new Error("No prebundled code found on this resource.");
    }

    return prebundle;
  }
}
