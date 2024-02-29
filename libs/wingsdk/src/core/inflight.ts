import { basename } from "path";
import { normalPath } from "../shared/misc";

let closureCount = 0;

export function closureId(): number {
  return closureCount++;
}

export type InflightBindings = Record<string, InflightBinding>;

/**
 * An inflight binding.
 */
export interface InflightBinding {
  /**
   * The resource or capturable value.
   */
  readonly obj: any;

  /**
   * The list of operations used on the resource.
   */
  readonly ops?: string[];
}

/**
 * Utility class with functions about inflight clients.
 */
export class InflightClient {
  /**
   * Returns code for creating an inflight client.
   */
  public static for(
    dirname: string,
    filename: string,
    clientClass: string,
    args: string[],
  ): string {
    const inflightDir = dirname;
    const inflightFile = basename(filename).split(".")[0] + ".inflight";
    return `new (require("${normalPath(
      `${inflightDir}/${inflightFile}`,
    )}")).${clientClass}(${args.join(", ")})`;
  }

  /**
   * Returns code for implementing `_toInflightType()`.
   */
  public static forType(filename: string, clientClass: string): string {
    return `require("${normalPath(filename)}").${clientClass}`;
  }

  private constructor() {}
}
