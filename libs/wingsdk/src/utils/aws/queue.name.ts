import { Construct } from "constructs";
import { NameOptions } from "../name-options";

/**
 * AWS rules for Queue Names
 *
 * Queue names are limited to 80 characters.
 * You can use alphanumeric characters, hyphens (-), and underscores (_).
 */
export class QueueName {
  static readonly MAX_LEN = 80;

  public static of(resource: Construct, opts?: NameOptions): string {
    if (opts?.maxLen! > QueueName.MAX_LEN) {
      throw new Error(
        `Queue names can not be longer than ${QueueName.MAX_LEN} characters`
      );
    }

    const options: NameOptions = {
      maxLen: opts?.maxLen ?? QueueName.MAX_LEN,
      ...opts,
    };

    let name = `${resource.node.id}-${resource.node.addr}`;

    return name.replace(/[^a-zA-Z0-9\_\-]+/g, "-").substring(0, options.maxLen);
  }
}
