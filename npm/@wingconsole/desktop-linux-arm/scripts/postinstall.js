import { fileURLToPath } from "node:url";

import tar from "tar";

const releaseDir = new URL("../release", import.meta.url);
const targetFile = new URL("../release/app.tar.gz", import.meta.url);

await tar.x({
  file: fileURLToPath(targetFile),
  cwd: fileURLToPath(releaseDir),
});
