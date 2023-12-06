import fs from "fs";
import { join } from "path";
import { parse } from "dotenv";
import { expand } from "dotenv-expand";

const DEFAULT_ENV_FILES = [`.env`, `.env.local`];

export interface EnvLoadOptions {
  /**
   * The directory to load the environment variables from.
   * @default process.cwd()
   */
  cwd?: string;

  /**
   * The mode to load additional environment variables from.
   * e.g. "wing compile" has mode "compile", which will load ".env.compile" and ".env.compile.local".
   */
  mode?: string;
}

/**
 * Loads environment variables from `.env` and `.env.local` files.
 */
export function loadEnvVariables(options?: EnvLoadOptions): Record<string, string> | undefined {
  const envDir = options?.cwd ?? process.cwd();
  const envFiles = DEFAULT_ENV_FILES.concat(
    options?.mode ? [`.env.${options.mode}`, `.env.${options.mode}.local`] : []
  ).map((file) => join(envDir, file));

  // Parse `envFiles` and combine their variables into a single object
  const parsed = Object.fromEntries(
    envFiles.flatMap((file) => {
      try {
        return Object.entries(parse(fs.readFileSync(file)));
      } catch (_) {
        return [];
      }
    })
  );

  // Expand and force load the environment variables
  const expandedEnvVariables = expand({ parsed, ignoreProcessEnv: true });
  if (expandedEnvVariables.parsed) {
    for (const [key, value] of Object.entries(expandedEnvVariables.parsed)) {
      process.env[key] = value;
    }
  }

  return expandedEnvVariables.parsed;
}
