import { defineConfig } from "vitest/config";
import { join, sep } from "path";

export default defineConfig({
  test: {
    testTimeout: 150_000,
    globalSetup: "src/package.setup.ts",
    resolveSnapshotPath(path, extension) {
      const baseSnapshotPath = join(__dirname, "__snapshots__");
      const relativePath = path
        .replace(join(__dirname, "src") + sep, "")
        .replace(/\.test\.ts$/, `.ts${extension}`);

      return join(baseSnapshotPath, relativePath);
    },
  },
});
