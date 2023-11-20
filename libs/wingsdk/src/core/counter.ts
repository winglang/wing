import { IConstruct } from "constructs";

const COUNTERS_SYMBOL = Symbol.for("@winglang/sdk.core.Counter");

/**
 *
 */
export class Counters {
  /**
   *
   */
  public static of(construct: IConstruct): Counters {
    let connections = (construct.node.root as any)[COUNTERS_SYMBOL];

    if (!connections) {
      connections = new Counters();
      (construct.node.root as any)[COUNTERS_SYMBOL] = connections;
    }

    return connections;
  }

  public static createId(scope: IConstruct, id: string) {
    const counters = Counters.of(scope);

    return counters.createId(scope, id);
  }

  private readonly _counters: Record<string, number> = {};
  private constructor() {}

  public createId(scope: IConstruct, id: string) {
    Counters.of(scope).createId(scope, id);

    const key = `${scope.node.addr}|${id}`;
    const counter = this._counters[key];
    if (counter) {
      this._counters[key] = counter + 1;
      return `${id}-${counter}`;
    } else {
      this._counters[key] = 1;
      return id;
    }
  }
}
