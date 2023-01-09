import { Construct } from "constructs";
import { NameOptions } from "../name-options";

/**
 * AWS rules for Topic Names
 *
 * Topic names are limited to 256 characters.
 * You can use alphanumeric characters, hyphens (-) and underscores (_).
 */
export class TopicName {
  static readonly MAX_LEN = 256;

  public static of(resource: Construct, opts?: NameOptions): string {
    if (opts?.maxLen! > TopicName.MAX_LEN) {
      throw new Error(
        `Topic names can not be longer than ${TopicName.MAX_LEN} characters`
      );
    }

    const options: NameOptions = {
      maxLen: opts?.maxLen ?? TopicName.MAX_LEN,
      ...opts,
    };

    let name = `${resource.node.id}-${resource.node.addr}`;

    return name.replace(/[^a-zA-Z0-9\_\-]+/g, "-").substring(0, options.maxLen);
  }
}
