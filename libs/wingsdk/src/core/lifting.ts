import { IConstruct } from "constructs";
import { liftObject } from "./internal";

/**
 * Lifting utilities.
 */
export class Lifting {
  /**
   * "Lifts" a value into an inflight context. If the value is a resource (i.e. has a `_toInflight`
   * method), this method will be called and the result will be returned. Otherwise, the value is
   * returned as-is.
   *
   * @param value The value to lift.
   * @returns a string representation of the value in an inflight context.
   */
  public static lift(scope: IConstruct, value: any): string {
    return liftObject(scope, value);
  }
}
