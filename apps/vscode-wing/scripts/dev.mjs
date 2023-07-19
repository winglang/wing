import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const WING_BIN = fileURLToPath(new URL("../../wing/bin/wing", import.meta.url));
const EXTENSION_DEVELOPMENT_PATH = fileURLToPath(
  new URL("..", import.meta.url)
);

spawnSync(
  "code",
  [
    "../../examples",
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
