import { Construct } from "constructs";
import { NameOptions } from "../name-options";

/**
 * AWS rules for Function Names
 *
 * Queue names are limited to 64 characters.
 * You can use alphanumeric characters, hyphens (-), and underscores (_).
 */
export class FunctionName {
  static readonly MAX_LEN = 64;

  public static of(resource: Construct, opts?: NameOptions): string {
    if (opts?.maxLen! > FunctionName.MAX_LEN) {
      throw new Error(
        `Function names can not be longer than ${FunctionName.MAX_LEN} characters`
      );
    }

    const options: NameOptions = {
      maxLen: opts?.maxLen ?? FunctionName.MAX_LEN,
      ...opts,
    };

    let name = `${resource.node.id}-${resource.node.addr}`;

    return name.replace(/[^a-zA-Z0-9\:\-]+/g, "-").substring(0, options.maxLen);
  }
}
