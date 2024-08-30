import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const WING_BIN = fileURLToPath(new URL("../../wing/bin/wing", import.meta.url));
const EXTENSION_DEVELOPMENT_PATH = fileURLToPath(
  new URL("..", import.meta.url)
);
const EXAMPLES_PATH = fileURLToPath(
  new URL("../../../examples", import.meta.url)
);

spawnSync(
  "code",
  [
    EXAMPLES_PATH,
    "--disable-extensions",
    `--extensionDevelopmentPath=${EXTENSION_DEVELOPMENT_PATH}`,
  ],
  {
    env: {
      ...process.env,
      RUST_BACKTRACE: "1",
      WING_BIN,
    },
    stdio: "inherit",
  }
);
