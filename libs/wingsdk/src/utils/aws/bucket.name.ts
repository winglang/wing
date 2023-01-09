import { Construct } from "constructs";
import { NameOptions } from "../name-options";

/**
 * AWS rules for Bucket Names
 *
 * Bucket names names must be between 3 and 63 characters.
 * You can use alphanumeric characters, dot(.) and dash (-),
 * must begin and end with alphanumeric character, can not begin
 * with 'xn--' or ending with '-s3alias' and must not contain
 * two adjacent dots.
 */
export class BucketName {
  static readonly MIN_LEN = 3;
  static readonly MAX_LEN = 63;

  public static of(resource: Construct, opts?: NameOptions): string {
    if (opts?.minLen! < BucketName.MIN_LEN) {
      throw new Error(
        `Bucket names can not be less than ${BucketName.MIN_LEN} characters`
      );
    }

    if (opts?.maxLen! > BucketName.MAX_LEN) {
      throw new Error(
        `Bucket names can not be longer than ${BucketName.MAX_LEN} characters`
      );
    }

    const options: NameOptions = {
      minLen: opts?.minLen ?? BucketName.MIN_LEN,
      maxLen: opts?.maxLen ?? BucketName.MAX_LEN,
      ...opts,
    };

    let name = `${resource.node.id}-${resource.node.addr}`;

    if (name.startsWith("xn--")) {
      throw new Error("Bucket names can not begin with 'xn--'");
    }

    return name
      .toLocaleLowerCase()
      .replace(/(([(.)\1+]+)[^a-z0-9\-]+)/g, "-")
      .substring(0, options.maxLen);
  }
}
