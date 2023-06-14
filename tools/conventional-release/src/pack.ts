import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";

import { filterPackages } from "./filter-packages.js";
import { spawn } from "./spawn.js";

const dir = resolve("dist/packages");

export const pack = async () => {
  await mkdir(dir, { recursive: true });

  for (const { path, name } of filterPackages({
    filter: undefined,
    skipPrivate: true,
  })) {
    console.log(`Packing ${name}...`);
    spawn("pnpm", ["pack", "--pack-destination", dir], {
      cwd: path,
    });
  }
};
