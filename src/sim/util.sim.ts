import { createHash } from "node:crypto";
import baseFilenamify from "filenamify";

/**
 * Convert a string to a valid filename.
 */
export function filenamify(value: string) {
  const hash = createHash("md5").update(value).digest("hex");

  return `${baseFilenamify(value, {
    maxLength: 32,
  }).toLocaleLowerCase()}-${hash.slice(0, 8)}`;
}
