import * as cp from "child_process";
import { readdirSync } from "fs";
import * as fs from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";
import { promisify } from "util";

/**
 * Normalize windows paths to be posix-like.
 */
export function normalPath(path: string) {
  if (process.platform === "win32") {
    return (
      path
        // force posix path separator
        .replace(/\\+/g, "/")
    );
  } else {
    return path;
  }
}

export async function withSpinner<T>(message: string, fn: () => Promise<T>): Promise<T> {
  // if progress is disabled, just run the function
  if (!process.env.PROGRESS) {
    return fn();
  }

  const ora = await import("ora").then((m) => m.default);

  const spinner = ora({
    stream: process.stdout, // hangar tests currently expect stderr to be empty or else they fail
    text: `${message}\n`,
  }).start();
  try {
    const result = await fn();
    spinner.succeed();
    return result;
  } catch (e) {
    spinner.fail();
    throw e;
  }
}

/**
 * Execute a command and return its stdout.
 */
export async function exec(command: string): Promise<string> {
  const output = await promisify(cp.exec)(command);
  return output.stdout.trim();
}

/**
 * Creates a clean environment for each test by copying the example file to a temporary directory.
 */
export async function generateTmpDir() {
  return fs.mkdtemp(join(tmpdir(), "-wing-compile-test"));
}

/**
 * Casts a numeric string to a number.
 *
 * Returns `undefined` if the string is empty.
 *
 * @throws If the string is not a number.
 */
export function parseNumericString(text?: string) {
  if (!text) {
    return undefined;
  }

  const number = Number(text);
  if (isNaN(number)) {
    throw new Error(`"${text}" is not a number`);
  }

  return number;
}

export const currentPackage: {
  name: string;
  version: string;
  engines: { node: string };
  // eslint-disable-next-line @typescript-eslint/no-require-imports
} = require("../package.json");

export const PROJECT_TEMPLATES_DIR = join(__dirname, "..", "project-templates");

export function projectTemplateNames(): string[] {
  const templateNames: Set<string> = new Set();
  readdirSync(join(PROJECT_TEMPLATES_DIR)).forEach((language) => {
    readdirSync(join(PROJECT_TEMPLATES_DIR, language)).forEach((template) => {
      templateNames.add(template);
    });
  });
  return [...templateNames];
}

export function flattenObject(item: any, parentKey: string = "") {
  let flattened: Record<string, unknown> = {};

  if (typeof item === "object") {
    for (const key in item) {
      const propName: string = parentKey ? `${parentKey}_${key}` : key;
      Object.assign(flattened, flattenObject(item[key] as Record<string, unknown>, propName));
    }
  } else {
    flattened[parentKey] = item;
  }

  return flattened;
}
