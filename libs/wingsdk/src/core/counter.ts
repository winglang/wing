import { IConstruct } from "constructs";

const COUNTERS_SYMBOL = Symbol.for("@winglang/sdk.core.Counter");

/**
 * A class that generates unique sequenced IDs for constructs.
 */
export class Counters {
  /**
   * Returns the singleton instance of the `Counters` class.
   */
  public static of(construct: IConstruct): Counters {
    let connections = (construct.node.root as any)[COUNTERS_SYMBOL];

    if (!connections) {
      connections = new Counters();
      (construct.node.root as any)[COUNTERS_SYMBOL] = connections;
    }

    return connections;
  }

  /**
   * Generate a unique ID for the given scope and id. The newly generated ID is
   * guaranteed to be unique within the given scope.
   * It will have the form '<id><n>', where '<id>' is the given id and '<n>' is a
   * increasing sequence of integers starting from '0'.
   *
   * @param scope The scope for which this id is generated. Also used to get the root singleton
   */
  public static createId(scope: IConstruct, id: string): string {
    const counters = Counters.of(scope);

    return counters.createId(scope, id);
  }

  private readonly _counters: Record<string, number> = {};
  private constructor() {}

  /**
   * Generate a unique ID for the given scope and id. The newly generated ID is
   * guaranteed to be unique within the given scope.
   * It will have the form '<id><n>', where '<id>' is the given id and '<n>' is a
   * increasing sequence of integers starting from '0'.
   *
   * @param scope The scope for which this id is generated.
   */
  public createId(scope: IConstruct, id: string): string {
    const key = `${scope.node.addr}|${id}`;
    const counter = this._counters[key];
    if (counter !== undefined) {
      return `${id}${this._counters[key]++}`;
    } else {
      this._counters[key] = 1;
      return `${id}0`;
    }
  }
}
