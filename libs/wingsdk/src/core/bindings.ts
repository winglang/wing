import { IConstruct } from "constructs";
import { IInflightHost } from "../std";

const BINDINGS_SYMBOL = Symbol.for("@winglang/sdk.core.Bindings");

/**
 * Store data about what inflight hosts are bound to a construct, and
 * with what operations.
 */
export class Bindings {
  /**
   * Return the matching Bindings instance for the given construct.
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

  /**
   * Return a list of all inflight hosts that are bound to this construct.
   */
  public list(): Array<IInflightHost> {
    return [...this.data.keys()];
  }

  /**
   * Return a list of all operations that the given host needs to be bound to this resource with.
   */
  public get(host: IInflightHost): Array<string> {
    if (!this.data.has(host)) {
      return [];
    }

    return [...this.data.get(host)!];
  }

  /**
   * Add a binding for the given host and operations.
   */
  public add(host: IInflightHost, ...ops: string[]) {
    if (!this.data.has(host)) {
      this.data.set(host, new Set<string>());
    }

    const set = this.data.get(host)!;

    for (const op of ops) {
      set.add(op);
    }
  }

  /**
   * Return true if the given host is bound to this construct with the given operation.
   */
  public has(host: IInflightHost, op: string): boolean {
    if (!this.data.has(host)) {
      return false;
    }

    return this.data.get(host)!.has(op);
  }
}
