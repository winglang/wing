import { spawnSync } from "node:child_process";

interface PnpmListEntry {
  name: string;
  version: string;
  path: string;
  private: boolean;
}

export interface GetChangedPackagesOptions {
  filter: string;
}

/**
 * Gets the packages that changed since the given filter.
 *
 * @example filterPackages("...[origin/master]")
 * @example filterPackages("...[HEAD^1]")
 * @see https://pnpm.io/filtering#--filter-since
 */
export const filterPackages = ({ filter }: GetChangedPackagesOptions) => {
  return JSON.parse(
    spawnSync("pnpm", ["--filter", filter, "--json", "ls"]).stdout.toString(
      "utf8",
    ),
  ) as PnpmListEntry[];
};
