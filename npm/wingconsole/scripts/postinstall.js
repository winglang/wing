import { fileURLToPath } from "node:url";

import tar from "tar";

import { releaseDir, tarballFile } from "../lib/metadata.js";

await tar.x({
  file: fileURLToPath(tarballFile),
  cwd: fileURLToPath(releaseDir),
});
