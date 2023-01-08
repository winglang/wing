import { mkdtempSync, readdirSync, readFileSync, statSync } from "fs";
import { tmpdir } from "os";
import { extname, join } from "path";
import { debug } from "debug";
import * as tar from "tar";

/**
 * Path of the simulator configuration file in every .wsim tarball.
 */
export const SIMULATOR_FILE_PATH = "simulator.json";

export const log = debug("wing:sdk");

export function mkdtemp() {
  return mkdtempSync(join(tmpdir(), "wingsdk."));
}

export function readJsonSync(file: string) {
  return JSON.parse(readFileSync(file, "utf-8"));
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

export function directorySnapshot(rooti: string) {
  const snapshot: Record<string, any> = {};

  const visit = (root: string, subdir: string, prefix = "") => {
    const files = readdirSync(join(root, subdir));
    for (const f of files) {
      const relpath = join(subdir, f);
      const abspath = join(root, relpath);
      const key = prefix + relpath;
      if (statSync(abspath).isDirectory()) {
        visit(root, relpath);
      } else {
        if (extname(f) === ".json") {
          const data = readFileSync(abspath, "utf-8");
          snapshot[key] = JSON.parse(data);
        } else if (extname(f) === ".wsim") {
          const workdir = mkdtemp();
          tar.extract({
            cwd: workdir,
            sync: true,
            file: abspath,
          });

          visit(workdir, ".", key + "/");
        } else {
          snapshot[key] = readFileSync(abspath, "utf-8");
        }
      }
    }
  };

  visit(rooti, ".");

  return snapshot;
}
