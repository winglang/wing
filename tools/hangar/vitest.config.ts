import { defineConfig } from "vitest/config";
import { join, relative } from "path";

export default defineConfig({
  test: {
    testTimeout: 200_000,
    globalSetup: "src/package.setup.ts",
    resolveSnapshotPath(path, extension) {
      const baseSnapshotPath = join(__dirname, "__snapshots__");
      const srcPath = join(__dirname, "src");
      const relativePath = relative(srcPath, path).replace(/\.test\.ts$/, `.ts${extension}`);

      return join(baseSnapshotPath, relativePath);
    },
  },
});
