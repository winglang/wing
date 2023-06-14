import { mkdir, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import tar from "tar";

import { releaseDir, tarballFile } from "../lib/index.js";

import { platform } from "./platform.js";

await rm(releaseDir, {
  recursive: true,
  force: true,
});
await mkdir(releaseDir, { recursive: true });

const sourceDir = new URL(
  `../../../../console/desktop/release/${platform}`,
  import.meta.url,
);

await tar.c(
  {
    gzip: true,
    file: fileURLToPath(tarballFile),
    cwd: fileURLToPath(sourceDir),
  },
  ["."],
);
