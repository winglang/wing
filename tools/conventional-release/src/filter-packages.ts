import { spawnSync } from "node:child_process";

interface PnpmListEntry {
  name: string;
  version: string;
  path: string;
  private: boolean;
}

export interface GetChangedPackagesOptions {
  filter: string | undefined;
  skipPrivate?: boolean;
}

/**
 * Gets the packages that changed since the given filter.
 *
 * @example filterPackages({ filter: "...[origin/main]" })
 * @example filterPackages({ filter: "...[HEAD^1]" })
 * @see https://pnpm.io/filtering#--filter-since
 */
export const filterPackages = ({
  filter,
  skipPrivate,
}: GetChangedPackagesOptions) => {
  let options: string[] = [];
  if (filter) {
    options.push(`--filter=${filter}`);
  }
  options.push("--json", "--recursive", "ls");

  let entries = JSON.parse(
    spawnSync("pnpm", options).stdout.toString("utf8"),
  ) as PnpmListEntry[];

  if (skipPrivate) {
    entries = entries.filter((package_) => package_.private === false);
  }

  return entries;
};
