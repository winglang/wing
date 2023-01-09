import { Construct } from "constructs";
import { NameOptions } from "../name-options";

/**
 * AWS rules for Counter Names
 *
 * Couter (Table) names must be between 3 and 255 characters.
 * You can use alphanumeric characters, dot(.), dash (-), and underscores (_).
 */
export class CounterName {
  static readonly MIN_LEN = 3;
  static readonly MAX_LEN = 255;

  public static of(resource: Construct, opts?: NameOptions): string {
    if (opts?.minLen! < CounterName.MIN_LEN) {
      throw new Error(
        `Counter names can not be less than ${CounterName.MIN_LEN} characters`
      );
    }

    if (opts?.maxLen! > CounterName.MAX_LEN) {
      throw new Error(
        `Counter names can not be longer than ${CounterName.MAX_LEN} characters`
      );
    }

    const options: NameOptions = {
      maxLen: opts?.maxLen ?? CounterName.MAX_LEN,
      ...opts,
    };

    let name = `wingsdk-counter-${resource.node.id}-${resource.node.addr}`;

    return name
      .replace(/[^a-zA-Z0-9\_\.\-]+/g, "-")
      .substring(0, options.maxLen);
  }
}
