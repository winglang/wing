import { IConstruct } from "constructs";
import { IInflightHost } from "../std";

const BINDINGS_SYMBOL = Symbol.for("@winglang/sdk.core.Bindings");

/**
 * Store data about what inflight hosts are bound to a construct, and
 * with what operations.
 */
export class Bindings {
  /**
   * Return the matching Lifts instance of the given construct.
   */
  public static of(construct: IConstruct): Bindings {
    let bindings = (construct as any)[BINDINGS_SYMBOL];

    if (!bindings) {
      bindings = new Bindings();
      (construct as any)[BINDINGS_SYMBOL] = bindings;
    }

    return bindings;
  }

  private readonly data = new Map<IInflightHost, Set<string>>();

  public list(): Array<IInflightHost> {
    return [...this.data.keys()];
  }

  public get(host: IInflightHost): Array<string> {
    if (!this.data.has(host)) {
      return [];
    }

    return [...this.data.get(host)!];
  }

  public add(host: IInflightHost, ...ops: string[]) {
    if (!this.data.has(host)) {
      this.data.set(host, new Set<string>());
    }

    const set = this.data.get(host)!;

    for (const op of ops) {
      set.add(op);
    }
  }

  public has(host: IInflightHost, op: string): boolean {
    if (!this.data.has(host)) {
      return false;
    }

    return this.data.get(host)!.has(op);
  }
}
