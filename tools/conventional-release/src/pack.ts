import { spawnSync } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";

import { filterPackages } from "./filter-packages.js";

// const dir = resolve(__dirname, "../../../dist/packages");
const dir = resolve("dist/packages");

export const pack = async () => {
  await mkdir(dir, { recursive: true });

  for (const { path, name } of filterPackages({
    filter: undefined,
    skipPrivate: true,
  })) {
    console.log(`Packing ${name}...`);
    spawnSync("pnpm", ["pack", "--pack-destination", dir], {
      cwd: path,
      stdio: "inherit",
    });
  }
};
