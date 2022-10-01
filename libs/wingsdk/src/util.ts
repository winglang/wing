import { mkdtempSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";

export function mkdtemp() {
  return mkdtempSync(join(tmpdir(), "wingsdk."));
}

export interface SanitizeOptions {
  /**
   * Do not include empty objects (no keys).
   * @default false
   */
  readonly filterEmptyObjects?: boolean;

  /**
   * Do not include arrays with no items.
   * @default false
   */
  readonly filterEmptyArrays?: boolean;

  /**
   * Sort dictionary keys.
   * @default true
   */
  readonly sortKeys?: boolean;
}

export function sanitizeValue(obj: any, options: SanitizeOptions = {}): any {
  if (obj == null) {
    return undefined;
  }

  if (typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    if (options.filterEmptyArrays && obj.length === 0) {
      return undefined;
    }

    return obj.map((x) => sanitizeValue(x, options));
  }

  if (obj.constructor.name !== "Object") {
    throw new Error(
      `can't render non-simple object of type '${obj.constructor.name}'`
    );
  }

  const newObj: { [key: string]: any } = {};

  const sortKeys = options.sortKeys ?? true;
  const keys = sortKeys ? Object.keys(obj).sort() : Object.keys(obj);
  for (const key of keys) {
    const value = obj[key];
    const newValue = sanitizeValue(value, options);
    if (newValue != null) {
      newObj[key] = newValue;
    }
  }

  if (options.filterEmptyObjects && Object.keys(newObj).length === 0) {
    return undefined;
  }

  return newObj;
}
