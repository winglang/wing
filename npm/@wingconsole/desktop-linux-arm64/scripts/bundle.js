import { mkdir, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import tar from "tar";

const releaseDir = new URL("../release", import.meta.url);
await rm(releaseDir, {
  recursive: true,
  force: true,
});
await mkdir(releaseDir, { recursive: true });

const sourceDir = new URL(
  "../../../../console/desktop/release/linux-arm64-unpacked",
  import.meta.url,
);
const targetFile = new URL("../release/app.tar.gz", import.meta.url);

await tar.c(
  {
    gzip: true,
    file: fileURLToPath(targetFile),
    cwd: fileURLToPath(sourceDir),
  },
  ["."],
);
